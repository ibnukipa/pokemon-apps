import {useEffect, useMemo} from 'react';
import useAppSelector from './useAppSelector';
import {getByIdSelector} from '../states/reducers/db';
import useData from './useData';
import getPokemonType from '../sevices/getPokemonType';

const OMITTED_ATTRS = [
  'damage_relations',
  'game_indices',
  'generation',
  'move_damage_class',
  'moves',
  'names',
  'past_damage_relations',
];

const usePokemonType = (itemKey: number | string) => {
  const pokemonType = useAppSelector(state =>
    getByIdSelector(state, {model: 'pokemonTypes', id: itemKey}),
  );

  const {refresh, isLoading} = useData({
    fetcher: getPokemonType,
    model: 'pokemonTypes',
    id: itemKey,
    omitKeys: OMITTED_ATTRS,
  });

  const pokemons = useMemo(() => {
    if (pokemonType.pokemon) {
      return pokemonType.pokemon.map((item: any) => item.pokemon.name);
    } else {
      return [];
    }
  }, [pokemonType.pokemon]);

  useEffect(() => {
    if (!pokemonType.pokemon) {
      refresh();
    }
  }, [pokemonType?.pokemon, refresh]);

  return {
    pokemons,
    pokemonsIsLoading: isLoading,
    pokemonsRefresh: refresh,
  };
};

export default usePokemonType;
