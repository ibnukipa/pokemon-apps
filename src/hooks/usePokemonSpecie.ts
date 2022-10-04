import {useEffect, useMemo} from 'react';
import useAppSelector from './useAppSelector';
import {getByIdSelector} from '../states/reducers/db';
import useData from './useData';
import getPokemonSpecie from '../sevices/getPokemonSpecie';

const OMITTED_ATTRS = [
  'color',
  'egg_groups',
  'evolves_from_species',
  'flavor_text_entries',
  'form_descriptions',
  'genera',
  'names',
  'pal_park_encounters',
  'pokedex_numbers',
  'varieties',
];

const usePokemonSpecie = (itemKey: number | string) => {
  const pokemonSpecie = useAppSelector(state =>
    getByIdSelector(state, {model: 'pokemonSpecies', id: itemKey}),
  );

  const {refresh, isLoading} = useData({
    fetcher: getPokemonSpecie,
    model: 'pokemonSpecies',
    id: itemKey,
    omitKeys: OMITTED_ATTRS,
  });

  const pokemonSpecieEvoChain = useMemo(() => {
    if (pokemonSpecie.evolution_chain) {
      const parts = pokemonSpecie.evolution_chain.url.split('/');
      return parts[parts.length - 2];
    }
    return null
  }, [pokemonSpecie]);

  useEffect(() => {
    if (!pokemonSpecie.base_happiness || !pokemonSpecie.capture_rate) {
      refresh();
    }
  }, [pokemonSpecie?.base_happiness, pokemonSpecie?.capture_rate, refresh]);

  return {
    pokemonSpecie,
    pokemonSpecieEvoChain,
    pokemonSpecieIsLoading: isLoading,
    pokemonSpecieRefresh: refresh,
  };
};

export default usePokemonSpecie;
