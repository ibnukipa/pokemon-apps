import React, {useCallback, useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import getSize from '../../utils/getSize';
import Text from '../Text';
import {startCase} from 'lodash';
import useStyles from '../../hooks/useStyles';
import Illustration from '../Illustration';
import usePokemon from '../../hooks/usePokemon';
import ArrowRight from '../../assets/icons/arrow-right.svg';
import Times from '../../assets/icons/times.svg';
import Icon from '../Icon';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../constants/Colors';

type Props = {
  itemKey: string | number;
  index: number;
  itemNextEvolutionCount: number;
  isLastItem: boolean;
  isCurrentPokemon: boolean;
};

const PokemonEvolutionPill = ({
  itemKey,
  isLastItem,
  isCurrentPokemon,
}: Props) => {
  const navigation = useNavigation<RouteScreenNavigationProp>();
  const {contentContainerStyle, txtSecondaryStyle, txtPrimaryStyle} =
    useStyles();

  const {pokemonSource, pokemonTypes} = usePokemon(itemKey);

  const borderColor = useMemo(() => {
    // @ts-ignore
    return Colors[pokemonTypes[0]];
  }, [pokemonTypes]);

  const textColor = useMemo(() => {
    if (isCurrentPokemon) {
      return txtPrimaryStyle.color;
    } else {
      return txtSecondaryStyle.color;
    }
  }, [isCurrentPokemon, txtPrimaryStyle.color, txtSecondaryStyle.color]);

  const pokemonPress = useCallback(() => {
    navigation.navigate('Pokemon', {itemKey});
  }, [itemKey, navigation]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={pokemonPress}
      style={[styles.container]}>
      <View style={styles.contentContainer}>
        <View
          style={[styles.illustration, {borderColor}, contentContainerStyle]}>
          <Illustration
            opacity={!isCurrentPokemon ? 0.7 : 1}
            source={pokemonSource}
            aspectRatio={1}
          />
        </View>
        <View style={styles.arrowIcon}>
          <Icon
            disabled={isLastItem}
            Svg={!isLastItem ? ArrowRight : Times}
            variant={'secondary'}
          />
        </View>
      </View>
      <Text style={{color: textColor}} size={'caption2'} weight={'medium'}>
        {startCase(itemKey.toString())}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 / 3,
    justifyContent: 'center',
    alignItems: 'center',
    margin: getSize(4),
    marginRight: getSize(20),
  },
  illustration: {
    borderWidth: getSize(1),
    borderRadius: 100,
    padding: getSize(10),
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    position: 'absolute',
    right: -getSize(20),
  },
});

export default PokemonEvolutionPill;
