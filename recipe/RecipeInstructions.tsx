import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SolutionInputMeasurement, Recipe } from '../globalState';
import { BucketSizeLabel } from '../components';
import { getGallonsFromSize, getInputVolumeInstructions } from './inputCalculator';

type RecipeInstructionsProps = {
  recipe: Recipe;
};

export const RecipeInstructions: React.FC<RecipeInstructionsProps> = ({ recipe: { name, ec, bucketSize, solution } }) => (
  <View>
    <Text>{name}</Text>
    <Text style={styles.label}>e.c.: {ec} millisiemen/cm</Text>
    <View style={styles.label}><Text>bucket size: </Text><BucketSizeLabel bucketSize={bucketSize} /></View>
    <Text>npk: {solution.targetNpk.n}-{solution.targetNpk.p}-{solution.targetNpk.k}</Text>
    {solution.inputs.map(input => (
      <View style={styles.label}>
        <Text>{input.solution.name}: </Text>
        <Text>{getInputVolumeInstructions(SolutionInputMeasurement.Cup, getGallonsFromSize(bucketSize), input.frac, ec)}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  label: {
    flexDirection: 'row',
  },
});
