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
  id: string;
  name: string;
  solution: Solution;
  bucketSize: BucketSize;
  ec: number;
};

export type NPK = { n: number, p: number, k: number };

export type Brand = {
  name: string;
  site: string;
  imageUrl?: string;
  referralLinks: string[];
};

export type SolutionInput = {
  id: string;
  name: string;
  brand?: Brand;
  npk: NPK;
  tspsPerGallon1kEC: number;
};

export type FractionalInput = {
  solution: SolutionInput;
  frac: number;
};

export type Solution = {
  id: string;
  name: string;
  inputs: FractionalInput[];
  targetNpk: NPK;
  brand?: Brand;
};

export type GlobalState = {
  recipes: Recipe[];
  solutions: Solution[];
};

export type SetRecipes = (rs: Recipe[]) => void;

export type SetSolutions = (rs: Solution[]) => void;

