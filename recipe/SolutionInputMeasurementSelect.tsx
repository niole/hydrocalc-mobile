import * as React from 'react';
import { Text } from 'react-native';
import { Picker, PickerItem } from '../components';
import { SolutionInputMeasurement } from '../globalState';

type Props = {
  onChange?: (unit: SolutionInputMeasurement) => void;
  defaultUnit?: SolutionInputMeasurement;
};

export const SolutionInputMeasurementSelect: React.FC<Props> = ({ onChange, defaultUnit }) => {
  const [unit, selectUnit] = React.useState<SolutionInputMeasurement>(defaultUnit || SolutionInputMeasurement.Cup);
    React.useEffect(() => {
      if (!!onChange) {
        onChange(unit);
      }
    }, [unit]);
    React.useEffect(() => {
      if (defaultUnit !== undefined && defaultUnit !== unit) {
        selectUnit(defaultUnit);
      }
    },[defaultUnit]);

    return (
      <Picker label="solution units" selectedValue={unit} onValueChange={s => selectUnit(s as number)}>
        <PickerItem
          label={<Text>{SolutionInputMeasurement[SolutionInputMeasurement.Liter]}</Text>}
          value={SolutionInputMeasurement.Liter}
        />
        <PickerItem
          label={<Text>{SolutionInputMeasurement[SolutionInputMeasurement.Cup]}</Text>}
          value={SolutionInputMeasurement.Cup}
        />
        <PickerItem
          label={<Text>{SolutionInputMeasurement[SolutionInputMeasurement.FluidOunce]}</Text>}
          value={SolutionInputMeasurement.FluidOunce}
        />
      </Picker>
    );
  };
