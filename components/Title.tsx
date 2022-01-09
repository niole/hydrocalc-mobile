import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  children?: React.ReactNode;
  subTitle?: React.ReactNode;
};

export const Title: React.FC<Props> = ({ subTitle, children }) => (
  <View style={styles.titleContainer}>
    <Text style={styles.titleText}>{children}</Text>
    {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
  </View>
);

export const Subtitle: React.FC<{ children?: string }> = ({ children }) => (
  <Text style={styles.subTitle}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleContainer: {
    paddingBottom: 10
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 7
  },
});
