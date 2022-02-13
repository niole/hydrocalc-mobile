import * as React from 'react';
import { ViewStyle, StyleSheet, View } from 'react-native';

type Props = {
  children?: any;
  bordered?: boolean;
  topOnly?: boolean;
  top?: boolean;
  style?: ViewStyle[];
};

export const Section: React.FC<Props> = ({ style = [], children, top = false, bordered = false, topOnly = false }) => {
  const baseStyle = [...style, styles.section];
  return (
    <View
      style={bordered ? [...baseStyle, ...(topOnly ? [styles.borderedTopSection] : top ? [styles.borderedTopSection, styles.borderedBottomSection] : [styles.borderedBottomSection])] : baseStyle}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  borderedTopSection: {
    borderColor: 'lightgray',
    borderTopWidth: 1,
  },
  borderedBottomSection: {
    borderColor: 'lightgray',
    borderBottomWidth: 1,
  },
  section: { paddingTop: 20, paddingBottom: 20 }
});
