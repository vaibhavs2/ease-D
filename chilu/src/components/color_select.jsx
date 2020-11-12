/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
} from 'react-native';

const ColorSelector = (props) => {
  const [getPencilBorder, setPencilBorder] = useState({ color: 'black', width: 2 })

  function changePencilStroke() {
    props.setStroke();
    if (getPencilBorder.width >= 17) {
      setPencilBorder({ ...getPencilBorder, width: 2 })
    }
    else
      setPencilBorder({ ...getPencilBorder, width: getPencilBorder.width + 3 })
  }


  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity style={{ marginStart: 5, marginEnd: 5 }} onPress={changePencilStroke} activeOpacity={0}>
        <Image
          source={require('../staticfiles/stroke.png')}
          style={{ alignSelf: 'center' }}
        />
        <View style={{ borderBottomColor: getPencilBorder.color, width: 28, height: 22, borderBottomWidth: getPencilBorder.width, borderRadius: 2 }} />
      </TouchableOpacity>

      <FlatList
        horizontal
        data={props.colors}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) =>
          <TouchableOpacity style={[styles.circle_one, { backgroundColor: item }]} onPress={() => { setPencilBorder({ ...getPencilBorder, color: item }); props.setColor(item) }} />
        }
        keyExtractor={(color) => color}
      />
    </View >
  );
};

const styles = StyleSheet.create({
  circle_one: {
    borderRadius: 22,
    height: 34,
    width: 34,
    backgroundColor: 'red',
    margin: 3,
  },
});

export default ColorSelector;
