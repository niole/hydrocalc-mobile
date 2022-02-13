import * as React from 'react';
import { Pressable, StyleSheet, Text, TextStyle } from 'react-native';
import { Modal } from './Modal';
import { editableBlue } from '../constants/Colors';

type Props<D> = {
  editingTitle?: string;
  children: (onChange: (d: D) => void) => JSX.Element;
  initialState: D;
  editable?: boolean;
  style?: TextStyle[];
  openOverride?: boolean;
  onChange?: (d: D) => void;
  getText?: (d: D) => string;
};

export function EditableText<D>({
  openOverride = false,
    getText = () => '',
    style = [],
    editable,
    initialState,
    children,
    onChange,
    editingTitle,
  }: Props<D>) {
  const [data, setData] = React.useState<D | undefined>();
  const [text, setText] = React.useState<string>(getText(initialState));
  const [open, setOpen] = React.useState<boolean>(openOverride);

  React.useEffect(() => {
    setText(getText(initialState));
  }, [initialState]);

  React.useEffect(() => {
    setOpen(openOverride);
  }, [openOverride]);

  const handleChange = (d: D) => {
    setData(d);
    setText(getText(d));
  };

  const handleSubmit = () => {
    onChange && data ? onChange(data) : undefined;
  };

  const t = <Text style={editable ? style.concat(styles.editableText) : style.concat(styles.text)}>{text}</Text>;
  return (
    <>
      {editable ? <Pressable onPress={() => setOpen(!open)}>{t}</Pressable> : t}
      <Modal title={editingTitle} show={open} onSubmit={handleSubmit}>{children(handleChange)}</Modal>
    </>
  );
  }

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  editableText: {
    color: editableBlue,
    textDecorationLine: 'underline',
  }
});
