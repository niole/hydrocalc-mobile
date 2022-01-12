import * as React from 'react';
import { SolutionInput, FractionalInput, NPK, Solution } from '../globalState';
import { Section, NpkLabel, LabelValue, Card } from '../components';
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
      title={newSolution.name}
      onRemove={() => onRemove(solution)}
      onChange={handleEdit}
      toggleActionLabel={editing ? 'done' : 'edit'}
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
