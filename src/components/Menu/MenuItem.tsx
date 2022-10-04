import React, {useCallback, useMemo} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../Text';
import useAppSelector from '../../hooks/useAppSelector';
import {getActiveMenu, selectMenu} from '../../states/reducers/menu';
import Colors, {DarkColors, LightColors} from '../../constants/Colors';
import useIsDarkMode from '../../hooks/useIsDarkMode';
import useAppDispatch from '../../hooks/useAppDispatch';
import Menu from '../../constants/Menu';
import {useNavigation} from '@react-navigation/native';
import getSize from '../../utils/getSize';
import Divider from '../Divider';
import {find, isEmpty} from 'lodash';

const MenuItem = ({
  text,
  value,
  subItems,
  level = 0,
  onPressCallback,
}: MenuItemType) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RouteScreenNavigationProp>();

  const isDarkMode = useIsDarkMode();
  const activeMenu = useAppSelector(getActiveMenu);

  const isActive = useMemo(() => {
    // TODO make this active flag deep into lowest subitems
    return activeMenu === value || find(subItems, ['value', activeMenu]);
  }, [activeMenu, value, subItems]);

  const selectedStyle = useMemo(() => {
    if (isActive) {
      // @ts-ignore
      const menuColor = Colors[value];
      if (!menuColor) {
        if (isDarkMode) {
          return styles.selectedDark;
        } else {
          return styles.selectedLight;
        }
      } else {
        return {
          color: menuColor,
        };
      }
    }
  }, [isActive, isDarkMode, value]);

  const onSelectPress = useCallback(() => {
    switch (value) {
      case Menu.HOME:
        dispatch(selectMenu({value}));
        onPressCallback?.();
        navigation.navigate('Dashboard');
        break;
      case Menu.POKEMON_TYPES:
        dispatch(selectMenu({value}));
        break;
      default:
        if (activeMenu !== Menu.HOME) {
          dispatch(selectMenu({value}));
          onPressCallback?.();
          navigation.navigate('PokemonType', {type: value});
        }
        break;
    }
  }, [navigation, dispatch, value, activeMenu, onPressCallback]);

  const renderSubItem = useCallback(
    ({item}: {item: MenuItemType}) => {
      return (
        <MenuItem
          onPressCallback={onPressCallback}
          level={level + 1}
          text={item.text}
          value={item.value}
        />
      );
    },
    [level, onPressCallback],
  );

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onSelectPress}>
      <Text
        style={[selectedStyle, {paddingLeft: getSize(20) * level}]}
        size={'callout'}
        weight={isActive ? 'bold' : 'regular'}>
        {text}
      </Text>
      {isActive && !isEmpty(subItems) && (
        <FlatList
          style={styles.subItemContentContainer}
          data={subItems}
          renderItem={renderSubItem}
          ItemSeparatorComponent={() => <Divider variant={'line'} />}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectedDark: {
    color: DarkColors.yellowTosca,
  },
  selectedLight: {
    color: LightColors.yellowTosca,
  },
  subItemContentContainer: {
    paddingVertical: getSize(15),
  },
});

export default MenuItem;
