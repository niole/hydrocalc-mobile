import * as React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { FlatList } from './FlatList';
import { Annotation } from './Annotation';
import { Modal } from './Modal';
import { Section } from './Section';
import { AddButton } from './AddButton';
import fontSizes from '../constants/FontSizes';

type Props = {
  selectedValue?: string | number;
  onValueChange?: (s?: string | number) => void;
  children?: any;
  label?: string;
  openOverride?: boolean
};

type PickerProps = {
  _onPress?: (id?: string | number) => void;
  label: React.ReactNode;
  value?: string | number;
  selected?: boolean;
};
export const PickerItem: React.FC<PickerProps> = ({ label, value, _onPress, selected }) => (
  <Section bordered={true} style={selected ? [styles.listItem, { backgroundColor: 'lightgrey' }] : [styles.listItem]}>
    <Pressable onPress={_onPress ? () => _onPress(value) : undefined}>{label}</Pressable>
  </Section>
);

export const Picker: React.FC<Props> = ({ openOverride = false, label, selectedValue, onValueChange, children }) => {
  const [open, setOpen] = React.useState<boolean>(openOverride);
  const [selection, setSelection] = React.useState<string | number | undefined>(selectedValue);
  const [selectionLabel, setSelectionLabel] = React.useState<React.ReactNode | undefined>(React.Children.map(children, c => ({ value: c.props.value, label: c.props.label })).find((c: any) => c.value === selectedValue)?.label);

  React.useEffect(() => {
    setOpen(openOverride);
  }, [openOverride]);

  React.useEffect(() => {
    setSelection(selectedValue);
    setSelectionLabel(
      React.Children.map(children, c => ({ value: c.props.value, label: c.props.label })).find((c: any) => c.value === selectedValue)?.label
    );

  }, [selectedValue]);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setOpen(!open)}>
        {label && <Annotation>{label}</Annotation>}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AddButton onPress={() => setOpen(!open)} />
          {selectionLabel}
        </View>
      </Pressable>
      <Modal
        show={open}
      >
        {React.Children.map(children, child => (
          React.cloneElement(child, {
            ...child.props,
            _onPress: (id?: string | number) => {
              setSelection(id);
              setSelectionLabel(child.props.label);
              onValueChange ? onValueChange(id) : undefined;
              setOpen(false);
            },
            selected: child.props.value === selection,
          })
        ))}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 20,
    minWidth: 250,
  },
  container: {
    padding: 7,
    marginTop: 3,
    marginBottom: 3,
  },
  label: {
    fontSize: fontSizes.small,
    fontWeight: 'bold',
    paddingRight: 5,
    flex: 1,
  }
});
