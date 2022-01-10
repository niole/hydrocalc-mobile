import * as React from 'react';
import { Modal } from '../components';
import { Solution } from '../globalState';
import { EditableInputCard } from './EditableInputCard';

type Props = {
  showTrigger?: boolean,
  show?: boolean;
  solution?: Solution;
};

export const CreateEditSolutionModal: React.FC<Props> = ({
  show,
  showTrigger,
  solution,
}) => {
  return (
    <Modal
      showTrigger={showTrigger}
      show={show}
    >
      {solution?.inputs.map((i, index) =>
        <EditableInputCard key={`${i.solution.name}-${i.frac}-${index}`} frac={i.frac} {...i.solution} />
      )}
    </Modal>
  );
};
