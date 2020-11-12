/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Animated, Easing
} from 'react-native';

import { EditText } from '../components/editText'
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';

function Signup({ navigation }) {

  const [getUserInfo, setUserInfo] = useState({ name: { value: '', error: '' }, email: { value: '', error: '' }, password: { value: '', error: '' } })
  const rotation = useRef(new Animated.Value(0)).current;
  const xtransform = useRef(new Animated.Value(0)).current;


  function setError(error_) {
    setUserInfo({ ...getUserInfo, password: { ...getUserInfo.password, error: error_ } })
  }

  function Register() {

    if (getUserInfo.name?.value === '') {
      setUserInfo({ ...getUserInfo, name: { ...getUserInfo.name, error: 'Name can\'t be empty' } })

    }

    else if (!/\S+@\S+\.\S+/.test(getUserInfo.email.value)) {
      setUserInfo({ ...getUserInfo, email: { ...getUserInfo.email, error: 'Enter a valid email' } })

    }
    else if (getUserInfo.password.value?.length < 6) { setUserInfo({ ...getUserInfo, password: { ...getUserInfo.password, error: 'Password must be greater than six characters' } }) }
    else {
      showHideColorSelect();
      auth()
        .createUserWithEmailAndPassword(getUserInfo.email.value, getUserInfo.password.value)
        .then((user) => {

          navigation.navigate('info', { user: auth().currentUser, name: getUserInfo.name.value })
        })
        .catch(error => {
          xtransform.stopAnimation();
          rotation.stopAnimation();

          switch (error.code) {
            case 'auth/email-already-in-use':
              setError('That email address is already in use!')
              break;
            case 'auth/invalid-email':
              setError('Invalid e-mail address format.')
              break;
            case 'auth/weak-password':
              setError('Password is too weak.')
              break;

            case 'auth/too-many-requests':
              setError('Too many request. Try again in a minute.')
              break;

            default:
              setError('Check your Internet Connection')
              break;
          }
        });
    }
  }

  function showHideColorSelect() {

    Animated.parallel([
      Animated.timing(
        rotation,
        {
          toValue: 10,
          duration: 20000,
          easing: Easing.linear,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        xtransform,
        {
          toValue: 200,
          duration: 3000,
          easing: Easing.easeInOutBounce,
          useNativeDriver: true
        }
      )
    ], { stopTogether: false }).start(() => {
      rotation.setValue(0);
      xtransform.setValue(0)
    })
  }
  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.text_head}>Sign Up</Text>
      <View style={styles.image}>
        <Animated.View style={{ transform: [{ translateX: xtransform }] }}>
          <Animated.View style={{ height: 20, width: 20, backgroundColor: 'red', transform: [{ rotate: spin }] }} />
        </Animated.View>

        <Image style={{ height: 122, width: 122, }} source={require('../staticfiles/elephant.png')} resizeMethod='scale' />
      </View>

      <EditText placeholder="Name" onChangeText={(text) => setUserInfo({ ...getUserInfo, name: { value: text, error: '' } })}
        value={getUserInfo.name.value}
        error={getUserInfo.name.error}
        returnKeyType="next" />
      <EditText placeholder="Email" onChangeText={(text) => setUserInfo({ ...getUserInfo, email: { value: text, error: '' } })}
        value={getUserInfo.email.value}
        error={getUserInfo.email.error}
        returnKeyType="next" />
      <EditText placeholder="Password" onChangeText={(text) => setUserInfo({ ...getUserInfo, password: { value: text, error: '' } })}
        value={getUserInfo.password.value}
        error={getUserInfo.password.error}
        returnKeyType="next" />

      <TouchableOpacity
        style={styles.button_register}
        onPress={Register}>
        <Text>Register{'  '}</Text>
        <AntDesign name="arrowright" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.button_signin}>
        <Text>Already have an account?{'  '}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <Text style={{ fontWeight: 'bold' }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 12,
    flex: 1,
    flexDirection: 'column'
  },
  text_head: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: '10%',
    marginBottom: '5%',
  },
  button_signin: {
    marginTop: '30%',
    marginRight: 18,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  button_register: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginTop: '12%',
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
  },
  image: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },


});

export default Signup;
