/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

const colors = [
  '#CC3838',
  '#83607B',
  'black',
  '#F9E219',
  '#45D44B',
  '#801616',
  'e',
  '#303A14',
];
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const Select_Color = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        source={require('../staticfiles/pencil.png')}
        style={{marginRight: 3}}
      />
      <FlatList
        horizontal
        data={colors}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity>
            <View
              style={[styles.circle_one, {backgroundColor: getRandomColor()}]}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(color) => color}
      />
    </View>
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

export default Select_Color;
