import * as React from 'react';
import { SizeUnits, VolumeUnits, GlobalState } from './types';

/**
 * The global state hooks and default data or data that is read into memory on
 * app start lives in here
 */

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
