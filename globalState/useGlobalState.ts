import * as React from 'react';
import { SizeUnits, VolumeUnits, GlobalState } from './types';

const getId = () => `${Math.random()}`;

/**
 * The global state hooks and default data or data that is read into memory on
 * app start lives in here
 */

const bloominput = {
    id: getId(),
    name: 'bloom',
    npk: { n: 0, p: 5, k: 4 },
    ec: 19.990,
};

const microinput = {
    id: getId(),
    name: 'micro',
    npk: { n: 5, p: 0, k: 1 },
    ec: 19.990
};

const _213Solution = {
  name: '2-1-3 solution',
  id: getId(),
  inputs: [{
    frac: .33,
    solution: microinput
  }, {
    frac: .165,
    solution: bloominput
}, {
    frac: .5,
    solution: {
    id: getId(),
    name: 'green',
    npk: { n: 2, p: 1, k: 6 },
    ec: 19.990
  }}],
  targetNpk: { n: 2, p: 1, k: 3 }
};

const defaultState = {
  recipes: [],
  solutions: [],
};

export function useRecipes() {
  return React.useState<GlobalState['recipes']>(defaultState.recipes);
}

export function useSolutions() {
  return React.useState<GlobalState['solutions']>(defaultState.solutions);
}
