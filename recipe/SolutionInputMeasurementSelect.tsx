import * as React from 'react';
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
      <Picker selectedValue={unit} onValueChange={s => selectUnit(s as number)}>
        <PickerItem
          label={SolutionInputMeasurement[SolutionInputMeasurement.Liter]}
          value={SolutionInputMeasurement.Liter}
        />
        <PickerItem
          label={SolutionInputMeasurement[SolutionInputMeasurement.Cup]}
          value={SolutionInputMeasurement.Cup}
        />
        <PickerItem
          label={SolutionInputMeasurement[SolutionInputMeasurement.FluidOunce]}
          value={SolutionInputMeasurement.FluidOunce}
        />
      </Picker>
    );
  };
