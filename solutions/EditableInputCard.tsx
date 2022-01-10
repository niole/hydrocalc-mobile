import * as React from 'react';
import { Text } from 'react-native';
import { SolutionInput, NPK } from '../globalState';
import { ValidatedTextInput, Section, Subtitle, LabelValue, NpkLabel } from '../components';

type NewsolutionInput = {
  name?: string,
  brand?: string,
  npk?: NPK,
  ec?: number,
};

type Props = {
  solutionInput?: SolutionInput,
  frac?: number,
  editable?: boolean,
  onChange?: (newData: NewsolutionInput) => void,
};

export const EditableInputCard: React.FC<Props> = ({
  onChange,
  frac,
  editable = false,
  solutionInput,
}) => {
  const [newValues, onChangeValues] = React.useState<NewsolutionInput>(solutionInput || {});
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
