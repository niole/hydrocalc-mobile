import * as React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { SizeUnits, BucketSize } from '../globalState';
import { LabelValue } from './LabelValue';
import { pluralizeSizes } from './volumeUtil';

type Props = {
  onChange: (bs: BucketSize) => void;
};

export const ValidatedSizeForm: React.FC<Props> = ({ onChange }) => {
  const [length, setLength] = React.useState<number | undefined>();
  const [width, setWidth] = React.useState<number | undefined>();
  const [height, setHeight] = React.useState<number | undefined>();
  const [unit, setUnit] = React.useState<SizeUnits>(SizeUnits.Inch);

  React.useEffect(() => {
    if (!!length && !!width && !!height) {
      onChange({
        lwh: {
          length,
          width,
          height,
          unit
        }
      });
    }
  }, [length, width, height, unit]);

  return (
    <View>
      <Picker onValueChange={setUnit} selectedValue={unit}>
        <Picker.Item key="cm" label={SizeUnits[SizeUnits.CM]} value={SizeUnits.CM}  />
        <Picker.Item key="inch" label={SizeUnits[SizeUnits.Inch]} value={SizeUnits.Inch}  />
      </Picker>
      <LabelValue
        editable={true}
        onChangeNumber={setLength}
        label={getPlaceholderText('length', unit)}
      />
      <LabelValue
        editable={true}
        onChangeNumber={setWidth}
        label={getPlaceholderText('width', unit)}
      />
      <LabelValue
        editable={true}
        onChangeNumber={setHeight}
        label={getPlaceholderText('height', unit)}
      />
    </View>
  );
};

const getPlaceholderText = (dimension: string, unit: SizeUnits): string => `${dimension} in ${pluralizeSizes(unit)}`;
