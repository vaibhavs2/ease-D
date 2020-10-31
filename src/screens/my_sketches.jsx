/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
const My_Sketches = ({navigation}) => {
  const rowView = (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity>
        <View style={styles.images}></View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.images}></View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.images}></View>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.body}>
      <View style={{flexDirection: 'row', marginBottom: 12}}>
        <AntDesign
          name="arrowleft"
          size={28}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={{marginLeft: '30%', fontWeight: 'bold'}}>Sketches</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={colors}
        renderItem={({item}) => rowView}
        keyExtractor={(color) => color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 8,
  },
  images: {
    height: 100,
    width: 100,
    margin: 7,
    backgroundColor: 'black',
  },
});

export default My_Sketches;
