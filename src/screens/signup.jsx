/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

class Signup extends Component {
  render() {
    return (
      <SafeAreaView style={styles.body}>
        <Text style={styles.text_head}>Sign Up</Text>

        <TextInput
          style={styles.text_input}
          placeholder="Name"
          inlineImageLeft="text_icon"
          inlineImagePadding={32}
          autoFocus={false}
        />
        <TextInput
          style={styles.text_input}
          placeholder="Phone number"
          editable
          inlineImageLeft="text_icon"
          inlineImagePadding={32}
        />
        <TextInput
          style={styles.text_input}
          placeholder="Password"
          editable
          inlineImageLeft="text_icon"
          inlineImagePadding={32}
        />
        <TouchableOpacity style={styles.button_register}>
          <Text>Register{'  '}</Text>
          <AntDesign name="arrowright" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.button_signin}>
          <Text>Already have an account?{'  '}</Text>
          <TouchableOpacity>
            <Text style={{fontWeight: 'bold'}}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    padding: 12,
  },
  text_head: {
    fontSize: 20,
    width: '60%',
    fontWeight: 'bold',
    marginTop: '18%',
    marginBottom: '20%',
  },
  button_signin: {
    marginTop: '12%',
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
});

export default Signup;
