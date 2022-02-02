import * as React from 'react';
import { Text, View } from 'react-native';
import { Solution, BucketSize, SolutionInputMeasurement, Recipe } from '../globalState';
import { Tabs, Tab, Section, Picker, PickerItem, Subtitle, LabelValue, NpkLabel, BucketSizeLabel } from '../components';
import { ValidatedSizeForm } from '../components/ValidatedSizeForm';
import { ValidatedVolumeForm } from '../components/ValidatedVolumeForm';
import { getGallonsFromSize, getInputVolumeInstructions } from './inputCalculator';
import { RecipeSelector } from './RecipeSelector';

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
  onChange?: (r: Recipe) => void;
  recipes?: Recipe[];
  solutions?: Solution[];
};

export const RecipeInstructions: React.FC<RecipeInstructionsProps> = ({
  recipe,
  onChange,
  showTitle = true, // TODO???
  editable = false,
  recipes = [],
  solutions = [],
}) => {
  const [unit, selectUnit] = React.useState<SolutionInputMeasurement>(SolutionInputMeasurement.Cup);
  const [wipRecipe, setRecipe] = React.useState<WipRecipe>(recipe || { id: Math.random().toString()});

  React.useEffect(() => {
    if (!!onChange && editable) {
      const recipeIsNew = JSON.stringify(wipRecipe) !== JSON.stringify(recipe);
      if (recipeIsNew && !!wipRecipe.name && !!wipRecipe.solution && !!wipRecipe.bucketSize &&  !!wipRecipe.ec) {
        onChange(wipRecipe as Recipe);
      }
    }
  }, [wipRecipe]);

  const { name, ec, bucketSize, solution } = wipRecipe;
  return (
    <View>
      {showTitle && <Subtitle>{name}</Subtitle>}
      {editable && <LabelValue editable={true} label="title" onChange={name => setRecipe({...wipRecipe, name })} /> }

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
        {!!solution && !!bucketSize && ec !== undefined ? solution.inputs.map(input => (
          <LabelValue
            key={input.solution.id}
            label={input.solution.name}
            value={getInputVolumeInstructions(unit, getGallonsFromSize(bucketSize), input.frac, ec)}
          />
        )) : null}
    </Section>
      {editable && <Picker onValueChange={handleSetSolution(s => setRecipe({ ...wipRecipe, solution: s }), solutions)} selectedValue={solution?.name}>
        <PickerItem key="none" label="Pick a solution" value={undefined} />
        {solutions.map(s => <PickerItem key={s.id} label={s.name} value={s.name}/>)}
      </Picker>}
      <LabelValue editable={editable} label="ec (millisiemen/cm)" value={ec} onChangeNumber={newEc => setRecipe({...wipRecipe, ec: newEc })}/>
      <LabelValue label="bucket size" value={
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
        } />
      {solution && <LabelValue label="npk" value={<NpkLabel npk={solution?.targetNpk} />} />}
      {editable && <Section>
        <RecipeSelector
          recipes={recipes}
          selectedRecipeId={wipRecipe?.id}
          onChange={r => setRecipe(r || { id: Math.random().toString()})}
        />
      </Section>}
    </View>
  );
};

const handleSetSolution = (setSolution: (s?: Solution) => void, solutions: Solution[]) => (solutionName?: string) => {
  setSolution(solutions.find(s => s.name === solutionName));
};

