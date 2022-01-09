import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ConfirmationModal } from './ConfirmationModal';

type TriggerProps = { onPress?: (e: any) => void };
const Trigger: React.FC<TriggerProps> = ({ onPress }) => (
  <Pressable onPress={onPress}><Text>x</Text></Pressable>
);

type Props<S=undefined> = {
  title?: React.ReactNode;
  children?: JSX.Element[] | JSX.Element;
  onChange?: (data?: S) => void;
  onRemove?: () => void;
  removeConfirmationMsg?: React.ReactNode;
};

export function Card<SD>({ removeConfirmationMsg, title, children, onChange, onRemove }: Props<SD>) {
  const [confirmRemove, setConfirmRemove] = React.useState<boolean>(false);
  const requestRemove = () => setConfirmRemove(true);
  const handleRemove = () => {
    onRemove ? onRemove() : undefined;
    setConfirmRemove(false);
  };

  return (
    <View>
      {title && <Text>{title}</Text>}
      {children && React.Children.map(children, (child: JSX.Element) => (
        React.cloneElement(child, {...child.props, onChange, onRemove: requestRemove })
      ))}
      <ConfirmationModal
        onCancel={() => setConfirmRemove(false)}
        onConfirm={handleRemove}
        show={confirmRemove}
        Trigger={Trigger}
      >
          {removeConfirmationMsg}
      </ConfirmationModal>
    </View>
  );
};
