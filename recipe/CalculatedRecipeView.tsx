import * as React from 'react';
import { Text } from 'react-native';
import { Recipe } from '../globalState';
import { RecipeInstructions } from './RecipeInstructions';
import { Card } from '../components';

/**
 * Renders a provided recipe
 */

type CalculatedRecipeViewProps = {
  defaultRecipe?: Recipe;
};

export const CalculatedRecipeView: React.FC<CalculatedRecipeViewProps> = ({ defaultRecipe }) => {
  return (
    <Card editable={false}>
      {defaultRecipe ? <RecipeInstructions recipe={defaultRecipe} /> : <Text>...</Text>}
    </Card>
  );
};
