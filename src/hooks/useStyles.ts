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

  return {
    bgPrimaryColor,
    bgPrimaryStyle,
    bgSecondaryColor,
    bgSecondaryStyle,
    txtPrimaryStyle,
    txtSecondaryStyle,
    txtDisableStyle,
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
    color: Colors.blackBright,
  },
  txtDisableLight: {
    color: Colors.greyDarken,
  },
});

export default useStyles;
