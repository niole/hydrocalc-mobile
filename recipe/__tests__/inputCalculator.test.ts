import * as inputCalculator from '../inputCalculator';

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
          ec: 123
        }
      }],
      targetNpk: { n: 1, p: 2, k: 3 }
    };

    const actual = inputCalculator.updateInputProportions(solution);

    expect(actual.inputs[0].frac).toBe(1);
  });

  test.only('should compute fractions for inputs with the same npk and ec that add to 1 and are positive', () => {
    const solution = {
      ...baseSolution,
      inputs: [
        {
          frac: 0,
          solution: {
            id: 'id',
            name: 'name',
            npk: { n: 1, p: 2, k: 3 },
            ec: 123
          }
        },
        {
          frac: 0,
          solution: {
            id: 'id2',
            name: 'namee',
            npk: { n: 1, p: 2, k: 3 },
            ec: 123
          }
        },
      ],
      targetNpk: { n: 1, p: 2, k: 3 }
    };

    const actual = inputCalculator.updateInputProportions(solution);

    expect(actual.inputs.reduce((a, b) => a + b.frac, 0)).toBe(1);
    expect(actual.inputs.find(x => x.frac < 0)).not.toBeTruthy();
  });

});

const baseSolution = {
  id: 'id',
  name: 'name',
  inputs: [],
  targetNpk: { n: 0, p: 0, k: 0 }
};
