import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SolutionInputMeasurement, Recipe } from '../globalState';
import { NpkLabel, BucketSizeLabel } from '../components';
import { getGallonsFromSize, getInputVolumeInstructions } from './inputCalculator';

/**
 * Renders a recipe so that a user can follow the recipe, know what recipe they are looking at, know what
 * the recipe creates, i.e. a 16 gallon bucket with ec 1.1 millisiemens/cm with npk 213.
 */
type RecipeInstructionsProps = {
  recipe: Recipe;
};

export const RecipeInstructions: React.FC<RecipeInstructionsProps> = ({ recipe: { name, ec, bucketSize, solution } }) => (
  <View>
    <Text>{name}</Text>
    <Text style={styles.label}>e.c.: {ec} millisiemen/cm</Text>
    <View style={styles.label}><Text>bucket size: </Text><BucketSizeLabel bucketSize={bucketSize} /></View>
    <Text>npk: </Text> <NpkLabel npk={solution.targetNpk} />
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
