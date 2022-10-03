import {useDispatch} from 'react-redux';
import type {AppDispatch} from '../states/store';

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
