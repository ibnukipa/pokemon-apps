import {useMemo} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useIsDarkMode from './useIsDarkMode';
import useStyles from './useStyles';
import {StatusBarStyle, StyleSheet} from 'react-native';

const useContainer: (withHeader?: boolean) => {
  containerStyle: any;
  containerContentStyle: any;
  statusBarStyle: StatusBarStyle;
  statusBarBackgroundColor: string;
  statusBarAnimated: boolean;
} = (withHeader = true) => {
  const insets = useSafeAreaInsets();
  const isDarkMode = useIsDarkMode();
  const {bgPrimaryStyle, bgSecondaryColor} = useStyles();

  const containerStyle = useMemo(() => {
    return [styles.container, {paddingBottom: insets.bottom}, bgPrimaryStyle];
  }, [bgPrimaryStyle, insets.bottom]);

  const containerContentStyle = useMemo(() => {
    return [
      !withHeader && {paddingTop: insets.top},
      {paddingBottom: insets.bottom},
    ];
  }, [insets.bottom, insets.top, withHeader]);

  const statusBarStyle = useMemo(() => {
    return isDarkMode ? 'light-content' : 'dark-content';
  }, [isDarkMode]);

  return {
    containerStyle,
    containerContentStyle,
    statusBarStyle,
    statusBarBackgroundColor: bgSecondaryColor,
    statusBarAnimated: true,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default useContainer;
