import React, {useCallback} from 'react';
import HeaderWithMenu from '../components/HeaderWithMenu';
import Illustration from '../components/Illustration';
import {FlatList, StyleSheet, View} from 'react-native';
import Divider from '../components/Divider';
import Container from '../components/Container';
import {RouteProp, useRoute} from '@react-navigation/native';
import usePokemon from '../hooks/usePokemon';
import Text from '../components/Text';
import getSize from '../utils/getSize';
import useStyles from '../hooks/useStyles';
import PokemonTypePill from '../components/Pokemon/PokemonTypePill';
import PokemonAbilityPill from '../components/Pokemon/PokemonAbilityPill';
import PokemonStatPill from '../components/Pokemon/PokemonStatPill';
import PokemonSpritePill from '../components/Pokemon/PokemonSpritePill';
import usePokemonSpecie from '../hooks/usePokemonSpecie';
import useEvolutionChain from '../hooks/useEvolutionChain';
import PokemonEvolutionPill from '../components/Pokemon/PokemonEvolutionPill';

const PokemonScreen = () => {
  const route = useRoute<RouteProp<RouteList, 'Pokemon'>>();

  const {contentContainerStyle} = useStyles();
  const {
    pokemon,
    pokemonSource,
    pokemonName,
    pokemonTypes,
    pokemonAbilities,
    pokemonSprites,
    pokemonStats,
  } = usePokemon(route.params?.itemKey);

  const {pokemonSpecieEvoChain} = usePokemonSpecie(route.params?.itemKey);
  const {evolutionChains} = useEvolutionChain(
    pokemonSpecieEvoChain,
    route.params?.itemKey,
  );

  const renderAbility = useCallback((ability: any) => {
    return (
      <PokemonAbilityPill
        key={ability.name}
        ability={ability.name}
        disabled={ability.hidden}
      />
    );
  }, []);

  const renderType = useCallback(
    ({item}: any) => <PokemonTypePill key={item} type={item} />,
    [],
  );

  const renderSprite = useCallback(
    ({item}: any) => <PokemonSpritePill source={{uri: item}} />,
    [],
  );

  const renderStat = useCallback(({item: stat}: any) => {
    return (
      <PokemonStatPill
        key={stat.name}
        statName={stat.name}
        statValue={stat.value}
      />
    );
  }, []);

  const renderEvolution = useCallback(
    ({item, index}: any) => {
      return (
        <PokemonEvolutionPill
          itemKey={item.name}
          itemNextEvolutionCount={item.nextEvolutionCount}
          index={index}
          isLastItem={evolutionChains.length - 1 === index}
          isCurrentPokemon={item.name === pokemon.name}
        />
      );
    },
    [evolutionChains.length, pokemon.name],
  );

  return (
    <>
      <HeaderWithMenu />
      <Container mode={'scroll'}>
        <Divider size={'extra-large'} />
        <View style={styles.contentContainer}>
          <Text weight={'bold'} size={'extra-heading'}>
            {pokemonName}
          </Text>
        </View>
        <Divider size={'extra-large'} />
        <View style={styles.contentContainer}>
          <Illustration
            align={'center'}
            source={pokemonSource}
            aspectRatio={1}
          />
          <Divider />
        </View>
        <View style={[styles.itemContainer]}>
          <View style={styles.itemTitle}>
            <Text variant={'secondary'} size={'footnote'} weight={'semi-bold'}>
              DETAILS
            </Text>
          </View>
          <View style={[styles.itemContentContainer, contentContainerStyle]}>
            <View style={styles.item}>
              <Text size={'subhead'} variant={'secondary'} weight={'semi-bold'}>
                WEIGHT
              </Text>
              <Text weight={'medium'}>{pokemon.weight}</Text>
            </View>
            <View style={styles.item}>
              <Text size={'subhead'} variant={'secondary'} weight={'semi-bold'}>
                HEIGHT
              </Text>
              <Text weight={'medium'}>{pokemon.height}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.itemContainer]}>
          <View style={styles.itemTitle}>
            <Text variant={'secondary'} size={'footnote'} weight={'semi-bold'}>
              ABILITIES
            </Text>
          </View>
          <View style={[styles.itemContentContainer, contentContainerStyle]}>
            {pokemonAbilities.map(renderAbility)}
          </View>
        </View>
        <View style={[styles.itemContainer]}>
          <View style={styles.itemTitle}>
            <Text variant={'secondary'} size={'footnote'} weight={'semi-bold'}>
              TYPES
            </Text>
          </View>
          <View>
            <FlatList
              data={pokemonTypes}
              style={styles.itemContentRowContainer}
              renderItem={renderType}
              numColumns={3}
            />
          </View>
        </View>
        <View style={[styles.itemContainer]}>
          <View style={styles.itemTitle}>
            <Text variant={'secondary'} size={'footnote'} weight={'semi-bold'}>
              OTHER IMAGES
            </Text>
          </View>
          <View>
            <FlatList
              data={pokemonSprites}
              style={styles.itemContentRowContainer}
              renderItem={renderSprite}
              numColumns={3}
            />
          </View>
        </View>
        <View style={[styles.itemContainer]}>
          <View style={styles.itemTitle}>
            <Text variant={'secondary'} size={'footnote'} weight={'semi-bold'}>
              STATS
            </Text>
          </View>
          <View>
            <FlatList
              data={pokemonStats}
              style={styles.itemContentRowContainer}
              renderItem={renderStat}
              numColumns={3}
            />
          </View>
        </View>
        <View style={[styles.itemContainer]}>
          <View style={styles.itemTitle}>
            <Text variant={'secondary'} size={'footnote'} weight={'semi-bold'}>
              EVOLUTION
            </Text>
          </View>
          <View>
            <FlatList
              data={evolutionChains}
              style={styles.itemContentRowContainer}
              renderItem={renderEvolution}
              numColumns={3}
            />
          </View>
        </View>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: getSize(36),
  },
  itemTitle: {
    marginBottom: getSize(5),
  },
  itemContainer: {
    marginHorizontal: getSize(36),
    marginBottom: getSize(30),
  },
  itemContentContainer: {
    paddingVertical: getSize(10),
    paddingHorizontal: getSize(15),
    borderRadius: getSize(10),
  },
  itemContentRowContainer: {
    marginHorizontal: -getSize(4),
  },
  item: {
    alignItems: 'center',
    marginVertical: getSize(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PokemonScreen;
