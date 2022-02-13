import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import fontSizes from '../constants/FontSizes';
import { Validator, ValidatedTextInput } from './ValidatedTextInput';


type Props = {
  label?: string;
  value?: React.ReactNode;
  componentValue?: React.ReactNode;
  editable?: boolean;
  onChange?: (data: any) => void;
  onChangeNumber?: (data: any) => void;
  rowStyle?: boolean;
  placeholder?: string;
  validation?: Validator;
  validateOnMount?: boolean;
  multiline?: boolean;
};

export const LabelValue: React.FC<Props> = ({
  componentValue,
  label,
  value,
  editable,
  onChange,
  onChangeNumber,
  placeholder,
  validation,
  validateOnMount,
  rowStyle = false,
  multiline = false,
}) => {
  const containerStyle = [
    styles.container,
    rowStyle ? styles.containerRow : {},
    ...(editable ? [styles.editableContainer] : [])
  ];
  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      {editable ? (
        <ValidatedTextInput
          multiline={multiline}
          validateOnMount={validateOnMount}
          validation={validation}
          rowStyle={rowStyle}
          value={value}
          placeholder={placeholder}
          onChangeText={onChange}
          onChangeNumber={onChangeNumber}
        />
      ) : value !== undefined ? (
        <Text>{value}</Text>
      ) : !!componentValue ? componentValue : null}
    </View>
  );
};

const styles = StyleSheet.create({
  editableContainer: {
    borderColor: 'lightgrey',
    backgroundColor: '#f2f2f2',
  },
  container: {
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 5,
    padding: 7,
    marginTop: 3,
    marginBottom: 3,
  },
  containerRow: {
    flexDirection: 'row',
  },
  label: {
    fontSize: fontSizes.small,
    fontWeight: 'bold',
    paddingRight: 5,
  },
});
