/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Select_Color from '../components/color_select';

const Home = ({ navigation }) => {
  return (
    <View style={styles.body}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <FontAwesome name="bars" size={24} color="black" />
      </TouchableOpacity>

      <Text style={{ fontWeight: 'bold', fontSize: 16, backgroundColor: 'green' }}>
        Hey Sketch!{'\n'}
        <Text>{'      '}Here</Text>
      </Text>
      <View style={styles.color_selector}>
        <Select_Color />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 5,
    flex: 1,
  },
  circle_one: {
    borderRadius: 22,
    height: 34,
    width: 34,
    backgroundColor: 'red',
    margin: 3,
  },
  heading: {
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    bottom: 0,
    alignSelf: 'baseline',
    backgroundColor: 'red'

  },

  color_selector: {
    position: 'absolute',
    bottom: 0
  },
  d: {
    height: 90, width: 90, backgroundColor: 'green', position: 'absolute',
    bottom: 0,
    top: 0,
    margin: 'auto',
    alignSelf: 'center',

  }
});

export default Home;
