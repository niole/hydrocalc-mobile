export enum SolutionInputMeasurement { Liter, Cup, FluidOunce };

export enum SizeUnits { CM, Inch };

export enum VolumeUnits { Gallon, Liter, Ounce, ML };

export type LWH = {
  length: number;
  width: number;
  height: number;
  unit: SizeUnits;
}

export type Volume = {
  total: number;
  unit: VolumeUnits;
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

export type FractionalInput = {
  solution: SolutionInput;
  frac: number;
};

export type Solution = {
  name: string;
  inputs: FractionalInput[];
  targetNpk: NPK;
};

export type GlobalState = {
  recipes: Recipe[];
  solutions: Solution[];
};

export type SetRecipes = (rs: Recipe[]) => void;

export type SetSolutions = (rs: Solution[]) => void;

