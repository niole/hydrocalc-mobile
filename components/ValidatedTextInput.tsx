import * as React from 'react';
import { TextInput, View, Text } from 'react-native';

const NUMBER_PARSE_FAIL_MSG = "can't parse input as number";

type Props = {
  label?: string;
  validation?: (t: string | number) => string | undefined; // returns a message if it failed
  onChangeText?: (t: string) => void; // executes if valid
  onChangeNumber?: (t: number) => void; // executes if valid
  onValidationFail?: (errorMessage: string) => void; // lets you do something on validation fail
  placeholder?: string;
};

export const ValidatedTextInput: React.FC<Props> = ({
  label,
  placeholder,
  validation,
  onChangeText,
  onChangeNumber,
  onValidationFail,
}) => (
  <View>
    {label && <Text>{label}</Text>}
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText ? handleOnChange(validation, onChangeText, onValidationFail) : onChangeNumber ? handleOnChangeNumber(validation, onChangeNumber, onValidationFail) : undefined}
    />
  </View>
);

const handleOnChangeNumber = (
  validation: Props['validation'],
  onChange: (t: number) => void,
  onValidationFail: Props['onValidationFail'] = () => undefined
) => (t: string) => {
  try {
    const value = parseFloat(t);
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

const handleParseNumber= (t: string) => {
    try {
      parseFloat(t);
    } catch (error) {
      console.error("can't parse input as number", error);
      return "can't parse input as number";
    }
};


