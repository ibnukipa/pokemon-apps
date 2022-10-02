import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';

const AppStack = createStackNavigator();

const AppRouter = () => {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name={'Dashboard'} component={DashboardScreen} />
    </AppStack.Navigator>
  );
};

export default AppRouter;
