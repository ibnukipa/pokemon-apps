import axios from 'axios';
import {BASE_URL} from '../constants/Api';

const getPokemonTypes = () => {
  return axios.get(`${BASE_URL}/type`);
};

export default getPokemonTypes;
