/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text, Modal} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const Bar_Modal = () => {
  return (
    <Modal>
      <View style={styles.body}>
        <Entypo name="cross" size={34} color="black" />
        <View style={{marginBottom: 40}}></View>
        <Text style={styles.options_text}>My Sketches</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 5,
  },
  options_text: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: 5,
    marginHorizontal: 10,
  },
});

export default Bar_Modal;
