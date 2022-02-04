import * as inputCalculator from '../inputCalculator';
import { SolutionInputMeasurement, SizeUnits, VolumeUnits } from '../../globalState/types';

describe('inputCalculator.updateInputProportions', () => {

  test('should not change inputs for solution with no inputs', () => {
    const solution = {
      ...baseSolution,
      inputs: [],
    };

    const actual = inputCalculator.updateInputProportions(solution);

    expect(actual.inputs).toHaveLength(0);
  });

  test('should set single input to fraction 1 if equal to targetNpk', () => {
    const solution = {
      ...baseSolution,
      inputs: [{
        frac: 0,
        solution: {
          id: 'id',
          name: 'name',
          npk: { n: 1, p: 2, k: 3 },
          tspsPerGallon1kEC: 2.5
        }
      }],
      targetNpk: { n: 1, p: 2, k: 3 }
    };

    const actual = inputCalculator.updateInputProportions(solution);

    expect(actual.inputs[0].frac).toBe(1);
  });

  test('should compute fractions for inputs with the same npk and ec that add to 1 and are positive', () => {
    const solution = {
      ...baseSolution,
      inputs: [
        {
          frac: 0,
          solution: {
            id: 'id',
            name: 'name',
            npk: { n: 1, p: 2, k: 3 },
            tspsPerGallon1kEC: 2.5,
          }
        },
        {
          frac: 0,
          solution: {
            id: 'id2',
            name: 'namee',
            npk: { n: 1, p: 2, k: 3 },
            tspsPerGallon1kEC: 2.5,
          }
        },
      ],
      targetNpk: { n: 1, p: 2, k: 3 }
    };

    const actual = inputCalculator.updateInputProportions(solution);

    expect(actual.inputs.reduce((a, b) => a + b.frac, 0)).toBe(1);
    expect(actual.inputs.find(x => x.frac < 0)).toBeFalsy();
  });

  test('should compute that the ratio is 2/6, 1/6, 3/6 for micro, bloom, green solution with target 2-1-3', () => {
    const solution = {
      ...baseSolution,
      inputs: [
        {
          frac: 0,
          solution: {
            id: 'id',
            name: 'micro',
            npk: { n: 5, p: 0, k: 1 },
            tspsPerGallon1kEC: 2.5,
          }
        },
        {
          frac: 0,
          solution: {
            id: 'id2',
            name: 'bloom',
            npk: { n: 0, p: 5, k: 4 },
            tspsPerGallon1kEC: 2.5,
          }
        },
        {
          frac: 0,
          solution: {
            id: 'id3',
            name: 'green',
            npk: { n: 2, p: 1, k: 6 },
            tspsPerGallon1kEC: 2.5,
          },
        },
      ],
      targetNpk: { n: 2, p: 1, k: 3 }
    };

    const actual = inputCalculator.updateInputProportions(solution);

    expect(Math.abs(actual.inputs[0].frac - (2/6.0))).toBeLessThan(0.01);
    expect(Math.abs(actual.inputs[1].frac - (1/6.0))).toBeLessThan(0.01);
    expect(Math.abs(actual.inputs[2].frac - 0.5)).toBeLessThan(0.01);
  });

  test(`should compute that the ratio is 1/5, 1/5, 3/5 for micro, bloom, green solution with target 2-1-3
            if micro requires that 2x amount of solution is required to achieve ec of 1 microsiemen/cm
            `, () => {
    const solution = {
      ...baseSolution,
      inputs: [
        {
          frac: 0,
          solution: {
            id: 'id',
            name: 'micro',
            npk: { n: 5, p: 0, k: 1 },
            tspsPerGallon1kEC: 5,
          }
        },
        {
          frac: 0,
          solution: {
            id: 'id2',
            name: 'bloom',
            npk: { n: 0, p: 5, k: 4 },
            tspsPerGallon1kEC: 2.5,
          }
        },
        {
          frac: 0,
          solution: {
            id: 'id3',
            name: 'green',
            npk: { n: 2, p: 1, k: 6 },
            tspsPerGallon1kEC: 2.5,
          },
        },
      ],
      targetNpk: { n: 2, p: 1, k: 3 }
    };

    const actual = inputCalculator.updateInputProportions(solution);

    expect(actual.inputs[0].frac).toBe(0.2);
    expect(actual.inputs[1].frac).toBe(0.2);
    expect(actual.inputs[2].frac).toBe(0.6);
  });

});

describe('inputCalculator.getGallonsFromSize', () => {
  test('should convert buck size with volume filled out properly', () => {
    expect(inputCalculator.getGallonsFromSize({ volume: { total: 5, unit: VolumeUnits.Gallon }})).toBe(5);
    expect(inputCalculator.getGallonsFromSize({ volume: { total: 3.78541, unit: VolumeUnits.Liter }})).toBe(1);
    expect(inputCalculator.getGallonsFromSize({ volume: { total: 128, unit: VolumeUnits.Ounce }})).toBe(1);
    expect(inputCalculator.getGallonsFromSize({ volume: { total: 3785.41, unit: VolumeUnits.ML }})).toBe(1);
  });

  test('should convert bucket size with size filled out properly', () => {
    expect(inputCalculator.getGallonsFromSize({ lwh: { length: 12, width: 12, height: 12, unit: SizeUnits.Inch }})).toBe(7.48);
    expect(inputCalculator.getGallonsFromSize({ lwh: { length: 30.48, width: 30.48, height: 30.48, unit: SizeUnits.CM }})).toBe(7.48);
  });
});

describe('inputCalculator.getInputVolumeInstructions', () => {
  test('should calculate that 1 ounce of solution should be used', () => {
    expect(inputCalculator.getInputVolumeInstructions(SolutionInputMeasurement.FluidOunce, 2, 1, 1.0, 3)).toBe("1 ounces");
    expect(inputCalculator.getInputVolumeInstructions(SolutionInputMeasurement.Cup, 2, 1, 1.0, 3)).toBe("1 eigth cups");
    expect(inputCalculator.getInputVolumeInstructions(SolutionInputMeasurement.Liter, 2, 1, 1.0, 3)).toBe("29.57 ml");
  });

  test('should calculate that 0.5 ounce of solution should be used', () => {
    expect(inputCalculator.getInputVolumeInstructions(SolutionInputMeasurement.FluidOunce, 2, 1, 0.5, 3)).toBe("0.5 ounces");
    expect(inputCalculator.getInputVolumeInstructions(SolutionInputMeasurement.Cup, 2, 1, 0.5, 3)).toBe("1 tbsps");
    expect(inputCalculator.getInputVolumeInstructions(SolutionInputMeasurement.Liter, 2, 1, 0.5, 3)).toBe("14.79 ml");
  });

  test('should calculate that 1 cup, .5 cups, and 1 tbsp should be used', () => {
    expect(inputCalculator.getInputVolumeInstructions(SolutionInputMeasurement.FluidOunce, 50, 1, 0.5, 3)).toBe("12.5 ounces");
    expect(inputCalculator.getInputVolumeInstructions(SolutionInputMeasurement.Cup, 50, 1, 0.5, 3)).toBe("1 cups, 1 half cups, 1 tbsps");
    expect(inputCalculator.getInputVolumeInstructions(SolutionInputMeasurement.Liter, 50, 1, 0.5, 3)).toBe("369.67 ml");
  });

  test('should calculate that 1 cup, .5 cups, and 1 tbsp should be used', () => {
    expect(inputCalculator.getInputVolumeInstructions(SolutionInputMeasurement.FluidOunce, 50, 1.1, 0.5, 3)).toBe("13.75 ounces");
    expect(inputCalculator.getInputVolumeInstructions(SolutionInputMeasurement.Cup, 50, 1.1, 0.5, 3)).toBe("1 cups, 1 half cups, 1 eigth cups, 1 tbsps, 1 tsps, 1 half tsps");
    expect(inputCalculator.getInputVolumeInstructions(SolutionInputMeasurement.Liter, 50, 1.1, 0.5, 3)).toBe("406.64 ml");
  });
});

const baseSolution = {
  id: 'id',
  name: 'name',
  inputs: [],
  targetNpk: { n: 0, p: 0, k: 0 }
};
