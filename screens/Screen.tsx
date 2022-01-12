import * as React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  title: string;
  children: React.ReactNode;
};

export function Screen({ title, children }: Props) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});
