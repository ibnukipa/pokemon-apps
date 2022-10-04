import axios from 'axios';
import {BASE_URL} from '../constants/Api';

const getPokemonType = ({id}: {id: number | string}) => {
  return axios.get(`${BASE_URL}/type/${id}`);
};

export default getPokemonType;
