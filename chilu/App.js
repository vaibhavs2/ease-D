/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/login';
import Signup from './src/screens/signup';
import Info_Gather from './src/screens/info_gather';
import DrawerScreen from './src/screens/drawer';
import auth from '@react-native-firebase/auth';
import 'react-native-gesture-handler';


export const AuthContext = React.createContext();


const App = () => {

  const Stack = createStackNavigator();
  const [getUser, setUser] = useState({ user: auth().currentUser })

  const authContext = useMemo(
    () => ({
      signIn: async (user) => {
        setUser({ user: user })
      },
      signOut: () => setUser({ user: null }),
    }),
    []
  );




  return (
    <AuthContext.Provider value={authContext}>

      <NavigationContainer>
        <Stack.Navigator
          // initialRouteName="login"
          screenOptions={{
            headerShown: false,
          }}>

          {getUser.user ?
            (<Stack.Screen name="drawer" component={DrawerScreen} />)
            : (
              <>
                <Stack.Screen name="signup" component={Signup} />
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="info" component={Info_Gather} /></>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>

  );
};

const styles = StyleSheet.create({
  body: {
    padding: 5,
  },
});

export default App;
