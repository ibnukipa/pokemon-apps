import React, {PropsWithChildren, useMemo} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useStyles from '../hooks/useStyles';
import useIsDarkMode from '../hooks/useIsDarkMode';

type Props = {
  withHeader?: boolean;
  mode?: 'scroll' | 'view';
  hideScrollbar?: boolean;
};

const Container = ({
  children,
  withHeader = true,
  mode = 'view',
  hideScrollbar = true,
}: PropsWithChildren<Props>) => {
  const insets = useSafeAreaInsets();
  const {bgPrimaryStyle, bgSecondaryColor} = useStyles();
  const isDarkMode = useIsDarkMode();

  const Wrapper = useMemo(() => {
    switch (mode) {
      case 'scroll':
        return ScrollView;
      default:
        return View;
    }
  }, [mode]);

  return (
    <Wrapper
      style={[styles.container, {paddingBottom: insets.bottom}, bgPrimaryStyle]}
      contentContainerStyle={[
        !withHeader && {paddingTop: insets.top},
        {paddingBottom: insets.bottom},
      ]}
      showsHorizontalScrollIndicator={!hideScrollbar}
      showsVerticalScrollIndicator={!hideScrollbar}>
      {!withHeader && (
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={bgSecondaryColor}
          animated={true}
        />
      )}
      {children}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Container;
