import React, {PropsWithChildren, useMemo} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import useContainer from '../hooks/useContainer';

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
  const {
    containerStyle,
    containerContentStyle,
    statusBarStyle,
    statusBarBackgroundColor,
    statusBarAnimated,
  } = useContainer(withHeader);
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
      style={containerStyle}
      contentContainerStyle={containerContentStyle}
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

export default Container;
