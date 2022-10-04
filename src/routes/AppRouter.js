import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';
import PokemonScreen from '../screens/PokemonScreen';
import PokemonTypeScreen from '../screens/PokemonTypeScreen';

const AppStack = createStackNavigator();

const AppRouter = () => {
  return (
    <AppStack.Navigator
      initialRouteName={'Dasboard'}
      screenOptions={{headerShown: false}}>
      <AppStack.Screen name={'Dashboard'} component={DashboardScreen} />
      <AppStack.Screen name={'Pokemon'} component={PokemonScreen} />
      <AppStack.Screen name={'PokemonType'} component={PokemonTypeScreen} />
    </AppStack.Navigator>
  );
};

export default AppRouter;
