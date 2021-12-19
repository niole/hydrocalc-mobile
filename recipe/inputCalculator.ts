import { SolutionInputMeasurement } from '../globalState';

const UNSUPPORTED_UNIT_MSG = 'unit not supported';
const TSPS_PER_GALLON_1K_EC = 1.95;
const ML_P_TSP = 4.92892;
const OUNCES_TO_CUPS = 1/8.0;
const OUNCES_TO_HALF_CUPS = 1/4.0;
const OUNCES_TO_QUARTER_CUPS = 1/2.0;
const OUNCES_TO_EIGTH_CUPS = 1.0;
const OUNCES_TO_TBSPS = 2.0;
const OUNCES_TO_TSPS = 6.0;
const US_CONVERSIONS_MAPPER = [
  { conversion: OUNCES_TO_CUPS, label: "cups" },
  { conversion: OUNCES_TO_HALF_CUPS, label: "half cups" },
  { conversion: OUNCES_TO_QUARTER_CUPS, label: "quarter cups" },
  { conversion: OUNCES_TO_EIGTH_CUPS, label: "eigth cups" },
  { conversion: OUNCES_TO_TBSPS, label: "tbsps" },
  { conversion: OUNCES_TO_TSPS, label: "tsps" },
];

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


const getFluidOunces = (tsps: number):number => tsps/6.0;
