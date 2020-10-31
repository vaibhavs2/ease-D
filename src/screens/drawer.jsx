import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import My_Sketches from './my_sketches';
import Home from './home';
import { View, Button } from 'react-native'
import Sketching from './sketching';
import auth from '@react-native-firebase/auth';
const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              console.log('User signed out!')
              navigation.navigate('login')
            });
        }}
        title="Go to notifications"
      />
    </View>
  );
}

export default function DrawerScreen({ navigation }) {

  return (
    <Drawer.Navigator initialRouteName="sketch" overlayColor="transparent">
      <Drawer.Screen name="sketch" component={Sketching} />
      <Drawer.Screen name="mysketch" component={My_Sketches} />
      <Drawer.Screen name="logout" component={HomeScreen} />
    </Drawer.Navigator>
  );
}
