import * as React from 'react';
import { Text } from 'react-native';
import { SolutionInput, FractionalInput, NPK, Solution } from '../globalState';
import { ValidatedTextInput, EditButton, Title, AddButton, Section, NpkLabel, LabelValue, Card } from '../components';
import { EditableInputCard } from './EditableInputCard';
import { getInputFraction } from '../recipe/inputCalculator';

type Props = {
  solution: Solution;
  onChange: (solution: Solution) => void;
  onRemove: (solution?: Solution) => void;
};

export const SolutionCard: React.FC<Props> = ({ solution, onChange, onRemove }) => {
  const [newSolution, setNewSolution] = React.useState<Solution>(solution);
  const [editing, setEditing] = React.useState<boolean>(false);

  const handleEdit = () => {
    if (editing) {
      if (!!newSolution.name && !!newSolution.inputs && !!newSolution.targetNpk) {
        // submit changed solution
        onChange(newSolution as Solution);
        console.info('Submitted updated solution');
      } else {
        // reset old solution
        setNewSolution(solution);
        console.info('Solution was incomplete. Not submitting updated solution');
      }
    }
    setEditing(!editing);
  };

  return (
    <Card
      onRemove={() => onRemove(solution)}
      onChange={handleEdit}
      ToggleTrigger={({ onPress }) => <EditButton toggled={editing} onPress={onPress!} />}
    >
      <Section bordered={true}>
        {editing ?
          <ValidatedTextInput
            defaultValue={newSolution.name}
            onChangeText={name => setNewSolution({ ...newSolution, name })}
          />
          : <Title>{newSolution.name}</Title>}
        <LabelValue
          label="target npk"
          value={
            <NpkLabel
              editable={editing}
              npk={newSolution.targetNpk}
              onChange={targetNpk => setNewSolution({...newSolution, targetNpk})}
            />
          }
        />
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
      <AddButton
        onPress={addInput(newSolution, setNewSolution)}
      />
    </Card>
  );
};

const handleUpdateSolutionInput =
  (setNewSolution: (s: Solution) => void, solution: Solution) =>
(solutionInput: SolutionInput) => {
      const inputs = solution.inputs || [];
      const foundInputIndex = inputs.findIndex(i => i.solution.id === solutionInput.id);
      if (foundInputIndex > -1) {
        const newFraction = getInputFraction();
        inputs[foundInputIndex] = {
          ...inputs[foundInputIndex],
          ...solutionInput,
          frac: newFraction
        };
        setNewSolution(solution);
      } else {
        const newFraction = getInputFraction();
        const updatedNewSolution = {
          ...solution,
          inputs: [...inputs, { frac: newFraction, solution: solutionInput }]
        };
        setNewSolution(updatedNewSolution);
      }
  };

const addInput = (newSolution: Solution, setNewSolution: (s: Solution) => void) => () => {
  setNewSolution({
    ...newSolution,
    inputs: newSolution.inputs.concat(
      [{
        solution: {
          id: Math.random().toString(),
          name: 'untitled',
          npk: {n:0,p:0,k:0},
          ec: 0
        },
        frac: 0,
      }]
    )
  });
};

const handleRemoveInput = (setNewSolution: (s: Solution) => void, solution: Solution, i: FractionalInput) => () => {
  const inputIndex = solution.inputs.findIndex(input => input.solution.id === i.solution.id);
  if (inputIndex > -1) {
    const newInputs = solution.inputs.slice(0, inputIndex).concat(solution.inputs.slice(inputIndex+1));
    setNewSolution({...solution, inputs: newInputs });
  }
};

