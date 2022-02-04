import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { Text, Pressable } from 'react-native';
import { CircleButtonProps } from './CircleButton';
import { svgSizes } from './circleButtonStyles';

type Props = {
  onPress: () => void;
} & CircleButtonProps;

export const MoreButton: React.FC<Props> = ({ size = 'small', onPress }) => (
  <Pressable onPress={onPress}>
    <Text style={{}}>
      <MoreSvg size={svgSizes[size]} fill="grey" />
    </Text>
  </Pressable>
);


const MoreSvg: React.FC<{ fill: string, size?: number }> = ({ size = 10, fill }) => {
  return (
    <Svg
      height={size}
      width={size}
      fill={fill}
      viewBox="0 0 24 24"
    >
        <Path
          d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        />
      </Svg>
  );
};
