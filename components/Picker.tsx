import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Picker as ReactPicker } from '@react-native-picker/picker';
import fontSizes from '../constants/FontSizes';

type Props = {
  selectedValue?: string | number;
  onValueChange?: (s?: string | number) => void;
  children?: any;
  label?: string;
  pickerRef?: React.RefObject<any>;
};

type PickerProps = { label: string | number; value?: string | number };
export const PickerItem: React.FC<PickerProps> = ({ label, value }) => (
  <ReactPicker.Item label={label.toString()} value={value} />
);

export const Picker: React.FC<Props> = ({ pickerRef, label, selectedValue, onValueChange, children }) => (
  <View style={styles.container}>
    {label && <Text style={styles.label}>{label}</Text>}
    <ReactPicker ref={pickerRef} selectedValue={selectedValue} onValueChange={onValueChange}>
      {children}
    </ReactPicker>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 7,
    marginTop: 3,
    marginBottom: 3,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'lightgrey',
    backgroundColor: '#f2f2f2',
  },
  label: {
    fontSize: fontSizes.small,
    fontWeight: 'bold',
    paddingRight: 5,
    flex: 1,
  }
});
