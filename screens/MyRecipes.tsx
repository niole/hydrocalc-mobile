import * as React from 'react';
import { Text } from 'react-native';
import { removeRecipe, SetRecipes, Recipe } from '../globalState';
import { FlatList, Card, InfoBox } from '../components';
import { RootTabScreenProps } from '../types';
import { Screen } from './Screen';
import { RecipeInstructions } from '../recipe/RecipeInstructions';

type Props = {
  recipes: Recipe[];
  setRecipes: SetRecipes;
};

export default function MyRecipes({ setRecipes, recipes }: RootTabScreenProps<'MyRecipes'> & Props) {
  return (
    <Screen title="my recipes">
      {recipes.length === 0 ? (
        <InfoBox title="No recipes yet.">
          Create a recipe in the Calculator tab.
        </InfoBox>
      ) : <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <Card
            title={item.name}
            onRemove={() => removeRecipe(setRecipes, recipes, item)}
          >
            <RecipeInstructions showTitle={false} key={item.id} recipe={item} />
          </Card>
        )}
      />}
    </Screen>
  );
}
