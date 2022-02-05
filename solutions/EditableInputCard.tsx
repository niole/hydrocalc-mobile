import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SolutionInput, NPK } from '../globalState';
import { Annotation, ConfirmationModal, RemoveButton, ValidatedTextInput, Section, Title, LabelValue, NpkLabel } from '../components';

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
    <View>
      <View style={styles.titleBar}>
        <View>
          <Annotation>input</Annotation>
          {editable ? (
            <ValidatedTextInput
              defaultValue={newValues.name}
              onChangeText={name => onChangeValues({ ...newValues, name })}
            />
            ) : <Title>{newValues.name || 'untitled'}</Title>
          }
        </View>
        {onRemove && <ConfirmationModal
          onConfirm={() => onRemove!(solutionInput)}
          Trigger={RemoveButton}
        >
          <Text>Are you sure you want to remove input, {newValues.name}?</Text>
        </ConfirmationModal>}
      </View>
      <LabelValue
        editable={editable}
        label="brand"
        value={newValues.brand}
      />
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
    </View>
  );
};

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
