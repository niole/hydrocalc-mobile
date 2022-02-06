import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { VolumeUnits, Solution, BucketSize, SolutionInputMeasurement, Recipe } from '../globalState';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { RECIPE_LIMIT } from '../constants/Limits';
import {
  Toast,
  Tabs,
  Tab,
  Doer,
  Section,
  Subtitle,
  Title,
  LabelValue,
  NpkLabel,
  BucketSizeLabel,
  MoreDrawer,
  Annotation,
} from '../components';
import { getGallonsFromSize, getInputVolumeInstructions } from './inputCalculator';
import { RecipeSelector } from './RecipeSelector';
import { SolutionInputMeasurementSelect } from './SolutionInputMeasurementSelect';
import { SolutionPicker } from '../solutions/SolutionPicker';

type WipRecipe = {
  id: string;
  name?: string;
  solution?: Solution;
  bucketSize: BucketSize;
  ec: number;
};

type ShowableRecipe = {
  id: string;
  name: string;
  solution: Solution;
  bucketSize: BucketSize;
  ec: number;
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

  const onChangeValidation = (recipe: Recipe) => {
    if (onChange) {
      if (recipes.length < RECIPE_LIMIT) {
        onChange(recipe);
      } else {
        Toast.error(
          `Can't create recipe ${recipe.name}. You have already reached our limit of ${RECIPE_LIMIT} recipes.`,
        );
      }
    }
  };

  const { name, ec, bucketSize, solution } = wipRecipe;
  const isExistingRecipe = !!recipes.find(r => r.id === wipRecipe.id);
  return (
    <View>
      {editable && <Title>{isExistingRecipe ? 'Edit Recipe' : 'Create a Recipe'}</Title>}
        <View style={styles.titleBar}>
          {showTitle ? (
            <EditableTitle
              onChange={name => setRecipe({...wipRecipe, name })}
              editable={editable}
            >
              {name}
            </EditableTitle>
          ) : <></>}
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
                action: () => onChangeValidation(wipRecipe as Recipe),
              }] : []),
            ]}
            cancelButtonIndex={0}
            destructiveButtonIndex={1}
          />}
        </View>
      <Section>
        <Tabs defaultKey="instructions">
          <Tab title="instructions" id="instructions">
            <Doer before={wipRecipe} checker={recipeIsSaveable}>
              {({ solution, ec, bucketSize }: Recipe) => (
                <>
                  <Section>
                        <View style={{marginBottom: 16, marginLeft:10}}>
                          <Annotation>Change npk, bucket size, and e.c. in the Recipe Inputs section.</Annotation>
                          <Text style={[styles.readableText, {marginBottom: 3}]}>This recipe creates <Text style={styles.bold}><BucketSizeLabel fontSize={18} bucketSize={bucketSize} /></Text> of nutrient solution with an e.c. of <Text style={styles.bold}>{ec}</Text> millisiemens/cm and a N-P-K ratio of <Text style={styles.bold}>{solution.targetNpk.n}-{solution.targetNpk.p}-{solution.targetNpk.k}</Text>.</Text>
                          </View>
                        <Subtitle>Instructions</Subtitle>
                        <Text style={[styles.readableText, { marginBottom: 3, marginLeft:10}]}>1. Fill a bucket with <BucketSizeLabel fontSize={18} bucketSize={bucketSize} /> of water.</Text>
                        <Text style={[styles.readableText, { marginBottom: 3, marginLeft:10}]}>2. Add the following nutrients:</Text>
                      <Section>
                      {solution?.inputs.map(input => (
                        <View key={input.solution.id} style={{ marginBottom: 3, marginLeft:20}}>
                          <Text style={styles.readableText}>
                            {getInputVolumeInstructions(
                              unit,
                              getGallonsFromSize(bucketSize),
                              input.frac,
                              ec,
                              input.solution.tspsPerGallon1kEC
                            )} of </Text><Text style={[styles.bold, styles.readableText]}>{input.solution.name}</Text>
                        </View>
                      ))}
                      </Section>
                      <SolutionInputMeasurementSelect onChange={selectUnit} />
                  </Section>
                </>
              )}
            </Doer>
            {editable && (
              <SolutionPicker
              solutions={solutions}
              solution={solution}
              onChange={s => setRecipe({ ...wipRecipe, solution: s })}
            />)}
          </Tab>
          <Tab title="recipe inputs" id="inputs">
            {editable && (
              <SolutionPicker
              solutions={solutions}
              solution={solution}
              onChange={s => setRecipe({ ...wipRecipe, solution: s })}
              />)}
            <Doer before={wipRecipe} checker={recipeIsSaveable}>
              {(showableRecipe: Recipe) => (
                <>
                  <LabelValue label="npk" value={<NpkLabel npk={showableRecipe.solution.targetNpk} />} />
                  <LabelValue
                    editable={true}
                    label="ec (millisiemen/cm)"
                    value={ec}
                    onChangeNumber={newEc => setRecipe({...showableRecipe, ec: newEc })}
                  />
                  <LabelValue
                    label="bucket size"
                    componentValue={
                      <BucketSizeLabel
                        editable={true}
                        bucketSize={bucketSize}
                        onChange={(bucketSize: BucketSize) => setRecipe({...showableRecipe, bucketSize })}
                      />
                    }
                  />
              </>
            )}
          </Doer>
        </Tab>
      </Tabs>
    </Section>
    {showRecipePicker(editable, recipes.length) && (
      <Section bordered={true} topOnly={true}>
        <View style={{ marginTop: 7}}>
          <Title>Pick a Recipe</Title>
          <RecipeSelector
            recipes={recipes}
            selectedRecipeId={wipRecipe?.id}
            onChange={r => setRecipe(r || getEmptyRecipe())}
          />
        </View>
      </Section>
    )}
  </View>
);
};

  const EditableTitle: React.FC<{ editable?: boolean, children?: string, onChange?: (t: string) => void }> = ({
    editable = false,
    children,
    onChange,
  }) => editable ? (
    <LabelValue
      validateOnMount={true}
      validation={t => !t ? ({ kind: 'info', message: 'Recipe title is required' }) : undefined}
      editable={true}
      value={children}
      label="title"
      onChange={onChange}
    />
  ) : (
    <Subtitle>{children}</Subtitle>
  );

const handleSetSolution = (setSolution: (s?: Solution) => void, solutions: Solution[]) => (solutionName?: string) => {
  setSolution(solutions.find(s => s.name === solutionName));
};

const recipeIsSaveable = ({ name, ec, bucketSize, solution }: WipRecipe): boolean =>
!!name && !!solution && ec !== undefined && bucketSize !== undefined;

const canWipShowInstructions = ({ solution }: WipRecipe): boolean => !!solution;

const getEmptyRecipe = () => ({
  id: Math.random().toString(),
  ec: 1,
  bucketSize: { volume: { total: 20, unit: VolumeUnits.Gallon}}
});

const showRecipePicker = (editable: boolean, recipeCount: number) =>  editable && recipeCount > 0;

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bold: {
    fontWeight: 'bold'
  },
  readableText: {
    fontSize: 18,
  },
  centeredText: {
    textAlign: 'center',
  },
});
