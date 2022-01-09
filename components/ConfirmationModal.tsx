import React from 'react';
import { Text } from 'react-native';
import { Modal, TriggerType } from './Modal';

type Props = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  show?: boolean;
  showTrigger?: boolean;
  Trigger?: TriggerType;
};

export function ConfirmationModal({
    title,
    children,
    onConfirm,
    onCancel,
    show,
    Trigger,
    showTrigger = true,
}: Props) {
  return (
    <Modal
      title={title}
      onSubmit={onConfirm}
      onCancel={onCancel}
      show={show}
      showTrigger={showTrigger}
      Trigger={Trigger}
    >
      {children || <Text>Are you sure?</Text>}
    </Modal>
  );
}
