import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';
import PokemonScreen from '../screens/PokemonScreen';

const AppStack = createStackNavigator();

const AppRouter = () => {
  return (
    <AppStack.Navigator
      initialRouteName={'Dasboard'}
      screenOptions={{headerShown: false}}>
      <AppStack.Screen name={'Dashboard'} component={DashboardScreen} />
      <AppStack.Screen name={'Pokemon'} component={PokemonScreen} />
    </AppStack.Navigator>
  );
};

export default AppRouter;
