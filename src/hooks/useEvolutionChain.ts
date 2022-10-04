import {useEffect, useMemo} from 'react';
import useAppSelector from './useAppSelector';
import {getByIdSelector} from '../states/reducers/db';
import useData from './useData';
import getEvolutionChain from '../sevices/getEvolutionChain';

const getRestChain = (chain: any) => {
  if (chain.evolves_to.length === 0) {
    return [
      {
        name: chain.species.name,
        nextEvolutionCount: chain.evolves_to.length,
      },
    ];
  } else {
    const path: any = getRestChain(chain.evolves_to[0]);
    if (path !== null) {
      path.unshift({
        name: chain.species.name,
        nextEvolutionCount: chain.evolves_to.length,
      });
      return path;
    }
  }
};

const getChainTree = (struct: any, pokemonName: string | number) => {
  if (struct.species.name === pokemonName) {
    return [
      {
        name: struct.species.name,
        nextEvolutionCount: struct.evolves_to.length,
        chain: struct,
      },
    ];
  } else if (struct.evolves_to.length > 0) {
    for (let i = 0; i < struct.evolves_to.length; i++) {
      const path: any = getChainTree(struct.evolves_to[i], pokemonName);
      if (path !== null) {
        path.unshift({
          name: struct.species.name,
          nextEvolutionCount: struct.evolves_to.length,
        });
        return path;
      }
    }
  }
  return null;
};

const OMITTED_ATTRS: any = [];

const useEvolutionChain = (
  itemKey: number | string,
  pokemonKey: string | number,
) => {
  const evolutionChain = useAppSelector(state =>
    getByIdSelector(state, {model: 'evolutionChains', id: itemKey}),
  );

  const {refresh, isLoading} = useData({
    fetcher: getEvolutionChain,
    model: 'evolutionChains',
    modelKey: 'id',
    id: itemKey,
    omitKeys: OMITTED_ATTRS,
  });

  const evolutionChains = useMemo(() => {
    if (evolutionChain.chain && pokemonKey) {
      const currentPath = getChainTree(evolutionChain.chain, pokemonKey);
      const restChain = currentPath[currentPath.length - 1].chain.evolves_to[0];
      const restPath = restChain ? getRestChain(restChain) : [];

      return [...currentPath, ...restPath].map(item => ({
        name: item.name,
        nextEvolutionCount: item.nextEvolutionCount,
      }));
    } else {
      return [];
    }
  }, [pokemonKey, evolutionChain]);

  useEffect(() => {
    if (!evolutionChain.chain) {
      refresh();
    }
  }, [evolutionChain?.chain, refresh]);

  return {
    evolutionChains,
    pokemonSpecieIsLoading: isLoading,
    pokemonSpecieRefresh: refresh,
  };
};

export default useEvolutionChain;
