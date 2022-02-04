import * as React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { SizeUnits, BucketSize } from '../globalState';
import { LabelValue } from './LabelValue';
import { pluralizeSizes } from './volumeUtil';

type Props = {
  onChange?: (bs: BucketSize) => void;
  value?: BucketSize;
};

export const ValidatedSizeForm: React.FC<Props> = ({ onChange, value }) => {
  const [length, setLength] = React.useState<number | undefined>(value?.lwh?.length);
  const [width, setWidth] = React.useState<number | undefined>(value?.lwh?.width);
  const [height, setHeight] = React.useState<number | undefined>(value?.lwh?.height);
  const [unit, setUnit] = React.useState<SizeUnits>(SizeUnits.Inch);

  React.useEffect(() => {
    if (!!value) {
      if (value.lwh !== undefined) {
        setLength(value.lwh.length);
        setWidth(value.lwh.width);
        setHeight(value.lwh.height);
        setUnit(value.lwh.unit);
      } else {
        // clear it
        setLength(undefined);
        setWidth(undefined);
        setHeight(undefined);
      }
    }
  }, [value]);

  React.useEffect(() => {
    if (!!length && !!width && !!height && !!onChange) {
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
        value={length}
      />
      <LabelValue
        editable={true}
        onChangeNumber={setWidth}
        label={getPlaceholderText('width', unit)}
        value={width}
      />
      <LabelValue
        editable={true}
        onChangeNumber={setHeight}
        label={getPlaceholderText('height', unit)}
        value={height}
      />
    </View>
  );
};

const getPlaceholderText = (dimension: string, unit: SizeUnits): string => `${dimension} in ${pluralizeSizes(unit)}`;
