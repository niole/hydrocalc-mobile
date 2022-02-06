import ReactToast from 'react-native-root-toast';

export const Toast = {
  error: (msg: string) => {
    ReactToast.show(
      msg,
      {
          duration: 60000,
          position: ReactToast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
      }
    );
  },
  success: (msg: string) => {
    ReactToast.show(
      msg,
      {
          duration: ReactToast.durations.SHORT,
          position: ReactToast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
      }
    );
  }
};
