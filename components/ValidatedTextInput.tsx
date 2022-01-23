import * as React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

const NUMBER_PARSE_FAIL_MSG = "can't parse input as number";

type Props = {
  label?: string;
  validation?: (t: string | number) => string | undefined; // returns a message if it failed
  onChangeText?: (t: string) => void; // executes if valid
  onChangeNumber?: (t: number) => void; // executes if valid
  onValidationFail?: (errorMessage: string) => void; // lets you do something on validation fail
  placeholder?: string;
  maxSize?: number;
  defaultValue?: string;
  rowStyle?: boolean;
};

export const ValidatedTextInput: React.FC<Props> = ({
  label,
  placeholder,
  validation,
  onChangeText,
  onChangeNumber,
  onValidationFail,
  maxSize,
  defaultValue,
  rowStyle = false
}) => {
  const [errorMsg, setErrorMsg] = React.useState<string | undefined>();
  const handleShowValidationFailure = (errorMsg: string) => {
    setErrorMsg(errorMsg);
    onValidationFail ? onValidationFail(errorMsg) : null;
  };

  const handleValidationStringSuccess = (t: string) => {
    setErrorMsg(undefined);
    onChangeText ? onChangeText(t) : null;
  };

  const handleValidationNumberSuccess = (t: number) => {
    setErrorMsg(undefined);
    onChangeNumber ? onChangeNumber(t) : null;
  };

  return (
    <View style={{ maxWidth: maxSize }}>
      <View style={rowStyle ? styles.labelGroupRow : undefined}>
        {label && <View><Text style={styles.label}>{`${label} `}</Text></View>}
        <TextInput
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChangeText={onChangeText ? handleOnChange(validation, onChangeText, handleValidationStringSuccess) : onChangeNumber ? handleOnChangeNumber(validation, handleValidationNumberSuccess, handleShowValidationFailure) : undefined}
        />
      </View>
      {errorMsg && <Text style={styles.errorMsg}>{errorMsg}</Text>}
    </View>
  );
};


const handleOnChangeNumber = (
  validation: Props['validation'],
  onChange: (t: number) => void,
  onValidationFail: Props['onValidationFail'] = () => undefined
) => async (t: string) => {
  try {
    const value = await handleParseNumber(t);
    if (!!validation) {
      const msg = validation(value);
      if (!!msg) {
        onValidationFail(msg);
      } else {
        onChange(value);
      }
    } else {
      onChange(value);
    }
  } catch (error) {
    console.error(NUMBER_PARSE_FAIL_MSG, error);
    onValidationFail(NUMBER_PARSE_FAIL_MSG);
  }
};

const handleOnChange = (
  validation: Props['validation'],
  onChange: (t: string) => void,
  onValidationFail: Props['onValidationFail'] = () => undefined
) => (t: string) => {
  if (!!validation) {
    const msg = validation(t);
    if (!!msg) {
      onValidationFail(msg);
    } else {
      onChange(t);
    }
  } else {
    onChange(t);
  }
};

async function handleParseNumber(t: string): Promise<number> {
    try {
      const value = parseFloat(t);
      if (isNaN(value)) {
        throw new Error(`${value}`);
      }
      return value;
    } catch (error) {
      console.error("can't parse input as number", error);
      throw new Error("can't parse input as number");
    }
};

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
  },
  labelGroupRow: {
    flexDirection: 'row'
  },
  errorMsg: {
    color: 'red'
  }
});
