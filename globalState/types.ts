export type SizeUnits = 'cm' | 'inch';

export type VolumeUnits = 'gallon' | 'liter' | 'ounce' | 'ml';

export type LWH = {
  length: number;
  width: number;
  height: number;
  units: SizeUnits;
}

export type Volume = {
  total: number;
  units: VolumeUnits;
};

export type BucketSize = {
  volume?: Volume;
  lwh?: LWH;
};

export type Recipe = {
  name: string;
  solution: Solution;
  bucketSize: BucketSize;
  ec: number;
};

export type NPK = { n: number, p: number, k: number };

export type SolutionInput = {
  name: string;
  brand: string;
  npk: NPK;
  ec: number;
};

export type Solution = {
  name: string;
  inputs: SolutionInput[];
  targetNpk: NPK;
};

export type GlobalState = {
  recipes: Recipe[];
  solutions: Solution[];
};

export type SetRecipes = (rs: Recipe[]) => void;

export type SetSolutions = (rs: Solution[]) => void;

