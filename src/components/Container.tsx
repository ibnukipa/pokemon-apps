import React, {PropsWithChildren, useMemo} from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import useContainer from '../hooks/useContainer';

type Props = {
  withHeader?: boolean;
  mode?: 'scroll' | 'view';
  hideScrollbar?: boolean;
  transparent?: boolean;
  inModal?: boolean;
};

const Container = ({
  children,
  withHeader = true,
  mode = 'view',
  hideScrollbar = true,
  transparent = false,
  inModal = false,
}: PropsWithChildren<Props>) => {
  const {
    containerStyle,
    containerContentStyle,
    statusBarStyle,
    statusBarBackgroundColor,
    statusBarAnimated,
  } = useContainer(withHeader, inModal);

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
      style={[containerStyle, transparent && styles.transparent]}
      contentContainerStyle={[
        containerContentStyle,
        transparent && styles.transparent,
      ]}
      showsHorizontalScrollIndicator={!hideScrollbar}
      showsVerticalScrollIndicator={!hideScrollbar}>
      {!withHeader && (
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={statusBarBackgroundColor}
          animated={statusBarAnimated}
        />
      )}
      {children}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  transparent: {
    backgroundColor: 'transparent',
  },
});

export default Container;
