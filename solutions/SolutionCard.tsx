import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SolutionInput, FractionalInput, NPK, Solution } from '../globalState';
import { Annotation, ValidatedTextInput, Title, Section, NpkLabel, LabelValue, Card } from '../components';
import { EditableInputCard } from './EditableInputCard';
import { updateInputProportions } from '../recipe/inputCalculator';
import { SolutionInputPicker } from './SolutionInputPicker';


type Props = {
  solutions?: Solution[];
  solution: Solution;
  onChange: (solution: Solution) => void;
  onRemove: (solution?: Solution) => void;
  editable?: boolean;
};

export const SolutionCard: React.FC<Props> = ({
  solution,
  onChange,
  onRemove,
  editable = false,
  solutions = [],
}) => {
  const [newSolution, setNewSolution] = React.useState<Solution>(solution);
  const [editing, setEditing] = React.useState<boolean>(editable);

  React.useEffect(() => {
    setEditing(editable);
  }, [editable]);

  const handleEdit = () => {
    if (editing) {
      if (!!newSolution.name && !!newSolution.inputs && !!newSolution.targetNpk) {
        // submit changed solution
        setEditing(false);
        onChange(newSolution as Solution);
        console.info('Submitted updated solution');
      } else {
        // reset old solution
        setEditing(false);
        setNewSolution(solution);
        console.info('Solution was incomplete. Not submitting updated solution');
      }
    } else {
      setEditing(true);
    }
  };

  const handleEditSolutionNpk = (targetNpk: NPK) => {
    setNewSolution(updateInputProportions({...newSolution, targetNpk}));
  };
  return (
    <Card
      minimizeable={!editing}
      defaultMinimized={!editing}
      title={!editing ? newSolution.name : undefined }
      titleElement={editing ? (
        <LabelValue
            label="solution name"
            value={newSolution.name}
            editable={true}
            onChange={name => setNewSolution({ ...newSolution, name })}
          />
        ) : undefined
      }
      onRemove={() => onRemove(solution)}
      actionOptions={[{
        label: editing ? 'Save' : 'Edit',
        action: handleEdit
      }]}
    >
      <Section bordered={true}>
        <LabelValue
          label="target npk"
          value={
            <NpkLabel
              editable={editing}
              npk={newSolution.targetNpk}
              onChange={handleEditSolutionNpk}
            />
          }
        />
        {editing && (
            <SolutionInputPicker
              onChange={handleUpdateSolutionInput(setNewSolution, newSolution)}
              solutions={solutions}
            />
        )}
      </Section>
      {(newSolution.inputs || []).map((i, index) =>
        <Section
          key={i.solution.id}
          bordered={true}
        >
          <EditableInputCard
            editable={editing}
            key={i.solution.id}
            frac={i.frac}
            solutionInput={i.solution}
            onChange={handleUpdateSolutionInput(setNewSolution, newSolution)}
            onRemove={handleRemoveInput(setNewSolution, newSolution, i)}
          />
        </Section>
      )}
    </Card>
  );
};

const handleUpdateSolutionInput =
  (setNewSolution: (s: Solution) => void, solution: Solution) =>
(solutionInput: SolutionInput) => {
      const inputs = solution.inputs || [];
      const foundInputIndex = inputs.findIndex(i => i.solution.id === solutionInput.id);
      if (foundInputIndex > -1) {
        inputs[foundInputIndex].solution = solutionInput;
        setNewSolution(updateInputProportions(solution));
      } else {
        const updatedNewSolution = {
          ...solution,
          inputs: [...inputs, { frac: 0, solution: solutionInput }]
        };
        setNewSolution(updateInputProportions(updatedNewSolution));
      }
  };

const handleRemoveInput = (setNewSolution: (s: Solution) => void, solution: Solution, i: FractionalInput) => () => {
  const inputIndex = solution.inputs.findIndex(input => input.solution.id === i.solution.id);
  if (inputIndex > -1) {
    const newInputs = solution.inputs.slice(0, inputIndex).concat(solution.inputs.slice(inputIndex+1));
    setNewSolution({...solution, inputs: newInputs });
  }
};

const styles = StyleSheet.create({
});
