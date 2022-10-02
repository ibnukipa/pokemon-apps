import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import useIsDarkMode from '../hooks/useIsDarkMode';
import Text from './Text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useStyles from '../hooks/useStyles';
import getSize from '../utils/getSize';

type Props = {
  title?: string;
  subtitle?: string;
};

const Header = ({title, subtitle}: Props) => {
  const insets = useSafeAreaInsets();
  const isDarkMode = useIsDarkMode();
  const {bgPrimaryColor} = useStyles();

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={bgPrimaryColor}
        animated={true}
      />
      <View
        style={[
          styles.container,
          {paddingTop: insets.top, backgroundColor: bgPrimaryColor},
        ]}>
        {title && (
          <Text size={'callout'} weight={'medium'}>
            {title}
          </Text>
        )}
        {subtitle && <Text size={'subhead'}>{subtitle}</Text>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: getSize(16),
  },
});

export default Header;
