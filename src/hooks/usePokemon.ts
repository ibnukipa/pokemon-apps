import {ImageProps} from 'react-native';
import {useEffect, useMemo} from 'react';
import Logo from '../assets/logo.png';
import {isEmpty, padStart, startCase} from 'lodash';
import useAppSelector from './useAppSelector';
import {getByIdSelector} from '../states/reducers/db';
import useData from './useData';
import getPokemon from '../sevices/getPokemon';

const usePokemon = (id: number | string) => {
  const pokemon = useAppSelector(state =>
    getByIdSelector(state, {model: 'pokemons', id}),
  );

  const {refresh, isLoading} = useData({
    fetcher: getPokemon,
    model: 'pokemons',
    id,
    omitKeys: ['forms', 'game_indices', 'held_items', 'moves', 'past_types'],
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

  const pokemonTypes = useMemo(() => {
    if (!isEmpty(pokemon.types)) {
      return pokemon.types.map((item: any) => item.type.name);
    } else {
      return [];
    }
  }, [pokemon.types]);

  const pokemonAbilities = useMemo(() => {
    if (!isEmpty(pokemon.abilities)) {
      return pokemon.abilities.map((item: any) => ({
        name: item.ability.name,
        hidden: item.is_hidden,
      }));
    } else {
      return [];
    }
  }, [pokemon.abilities]);

  const pokemonSprites = useMemo(() => {
    const sprites = [];
    const sprite = pokemon.sprites?.front_default;
    const spriteOtherDreamWorld =
      pokemon.sprites?.other?.dream_world?.front_default;
    const spriteOtherHome = pokemon.sprites?.other?.home?.front_default;
    if (sprite) {
      sprites.push(sprite);
    }
    if (spriteOtherDreamWorld) {
      sprites.push(spriteOtherDreamWorld);
    }
    if (spriteOtherHome) {
      sprites.push(spriteOtherHome);
    }

    return sprites;
  }, [pokemon.sprites]);

  const pokemonStats = useMemo(() => {
    if (!isEmpty(pokemon.stats)) {
      return pokemon.stats.map((item: any) => ({
        name: item.stat.name,
        value: item.base_stat,
      }));
    } else {
      return [];
    }
  }, [pokemon.stats]);

  useEffect(() => {
    if (!pokemon.height || !pokemon.weight) {
      refresh();
    }
  }, [pokemon, refresh]);

  return {
    pokemon,
    pokemonSource,
    pokemonCode,
    pokemonName,
    pokemonTypes,
    pokemonAbilities,
    pokemonSprites,
    pokemonStats,
    pokemonIsLoading: isLoading,
    pokemonRefresh: refresh,
  };
};

export default usePokemon;
