import React, {memo, useEffect, useMemo} from 'react';
import {ImageProps, StyleSheet, View} from 'react-native';
import Text from '../Text';
import useData from '../../hooks/useData';
import getPokemon from '../../sevices/getPokemon';
import useAppSelector from '../../hooks/useAppSelector';
import {getByIdSelector} from '../../states/reducers/db';
import useIsDarkMode from '../../hooks/useIsDarkMode';
import Colors from '../../constants/Colors';
import getSize from '../../utils/getSize';
import Illustration from '../Illustration';
import {isEmpty, padStart, startCase} from 'lodash';
import Divider from '../Divider';
import PokemonTypePill from './PokemonTypePill';
import Logo from '../../assets/logo.png';
import LoadingFill from '../LoadingFill';

type Props = {
  id: number | string;
};

const useContainerStyle = () => {
  const isDarkMode = useIsDarkMode();
  return useMemo(() => {
    if (isDarkMode) {
      return styles.containerDark;
    } else {
      return styles.containerLight;
    }
  }, [isDarkMode]);
};

const PokemonCard = memo(({id}: Props) => {
  const isDarkMode = useIsDarkMode();
  const containerStyle = useContainerStyle();

  const pokemon = useAppSelector(state =>
    getByIdSelector(state, {model: 'pokemons', id}),
  );

  const {refresh, isLoading} = useData({
    fetcher: getPokemon,
    model: 'pokemons',
    id,
    omitKeys: ['abilities', 'forms', 'game_indices', 'held_items', 'moves'],
  });

  const pokemonSource: ImageProps['source'] = useMemo(() => {
    const pokemonUri =
      pokemon.sprites?.other?.['official-artwork']?.front_default;
    if (isLoading || !pokemonUri) {
      return Logo;
    } else {
      return {
        uri: pokemonUri,
      };
    }
  }, [isLoading, pokemon.sprites?.other]);

  const pokemonCode: string = useMemo(() => {
    return `#${padStart(isLoading ? '0' : pokemon.id, 4, '0')}`;
  }, [isLoading, pokemon.id]);

  const pokemonName: string = useMemo(() => {
    return isLoading ? 'Pokè Name' : startCase(pokemon.name);
  }, [isLoading, pokemon.name]);

  useEffect(() => {
    if (!pokemon.height || !pokemon.weight) {
      refresh();
    }
  }, [pokemon, refresh]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.illustrationContainer}>
        <Illustration
          width={'80%'}
          align={'center'}
          source={pokemonSource}
          aspectRatio={1}
        />
      </View>
      <View
        style={[
          styles.contentContainer,
          isDarkMode
            ? styles.contentContainerDark
            : styles.contentContainerLight,
        ]}>
        <Text variant={'secondary'} size={'subhead'} weight={'bold'}>
          {pokemonCode}
        </Text>
        <Divider size={'small'} />
        <Text weight={'bold'} size={'heading2'}>
          {pokemonName}
        </Text>
        {!isEmpty(pokemon.types) && (
          <>
            <Divider size={'small'} />
            <View style={styles.typeContainer}>
              {pokemon.types.map((item: any) => {
                return (
                  <PokemonTypePill key={item.type.name} type={item.type.name} />
                );
              })}
            </View>
          </>
        )}
      </View>
      {isLoading && <LoadingFill borderRadius={getSize(24)} />}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: getSize(24),
  },
  containerDark: {
    backgroundColor: Colors.blackLighter,
  },
  containerLight: {
    backgroundColor: Colors.white,
  },
  illustrationContainer: {
    marginTop: getSize(25),
  },
  contentContainer: {
    marginHorizontal: getSize(10),
    marginBottom: getSize(10),
    padding: getSize(15),
    borderRadius: getSize(15),
  },
  contentContainerDark: {
    backgroundColor: Colors.white03,
  },
  contentContainerLight: {
    backgroundColor: Colors.black03,
  },
  typeContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: -4,
    marginVertical: -4,
  },
});

export default PokemonCard;
