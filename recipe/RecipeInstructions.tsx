import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Recipe } from '../globalState';
import { BucketSizeLabel } from '../components';

type RecipeInstructionsProps = {
  recipe: Recipe;
};

export const RecipeInstructions: React.FC<RecipeInstructionsProps> = ({ recipe: { name, ec, bucketSize, solution } }) => (
  <View>
    <Text>{name}</Text>
    <Text style={styles.label}>e.c.: {ec}</Text>
    <View style={styles.label}><Text>bucket size: </Text><BucketSizeLabel bucketSize={bucketSize} /></View>
    <Text>npk: {solution.targetNpk.n}-{solution.targetNpk.p}-{solution.targetNpk.k}</Text>
    {solution.inputs.map(input => (
      <View style={styles.label}>
        <Text>{input.solution.name}: </Text>
        <Text>{input.frac}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  label: {
    flexDirection: 'row',
  },
});
