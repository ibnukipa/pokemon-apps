/**
 * @format
 * @flow
 */

import {useColorScheme} from 'react-native';

const useIsDarkMode = () => {
  return useColorScheme() === 'dark';
};

export default useIsDarkMode;
