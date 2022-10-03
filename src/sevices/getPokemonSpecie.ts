import axios from 'axios';
import {BASE_URL} from '../constants/Api';

const getPokemonSpecie = ({id}: {id: number}) => {
  return axios.get(`${BASE_URL}/pokemon-species/${id}`);
};

export default getPokemonSpecie;
