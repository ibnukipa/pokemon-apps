import {useMemo} from 'react';
import Menu from '../constants/Menu';
import useInfiniteList from './useInfiniteList';
import getPokemonTypes from '../sevices/getPokemonTypes';
import {startCase} from 'lodash';

const useMenu = () => {
  const {data: pokemonTypes} = useInfiniteList({
    fetcher: getPokemonTypes,
    model: 'pokemonTypes',
  });

  const menus: MenuItemType[] = useMemo(() => {
    return [
      {text: 'Home', value: Menu.HOME},
      {
        text: 'Pokemon Types',
        value: Menu.POKEMON_TYPES,
        subItems: pokemonTypes.map((item: any) => ({
          text: startCase(item),
          value: item,
        })),
      },
    ];
  }, [pokemonTypes]);

  return {
    menus,
  };
};

export default useMenu;
