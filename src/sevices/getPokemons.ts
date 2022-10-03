import axios from 'axios';
import {BASE_URL} from '../constants/Api';

const getPokemons = ({offset, limit = 20}: PaginationQuery) => {
  return axios.get(`${BASE_URL}/pokemon`, {
    params: {
      offset,
      limit,
    },
  });
};

export default getPokemons;
