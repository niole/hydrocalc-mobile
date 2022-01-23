import * as React from 'react';
import { Text, View } from 'react-native';
import { SolutionInputMeasurement, Recipe } from '../globalState';
import { Subtitle, LabelValue, NpkLabel, BucketSizeLabel } from '../components';
import { getGallonsFromSize, getInputVolumeInstructions } from './inputCalculator';

/**
 * Renders a recipe so that a user can follow the recipe, know what recipe they are looking at, know what
 * the recipe creates, i.e. a 16 gallon bucket with ec 1.1 millisiemens/cm with npk 213.
 */
type RecipeInstructionsProps = {
  showTitle?: boolean;
  recipe: Recipe;
};

export const RecipeInstructions: React.FC<RecipeInstructionsProps> = ({
  showTitle = true,
  recipe: { name, ec, bucketSize, solution }
}) => (
  <View>
    {showTitle && <Subtitle>{name}</Subtitle>}
    <LabelValue label="ec" value={`${ec} millisiemen/cm`} />
    <LabelValue label="bucket size" value={<BucketSizeLabel bucketSize={bucketSize} />} />
    <LabelValue label="npk" value={<NpkLabel npk={solution.targetNpk} />} />
    {solution.inputs.map(input => (
      <LabelValue key={input.solution.id} label={input.solution.name} value={getInputVolumeInstructions(SolutionInputMeasurement.Cup, getGallonsFromSize(bucketSize), input.frac, ec)} />
    ))}
  </View>
);
