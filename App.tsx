import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/Container/HomeScreen';
import WinBattle from './src/Container/WinBattle';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="WinBattle" component={WinBattle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;