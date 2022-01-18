import * as React from 'react';
import { TextStyle, StyleSheet, GestureResponderEvent, Text, Pressable } from 'react-native';

export type CircleButtonProps = {
  toggled?: boolean;
  disabled?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  kind?: 'primary' | 'destructive';
  size?: 'small' | 'big';
  children?: React.ReactNode;
};
export const CircleButton: React.FC<CircleButtonProps> = ({
  size = 'small',
  kind = 'primary',
  disabled,
  onPress,
  children
}) => {
  const textKey: 'bigText' | 'smallText' = `${size}Text`;
  return (
    <Pressable disabled={disabled} style={[styles[size], styles[kind]]} onPress={onPress}>
      <Text style={styles[textKey]}>{children}</Text>
    </Pressable>
  );
};

const baseContainerStyles = {
  borderRadius: 100,
  alignContent: 'center',
} as TextStyle;

const baseTextStyles = {
  color: 'white'
};

const styles = StyleSheet.create({
  primary: {
    backgroundColor: 'teal',
    borderColor: 'teal',
    borderWidth: 1,
  },
  destructive: {
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
  },
  bigText: {
    ...baseTextStyles,
    fontSize: 38,
  },
  smallText: {
    ...baseTextStyles,
    fontSize: 14,
  },
  small: {
    ...baseContainerStyles,
    paddingTop: 0,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 4,
  },
  big: {
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
  }
});
