import * as React from 'react';
import { Text, GestureResponderEvent, Pressable } from 'react-native';
import { CircleButtonProps } from './CircleButton';
import { styles, svgSizes } from './circleButtonStyles';

type Props = {
  onPress: (e: GestureResponderEvent) => void;
} & CircleButtonProps;

export const AddButton: React.FC<Props> = ({ size = 'small', onPress }) => {
  const kind = 'primary';
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles[kind]}><AddSvg size={svgSizes[size]} /></Text>
    </Pressable>
  );
};

const AddSvg: React.FC<{ size?: number }> = ({ size }) => {
  return (
    <svg
      fill="currentColor"
      height={size}
      width={size}
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="AddCircleIcon"
      tabIndex={-1}
    >
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
        >
        </path>
      </svg>
  );
};
