import * as React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { SizeUnits, BucketSize } from '../globalState';
import { ValidatedTextInput } from './ValidatedTextInput';

type Props = {
  onChange: (bs: BucketSize) => void;
};

export const ValidatedSizeForm: React.FC<Props> = ({ onChange }) => {
  const [length, setLength] = React.useState<number | undefined>();
  const [width, setWidth] = React.useState<number | undefined>();
  const [height, setHeight] = React.useState<number | undefined>();
  const [unit, setUnit] = React.useState<string>(SizeUnits[SizeUnits.Inch]);

  React.useEffect(() => {
    if (!!length && !!width && !!height && !!unit) {
      onChange({
        lwh: {
          length,
          width,
          height,
          unit: SizeUnits[unit]
        }
      });
    }
  }, [length, width, height, unit]);

  return (
    <View>
      <ValidatedTextInput
        label="length"
        onChangeNumber={setLength}
      />
      <ValidatedTextInput
        label="width"
        onChangeNumber={setWidth}
      />
      <ValidatedTextInput
        label="height"
        onChangeNumber={setHeight}
      />
      <Picker onValueChange={setUnit} selectedValue={unit}>
        <Picker.Item key="cm" label={SizeUnits[SizeUnits.CM]} value={SizeUnits[SizeUnits.CM]}  />
        <Picker.Item key="inch" label={SizeUnits[SizeUnits.Inch]} value={SizeUnits[SizeUnits.Inch]}  />
      </Picker>
    </View>
  );
};
