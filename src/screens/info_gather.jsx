/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  View
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { EditText } from '../components/editText'
import { Picker } from '@react-native-community/picker';
import firestore from '@react-native-firebase/firestore';


export default function Info_Gather({ route, navigation }) {


  const [getInfo, setInfo] = useState({ age: { value: '', error: '' }, gender: { value: '', error: '' } });
  const [getLoading, setLoading] = useState(false)

  console.log(route.params.name)
  console.log(route.params.user)

  function pushData() {
    setLoading(true)
    if (getInfo.age.value === '') {
      setInfo({ ...getInfo, age: { ...getInfo.age, error: "Can't empty" } })
      setLoading(false)
    }
    firestore()
      .collection('Users')
      .doc(route.params.user.uid)
      .set({
        name: route.params.name,
        age: getInfo.age.value,
        gender: getInfo.gender.value
      })
      .then(() => {
        setLoading(false)
        navigation.navigate('drawer', { user: route.params.user })
      }).catch(error_ => {
        setLoading(false)
        setInfo({ ...getInfo, age: { ...getInfo, error: error_ } })
      });
  }

  return (

    <SafeAreaView style={styles.body}>
      <Text style={styles.text_head}>We need some Info to serve better</Text>

      <EditText placeholder="Age of your Child" onChangeText={(text) => setInfo({ ...getInfo, age: { error: '', value: text } })}
        value={getInfo.age.value}
        error={getInfo.age.error}
        keyboardType={'phone-pad'}
        returnKeyType="next" />
      <ActivityIndicator style={styles.activity_indicator} animating={getLoading} size="large" color="green" />

      <View style={{ flexDirection: 'row' }} >
        <Image
          source={{ uri: 'text_icon' }}
          style={styles.image}
        />
        <Picker
          selectedValue={getInfo.gender.value}
          mode='dialog'
          SelectedIndex="1"
          style={{ height: 50, width: '80%' }}
          accessibilityRole='text'
          onValueChange={(itemValue, itemIndex) =>
            setInfo({ ...getInfo, gender: { value: itemValue, error: '' } })
          }>
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Transgender" value="transgender" />
        </Picker>
      </View>

      <Text style={[styles.text_below, { marginTop: '12%' }]}>
        These are for feeding our Model to predict better
      </Text>
      <Text style={styles.text_below}>
        We never promote gender inequality :)
      </Text>
      <TouchableOpacity
        style={styles.button_draw}
        onPress={pushData}>
        <Text>Start Draw </Text>
        <AntDesign name="arrowright" size={24} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 12,
  },
  image: { width: 30, height: 30, margin: 7 },
  text_head: {
    fontSize: 20,
    width: '60%',
    fontWeight: 'bold',
    marginTop: '22%',
    marginBottom: '8%',
  },
  text_below: { fontSize: 15 },
  button_draw: {
    marginTop: '15%',
    marginRight: 18,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  text_input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginHorizontal: 18,
  },
  activity_indicator: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    marginTop: 30,
    alignSelf: 'center'
  }
});
