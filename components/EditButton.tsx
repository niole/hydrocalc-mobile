import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Text, GestureResponderEvent, Pressable } from 'react-native';
import { CircleButtonProps } from './CircleButton';
import { primaryBackground, styles, svgSizes } from './circleButtonStyles';
import { CheckButton } from './CheckButton';

type Props = {
  onPress: (e: GestureResponderEvent) => void;
} & CircleButtonProps;

export const EditButton: React.FC<Props> = ({ size = 'small', toggled = false, onPress }) => {
  return toggled ? <CheckButton onPress={onPress} /> : (
    <Pressable onPress={onPress} style={styles.container}>
      <Text><EditSvg size={svgSizes[size]} fill={primaryBackground} /></Text>
    </Pressable>
  );
};

const EditSvg: React.FC<{ fill: string, size?: number }> = ({ size = 10, fill }) => {
  return (
    <Svg
      height={size.toString()}
      width={size.toString()}
      fill={fill}
      viewBox="0 0 24 24"
    >
        <Path
          d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
        />
      </Svg>
  );
};
