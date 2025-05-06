import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuScreen from './screens/MenuScreen';
import GameScreen from './screens/GameScreen';
import RulesScreen from './screens/RulesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Rules" component={RulesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}