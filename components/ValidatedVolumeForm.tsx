import * as React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { VolumeUnits, BucketSize } from '../globalState';
import { ValidatedTextInput } from './ValidatedTextInput';

type Props = {
  onChange: (bs: BucketSize) => void;
};

export const ValidatedVolumeForm: React.FC<Props> = ({ onChange }) => {
  const [total, setTotal] = React.useState<number | undefined>();
  const [unit, setUnit] = React.useState<string>(VolumeUnits[VolumeUnits.Gallon]);

  React.useEffect(() => {
    if (!!total && !!unit) {
      onChange({
        volume: {
          total,
          unit: VolumeUnits[unit]
        }
      });
    }
  }, [total, unit]);

  return (
    <View>
      <ValidatedTextInput
        label="total"
        onChangeNumber={setTotal}
        placeholder="total"
      />
      <Picker onValueChange={setUnit} selectedValue={unit}>
        <Picker.Item key="gallon" label={VolumeUnits[VolumeUnits.Gallon]} value={VolumeUnits[VolumeUnits.Gallon]}  />
        <Picker.Item key="liter" label={VolumeUnits[VolumeUnits.Liter]} value={VolumeUnits[VolumeUnits.Liter]}  />
        <Picker.Item key="ounce" label={VolumeUnits[VolumeUnits.Ounce]} value={VolumeUnits[VolumeUnits.Ounce]}  />
        <Picker.Item key="ml" label={VolumeUnits[VolumeUnits.ML]} value={VolumeUnits[VolumeUnits.ML]}  />
      </Picker>
    </View>
  );
};
