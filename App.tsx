/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import 'react-native-gesture-handler';
import RootRouter from './src/routes/RootRouter';

const App = () => {
  useEffect(() => {
    const init = async () => {
      // TODO: fetch auth and make sure the app is ready to start
    };
    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, []);
  return <RootRouter />;
};

export default App;
