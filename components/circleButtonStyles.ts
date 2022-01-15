import { StyleSheet } from 'react-native';

export const svgSizes = {
  big: 60,
  small: 30
};

export const styles = StyleSheet.create({
  toggledPrimaryContainer: {
    backgroundColor: 'teal',
    border: '1px solid powderblue',
  },
  toggledPrimary: {
    color: 'powderblue',
  },
  primary: {
    color: 'teal',
  },
  destructive: {
    color: 'red',
  },
  container: {
    borderRadius: 3,
    alignContent: 'center',
    width: 'fit-content',
    border: '1px solid transparent',
  }
});
