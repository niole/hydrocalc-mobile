import * as React from 'react';
import { Text } from 'react-native';
import { Recipe, Solution } from '../globalState';
import { RecipeInstructions } from './RecipeInstructions';
import { Card } from '../components';

/**
 * Renders a provided recipe
 */

type CalculatedRecipeViewProps = {
  defaultRecipe?: Recipe;
  solutions?: Solution[];
  recipes?: Recipe[];
};

export const CalculatedRecipeView: React.FC<CalculatedRecipeViewProps> = ({ defaultRecipe, recipes, solutions }) => {
  return (
    <Card editable={false} title={defaultRecipe ? `Edit Recipe for ${defaultRecipe.name}` : 'Create New Recipe'}>
      <RecipeInstructions editable={true} showTitle={false} recipe={defaultRecipe} solutions={solutions} recipes={recipes}/>
    </Card>
  );
};
