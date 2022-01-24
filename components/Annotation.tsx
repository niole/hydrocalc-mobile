import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import fontSizes from '../constants/FontSizes';

type Props = {
  children?: string;
};

export const Annotation: React.FC<Props> = ({ children }) =>
<Text style={styles.container}>{children}</Text>;

const styles = StyleSheet.create({
  container: {
    color: 'grey',
    fontSize: fontSizes.tiny,
  }
});
