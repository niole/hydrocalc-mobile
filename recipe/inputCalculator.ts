import { Solution, SizeUnits, VolumeUnits, BucketSize, SolutionInputMeasurement } from '../globalState';
import { Matrix, solve } from 'ml-matrix';

/**
 * The conversion constants in here are use with multiplication if they are applied to do what the label says
 * or they are applied using division if you want to undo a conversion.
 */
const UNSUPPORTED_UNIT_MSG = 'unit not supported';
const TSPS_PER_GALLON_1K_EC = 1.95; // TODO support more than just general hydroponics
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

/**
 * The US conversions are the most annoying and then need help mapping from conversion to label to use
 * TODO add half and quarter tsp
 */
const US_CONVERSIONS_MAPPER = [
  { conversion: OUNCES_TO_CUPS, label: "cups" },
  { conversion: OUNCES_TO_HALF_CUPS, label: "half cups" },
  { conversion: OUNCES_TO_QUARTER_CUPS, label: "quarter cups" },
  { conversion: OUNCES_TO_EIGTH_CUPS, label: "eigth cups" },
  { conversion: OUNCES_TO_TBSPS, label: "tbsps" },
  { conversion: OUNCES_TO_TSPS, label: "tsps" },
];

/**
 * Outputs human readable recipe instructions for the specified inputs
 */
export const getInputVolumeInstructions = (
  unit: SolutionInputMeasurement,
  gallons: number,
  inputFraction: number,
  ecTarget: number
): string => {
  const tsps = TSPS_PER_GALLON_1K_EC*inputFraction*gallons*ecTarget;

  switch (unit) {
    case SolutionInputMeasurement.Liter:
      return getLitersInstruction(tsps);
    case SolutionInputMeasurement.Cup:
      return getCupsInstruction(tsps);
    case SolutionInputMeasurement.FluidOunce:
      return getFluidOunceInstruction(tsps);
    default:
      return UNSUPPORTED_UNIT_MSG;
  }

};

const getLitersInstruction = (tsps: number): string => {
  const ml = tsps*ML_P_TSP;
  const liters = Math.floor(ml/1000);
  const finalMl = ml-liters*1000;

  const litersInstructions = liters > 0 ? `${liters} liters` : '';
  const mlInstructsion = finalMl > 0 ? `${finalMl} ml` : '';

  return [litersInstructions, mlInstructsion].filter(x => !!x).join(',');
};

const getCupsInstruction = (tsps: number): string => {
  const ounces = getFluidOunces(tsps);
  let remainingOunces = ounces;

  const instructions = US_CONVERSIONS_MAPPER.map(c => {
    const nextCount = Math.floor(remainingOunces*c.conversion);
    remainingOunces -= nextCount/c.conversion;
    if (nextCount > 0) {
      return ` ${nextCount} ${c.label}`;
    }
    return '';
  });

  return instructions.filter(x => !!x).join(",");
};

const getFluidOunceInstruction = (tsps: number): string => {
  const ounces = getFluidOunces(tsps);
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
        return total*LITER_TO_GALLON;
      case VolumeUnits.Ounce:
        return total*OUNCE_TO_GALLON;
      case VolumeUnits.ML:
        return (total/1000.0)*LITER_TO_GALLON;
      default:
        throw new Error("unimplemented unit found when calculating gallons in bucket from volume");
    }
  } else if (bucketSize.lwh) {
    const { lwh: { unit, length, width, height } } = bucketSize;

    switch (unit) {
      case SizeUnits.CM:
        return (length*width*height/Math.pow(2.54, 3))*CUBIC_INCH_TO_GALLON;
      case SizeUnits.Inch:
        return length*width*height*CUBIC_INCH_TO_GALLON;
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

    //console.log(A, b);

    const x = solve(A, b); // there are many solutions. x can be [1, 2, 1].transpose(), or [1.33, 1.33, 1.33].transpose(), etc.
    const error = Matrix.sub(b, A.mmul(x)); // The error enables to evalu

    //console.log('error', error, x);

    const xArray = inputs.map((input, i) => x.get(i, 0));
    const denom = xArray.reduce((a: number, b: number) => a + b, 0);
    const normalizedX = xArray.map((x: number) => x/denom);

    //console.log(xArray, denom, normalizedX);

    return {
      ...solution,
      inputs: inputs.map((input, i) => ({
        ...input,
        frac: normalizedX[i]
      }))
    };
  } catch (error) {
    console.error('Matrix solving failed, ', error);
    return solution;
  }
};
