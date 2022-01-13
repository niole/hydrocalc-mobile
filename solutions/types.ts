import { FractionalInput, NPK } from '../globalState';

export type NewSolution = {
  id: string;
  name?: string;
  inputs?: FractionalInput[];
  targetNpk?: NPK;
};

