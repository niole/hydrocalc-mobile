import * as React from 'react';
import { SizeUnits, VolumeUnits, GlobalState } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_DATA_KEY = 'hydrocalc-mobile';

const RECIPE_KEY = 'recipes';
const SOLUTIONS_KEY = 'solutions';

/**
 * The global state hooks and default data or data that is read into memory on
 * app start lives in here
 */

const defaultState = {
  recipes: [],
  solutions: [],
};

export function useRecipes() {
  const [state, setState] = React.useState<GlobalState['recipes']>(defaultState.recipes);
  React.useEffect(() => {
    getData(RECIPE_KEY)
    .then(x => setState(x))
    .catch(e => console.error('Failed to get recipe data: ', e));
  }, []);
  React.useEffect(() => {
    storeData(RECIPE_KEY, state)
    .then(x => console.info('stored some recipe data'))
    .catch(e => console.error('Failed to get, parse, or store recipe data: ', e));
  }, [state]);
  return [state, setState];
}

export function useSolutions() {
  const [state, setState] = React.useState<GlobalState['solutions']>(defaultState.solutions);
  React.useEffect(() => {
    getData(SOLUTIONS_KEY)
    .then(x => setState(x))
    .catch(e => console.error('Failed to get solutions data: ', e));
  }, []);

  React.useEffect(() => {
    storeData(SOLUTIONS_KEY, state)
    .then(x => console.info('stored some solution data'))
    .catch(e => console.error('Failed to get, parse, or store solution data: ', e));
  }, [state]);

  return [state, setState];
}

const getData = async (key: string) => {
  const storage = await AsyncStorage.getItem(APP_DATA_KEY);
  if (storage) {
    const storageJson = JSON.parse(storage);

    // @ts-ignore
    return storageJson[key] || defaultState[key];
  }
}

const storeData = async (key: string, value: any) => {
  const storage = await AsyncStorage.getItem(APP_DATA_KEY);
  let storageJson: Object = {};
  if (storage) {
    storageJson = JSON.parse(storage);
  }

  // @ts-ignore
  storageJson[key] = value;
  await AsyncStorage.setItem(APP_DATA_KEY, JSON.stringify(storageJson));
}

