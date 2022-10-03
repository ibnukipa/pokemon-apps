import axios from 'axios';
import {BASE_URL} from '../constants/Api';

const getPokemonSpecies = ({offset, limit = 20}: PaginationQuery) => {
  return axios.get(`${BASE_URL}/pokemon-species`, {
    params: {
      offset,
      limit,
    },
  });
};

export default getPokemonSpecies;
