import {useEffect, useMemo} from 'react';
import useAppSelector from './useAppSelector';
import {getByIdSelector} from '../states/reducers/db';
import useData from './useData';
import getEvolutionChain from '../sevices/getEvolutionChain';
import {isEmpty} from 'lodash';

const OMITTED_ATTRS: any = [];

const useEvolutionChain = (itemKey: number | string) => {
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
    const getChain: any = (result: any, chain: any) => {
      if (chain) {
        result.push(chain.species.name);
        if (!isEmpty(chain.evolves_to)) {
          return getChain(result, chain.evolves_to[0]);
        } else {
          return result;
        }
      } else {
        return result;
      }
    };
    return getChain([], evolutionChain.chain);
  }, [evolutionChain]);

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
