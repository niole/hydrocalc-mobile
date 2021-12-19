import * as React from 'react';
import { Text, View } from 'react-native';
import { Recipe } from '../globalState';
import { BucketSizeLabel } from '../components';

type RecipeInstructionsProps = {
  recipe: Recipe;
};

export const RecipeInstructions: React.FC<RecipeInstructionsProps> = ({ recipe: { name, ec, bucketSize, solution } }) => (
  <View>
    <Text>{name}</Text>
    <Text>e.c.: {ec}</Text>
    <Text>bucket size: </Text><BucketSizeLabel bucketSize={bucketSize} />
    <Text>npk: {solution.targetNpk.n}-{solution.targetNpk.p}-{solution.targetNpk.k}</Text>
    {solution.inputs.map(input => (
      <View>
        <Text>{input.solution.name}</Text>
        <Text>{input.frac}</Text>
      </View>
    ))}
  </View>
);
