import * as React from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { Title } from './Title';
import { MoreDrawer } from './MoreDrawer';

export type TriggerType = React.ComponentClass<TriggerProps> | React.FC<TriggerProps>;
type TriggerProps = { onPress?: () => void };

type Props = {
  title?: string;
  children?: React.ReactNode;
  onChange?: () => void;
  onRemove?: () => void;
  toggleActionLabel?: React.ReactNode;
  ToggleTrigger?: TriggerType;
  editable?: boolean;
  titleElement?: React.ReactNode;
  minimizeable?: boolean;
  defaultMinimized?: boolean;
};

export function Card({
  title,
  children,
  onChange,
  onRemove,
  toggleActionLabel,
  ToggleTrigger,
  titleElement,
  minimizeable = false,
  defaultMinimized = false,
  editable = true,
}: Props) {
  const [minimized, setMinimized] = React.useState<boolean>(defaultMinimized);
  const titleComponent = (
    <View style={styles.titleText}>
      {!titleElement && title && <Title>{title}</Title>}
      {!title && titleElement}
    </View>
  );
  return (
    <View style={styles.card}>
      <View style={styles.titleBar}>
        {minimizeable ? (
          <Pressable onPress={() => setMinimized(!minimized)}>
            {titleComponent}
          </Pressable>
        ) : titleComponent}
        <View style={styles.titleActions}>
          {editable && onRemove && (
            <MoreDrawer
              options={[{ label: 'Cancel' }, { label: 'Remove', action: onRemove }]}
              cancelButtonIndex={0}
              destructiveButtonIndex={1}
            />
          )}
        </View>
      </View>
      {minimizeable ? (!minimized ? children : null) : children}
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
