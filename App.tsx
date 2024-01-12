/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';
import { Login } from './src/auth/login';
import { Classes } from './src/home/class/classes';
import { Classroom } from './src/home/class/classroom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListWorking } from './src/working/list-working';
import { StatusBar } from 'react-native';
import { Home } from './src/home/home';
import { Books } from './src/home/book/books';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  useKeepAwake();

  const [token, setToken] = React.useState<string | null>();

  useEffect(() => {
    AsyncStorage.getItem('TOKEN').then(res => {
      setToken(res);
      global.token = res;
    });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={token ? 'Home' : 'Login'}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Working" component={ListWorking} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Classes" component={Classes} />
          <Stack.Screen name="Books" component={Books} />
          <Stack.Screen name="Classroom" component={Classroom} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
