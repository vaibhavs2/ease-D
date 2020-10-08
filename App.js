/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Suggestions from './src/components/suggestions';

const App = () => {
  return (
    <View style={styles.body}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 12,
          justifyContent: 'space-between',
        }}>
        <MaterialIcons name="arrow-back" size={28} color="black" />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <MaterialIcons
            style={{padding: 4}}
            name="undo"
            size={24}
            color="black"
          />
          <MaterialIcons
            style={{padding: 4}}
            name="redo"
            size={24}
            color="black"
          />
        </View>
        <Text style={{fontWeight: 'bold', padding: 4}}>Clear</Text>
      </View>
      <View style={{height: '82%'}}></View>
      <Suggestions />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 5,
  },
});

export default App;
