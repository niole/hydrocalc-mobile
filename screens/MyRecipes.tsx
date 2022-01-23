import * as React from 'react';
import { Text } from 'react-native';
import { removeRecipe, SetRecipes, Recipe } from '../globalState';
import { FlatList, Card } from '../components';
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
      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <Card
            removeConfirmationMsg={<Text>{`Are you sure you want to remove recipe, ${item.name}?`}</Text>}
            title={item.name}
            onRemove={() => removeRecipe(setRecipes, recipes, item)}
          >
            <RecipeInstructions showTitle={false} key={item.id} recipe={item} />
          </Card>
        )}
      />
    </Screen>
  );
}
