import * as React from 'react';
import { GlobalState } from '.';

const _213Solution = {
  name: '2-1-3 solution',
  inputs: [{
    name: 'micro',
    brand: 'general hydroponics',
    npk: { n: 5, p: 0, k: 1 },
    ec: 19990
  }, {
    name: 'bloom',
    brand: 'general hydroponics',
    npk: { n: 0, p: 5, k: 4 },
    ec: 19990
  }, {
    name: 'green',
    brand: 'general hydroponics',
    npk: { n: 2, p: 1, k: 6 },
    ec: 19990
  }],
  targetNpk: { n: 2, p: 1, k: 3 }
};

const defaultState = {
  recipes: [{
    name: 'yellow bucket',
    solution: _213Solution,
    bucketSize: { volume: { total: 16, unit: 'gallon' } },
    ec: 1000
  }],
  solutions: [_213Solution],
};

export function useRecipes() {
  return React.useState<GlobalState['recipes']>(defaultState.recipes);
}

export function useSolutions() {
  return React.useState<GlobalState['solutions']>(defaultState.solutions);
}
