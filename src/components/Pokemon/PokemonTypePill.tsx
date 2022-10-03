import React from 'react';
import {StyleSheet, View} from 'react-native';
import getSize from '../../utils/getSize';
import Colors from '../../constants/Colors';
import Text from '../Text';
import {startCase} from 'lodash';

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
};

const PokemonTypePill = ({type}: Props) => {
  return (
    <View style={[styles.container, {backgroundColor: Colors[type]}]}>
      <Text
        align={'center'}
        size={'footnote'}
        weight={'bold'}
        style={styles.text}>
        {startCase(type)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: getSize(25),
    margin: 4,
    paddingHorizontal: getSize(10),
    paddingVertical: getSize(5),
    minWidth: '25%',
  },
  text: {
    color: Colors.white,
  },
});

export default PokemonTypePill;
