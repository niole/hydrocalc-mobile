import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { ConfirmationModal } from './ConfirmationModal';
import { RemoveButton, Title } from '.';

type TriggerProps = { onPress?: (e: any) => void };
const Trigger: React.FC<TriggerProps> = ({ onPress }) => (
  <RemoveButton onPress={onPress} />
);

type Props = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  onChange?: () => void;
  onRemove?: () => void;
  removeConfirmationMsg?: React.ReactNode;
  toggleActionLabel?: React.ReactNode;
};

export function Card({
  removeConfirmationMsg,
  title,
  children,
  onChange,
  onRemove,
  toggleActionLabel
}: Props) {
  return (
    <View style={styles.card}>
      {title && <Title>{title}</Title>}
      {children}
      <View style={styles.actionBar}>
        {onChange && toggleActionLabel && <Pressable onPress={onChange}>
          <Text>{toggleActionLabel}</Text>
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
    gap: 10,
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
