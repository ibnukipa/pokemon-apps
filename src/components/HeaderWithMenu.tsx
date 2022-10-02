import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import useIsDarkMode from '../hooks/useIsDarkMode';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useStyles from '../hooks/useStyles';
import Illustration from './Illustration';
import Pokemon from '../assets/illustrations/pokemon.png';
import Bars from '../assets/icons/bars.svg';
import Icon from './Icon';
import getSize from '../utils/getSize';

type Props = {
  title?: string;
  subtitle?: string;
};

const HeaderWithMenu = ({}: Props) => {
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
          {
            paddingTop: insets.top + getSize(8),
            backgroundColor: bgPrimaryColor,
          },
        ]}>
        <Illustration width={'20%'} source={Pokemon} aspectRatio={1472 / 512} />
        <View />
        <View>
          <Icon Svg={Bars} variant={'secondary'} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: getSize(16),
    paddingVertical: getSize(8),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default HeaderWithMenu;
