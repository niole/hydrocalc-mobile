import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SolutionInput, NPK } from '../globalState';
import {
  MoreDrawer,
  Minimizer,
  ValidatedTextInput,
  Section,
  Title,
  LabelValue,
  NpkLabel,
} from '../components';

const getId = () => `${Math.random()}`;

type Props = {
  solutionInput: SolutionInput,
  frac?: number,
  editable?: boolean,
  onRemove?: (s: SolutionInput) => void,
  onChange?: (newData: SolutionInput) => void,
};

export const EditableInputCard: React.FC<Props> = ({
  onRemove,
  onChange,
  frac,
  editable = false,
  solutionInput,
}) => {
  const [newValues, onChangeValues] = React.useState<SolutionInput>(solutionInput);
  React.useEffect(() => {
    if (!!newValues.name && !!newValues.npk && newValues.tspsPerGallon1kEC !== undefined && onChange) {
      onChange(newValues as SolutionInput);
    }
  }, [newValues.name, newValues.npk, newValues.brand, newValues.tspsPerGallon1kEC]);
  return (
    <Minimizer showOverride={!newValues.brand}>
      {({ ChildMinimizer, Toggle }) => (
        <View>
          <View style={styles.titleBar}>
            <View style={{flex:7}}>
              {editable && !newValues.brand ? (
                <LabelValue
                  label="input name"
                  editable={editable}
                  multiline={true}
                  value={newValues.name}
                  onChange={name => onChangeValues({ ...newValues, name })}
                />
                ) : <Toggle><Title>{newValues.name || 'untitled'}</Title></Toggle>
              }
            </View>
              {onRemove && (
                <MoreDrawer
                  options={[{ label: 'Cancel' }, { label: 'Remove', action: () => onRemove(solutionInput)}]}
                  cancelButtonIndex={0}
                  destructiveButtonIndex={1}
                />
              )}
          </View>
          <ChildMinimizer>
            {!!newValues.brand && (
              <LabelValue
                label="brand"
                value={newValues.brand}
              />)}
            <LabelValue
              label="npk"
              value={
                <NpkLabel
                  onChange={npk => onChangeValues({...newValues, npk })}
                  editable={editable}
                  npk={newValues.npk}
                />
              }
            />
            <LabelValue
              editable={editable}
              onChangeNumber={tspsPerGallon1kEC => onChangeValues({...newValues, tspsPerGallon1kEC})}
              label="tsps per gallon for 1k ec"
              value={newValues.tspsPerGallon1kEC}
            />
        </ChildMinimizer>
        </View>
      )}
    </Minimizer>
  );
};

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
