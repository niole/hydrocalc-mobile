import * as React from 'react';
import { Pressable, StyleSheet, Text, TextStyle } from 'react-native';
import { Modal } from './Modal';


type Props<D> = {
  children: (onChange: (d: D) => void) => JSX.Element;
  initialText: string;
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
    initialText,
    children,
    onChange,
  }: Props<D>) {
  const [data, setData] = React.useState<D | undefined>();
  const [text, setText] = React.useState<string>(initialText);
  const [open, setOpen] = React.useState<boolean>(openOverride);

  React.useEffect(() => {
    setText(initialText);
  }, [initialText]);

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

  const t = <Text style={style.concat(styles.text)}>{text}</Text>;
  return (
    <>
      {editable ? <Pressable onPress={() => setOpen(!open)}>{t}</Pressable> : t}
      <Modal show={open} onSubmit={handleSubmit}>{children(handleChange)}</Modal>
    </>
  );
  }

const styles = StyleSheet.create({
  text: {
    color: 'darkslategray',
    textDecorationLine: 'underline',
  }
});
