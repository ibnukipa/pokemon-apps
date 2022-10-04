import axios from 'axios';
import {BASE_URL} from '../constants/Api';

const getEvolutionChain = ({id}: {id: number}) => {
  return axios.get(`${BASE_URL}/evolution-chain/${id}`);
};

export default getEvolutionChain;
