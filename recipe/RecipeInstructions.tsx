import * as React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NPK, VolumeUnits, Solution, BucketSize, SolutionInputMeasurement, Recipe } from '../globalState';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { RECIPE_LIMIT } from '../constants/Limits';
import { formHook } from '../hooks/formHook';
import {
  Modal,
  bucketSizeLabelText,
  EditableText,
  InfoBox,
  Toast,
  Tabs,
  Tab,
  Doer,
  Section,
  Subtitle,
  Title,
  LabelValue,
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
  name?: string;
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
  showTitle = false,
  editable = false,
  recipes = [],
  solutions = [],
}) => {
  const solutionPickerRef = React.useRef();
  const [unit, selectUnit] = React.useState<SolutionInputMeasurement>(SolutionInputMeasurement.Cup);
  const { showActionSheetWithOptions } = useActionSheet();
  const [formState, setRecipe] = formHook<WipRecipe, Recipe>(getEmptyRecipe(), wipRecipe => ({
    id: !wipRecipe.id ? { kind: 'error', message: 'Needs an id' } : undefined,
    name: wipRecipe.name === undefined ? { kind: 'error', message: 'Recipe name is required' } : undefined,
    solution: !wipRecipe.solution ? { kind: 'error', message: 'Pick a solution' } : undefined,
    bucketSize: !wipRecipe.bucketSize ? { kind: 'error', message: 'Picka bucket size' } : undefined,
    ec: !wipRecipe.ec ? { kind: 'error', message: 'Set an ec' } : undefined,
  }));
  const [showTitleModal, setShowTitleModal] = React.useState<boolean>(false);
  const wipRecipe = formState.state;
  const { name, ec, bucketSize, solution } = wipRecipe;
  const isExistingRecipe = !!recipes.find(r => r.id === wipRecipe.id);

  React.useEffect(() => {
    setRecipe(recipe || getEmptyRecipe());
  }, [recipe]);

  const onChangeValidation = (recipe: WipRecipe) => {
    if (onChange) {
      if (recipes.length < RECIPE_LIMIT) {
        if (formState.submittable) {
          onChange(formState.submittable);
        } else {
          const errorValues = Object.values(formState.validationState).filter(x => !!x);
          console.log(formState.validationState);
          if (errorValues.length === 1 && formState.validationState.name !== undefined) {
            // just don't have name
            setShowTitleModal(true);
          } else {
            // don't have lots of things
            const errorMessage = errorValues
            .map(x => x?.message)
            .join('. ');
            Toast.error(`Looks like you missed some things: ${errorMessage}`);
          }
        }
      } else {
        Toast.error(
          `Can't create recipe ${recipe.name}. You have already reached our limit of ${RECIPE_LIMIT} recipes.`,
        );
      }
    }
  };

  return (
    <View>
      <Modal
        show={showTitleModal}
        onCancel={() => setShowTitleModal(false)}
        onSubmit={() => {
          setShowTitleModal(false);
          onChangeValidation(wipRecipe);
        }}
      >
          <LabelValue
            editable={true}
            label="title"
            onChange={title => setRecipe({...wipRecipe, name: title })}
          />
      </Modal>
      {editable && (
        <View style={styles.titleBar}>
          {isExistingRecipe ? <Title>Edit Recipe</Title> : <Title>Create a Recipe</Title>}
            <MoreDrawer
              options={[
                { label: 'Cancel' },
                {
                  label: 'Clear',
                  action: () => {
                    setRecipe(getEmptyRecipe());
                    onChange ? onChange(undefined) : null;
                  }
                },
                {
                  label: 'Save',
                  action: () => onChangeValidation(wipRecipe),
                },
              ]}
              cancelButtonIndex={0}
              destructiveButtonIndex={1}
            />
        </View>
      )}
      {(showTitle || (editable && isExistingRecipe)) && (
            <EditableTitle
              onChange={name => setRecipe({...wipRecipe, name })}
              editable={editable}
            >
              {name}
            </EditableTitle>
        )}
        {editable && (
          <SolutionPicker
            pickerRef={solutionPickerRef}
            solutions={solutions}
            solution={solution}
            onChange={s => setRecipe({ ...wipRecipe, solution: s })}
          />)}
      <Section>
        <Subtitle>Instructions</Subtitle>
          {!recipeIsRenderable(wipRecipe) && (
            <InfoBox onPress={() => solutionPickerRef.current?.focus()}>
              Pick a solution to get started.
            </InfoBox>
          )}
          <Doer before={wipRecipe} checker={recipeIsRenderable}>
            {({ solution, ec, bucketSize }: ShowableRecipe) => (
              <>
                <Section>
                      <View style={{marginBottom: 16, marginLeft:10, flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={[styles.readableText, {marginBottom: 3}]}>This recipe creates </Text>
                        <EditableText initialText={bucketSizeLabelText(bucketSize)} style={[styles.bold, styles.readableText]} getText={bucketSizeLabelText} editable={true} onChange={bucketSize => setRecipe({ ...wipRecipe, bucketSize })}>{onChange => <BucketSizeLabel onChange={onChange} editable={true} fontSize={18} bucketSize={bucketSize} />}</EditableText>
                        <Text style={[styles.readableText, {marginBottom: 3}]}> of nutrient solution with an e.c. of </Text>
                          <EditableText
                            initialText={`${ec} millisiemens/cm`}
                            style={[styles.bold, styles.readableText]}
                            editable={true}
                            getText={x => `${x} millisiemens/cm`}
                            onChange={(ec: number) => setRecipe({...wipRecipe, ec })}
                          >
                            {onChange => <LabelValue label="ec (millisiemens/cm)" value={ec} onChangeNumber={onChange} editable={true} />}
                          </EditableText>
                          <Text style={[styles.readableText, {marginBottom: 3}]}> and a N-P-K ratio of {solution.targetNpk.n}-{solution.targetNpk.p}-{solution.targetNpk.k}</Text>
                      </View>
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
      validation={t => !t ? ({ kind: 'info', message: 'Please give your recipe a title.' }) : undefined}
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

const recipeIsRenderable = ({ ec, bucketSize, solution }: WipRecipe): boolean =>
!!solution && ec !== undefined && bucketSize !== undefined;

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
