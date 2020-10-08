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
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

class Info_Gather extends Component {
  render() {
    return (
      <SafeAreaView style={styles.body}>
        <Text style={styles.text_head}>We need some Info to serve better</Text>

        <TextInput
          style={styles.text_input}
          placeholder="Age of your child"
          inlineImageLeft="text_icon"
          inlineImagePadding={32}
          autoFocus={false}
        />
        <TextInput
          style={styles.text_input}
          placeholder="Gender"
          editable
          inlineImageLeft="text_icon"
          inlineImagePadding={32}
        />
        <Text style={[styles.text_below, {marginTop: '12%'}]}>
          These are for feeding our Model to predict better
        </Text>
        <Text style={styles.text_below}>
          We never promote gender inequality :)
        </Text>
        <TouchableOpacity style={styles.button_draw}>
          <Text>Start Draw </Text>
          <AntDesign name="arrowright" size={24} color="black" />
        </TouchableOpacity>
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
    marginTop: '22%',
    marginBottom: '8%',
  },
  text_below: {fontSize: 15},
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
});

export default Info_Gather;
