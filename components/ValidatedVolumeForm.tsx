import * as React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { VolumeUnits, BucketSize } from '../globalState';
import { LabelValue }  from './LabelValue';

type Props = {
  onChange: (bs: BucketSize) => void;
};

export const ValidatedVolumeForm: React.FC<Props> = ({ onChange }) => {
  const [total, setTotal] = React.useState<number | undefined>();
  const [unit, setUnit] = React.useState<VolumeUnits>(VolumeUnits.Gallon);

  React.useEffect(() => {
    if (!!total && !!unit) {
      onChange({
        volume: {
          total,
          unit
        }
      });
    }
  }, [total, unit]);

  return (
    <View>
      <LabelValue
        editable={true}
        label="total"
        onChangeNumber={setTotal}
        placeholder={`total in ${VolumeUnits[unit]}`}
      />
      <Picker onValueChange={setUnit} selectedValue={unit}>
        <Picker.Item key="gallon" label={VolumeUnits[VolumeUnits.Gallon]} value={VolumeUnits.Gallon}  />
        <Picker.Item key="liter" label={VolumeUnits[VolumeUnits.Liter]} value={VolumeUnits.Liter}  />
        <Picker.Item key="ounce" label={VolumeUnits[VolumeUnits.Ounce]} value={VolumeUnits.Ounce}  />
        <Picker.Item key="ml" label={VolumeUnits[VolumeUnits.ML]} value={VolumeUnits.ML}  />
      </Picker>
    </View>
  );
};
