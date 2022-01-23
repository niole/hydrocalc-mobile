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
};

export const LabelValue: React.FC<Props> = ({ label, value, editable, onChange, onChangeNumber, rowStyle = false }) => (
  <View style={rowStyle ? styles.containerRow : undefined}>
    <Text style={styles.label}>{label}</Text>
      {editable ? (
        <ValidatedTextInput defaultValue={`${value}`} onChangeText={onChange} onChangeNumber={onChangeNumber} />
      ) : (
        <Text>{value}</Text>
      )}
  </View>
);

const styles = StyleSheet.create({
  containerRow: {
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
    paddingRight: 5,
  }
});

