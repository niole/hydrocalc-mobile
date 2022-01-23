import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NPK } from '../globalState';
import { ValidatedTextInput } from '../components/ValidatedTextInput';

type Props = {
  npk?: NPK;
  editable?: boolean;
  onChange?: (npk: NPK) => void;
};

export const NpkLabel: React.FC<Props> = ({
  onChange,
  npk = { n: 0, p: 0, k: 0 },
  editable = false
}) => editable && onChange ? (
  <View style={styles.container}>
    <ValidatedTextInput
      rowStyle={true}
      defaultValue={`${npk.n}`}
      onChangeNumber={n => onChange({ ...npk, n })}
    />
    <ValidatedTextInput
      rowStyle={true}
      defaultValue={`${npk.p}`}
      onChangeNumber={p => onChange({ ...npk, p })}
    />
    <ValidatedTextInput
      rowStyle={true}
      defaultValue={`${npk.k}`}
      onChangeNumber={k => onChange({ ...npk, k })}
    />
  </View>
) : npk ? (
  <Text>{npk.n}-{npk.p}-{npk.k}</Text>
) : null;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  }
});
