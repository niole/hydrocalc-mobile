import * as React from 'react';
import { Text } from 'react-native';
import { Recipe, Solution } from '../globalState';
import { RecipeInstructions } from './RecipeInstructions';
import { ConfirmationModal, AddButton, Card } from '../components';

/**
 * Renders a provided recipe and allows it to be edited and saved
 * Or renders a WIP recipe and allows it to be created
 *
 * Gives user the ability to save or clear the currently edited recipe
 * When the recipe is done, we submit it through the onChange
 */

type CalculatedRecipeViewProps = {
  defaultRecipe?: Recipe;
  solutions?: Solution[];
  recipes?: Recipe[];
  onChange?: (r?: Recipe) => void;
};

export const CalculatedRecipeView: React.FC<CalculatedRecipeViewProps> = ({
  defaultRecipe,
  recipes,
  solutions,
  onChange,
}) => {
  const [recipe, setRecipe] = React.useState<Recipe | undefined>(defaultRecipe);

  React.useEffect(() => {
    setRecipe(defaultRecipe);
  }, [defaultRecipe]);

  return (
    <Card
      editable={true}
      onChange={() => recipe && onChange ? onChange(recipe) : null}
      ToggleTrigger={SaveConfirmationModal}
    >
      <RecipeInstructions
        editable={true}
        showTitle={true}
        recipe={recipe}
        solutions={solutions}
        recipes={recipes}
        onChange={setRecipe}
      />
    </Card>
  );
};

const SaveConfirmationModal: React.FC<{ onPress?: () => void}> = ({ onPress }) => (
  <ConfirmationModal
    onConfirm={onPress}
    Trigger={({ onPress }) => <AddButton size="big" onPress={onPress} />}
  >
    <Text>Would you like to save your new recipe?</Text>
  </ConfirmationModal>
);

const handleRemove = (setRecipe: (r?: Recipe) => void, onChange?: CalculatedRecipeViewProps['onChange']) => () => {
    setRecipe(undefined);
    onChange ? onChange(undefined) : null;
  };

