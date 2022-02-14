import { Solution, SolutionInput } from '../globalState/types';

const GENERAL_HYDROPONICS_BRAND = 'General Hydroponics';

const toSolution = (solutionInput: SolutionInput): Solution => ({
  id: `${solutionInput.id}-solution`,
  name: solutionInput.name,
  inputs: [{ solution: solutionInput, frac: 1 }],
  targetNpk: solutionInput.npk,
});

/**
 * some nutrients are liquid, others are powder
 * for the powder ones you need to know the water/powder ratio
 * ratio is always for 1 gallon
 */

const generalHydroponicsFloraSeries = [
  {
    id: 'FloraBloom',
    brand: GENERAL_HYDROPONICS_BRAND,
    name: 'Flora Series: FloraBloom',
    npk: { n: 0, p: 5, k: 4 },
    tspsPerGallon1kEC: 1.95,
  },
  {
    id: 'FloraMicro',
    brand: GENERAL_HYDROPONICS_BRAND,
    name: 'Flora Series: FloraMicro',
    npk: { n: 5, p: 0, k: 1 },
    tspsPerGallon1kEC: 1.95,
  },
  {
    id: 'FloraGro',
    brand: GENERAL_HYDROPONICS_BRAND,
    name: 'Flora Series: FloraGro',
    npk: { n: 2, p: 1, k: 6 },
    tspsPerGallon1kEC: 1.95,
  },
];

const generalHydroponicsMaxiSeries = [
  {
    id: 'MaxiGro',
    name: 'Maxi Series: MaxiGro',
    brand: GENERAL_HYDROPONICS_BRAND,
    npk: { n: 2, p: 1, k: 3 },
    tspsPerGallon1kEC: 0.54,
  },
];

export const brandSolutionInputs: SolutionInput[] = [
  ...generalHydroponicsFloraSeries,
  ...generalHydroponicsMaxiSeries,
];

export const brandSolutions: Solution[] = [
  ...generalHydroponicsFloraSeries.map(toSolution),
  ...generalHydroponicsMaxiSeries.map(toSolution),
];
