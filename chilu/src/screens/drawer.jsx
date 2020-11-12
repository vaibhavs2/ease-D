import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import My_Sketches from './my_sketches';
import { View, Button } from 'react-native'
import Sketching from './sketching';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../../App'

const Drawer = createDrawerNavigator();



export default function DrawerScreen({ navigation }) {


  const { signOut } = useContext(AuthContext);

  function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          onPress={() => {
            auth()
              .signOut()
              .then(() => {
                signOut()
              }).catch((error) => alert(error));
          }}
          title="Sign Out"
        />
      </View>
    );
  }

  return (
    <Drawer.Navigator initialRouteName="sketch" overlayColor="transparent">
      <Drawer.Screen name="Sketch" component={Sketching} />
      <Drawer.Screen name="My Sketch" component={My_Sketches} />
      <Drawer.Screen name="Logout" component={HomeScreen} />
    </Drawer.Navigator>
  );
}
