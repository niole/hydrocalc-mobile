import * as React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  children?: any;
};

export const Section: React.FC<Props> = ({ children }) => <View style={styles.section}>{children}</View>;

const styles = StyleSheet.create({ section: { /*padding: 5*/ }});
