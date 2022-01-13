import * as React from 'react';
import { GestureResponderEvent } from 'react-native';
import { CircleButtonProps, CircleButton } from './CircleButton';

type Props = {
  onPress?: (e: GestureResponderEvent) => void;
} & CircleButtonProps;
export const RemoveButton: React.FC<Props> = ({ size, onPress }) => {
  return (
    <CircleButton size={size} kind="destructive" onPress={onPress}>x</CircleButton>
  );
}

