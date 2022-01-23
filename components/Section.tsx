import * as React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  children?: any;
  bordered?: boolean;
  topOnly?: boolean;
};

export const Section: React.FC<Props> = ({ children, bordered = false, topOnly = false }) => (
  <View
    style={bordered ? [topOnly ? styles.borderedTopSection : styles.borderedBottomSection, styles.section] : styles.section}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  borderedTopSection: {
    borderColor: 'lightgray',
    borderTopWidth: 1,
  },
  borderedBottomSection: {
    borderColor: 'lightgray',
    borderBottomWidth: 1,
  },
  section: { marginTop: 10, marginBottom: 10, paddingTop: 10, paddingBottom: 10 }
});
