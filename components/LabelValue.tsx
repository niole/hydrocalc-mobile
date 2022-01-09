import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  label?: string;
  value?: string;
};

export const LabelValue: React.FC<Props> = ({ label, value }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Text>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
    paddingRight: '5px',
  }
});

