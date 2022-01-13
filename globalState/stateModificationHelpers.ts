import { SetSolutions, Solution, SetRecipes, Recipe } from '.';

export function addSolution(setter: SetSolutions, solutions: Solution[], solution: Solution): void {
  const dupSolutions = solutions.find(s => s.id === solution.id);
  if (!!dupSolutions) {
    throw new Error("This solution's id is already taken.");
  }

  setter([...solutions, solution]);
}

export const removeSolution = (setter: SetSolutions, solutions: Solution[]) => (solution: Solution): void => {
  setter(solutions.filter(s => s.id !== solution.id));
}

function clearSolutions(setter: SetSolutions): void {
  setter([]);
}

export const updateSolution = (setter: SetSolutions, solutions: Solution[]) => (solution: Solution): void  => {
  const oldSolutionIndex = solutions.findIndex(s => s.id === solution.id);
  if (oldSolutionIndex === -1) {
    addSolution(setter, solutions, solution);
  } else {
    solutions[oldSolutionIndex] = solution;
    setter(solutions);
  }
}

export const addRecipe = (setter: SetRecipes, recipes: Recipe[]) => (recipe: Recipe): void => {
  const duprecipes = recipes.find(s => s.id === recipe.id);
  if (!!duprecipes) {
    throw new Error("This recipe's id is already taken.");
  }

  setter([...recipes, recipe]);
}

export function removeRecipe(setter: SetRecipes, recipes: Recipe[], recipe: Recipe): void {
  setter(recipes.filter(s => s.id !== recipe.id));
}

function clearRecipe(setter: SetRecipes): void {
  setter([]);
}
