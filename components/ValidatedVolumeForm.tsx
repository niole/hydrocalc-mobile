import * as React from 'react';
import { Picker, View } from 'react-native';

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
      />
      <Picker onValueChange={setUnit} selectedValue={unit}>
        <Picker.Item label={VolumeUnits[VolumeUnits.Gallon]} value={VolumeUnits[VolumeUnits.Gallon]}  />
        <Picker.Item label={VolumeUnits[VolumeUnits.Liter]} value={VolumeUnits[VolumeUnits.Liter]}  />
        <Picker.Item label={VolumeUnits[VolumeUnits.Ounce]} value={VolumeUnits[VolumeUnits.Ounce]}  />
        <Picker.Item label={VolumeUnits[VolumeUnits.ML]} value={VolumeUnits[VolumeUnits.ML]}  />
      </Picker>
    </View>
  );
};
