import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SolutionInput, NPK } from '../globalState';
import { ConfirmationModal, RemoveButton, ValidatedTextInput, Section, Title, LabelValue, NpkLabel } from '../components';

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
    if (!!newValues.name && !!newValues.npk && newValues.ec !== undefined && onChange) {
      onChange(newValues as SolutionInput);
    }
  }, [newValues.name, newValues.npk, newValues.brand, newValues.ec]);
  return (
    <View>
      <View style={styles.titleBar}>
        <View>
          <Text style={{color: 'grey'}}>input</Text>
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
        onChangeNumber={ec => onChangeValues({...newValues, ec})}
        label="ec"
        value={newValues.ec}
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
