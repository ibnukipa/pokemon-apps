import React, {useCallback, useState} from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import useIsDarkMode from '../hooks/useIsDarkMode';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useStyles from '../hooks/useStyles';
import Illustration from './Illustration';
import Pokemon from '../assets/illustrations/pokemon.png';
import Bars from '../assets/icons/bars.svg';
import Times from '../assets/icons/times.svg';
import Icon from './Icon';
import getSize from '../utils/getSize';
import Colors from '../constants/Colors';
import MenuItem from './Menu/MenuItem';
import Divider from './Divider';
import useMenu from '../hooks/useMenu';

type Props = {
  title?: string;
  subtitle?: string;
  onLayout?: (event: LayoutChangeEvent) => void;
};

const HeaderWithMenu = ({onLayout}: Props) => {
  const insets = useSafeAreaInsets();

  const isDarkMode = useIsDarkMode();
  const {bgPrimaryColor, backdropStyle} = useStyles();
  const {menus} = useMenu();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isMenuShown, setIsMenuShown] = useState(false);

  const onHeaderLayout = useCallback(
    (event: LayoutChangeEvent) => {
      onLayout?.(event);
      setHeaderHeight(event.nativeEvent.layout.height);
    },
    [onLayout],
  );

  const toggleMenuPress = useCallback(() => {
    setIsMenuShown(active => !active);
  }, []);

  const renderMenuItem = useCallback(
    ({item}: {item: MenuItemType}) => {
      return (
        <MenuItem
          onPressCallback={toggleMenuPress}
          text={item.text}
          value={item.value}
          subItems={item.subItems}
        />
      );
    },
    [toggleMenuPress],
  );

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={bgPrimaryColor}
        animated={true}
      />
      <View
        onLayout={onHeaderLayout}
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            backgroundColor: bgPrimaryColor,
          },
        ]}>
        <Illustration
          align={'center'}
          width={'20%'}
          source={Pokemon}
          aspectRatio={1472 / 512}
        />
        <Icon
          onPress={toggleMenuPress}
          Svg={isMenuShown ? Times : Bars}
          variant={'secondary'}
        />
      </View>
      {isMenuShown && (
        <View
          style={[styles.menuContainer, {top: headerHeight}, backdropStyle]}>
          <View
            style={[
              styles.menuContentContainer,
              {backgroundColor: bgPrimaryColor, marginBottom: headerHeight},
            ]}>
            <FlatList
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              bounces={false}
              data={menus}
              renderItem={renderMenuItem}
              ItemSeparatorComponent={() => (
                <Divider size={'large'} variant={'line'} />
              )}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: getSize(16),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  menuContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 99,
    backgroundColor: Colors.black70,
  },
  menuContentContainer: {
    padding: getSize(24),
  },
});

export default HeaderWithMenu;
