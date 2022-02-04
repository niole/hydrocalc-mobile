import * as React from 'react';
import { Text, View } from 'react-native';
import { Solution, BucketSize, SolutionInputMeasurement, Recipe } from '../globalState';
import {
  Tabs,
  Tab,
  ConfirmationModal,
  RemoveButton,
  Section,
  Picker,
  PickerItem,
  Subtitle,
  Title,
  LabelValue,
  NpkLabel,
  BucketSizeLabel,
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

  React.useEffect(() => {
    setRecipe(recipe || getEmptyRecipe());
  }, [recipe]);

  React.useEffect(() => {
    if (!!onChange && editable) {
      const recipeIsNew = JSON.stringify(wipRecipe) !== JSON.stringify(recipe);
      if (recipeIsNew && !!wipRecipe.name && !!wipRecipe.solution && !!wipRecipe.bucketSize && wipRecipe.ec !== undefined) {
        onChange(wipRecipe as Recipe);
      }
    }
  }, [wipRecipe, recipe]);

  const { name, ec, bucketSize, solution } = wipRecipe;
  return (
    <View>
      {canShowInstructions(wipRecipe) && (
        <>
          {editable && canShowInstructions(wipRecipe) && (
            <ConfirmationModal
              onConfirm={() => {
                setRecipe(getEmptyRecipe());
                onChange ? onChange(undefined) : null;
              }}
              Trigger={({ onPress }) => <RemoveButton size="small" onPress={onPress} />}
            >
              <Text>Clear recipe?</Text>
          </ConfirmationModal>
          )}
          {showTitle && <Subtitle>{name}</Subtitle>}
          {ec !== undefined && !!bucketSize && (
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
          )}
          {solution && <LabelValue label="npk" value={<NpkLabel npk={solution?.targetNpk} />} />}
          <LabelValue editable={editable} label="ec (millisiemen/cm)" value={ec} onChangeNumber={newEc => setRecipe({...wipRecipe, ec: newEc })}/>
          <LabelValue
            label="bucket size"
            value={
              editable ? (
                <Tabs defaultKey="volume">
                  <Tab title="Volume" id="volume">
                    <ValidatedVolumeForm onChange={(bucketSize: BucketSize) => setRecipe({...wipRecipe, bucketSize })} />
                  </Tab>
                  <Tab title="Size" id="size">
                    <ValidatedSizeForm onChange={(bucketSize: BucketSize) => setRecipe({...wipRecipe, bucketSize })} />
                  </Tab>
                </Tabs>
              ) : bucketSize ? <BucketSizeLabel bucketSize={bucketSize} /> : null
            }
          />
          <Section/>
        </>
      )}
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

const canShowInstructions = ({ name, ec, bucketSize, solution }: WipRecipe): boolean =>
!!name && !!solution;

const getEmptyRecipe = () => ({ id: Math.random().toString() });
