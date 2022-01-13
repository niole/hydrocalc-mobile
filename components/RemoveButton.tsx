import * as React from 'react';
import { GestureResponderEvent, Text, Pressable } from 'react-native';

type Props = {
  onPress: (e: GestureResponderEvent) => void;
};
export const RemoveButton: React.FC<Props> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text>
        x
      </Text>
    </Pressable>
  );
}

