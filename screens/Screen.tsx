import * as React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  title: string;
  children: React.ReactElement;
};

export function Screen({ title, children }: Props) {
  return (
    <View style={styles.container}>
      <View>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

