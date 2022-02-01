import * as React from 'react';
import { Text, View } from 'react-native';
import { SolutionInputMeasurement, Recipe } from '../globalState';
import { Section, Picker, PickerItem, Subtitle, LabelValue, NpkLabel, BucketSizeLabel } from '../components';
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
}) => {
  const [unit, selectUnit] = React.useState<SolutionInputMeasurement>(SolutionInputMeasurement.Cup);
  return (
    <View>
      {showTitle && <Subtitle>recipe for {name}</Subtitle>}
      <Section>
        <Picker selectedValue={unit} onValueChange={s => selectUnit(s as number)}>
          <PickerItem
            label={SolutionInputMeasurement[SolutionInputMeasurement.Liter]}
            value={SolutionInputMeasurement.Liter}
          />
          <PickerItem
            label={SolutionInputMeasurement[SolutionInputMeasurement.Cup]}
            value={SolutionInputMeasurement.Cup}
          />
          <PickerItem
            label={SolutionInputMeasurement[SolutionInputMeasurement.FluidOunce]}
            value={SolutionInputMeasurement.FluidOunce}
          />
        </Picker>
        {solution.inputs.map(input => (
          <LabelValue
            key={input.solution.id}
            label={input.solution.name}
            value={getInputVolumeInstructions(unit, getGallonsFromSize(bucketSize), input.frac, ec)}
          />
        ))}
      </Section>
      <LabelValue label="ec" value={`${ec} millisiemen/cm`} />
      <LabelValue label="bucket size" value={<BucketSizeLabel bucketSize={bucketSize} />} />
      <LabelValue label="npk" value={<NpkLabel npk={solution.targetNpk} />} />
    </View>
  );
};
