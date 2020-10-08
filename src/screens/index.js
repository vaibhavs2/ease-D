/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Select_Color from './src/components/color_select';

const App = () => {
  return (
    <View style={styles.body}>
      <FontAwesome name="bars" size={24} color="black" />
      <View style={styles.heading}>
        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 16}}>
          Hey Sketch!{'\n'}
          <Text>{'      '}Here</Text>
        </Text>
      </View>
      <View>
        <Select_Color />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 5,
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
    height: '89%',
  },
});

export default App;
