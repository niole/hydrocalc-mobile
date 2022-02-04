import * as React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { VolumeUnits, BucketSize } from '../globalState';
import { LabelValue }  from './LabelValue';
import { pluralizeVolumes } from './volumeUtil';

type Props = {
  onChange?: (bs: BucketSize) => void;
  value?: BucketSize;
};

export const ValidatedVolumeForm: React.FC<Props> = ({ onChange, value }) => {
  const [total, setTotal] = React.useState<number | undefined>(value?.volume?.total);
  const [unit, setUnit] = React.useState<VolumeUnits>(VolumeUnits.Gallon);

  React.useEffect(() => {
    if (!!value) {
      if (value.volume !== undefined) {
        setTotal(value.volume.total);
        setUnit(value.volume.unit);
      } else {
        // clear it
        setTotal(undefined);
      }
    }
  }, [value]);

  React.useEffect(() => {
    if (!!total && !!onChange) {
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
      <Picker onValueChange={setUnit} selectedValue={unit}>
        <Picker.Item key="gallon" label={VolumeUnits[VolumeUnits.Gallon]} value={VolumeUnits.Gallon}  />
        <Picker.Item key="liter" label={VolumeUnits[VolumeUnits.Liter]} value={VolumeUnits.Liter}  />
        <Picker.Item key="ounce" label={VolumeUnits[VolumeUnits.Ounce]} value={VolumeUnits.Ounce}  />
        <Picker.Item key="ml" label={VolumeUnits[VolumeUnits.ML]} value={VolumeUnits.ML}  />
      </Picker>
      <LabelValue
        editable={true}
        label={`total in ${pluralizeVolumes(unit)}`}
        onChangeNumber={setTotal}
        value={total}
      />
    </View>
  );
};
