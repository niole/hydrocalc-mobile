import * as React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { getThrottledHandler } from './getThrottledHandler';
import fontSizes from '../constants/FontSizes';

const NUMBER_PARSE_FAIL_MSG = "can't parse input as number";

export type ValidationResult = { message: string, kind: 'warning' | 'error' | 'info' };
export type Validator = (t: string | number) => ValidationResult | undefined; // returns a message if it failed

type Props = {
  minWidth?: number;
  multiline?: boolean;
  label?: string;
  validation?: Validator;
  onChangeText?: (t: string) => void; // executes if valid
  onChangeNumber?: (t: number) => void; // executes if valid
  onValidationFail?: (errorMessage: ValidationResult) => void; // lets you do something on validation fail
  placeholder?: string;
  defaultValue?: string;
  value?: any;
  rowStyle?: boolean;
  validateOnMount?: boolean;
};

export const ValidatedTextInput: React.FC<Props> = ({
  minWidth,
  label,
  placeholder,
  validation,
  onChangeText,
  onChangeNumber,
  onValidationFail,
  defaultValue,
  value,
  validateOnMount,
  rowStyle = false,
  multiline = false,
}) => {
  const [errorMsg, setErrorMsg] = React.useState<ValidationResult | undefined>();

  const handleShowValidationFailure = (errorMsg: ValidationResult) => {
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

  const changeHandler = onChangeText ?
    handleOnChange(validation, handleValidationStringSuccess, handleShowValidationFailure) :
    onChangeNumber ?
    handleOnChangeNumber(validation, handleValidationNumberSuccess, handleShowValidationFailure) :
    () => null;

  React.useEffect(() => {
    if (validateOnMount) {
      changeHandler(value);
    }
  }, []);

  React.useEffect(() => {
    if (validateOnMount) {
      changeHandler(value);
    }
  }, [value]);

  return (
    <View>
      <View style={rowStyle ? [ styles.labelGroupRow] : undefined}>
        {label && <Text style={styles.label}>{`${label} `}</Text>}
        <TextInput
          multiline={multiline}
          keyboardType={onChangeNumber ? 'numeric' : undefined}
          style={minWidth ? [{ minWidth }, styles.editingContainer] : styles.editingContainer}
          textAlign={rowStyle ? 'right' : undefined}
          defaultValue={value !== undefined && value !== null ? `${value}` : undefined}
          placeholder={placeholder}
          onChangeText={getThrottledHandler(changeHandler)}
          returnKeyType="next"
        />
      </View>
      {errorMsg && <Text style={styles[`${errorMsg.kind}Msg` as 'infoMsg']}>{errorMsg.message}</Text>}
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
    onValidationFail({ kind: 'error', message: NUMBER_PARSE_FAIL_MSG });
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

async function handleParseNumber(uncleanT: string): Promise<number> {
    const t = uncleanT.trim();
    if (t !== '') {
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
    } else {
      return 0;
    }
};

const styles = StyleSheet.create({
  editingContainer: {
    fontSize: fontSizes.small,
    color: 'black',
  },
  label: {
    fontWeight: 'bold',
  },
  labelGroupRow: {
    flexDirection: 'row'
  },
  errorMsg: {
    color: 'red'
  },
  warningMsg: {
    color: 'orange'
  },
  infoMsg: {
    color: 'grey'
  },
});
