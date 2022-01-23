import * as React from 'react';
import { View, Text } from 'react-native';
import { SolutionInput, NPK } from '../globalState';
import { RemoveButton, ValidatedTextInput, Section, Title, LabelValue, NpkLabel } from '../components';

const getId = () => `${Math.random()}`;

type NewsolutionInput = {
  id: string;
  name?: string,
  brand?: string,
  npk?: NPK,
  ec?: number,
};

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
  const [newValues, onChangeValues] = React.useState<NewsolutionInput>(solutionInput);
  React.useEffect(() => {
    if (!!newValues.name && !!newValues.npk && !!newValues.ec && onChange) {
      onChange(newValues as SolutionInput);
    }
  }, [newValues.name, newValues.npk, newValues.brand, newValues.ec]);
  return (
    <View>
      <Text style={{color: 'grey'}}>input</Text>
      {editable ? (
        <ValidatedTextInput
          defaultValue={newValues.name}
          onChangeText={name => onChangeValues({ ...newValues, name })}
        />
        ) : <Title>{newValues.name || 'untitled'}</Title>
      }
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
      <LabelValue label="frac" value={frac} />
      {onRemove && <RemoveButton onPress={() => onRemove(solutionInput)} /> }
    </View>
  );
};
