import * as React from 'react';
import { Text, GestureResponderEvent, Pressable } from 'react-native';
import { CircleButtonProps } from './CircleButton';
import { styles, svgSizes } from './circleButtonStyles';

type Props = {
  onPress: (e: GestureResponderEvent) => void;
} & CircleButtonProps;

export const EditButton: React.FC<Props> = ({ size = 'small', toggled = false, onPress }) => {
  const containerStyles = toggled ? [styles.container, styles.toggledPrimaryContainer] : styles.container;
  const kind = toggled ? 'toggledPrimary' : 'primary';
  return (
    <Pressable onPress={onPress} style={containerStyles}>
      <Text style={styles[kind]}><Svg size={svgSizes[size]} /></Text>
    </Pressable>
  );
};

const Svg: React.FC<{ size?: number }> = ({ size }) => {
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
          d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
        >
        </path>
      </svg>
  );
};
