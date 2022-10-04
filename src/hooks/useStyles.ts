import useIsDarkMode from './useIsDarkMode';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

const useStyles = () => {
  const isDarkMode = useIsDarkMode();

  const bgPrimaryColor = useMemo(() => {
    if (isDarkMode) {
      return Colors.black;
    } else {
      return Colors.white;
    }
  }, [isDarkMode]);

  const bgPrimaryStyle = useMemo(() => {
    if (isDarkMode) {
      return styles.bgPrimaryDark;
    } else {
      return styles.bgPrimaryLight;
    }
  }, [isDarkMode]);

  const bgSecondaryColor = useMemo(() => {
    if (isDarkMode) {
      return Colors.blackLighter;
    } else {
      return Colors.grey;
    }
  }, [isDarkMode]);

  const bgSecondaryStyle = useMemo(() => {
    if (isDarkMode) {
      return styles.bgSecondaryDark;
    } else {
      return styles.bgSecondaryLight;
    }
  }, [isDarkMode]);

  const txtPrimaryStyle = useMemo(() => {
    if (isDarkMode) {
      return styles.txtPrimaryLight;
    } else {
      return styles.txtPrimaryDark;
    }
  }, [isDarkMode]);

  const txtSecondaryStyle = useMemo(() => {
    if (isDarkMode) {
      return styles.txtSecondaryDark;
    } else {
      return styles.txtSecondaryLight;
    }
  }, [isDarkMode]);

  const txtDisableStyle = useMemo(() => {
    if (isDarkMode) {
      return styles.txtDisableDark;
    } else {
      return styles.txtDisableLight;
    }
  }, [isDarkMode]);

  const contentContainerStyle = useMemo(() => {
    if (isDarkMode) {
      return styles.contentContainerDark;
    } else {
      return styles.contentContainerLight;
    }
  }, [isDarkMode]);

  const contentBackgroundStyle = useMemo(() => {
    if (isDarkMode) {
      return styles.contentBackgroundDark;
    } else {
      return styles.contentBackgroundLight;
    }
  }, [isDarkMode]);

  const backdropStyle = useMemo(() => {
    if (isDarkMode) {
      return styles.backdropDark;
    } else {
      return styles.backdropLight;
    }
  }, [isDarkMode]);

  return {
    bgPrimaryColor,
    bgPrimaryStyle,
    bgSecondaryColor,
    bgSecondaryStyle,
    txtPrimaryStyle,
    txtSecondaryStyle,
    txtDisableStyle,
    contentContainerStyle,
    backdropStyle,
    contentBackgroundStyle,
  };
};

const styles = StyleSheet.create({
  bgPrimaryDark: {
    backgroundColor: Colors.black,
  },
  bgPrimaryLight: {
    backgroundColor: Colors.white,
  },
  bgSecondaryDark: {
    backgroundColor: Colors.blackLighter,
  },
  bgSecondaryLight: {
    backgroundColor: Colors.grey,
  },
  txtPrimaryDark: {
    color: Colors.black,
  },
  txtPrimaryLight: {
    color: Colors.white,
  },
  txtSecondaryDark: {
    color: Colors.blackBright,
  },
  txtSecondaryLight: {
    color: Colors.greyDarker,
  },
  txtDisableDark: {
    color: Colors.blackLighter,
  },
  txtDisableLight: {
    color: Colors.grey,
  },
  contentContainerDark: {
    backgroundColor: Colors.white03,
  },
  contentContainerLight: {
    backgroundColor: Colors.black03,
  },
  contentBackgroundDark: {
    backgroundColor: Colors.black80,
    shadowColor: Colors.black80,
    borderWidth: 1,
    borderColor: Colors.blackLighter,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },
  contentBackgroundLight: {
    backgroundColor: Colors.white80,
    shadowColor: Colors.white80,
    borderWidth: 1,
    borderColor: Colors.grey,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },
  backdropDark: {
    backgroundColor: Colors.black70,
  },
  backdropLight: {
    backgroundColor: Colors.black70,
  },
});

export default useStyles;
