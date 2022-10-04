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
  numCols?: number;
};

const PokemonTypePill = ({type, numCols = 3}: Props) => {
  return (
    <View
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
    </View>
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
