import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Text, GestureResponderEvent, Pressable } from 'react-native';
import { CircleButtonProps } from './CircleButton';
import { primaryBackground, styles, svgSizes } from './circleButtonStyles';

type Props = {
  onPress: (e: GestureResponderEvent) => void;
} & CircleButtonProps;

export const CheckButton: React.FC<Props> = ({ size = 'small', toggled = false, onPress }) => {
  const containerStyles = toggled ? [styles.container, styles.toggledPrimaryContainer] : styles.container;
  const kind = toggled ? 'toggledPrimary' : 'primary';
  return (
    <Pressable onPress={onPress} style={containerStyles}>
      <Text style={styles[kind]}><CheckSvg size={svgSizes[size]} fill={primaryBackground} /></Text>
    </Pressable>
  );
};

const CheckSvg: React.FC<{ fill: string, size?: number }> = ({ size = 10, fill }) => {
  return (
    <Svg
      height={size.toString()}
      width={size.toString()}
      fill={fill}
      viewBox="0 0 24 24"
    >
        <Path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29 5.7 12.7a.9959.9959 0 0 1 0-1.41c.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z"
        />
  </Svg>
  );
};
