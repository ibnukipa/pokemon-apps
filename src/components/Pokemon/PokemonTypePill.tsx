import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import getSize from '../../utils/getSize';
import Colors from '../../constants/Colors';
import Text from '../Text';
import {startCase} from 'lodash';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

type Type =
  | 'bug'
  | 'dark'
  | 'dragon'
  | 'electric'
  | 'fairy'
  | 'fighting'
  | 'fire'
  | 'flying'
  | 'ghost'
  | 'grass'
  | 'ground'
  | 'normal'
  | 'ice'
  | 'poison'
  | 'psychic'
  | 'rock'
  | 'shadow'
  | 'steel'
  | 'unknown'
  | 'water';

type Props = {
  type: Type;
  numCols?: number;
  inModal?: boolean;
};

const PokemonTypePill = ({type, numCols = 3, inModal = false}: Props) => {
  const route = useRoute<RouteProp<RouteList, 'PokemonType'>>();
  const navigation = useNavigation<RouteScreenNavigationProp>();
  const onPress = useCallback(() => {
    if (route.params?.type !== type) {
      if (inModal) {
        navigation.goBack();
      }
      navigation.push('PokemonType', {type});
    }
  }, [inModal, route.params?.type, type, navigation]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        {backgroundColor: Colors[type], flex: 1 / numCols},
      ]}>
      <Text
        align={'center'}
        size={'footnote'}
        weight={'bold'}
        style={styles.text}>
        {startCase(type)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: getSize(25),
    paddingVertical: getSize(5),
    margin: getSize(4),
  },
  text: {
    color: Colors.white,
  },
});

export default PokemonTypePill;
