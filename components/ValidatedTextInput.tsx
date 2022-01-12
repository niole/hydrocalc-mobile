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
  maxSize?: number;
  defaultValue?: string;
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
}) => (
  <View style={{ display: "flex", flexDirection: "row", maxWidth: maxSize }}>
    {label && <Text style={{ fontWeight: "bold" }}>{`${label} `}</Text>}
    <TextInput
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChangeText={onChangeText ? handleOnChange(validation, onChangeText, onValidationFail) : onChangeNumber ? handleOnChangeNumber(validation, onChangeNumber, onValidationFail) : undefined}
    />
  </View>
);

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


