import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NPK } from '../globalState';
import { ValidatedTextInput } from '../components/ValidatedTextInput';
import { LabelValue } from './LabelValue';

type Props = {
  npk?: NPK;
  editable?: boolean;
  onChange?: (npk: NPK) => void;
};

export const NpkLabel: React.FC<Props> = ({
  onChange,
  npk = { n: 0, p: 0, k: 0 },
  editable = false
}) => (
  <View style={styles.container}>
    <LabelValue
      editable={editable}
      value={npk.n}
      onChangeNumber={onChange ? n  => onChange({ ...npk, n }) : undefined}
    />
    <Text style={styles.dash}>-</Text>
    <LabelValue
      editable={editable}
      value={npk.p}
      onChangeNumber={onChange ? p => onChange({ ...npk, p }) : undefined}
    />
    <Text style={styles.dash}>-</Text>
    <LabelValue
      editable={editable}
      value={npk.k}
      onChangeNumber={onChange ? k => onChange({ ...npk, k }) : undefined}
    />
  </View>
);

const styles = StyleSheet.create({
  dash: {
    padding: 3,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  }
});
