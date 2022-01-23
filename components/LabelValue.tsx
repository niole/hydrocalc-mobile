import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ValidatedTextInput } from './ValidatedTextInput';


type Props = {
  label?: string;
  value?: React.ReactNode;
  editable?: boolean;
  onChange?: (data: any) => void;
  onChangeNumber?: (data: any) => void;
  rowStyle?: boolean;
  placeholder?: string;
};

export const LabelValue: React.FC<Props> = ({ label, value, editable, onChange, onChangeNumber, placeholder, rowStyle = false }) => {
  const containerStyle = [...(editable ? [styles.editingContainer] : []), ...(rowStyle ? [styles.containerRow] : [])];
  return (
    <View style={containerStyle}>
      <Text style={styles.label}>{label}</Text>
        {editable ? (
          <ValidatedTextInput
            defaultValue={value !== undefined ? `${value}` : undefined}
            placeholder={placeholder}
            onChangeText={onChange}
            onChangeNumber={onChangeNumber}
          />
        ) : (
          <Text>{value}</Text>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  editingContainer: {
    borderColor: 'darkslategray',
    borderBottomWidth: 1,
  },
  containerRow: {
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
    paddingRight: 5,
  }
});

