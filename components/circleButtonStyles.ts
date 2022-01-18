import { StyleSheet } from 'react-native';

export const svgSizes = {
  big: 60,
  small: 30
};

export const primaryBackground = 'teal';

export const destructiveBackground = 'red';

export const styles = StyleSheet.create({
  toggledPrimaryContainer: {
    backgroundColor: primaryBackground,
    borderColor: 'powderblue',
    borderWidth: 1,
  },
  toggledPrimary: {
    color: 'powderblue',
  },
  primary: {
    color: primaryBackground,
  },
  destructive: {
    color: 'red',
  },
  container: {
    borderRadius: 3,
    alignContent: 'center',
    borderColor: 'transparent',
    borderWidth: 1,
  }
});
