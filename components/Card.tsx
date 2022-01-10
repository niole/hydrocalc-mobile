import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { ConfirmationModal } from './ConfirmationModal';
import { Title } from '.';

type TriggerProps = { onPress?: (e: any) => void };
const Trigger: React.FC<TriggerProps> = ({ onPress }) => (
  <Pressable onPress={onPress}><Text>x</Text></Pressable>
);

type Props = {
  title?: React.ReactNode;
  children?: JSX.Element[] | JSX.Element;
  onChange?: () => void;
  onRemove?: () => void;
  removeConfirmationMsg?: React.ReactNode;
};

export function Card({ removeConfirmationMsg, title, children, onChange, onRemove }: Props) {
  return (
    <View style={styles.card}>
      {title && <Title>{title}</Title>}
      {children}
      <View style={styles.actionBar}>
        {onChange && <Pressable onPress={onChange}>
          <Text>edit</Text>
        </Pressable>}
        <ConfirmationModal
          onConfirm={onRemove}
          Trigger={Trigger}
        >
          {removeConfirmationMsg}
        </ConfirmationModal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionBar: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
  card: {
    maxWidth: 500,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 2,
    marginTop: 14,
    marginBottom: 14,
    marginLeft: 7,
    marginRight: 7,
    padding: 7,
    backgroundColor: 'white',
  }
});
