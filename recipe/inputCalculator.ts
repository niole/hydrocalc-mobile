import { Solution, SizeUnits, VolumeUnits, BucketSize, SolutionInputMeasurement } from '../globalState';
import { Matrix, solve } from 'ml-matrix';

/**
 * The conversion constants in here are use with multiplication if they are applied to do what the label says
 * or they are applied using division if you want to undo a conversion.
 */
const UNSUPPORTED_UNIT_MSG = 'unit not supported';
const ML_P_TSP = 4.92892;
const CUBIC_INCH_TO_GALLON = 0.004329;
const OUNCE_TO_GALLON = 1/128.0;
const LITER_TO_GALLON = 0.264172;
const OUNCES_TO_CUPS = 1/8.0;
const OUNCES_TO_HALF_CUPS = 1/4.0;
const OUNCES_TO_QUARTER_CUPS = 1/2.0;
const OUNCES_TO_EIGTH_CUPS = 1.0;
const OUNCES_TO_TBSPS = 2.0;
const OUNCES_TO_TSPS = 6.0;
const OUNCES_TO_HALF_TSPS = OUNCES_TO_TSPS*2;
const OUNCES_TO_QUARTER_TSPS = OUNCES_TO_TSPS*4;

/**
 * The US conversions are the most annoying and then need help mapping from conversion to label to use
 */
const US_CONVERSIONS_MAPPER = [
  { conversion: OUNCES_TO_CUPS, label: "cups" },
  { conversion: OUNCES_TO_HALF_CUPS, label: "half cups" },
  { conversion: OUNCES_TO_QUARTER_CUPS, label: "quarter cups" },
  { conversion: OUNCES_TO_EIGTH_CUPS, label: "eigth cups" },
  { conversion: OUNCES_TO_TBSPS, label: "tbsps" },
  { conversion: OUNCES_TO_TSPS, label: "tsps" },
  { conversion: OUNCES_TO_HALF_TSPS, label: "half tsps" },
  { conversion: OUNCES_TO_QUARTER_TSPS, label: "quarter tsps", isQuarterTsp: true },
];

/**
 * Outputs human readable recipe instructions for the specified inputs
 */
export const getInputVolumeInstructions = (
  unit: SolutionInputMeasurement,
  bucketSizeGallons: number,
  inputFraction: number,
  ecTarget: number,
  tspsPerGallon1kEC: number,
): string => {
  const tsps = tspsPerGallon1kEC*inputFraction*bucketSizeGallons*ecTarget;

  switch (unit) {
    case SolutionInputMeasurement.Liter:
      return getLitersInstruction(tsps).trim();
    case SolutionInputMeasurement.Cup:
      return getCupsInstruction(tsps).trim();
    case SolutionInputMeasurement.FluidOunce:
      return getFluidOunceInstruction(tsps).trim();
    default:
      throw new Error(UNSUPPORTED_UNIT_MSG);
  }

};

const getLitersInstruction = (tsps: number): string => {
  const ml = tsps*ML_P_TSP;
  const liters = Math.floor(ml/1000);
  const finalMl = toHumanReadableNumber(ml-liters*1000);

  const litersInstructions = liters > 0 ? `${liters} liters` : '';
  const mlInstructsion = finalMl > 0 ? `${finalMl} ml` : '';

  return [litersInstructions, mlInstructsion].filter(x => !!x).join(',');
};

const getCupsInstruction = (tsps: number): string => {
  const ounces = getFluidOunces(tsps);
  let remainingOunces = ounces;

  const instructions = US_CONVERSIONS_MAPPER.map(c => {
    let nextCount = Math.floor(remainingOunces*c.conversion);
    if (c.isQuarterTsp) {
      nextCount = toHumanReadableNumber(remainingOunces*c.conversion);
    }
    remainingOunces -= nextCount/c.conversion;
    if (nextCount > 0) {
      return ` ${nextCount} ${c.label}`;
    }
    return '';
  });

  return instructions.filter(x => !!x).join(",");
};

const getFluidOunceInstruction = (tsps: number): string => {
  const ounces = toHumanReadableNumber(getFluidOunces(tsps));
  return `${ounces} ounces`;
};

const getFluidOunces = (tsps: number):number => tsps/OUNCES_TO_TSPS;

/**
 * Calculates the number of gallons specified by the bucketSize specification
 * TODO test this and everything in this file
 */
export const getGallonsFromSize = (bucketSize: BucketSize): number => {
  if (bucketSize.volume) {
    const { volume: { unit, total } } = bucketSize;
    switch (unit) {
      case VolumeUnits.Gallon:
        return total;
      case VolumeUnits.Liter:
        return parseFloat((total*LITER_TO_GALLON).toFixed(2));
      case VolumeUnits.Ounce:
        return total*OUNCE_TO_GALLON;
      case VolumeUnits.ML:
        return parseFloat(((total/1000.0)*LITER_TO_GALLON).toFixed(2));
      default:
        throw new Error("unimplemented unit found when calculating gallons in bucket from volume");
    }
  } else if (bucketSize.lwh) {
    const { lwh: { unit, length, width, height } } = bucketSize;

    switch (unit) {
      case SizeUnits.CM:
        return parseFloat(((length*width*height/Math.pow(2.54, 3))*CUBIC_INCH_TO_GALLON).toFixed(2));
      case SizeUnits.Inch:
        return parseFloat((length*width*height*CUBIC_INCH_TO_GALLON).toFixed(2));
      default:
        throw new Error("unrecognized unit when calculating gallons in bucket from size");
    }

  } else {
    throw new Error("please input a bucket size");
  }
};

/**
 * takes all solution inputs for a solution and outputs the fractional proportion
 * of each
 */
export const updateInputProportions = (solution: Solution): Solution => {
  try {
    const { targetNpk, inputs } = solution;
    const A = new Matrix(inputs.map(input => {
      const { n, p, k } = input.solution.npk;
      return [n, p, k];
    })).transpose();

    const b = Matrix.columnVector([targetNpk.n, targetNpk.p, targetNpk.k]);

    const x = solve(A, b);
    const error = Matrix.sub(b, A.mmul(x));

    for (let r = 0; r < error.rows; r++) {
      for (let c = 0; c < error.columns; c++) {
        if (error.get(r, c) > 0.1) {
          const errorMessage = `error was greater than 10% for column: ${c}, row: ${r}, ` +
            `for solution ${solution.id}, ${solution.name}`;
          throw new Error(errorMessage);
        }
      }
    }

    const xArray = inputs.map((input, i) => x.get(i, 0)/(input.solution.tspsPerGallon1kEC));
    const denom = xArray.reduce((a: number, b: number) => a + b, 0.0);
    const normalizedX = xArray.map((x: number) => x/denom);

    return {
      ...solution,
      inputs: inputs.map((input, i) => ({
        ...input,
        frac: normalizedX[i]
      }))
    };
  } catch (error) {
    console.error('Failed to update input proportions for solution ', solution.name, ' ', solution.id, ' :', error);
    return solution;
  }
};

const toHumanReadableNumber = (n: number) => {
  if (Math.floor(n) !== n) {
    const _1Dec =  parseFloat(n.toFixed(1));
    const _2Dec =  parseFloat(n.toFixed(2));
    if (_2Dec !== _1Dec) {
      return _2Dec;
    }
    return _1Dec;
  }
  return n;
};
