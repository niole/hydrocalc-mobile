import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { ConfirmationModal } from './ConfirmationModal';
import { Title } from './Title';
import { RemoveButton } from './RemoveButton';

export type TriggerType = React.ComponentClass<TriggerProps> | React.FC<TriggerProps>;

type TriggerProps = { onPress?: (e: any) => void };
const Trigger: React.FC<TriggerProps> = ({ onPress }) => (
  <RemoveButton onPress={onPress} />
);

type Props = {
  title?: string;
  children?: React.ReactNode;
  onChange?: () => void;
  onRemove?: () => void;
  removeConfirmationMsg?: React.ReactNode;
  toggleActionLabel?: React.ReactNode;
  ToggleTrigger?: TriggerType;
  editable?: boolean;
  titleElement?: React.ReactNode;
};

export function Card({
  removeConfirmationMsg,
  title,
  children,
  onChange,
  onRemove,
  toggleActionLabel,
  ToggleTrigger,
  titleElement,
  editable = true,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.titleBar}>
        <View style={styles.titleText}>
          {!titleElement && title && <Title>{title}</Title>}
          {!title && titleElement}
        </View>
        <View style={styles.titleActions}>
          {editable && <ConfirmationModal
            onConfirm={onRemove}
            Trigger={Trigger}
          >
            {removeConfirmationMsg}
          </ConfirmationModal>}
        </View>
      </View>
      {children}
      <View style={styles.actionBar}>
        {editable && onChange && ToggleTrigger ? (
          <ToggleTrigger onPress={onChange} />
        ) :  editable && toggleActionLabel ? <Pressable onPress={onChange}>
          <Text>{toggleActionLabel}</Text>
        </Pressable> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleActions: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  titleText: {
    flex: 6,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBar: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
  },
  card: {
    maxWidth: 500,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    marginTop: 14,
    marginBottom: 14,
    marginLeft: 7,
    marginRight: 7,
    padding: 7,
    backgroundColor: 'white',
  }
});
