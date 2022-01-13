import * as React from 'react';
import { GestureResponderEvent } from 'react-native';
import { CircleButtonProps, CircleButton } from './CircleButton';

type Props = {
  onPress: (e: GestureResponderEvent) => void;
} & CircleButtonProps;

export const AddButton: React.FC<Props> = ({ size, onPress }) => {
  return (
    <CircleButton size={size} onPress={onPress}>+</CircleButton>
  );
};
