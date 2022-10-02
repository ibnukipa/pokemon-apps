import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import AppRouter from './AppRouter';

const RootStack = createStackNavigator();

const RootRouter = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}>
        <RootStack.Screen name={'AppRouter'} component={AppRouter} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootRouter;
