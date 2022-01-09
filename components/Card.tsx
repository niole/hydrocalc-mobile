import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { ConfirmationModal } from './ConfirmationModal';
import { Title } from '.';

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
    <View style={styles.card}>
      {title && <Title>{title}</Title>}
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

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 2,
    marginTop: 14,
    marginBottom: 14,
    marginLeft: 7,
    marginRight: 7,
    padding: 7,
  }
});
