import * as React from 'react';
import { Text } from 'react-native';
import { SolutionInput, NPK } from '../globalState';
import { ValidatedTextInput, Section, Subtitle, LabelValue, NpkLabel } from '../components';

const getId = () => `${Math.random()}`;

type NewsolutionInput = {
  id: string;
  name?: string,
  brand?: string,
  npk?: NPK,
  ec?: number,
};

type Props = {
  solutionInput?: SolutionInput,
  frac?: number,
  editable?: boolean,
  onChange?: (newData: SolutionInput) => void,
};

export const EditableInputCard: React.FC<Props> = ({
  onChange,
  frac,
  editable = false,
  solutionInput,
}) => {
  const [newValues, onChangeValues] = React.useState<NewsolutionInput>(solutionInput || { id: getId() });
  React.useEffect(() => {
    if (!!newValues.name && !!newValues.npk && !!newValues.ec && onChange) {
      onChange(newValues as SolutionInput);
    }
  }, [newValues.name, newValues.npk, newValues.brand, newValues.ec]);
  return (
    <Section>
      <Subtitle>
        {editable ? (
          <ValidatedTextInput
            defaultValue={newValues.name}
            onChangeText={name => onChangeValues({ ...newValues, name })}
          />
          ) : <Text>{newValues.name || 'untitled'}</Text>
        }
      </Subtitle>
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
    </Section>
  );
};
