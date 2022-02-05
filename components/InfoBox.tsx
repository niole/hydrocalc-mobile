import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import fontSizes from '../constants/FontSizes';
import { Title } from './Title';

type Props = {
  title?: React.ReactNode;
  children?: React.ReactNode;
};

export const InfoBox: React.FC<Props> = ({ title, children }) => (
  <View style={styles.container}>
    {title && <Title textAlign="center">{title}</Title>}
    <Text style={styles.text}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderColor: 'rgb(0, 122, 255)',
    borderWidth: 5,
    margin: 22,
    padding: 22,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: fontSizes.medium,
  }
});
