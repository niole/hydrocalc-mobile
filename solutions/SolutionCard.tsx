import * as React from 'react';
import { View, Text } from 'react-native';
import { SolutionInput, FractionalInput, NPK, Solution } from '../globalState';
import { Toast, Annotation, ValidatedTextInput, Title, Section, NpkLabel, LabelValue, Card } from '../components';
import { EditableInputCard } from './EditableInputCard';
import { updateInputProportions } from '../recipe/inputCalculator';
import { SolutionInputPicker } from './SolutionInputPicker';

type WipSolution = {
  id: string;
  name?: string;
  inputs: FractionalInput[];
  targetNpk: NPK;
};

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
  const [newSolution, setNewSolution] = React.useState<WipSolution>(solution);
  const [editing, setEditing] = React.useState<boolean>(editable);

  React.useEffect(() => {
    setEditing(editable);
  }, [editable]);

  const handleEdit = () => {
    if (editing) {

      if (!!newSolution.name) {
        const computedSolution = updateInputProportions(newSolution as Solution);

        if (!!computedSolution.name && !!computedSolution.inputs && !!computedSolution.targetNpk) {
          if (computedSolution.targetNpk.n === 0 && computedSolution.targetNpk.p === 0 && computedSolution.targetNpk.k === 0) {
            Toast.error('Please provide a target npk ratio for this solution.');
          } else if (computedSolution.inputs.length === 0) {
            Toast.error('Please provide some inputs for this solution.');
          } else {
            const proportionZeroInputs = computedSolution.inputs.filter(i => i.frac === 0);
            if (proportionZeroInputs.length > 0) {
              if (proportionZeroInputs.length === computedSolution.inputs.length) {
                Toast.error(`The npk ratios of the selected inputs cannot be combined in order to achieve the target npk ratio. Please pick inputs that contain the nitrogen, phorphorus, and potassium.`);
              } else {
                Toast.error(`Found ${proportionZeroInputs.length} inputs that are unnecessary: ${proportionZeroInputs.map(i => i.solution.name).join(',')}`);
              }
            } else {
              // submit changed solution
              try {
                setEditing(false);
                onChange(computedSolution as Solution);
                console.info('Submitted updated solution');
                Toast.success(`Saved new solution ${computedSolution.name}`);
              } catch (error) {
                console.error(`Something went wrong when computing proportions: ${error}`);
              }
            }
          }
        } else {
          // reset old solution because not totally filled out
          setEditing(false);
          setNewSolution(solution);
          console.info('Solution was incomplete. Not submitting updated solution');
        }
      } else {
        Toast.error('Please provide a name for this solution.');
      }
    } else {
      setEditing(true);
    }
  };

  const handleEditSolutionNpk = (targetNpk: NPK) => setNewSolution({...newSolution, targetNpk});
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
            validation={s => !s ? { message: 'Please provide a solution name.', kind: 'info' } : undefined}
            validateOnMount={true}
          />
        ) : undefined
      }
      onRemove={() => onRemove(solution)}
      actionOptions={[{
        label: editing ? 'Save' : 'Edit',
        action: handleEdit
      }]}
    >
    <Section bordered={newSolution.inputs.length > 0}>
        {editing && (
            <SolutionInputPicker
              onChange={handleUpdateSolutionInput(setNewSolution, newSolution)}
              solutions={solutions}
            />
        )}
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
      </Section>
      {(newSolution.inputs || []).map((i, index) =>
        <Section
          key={i.solution.id}
          bordered={true}
        >
          <EditableInputCard
            editable={editing && !i.solution.brand}
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
  (setNewSolution: (s: WipSolution) => void, solution: WipSolution) =>
(solutionInput: SolutionInput) => {
      const inputs = solution.inputs || [];
      const foundInputIndex = inputs.findIndex(i => i.solution.id === solutionInput.id);

      if (foundInputIndex > -1) {
        // update with what the user provided
        inputs[foundInputIndex].solution = solutionInput;
        setNewSolution({ ...solution, inputs });
      } else {
        const updatedNewSolution = {
          ...solution,
          inputs: [{ frac: 0, solution: solutionInput }, ...inputs]
        };
        setNewSolution(updatedNewSolution);
    }
  };

const handleRemoveInput = (setNewSolution: (s: WipSolution) => void, solution: WipSolution, i: FractionalInput) => () => {
  const inputIndex = solution.inputs.findIndex(input => input.solution.id === i.solution.id);
  if (inputIndex > -1) {
    const newInputs = solution.inputs.slice(0, inputIndex).concat(solution.inputs.slice(inputIndex+1));
    setNewSolution({...solution, inputs: newInputs });
  }
};
