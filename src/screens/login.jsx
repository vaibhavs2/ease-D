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
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from 'react-native';
import { EditText } from '../components/editText'
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
function Login({ navigation }) {

  const [getUserInfo, setUserInfo] = useState({ email: { value: '', error: '' }, password: { value: '', error: '' } })
  const [getloading, setLoading] = useState(false)

  // if (auth().currentUser) {
  //   console.log(auth().currentUser)
  //   navigation.navigate('drawer')
  // }


  function setError(error_) {
    setUserInfo({ ...getUserInfo, password: { ...getUserInfo.password, error: error_ } })
  }

  function forgotPassword() {
    setLoading(true)
    if (!/\S+@\S+\.\S+/.test(getUserInfo.email.value)) {
      setUserInfo({ ...getUserInfo, email: { ...getUserInfo.email, error: 'Enter valid email' } })
      setLoading(false);
    }
    auth().sendPasswordResetEmail(getUserInfo.email.value)
      .then(function (user) {
        setLoading(false)
        alert('Please check your email...')
      }).catch(function (e) {
        setLoading(false)
        alert(e)
      })

  }

  function SignIn() {

    setLoading(true);

    if (!/\S+@\S+\.\S+/.test(getUserInfo.email.value)) {
      setUserInfo({ ...getUserInfo, email: { ...getUserInfo.email, error: 'Enter valid email' } })
      setLoading(false);
    }
    else if (getUserInfo.password.value.length < 6) {
      setUserInfo({ ...getUserInfo, password: { ...getUserInfo.password, error: 'Password must be greater than six characters' } })
      setLoading(false);
    }
    else {
      auth()
        .signInWithEmailAndPassword(getUserInfo.email.value, getUserInfo.password.value)
        .then(() => {
          setLoading(false);
          console.log('logged in');
          navigation.navigate('drawer');
        })
        .catch(error => {
          setLoading(false);
          switch (error.code) {
            case 'auth/invalid-email':
              setError('Invalid email address format')
              break;

            case 'auth/user-not-found':
              setError('User not found.')
              break;

            case 'auth/wrong-password':
              setError('Wrong password entered.')
              break;

            case 'auth/too-many-requests':
              setError('Too many request. Try again in a minute.')
              break;

            default:
              setError('Check your internet connection.')
              break;

          }
        });
    }


  }

  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.text_head}>Sign In</Text>
      <View style={styles.image}>
        <Image style={{ height: 120, width: 120 }} source={require('../staticfiles/child.png')} resizeMethod="scale" />
        <ActivityIndicator style={styles.activity_indicator} animating={getloading} size="small" color="red" />
      </View>

      <View>

        <EditText placeholder="Email" onChangeText={(text) => setUserInfo({ ...getUserInfo, email: { value: text, error: '' } })}
          value={getUserInfo.email.value}
          error={getUserInfo.email.error}
        />
        <EditText placeholder="Password" onChangeText={(text) => setUserInfo({ ...getUserInfo, password: { value: text, error: '' } })}
          value={getUserInfo.password.value}
          error={getUserInfo.password.error}

        />

      </View>
      <View style={{ flexDirection: 'row', marginTop: '12%', }}>

        <TouchableOpacity onPress={forgotPassword}>
          <Text>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button_register}
          onPress={SignIn}>
          <Text>Sign In{'  '}</Text>
          <AntDesign name="arrowright" size={24} color="black" />
        </TouchableOpacity>
      </View>



      <View style={styles.button_signin}>
        <Text>New user?{'  '}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <Text style={{ fontWeight: 'bold' }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 12,
    flex: 1, flexDirection: 'column'
  },
  text_head: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: '15%',
    marginBottom: '5%',

  },
  image: {
    width: 120, height: 120, alignSelf: "flex-end",
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
    flexDirection: 'row',
    position: 'absolute',
    right: 0
  },
  text_input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginHorizontal: 18,
  },
  activity_indicator: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    top: 0,
  }
});

export default Login;
