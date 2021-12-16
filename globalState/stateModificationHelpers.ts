import { SetSolutions, Solution, SetRecipes, Recipe } from '.';

function addSolution(setter: SetSolutions, solutions: Solution[], solution: Solution): void {
  const dupSolutions = solutions.find(s => s.name === solution.name);
  if (!!dupSolutions) {
    throw new Error("This solution's name is already taken.");
  }

  setter([...solutions, solution]);
}

function removeSolution(setter: SetSolutions, solutions: Solution[], solution: Solution): void {
  setter(solutions.filter(s => s.name !== solution.name));
}

function clearSolutions(setter: SetSolutions): void {
  setter([]);
}

function addRecipe(setter: SetRecipes, recipes: Recipe[], recipe: Recipe): void {
  const duprecipes = recipes.find(s => s.name === recipe.name);
  if (!!duprecipes) {
    throw new Error("This recipe's name is already taken.");
  }

  setter([...recipes, recipe]);
}

function removeRecipe(setter: SetRecipes, recipes: Recipe[], recipe: Recipe): void {
  setter(recipes.filter(s => s.name !== recipe.name));
}

function clearRecipe(setter: SetRecipes): void {
  setter([]);
}
