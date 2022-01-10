import * as React from 'react';
import { Solution } from '../globalState';
import { Card } from '../components';
import { EditableInputCard } from './EditableInputCard';

type Props = {
  solution: Solution;
};

export const SolutionCard: React.FC<Props> = ({ solution }) => {
  const [editing, setEditing] = React.useState<boolean>(false);
  const handleEdit = () => setEditing(true);

  return (
    <Card
      key={solution.name}
      title={solution.name}
      onRemove={() => undefined}
      onChange={handleEdit}
    >
      {solution.inputs.map((i, index) =>
        <EditableInputCard key={`${index}`} frac={i.frac} solutionInput={i.solution} />
      )}
    </Card>
  );
};
