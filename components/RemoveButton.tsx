import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Text, GestureResponderEvent, Pressable } from 'react-native';
import { CircleButtonProps } from './CircleButton';
import { destructiveBackground, styles, svgSizes } from './circleButtonStyles';

type Props = {
  onPress?: (e: GestureResponderEvent) => void;
} & CircleButtonProps;
export const RemoveButton: React.FC<Props> = ({ size = 'small', onPress }) => {
  const kind = 'destructive';
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles[kind]}><RemoveSvg size={svgSizes[size]} fill={destructiveBackground} /></Text>
    </Pressable>
  );
}

const RemoveSvg: React.FC<{ fill: string, size?: number }> = ({ size = 10, fill }) => {
  return (
    <Svg
      height={size.toString()}
      width={size.toString()}
      fill={fill}
      viewBox="0 0 24 24"
    >
        <Path
          d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
        />
      </Svg>
  );
};
