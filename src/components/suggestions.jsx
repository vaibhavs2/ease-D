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
  '#303A14',
];

const Suggestions = (props) => {
  return (
    <View style={{ flexDirection: 'row' }}>

      <TouchableOpacity onPress={props.showSelector} style={[styles.square, { flexDirection: 'row', marginRight: 1 }]}>
        <View
          style={{
            width: 25,
            height: 25,
            borderRadius: 13,
            backgroundColor: 'black',
            margin: 3,
          }}
        />
        <Image
          source={require('../staticfiles/pencil.png')}
          style={{ margin: 3 }}
          height={20}
          width={20}
        />
      </TouchableOpacity>


      <FlatList
        horizontal
        data={colors}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.square} />
          </TouchableOpacity>
        )}
        keyExtractor={(color) => color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  square: {
    height: 65,
    width: 65,
    borderColor: 'black',
    borderWidth: 1,
    margin: 1,
  },
});

export default Suggestions;
