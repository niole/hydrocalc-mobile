import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Solution, BucketSize, SolutionInputMeasurement, Recipe } from '../globalState';
import { useActionSheet } from '@expo/react-native-action-sheet';
import {
  Doer,
  Section,
  Subtitle,
  Title,
  LabelValue,
  NpkLabel,
  BucketSizeLabel,
  MoreDrawer,
} from '../components';
import { getGallonsFromSize, getInputVolumeInstructions } from './inputCalculator';
import { RecipeSelector } from './RecipeSelector';
import { SolutionInputMeasurementSelect } from './SolutionInputMeasurementSelect';
import { SolutionPicker } from '../solutions/SolutionPicker';

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
      <Doer before={wipRecipe} checker={canWipShowInstructions}>
        {(showableRecipe: ShowableRecipe) => (
          <>
            <View style={styles.titleBar}>
              {showTitle ? <Subtitle>{name}</Subtitle> : <></>}
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
            <Doer before={showableRecipe} checker={recipeIsSaveable}>
              {({ solution, ec, bucketSize }: Recipe) => (
                <>
                  {solution?.inputs.map(input => (
                    <LabelValue
                      key={input.solution.id}
                      label={input.solution.name}
                      value={
                        getInputVolumeInstructions(
                          unit,
                          getGallonsFromSize(bucketSize),
                          input.frac,
                          ec,
                          input.solution.tspsPerGallon1kEC
                        )}
                    />
                  ))}
                  <SolutionInputMeasurementSelect onChange={selectUnit} />
                </>
              )}
            </Doer>
            <LabelValue label="npk" value={<NpkLabel npk={showableRecipe.solution.targetNpk} />} />
            <LabelValue
              editable={editable}
              label="ec (millisiemen/cm)"
              value={ec}
              onChangeNumber={newEc => setRecipe({...showableRecipe, ec: newEc })}
            />
            <LabelValue
              label="bucket size"
              componentValue={
                <BucketSizeLabel
                  editable={editable}
                  bucketSize={bucketSize}
                  onChange={(bucketSize: BucketSize) => setRecipe({...showableRecipe, bucketSize })}
                />
              }
            />
            <Section/>
          </>
        )}
      </Doer>
      {editable && (
        <>
          <Subtitle>Create a Recipe</Subtitle>
          <LabelValue editable={true} value={wipRecipe.name} label="title" onChange={name => setRecipe({...wipRecipe, name })} />
          <SolutionPicker
            solutions={solutions}
            solution={solution}
            onChange={s => setRecipe({ ...wipRecipe, solution: s })}
          />
          {recipes.length > 0 && (
            <>
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

const canWipShowInstructions = ({ name, solution }: WipRecipe): boolean => !!name && !!solution;

const getEmptyRecipe = () => ({ id: Math.random().toString() });

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

