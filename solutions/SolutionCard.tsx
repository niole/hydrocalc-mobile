import * as React from 'react';
import { SolutionInput, FractionalInput, NPK, Solution } from '../globalState';
import { Section, NpkLabel, LabelValue, Card } from '../components';
import { EditableInputCard } from './EditableInputCard';
import { getInputFraction } from '../recipe/inputCalculator';

type NewSolution = {
  name?: string;
  inputs?: FractionalInput[];
  targetNpk?: NPK;
};

type Props = {
  solution?: Solution;
};

export const SolutionCard: React.FC<Props> = ({ solution }) => {
  const [newSolution, setNewSolution] = React.useState<NewSolution>(solution || {});
  const [editing, setEditing] = React.useState<boolean>(false);
  const handleEdit = () => setEditing(!editing);

  return (
    <Card
      title={newSolution.name}
      onRemove={() => undefined}
      onChange={handleEdit}
    >
      {editing && <Section>
        <LabelValue
          editable={true}
          label="name"
          value={newSolution.name}
          onChange={name => setNewSolution({ ...newSolution, name })}
        />
      </Section>}
      <Section>
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
        <EditableInputCard
          editable={editing}
          key={i.solution.id}
          frac={i.frac}
          solutionInput={i.solution}
          onChange={handleUpdateSolutionInput(setNewSolution, newSolution)}
        />
      )}
    </Card>
  );
};

const handleUpdateSolutionInput =
  (setNewSolution: (s: NewSolution) => void, solution: NewSolution) =>
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
