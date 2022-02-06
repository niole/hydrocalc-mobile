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

const MyRecipes: React.FC<Props & RootTabScreenProps<'MyRecipes'>> = ({ setRecipes, recipes }) => {
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
            minimizeable={true}
            defaultMinimized={true}
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

export default MyRecipes;
