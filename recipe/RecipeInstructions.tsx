import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Solution, BucketSize, SolutionInputMeasurement, Recipe } from '../globalState';
import { useActionSheet } from '@expo/react-native-action-sheet';
import {
  Tabs,
  Tab,
  Section,
  Picker,
  PickerItem,
  Subtitle,
  Title,
  LabelValue,
  NpkLabel,
  BucketSizeLabel,
  MoreDrawer,
} from '../components';
import { ValidatedSizeForm } from '../components/ValidatedSizeForm';
import { ValidatedVolumeForm } from '../components/ValidatedVolumeForm';
import { getGallonsFromSize, getInputVolumeInstructions } from './inputCalculator';
import { RecipeSelector } from './RecipeSelector';
import { SolutionInputMeasurementSelect } from './SolutionInputMeasurementSelect';

type WipRecipe = {
  id: string;
  name?: string;
  solution?: Solution;
  bucketSize?: BucketSize;
  ec?: number;
};

type ShowableRecipe = {
  id: string;
  name: string;
  solution: Solution;
  bucketSize?: BucketSize;
  ec?: number;
};

/**
 * Renders a recipe so that a user can follow the recipe, know what recipe they are looking at, know what
 * the recipe creates, i.e. a 16 gallon bucket with ec 1.1 millisiemens/cm with npk 213.
 */
type RecipeInstructionsProps = {
  showTitle?: boolean;
  recipe?: Recipe;
  editable?: boolean;
  onChange?: (r?: Recipe) => void;
  recipes?: Recipe[];
  solutions?: Solution[];
};

export const RecipeInstructions: React.FC<RecipeInstructionsProps> = ({
  recipe,
  onChange,
  showTitle = true,
  editable = false,
  recipes = [],
  solutions = [],
}) => {
  const [unit, selectUnit] = React.useState<SolutionInputMeasurement>(SolutionInputMeasurement.Cup);
  const [wipRecipe, setRecipe] = React.useState<WipRecipe>(recipe || getEmptyRecipe());
  const { showActionSheetWithOptions } = useActionSheet();

  React.useEffect(() => {
    setRecipe(recipe || getEmptyRecipe());
  }, [recipe]);

  const { name, ec, bucketSize, solution } = wipRecipe;
  return (
    <View>
      {doer<WipRecipe, ShowableRecipe, React.ReactNode>(wipRecipe, null, canWipShowInstructions, showableRecipe => (
        <>
          <View style={styles.titleBar}>
            {showTitle && <Subtitle>{name}</Subtitle>}
            {editable && <MoreDrawer
              options={[
                { label: 'Cancel' },
                {
                  label: 'Clear',
                  action: () => {
                    setRecipe(getEmptyRecipe());
                    onChange ? onChange(undefined) : null;
                  }
                },
                ...(recipeIsSaveable(wipRecipe) ? [{
                  label: 'Save',
                  action: () => onChange ? onChange(showableRecipe as Recipe) : null,
                }] : []),
              ]}
              cancelButtonIndex={0}
              destructiveButtonIndex={1}
            />}
          </View>
          {doer<ShowableRecipe, Recipe, React.ReactNode>(showableRecipe, null, recipeIsSaveable, ({ solution, ec, bucketSize }) => (
            <>
              {solution?.inputs.map(input => (
                <LabelValue
                  key={input.solution.id}
                  label={input.solution.name}
                  value={getInputVolumeInstructions(unit, getGallonsFromSize(bucketSize), input.frac, ec)}
                />
              ))}
              <SolutionInputMeasurementSelect onChange={selectUnit} />
            </>
          ))}
          <LabelValue label="npk" value={<NpkLabel npk={showableRecipe.solution.targetNpk} />} />
          <LabelValue editable={editable} label="ec (millisiemen/cm)" value={ec} onChangeNumber={newEc => setRecipe({...showableRecipe, ec: newEc })}/>
          <LabelValue
            label="bucket size"
            value={
              editable ? (
                <Tabs defaultKey="volume">
                  <Tab title="Volume" id="volume">
                    <ValidatedVolumeForm onChange={(bucketSize: BucketSize) => setRecipe({...showableRecipe, bucketSize })} />
                  </Tab>
                  <Tab title="Size" id="size">
                    <ValidatedSizeForm onChange={(bucketSize: BucketSize) => setRecipe({...showableRecipe, bucketSize })} />
                  </Tab>
                </Tabs>
              ) : bucketSize ? <BucketSizeLabel bucketSize={bucketSize} /> : null
            }
          />
          <Section/>
        </>
      ))}
      {editable && (
        <>
          <Subtitle>Create a Recipe</Subtitle>
          <LabelValue editable={true} value={wipRecipe.name} label="title" onChange={name => setRecipe({...wipRecipe, name })} />
          <Picker label="solution" onValueChange={handleSetSolution(s => setRecipe({ ...wipRecipe, solution: s }), solutions)} selectedValue={solution?.name}>
            <PickerItem key="none" label="None selected" value={undefined} />
            {solutions.map(s => <PickerItem key={s.id} label={s.name} value={s.name}/>)}
          </Picker>
          <Section>
            <Text>OR</Text>
          </Section>
          <Section>
            <Subtitle>Pick a Recipe</Subtitle>
            <RecipeSelector
              recipes={recipes}
              selectedRecipeId={wipRecipe?.id}
              onChange={r => setRecipe(r || { id: Math.random().toString()})}
            />
          </Section>
        </>
      )}
    </View>
  );
};

const handleSetSolution = (setSolution: (s?: Solution) => void, solutions: Solution[]) => (solutionName?: string) => {
  setSolution(solutions.find(s => s.name === solutionName));
};

const recipeIsSaveable = ({ name, ec, bucketSize, solution }: WipRecipe): boolean =>
!!name && !!solution && ec !== undefined && bucketSize !== undefined;

function doer<B, A extends B, R>(
  before: B,
  defaultV: R,
  checker: (before: B) => boolean,
  action: (after: A) => R
): R {
  if (checker(before)) {
    return action(before as A);
  }
  return defaultV;
}

const canWipShowInstructions = ({ name, solution }: WipRecipe): boolean => !!name && !!solution;

const getEmptyRecipe = () => ({ id: Math.random().toString() });

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

