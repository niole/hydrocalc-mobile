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
}) => {
  const [wipNpk, setNpk] = React.useState<NPK>(npk);

  React.useEffect(() => { onChange ? onChange(wipNpk) : undefined }, [wipNpk]);
  React.useEffect(() => { setNpk(npk); }, [npk]);

  return (
    <View style={styles.container}>
      <LabelValue
        editable={editable}
        value={npk.n}
        onChangeNumber={onChange ? n  => setNpk({ ...wipNpk, n }) : undefined}
      />
      <Text style={styles.dash}>-</Text>
      <LabelValue
        editable={editable}
        value={npk.p}
        onChangeNumber={onChange ? p => setNpk({ ...wipNpk, p }) : undefined}
      />
      <Text style={styles.dash}>-</Text>
      <LabelValue
        editable={editable}
        value={npk.k}
        onChangeNumber={onChange ? k => setNpk({ ...wipNpk, k }) : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dash: {
    padding: 3,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  }
});
