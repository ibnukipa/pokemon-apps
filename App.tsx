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
import {Provider} from 'react-redux';
import RootRouter from './src/routes/RootRouter';
import store from './src/states/store';

const App = () => {
  useEffect(() => {
    const init = async () => {
      // TODO: fetch auth and make sure the app is ready to start
    };
    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
    });
  }, []);

  return (
    <Provider store={store}>
      <RootRouter />
    </Provider>
  );
};

export default App;
