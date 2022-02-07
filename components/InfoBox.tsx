import * as React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import fontSizes from '../constants/FontSizes';
import { Title } from './Title';

type Props = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  onPress?: () => void;
};

export const InfoBox: React.FC<Props> = ({ title, children, onPress }) =>  {
  const TextView =  (
    <View style={styles.container}>
      {title && <Title textAlign="center">{title}</Title>}
      <Text style={styles.text}>{children}</Text>
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{TextView}</Pressable>
  }
  return TextView;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
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
