import axios from 'axios';
import {BASE_URL} from '../constants/Api';

const getPokemon = ({id}: {id: number | string}) => {
  return axios.get(`${BASE_URL}/pokemon/${id}`);
};

export default getPokemon;
