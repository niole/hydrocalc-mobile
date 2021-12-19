import * as React from 'react';
import { View } from 'react-native';

type Props = {
  title: string;
  children: React.ReactElement;
};

export function Screen({ title, children }: Props) {
  return (
    <View>
      {children}
    </View>
  );
}
