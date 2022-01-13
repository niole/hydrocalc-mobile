import * as React from 'react';
import { GestureResponderEvent, Text, Pressable } from 'react-native';

type Props = {
  onPress: (e: GestureResponderEvent) => void;
};
export const AddButton: React.FC<Props> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text>
        +
      </Text>
    </Pressable>
  );
}
