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
            ec: 19.99
          }
        },
        {
          frac: 0,
          solution: {
            id: 'id2',
            name: 'bloom',
            npk: { n: 0, p: 5, k: 4 },
            ec: 19.99
          }
        },
        {
          frac: 0,
          solution: {
            id: 'id3',
            name: 'green',
            npk: { n: 2, p: 1, k: 6 },
            ec: 19.99
          },
        },
      ],
      targetNpk: { n: 2, p: 1, k: 3 }
    };

    const actual = inputCalculator.updateInputProportions(solution);

    expect(actual.inputs[0].frac).toBe(2/6.0);
    expect(actual.inputs[1].frac).toBe(1/6.0);
    expect(actual.inputs[2].frac).toBe(3/6.0);
  });

  test(`should compute that the ratio is 1/5, 1/5, 3/5 for micro, bloom, green solution with target 2-1-3
            if micro's ec is twice as high as other solutions
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
            ec: 39.98
          }
        },
        {
          frac: 0,
          solution: {
            id: 'id2',
            name: 'bloom',
            npk: { n: 0, p: 5, k: 4 },
            ec: 19.99
          }
        },
        {
          frac: 0,
          solution: {
            id: 'id3',
            name: 'green',
            npk: { n: 2, p: 1, k: 6 },
            ec: 19.99
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

const baseSolution = {
  id: 'id',
  name: 'name',
  inputs: [],
  targetNpk: { n: 0, p: 0, k: 0 }
};
