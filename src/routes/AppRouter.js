import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';
import PokemonScreen from '../screens/PokemonScreen';
import PokemonTypeScreen from '../screens/PokemonTypeScreen';
import {Platform} from 'react-native';

const AppStack = createStackNavigator();

const AppRouter = () => {
  return (
    <AppStack.Navigator
      initialRouteName={'Dasboard'}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardShadowEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <AppStack.Screen name={'Dashboard'} component={DashboardScreen} />
      <AppStack.Screen
        name={'Pokemon'}
        component={PokemonScreen}
        options={{
          gestureEnabled: Platform.OS === 'ios',
          ...TransitionPresets.ModalPresentationIOS,
        }}
      />
      <AppStack.Screen name={'PokemonType'} component={PokemonTypeScreen} />
    </AppStack.Navigator>
  );
};

export default AppRouter;
