/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Suggestions from '../components/suggestions';
import ColorSelector from '../components/color_select';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Sketching = ({ navigation }) => {

  const [getSelector, setSelector] = useState(false)
  const [getPenColor, setPenColor] = useState("");

  return (
    <View style={styles.body}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <FontAwesome name="bars" size={24} color="black" />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <MaterialIcons
            style={{ padding: 4 }}
            name="undo"
            size={24}
            color="black"
          />
          <MaterialIcons
            style={{ padding: 4 }}
            name="redo"
            size={24}
            color="black"
          />
        </View>
        <Text style={{ fontWeight: 'bold', padding: 4 }}>Clear</Text>
      </View>

      <View style={{ flex: 1, flexDirection: 'column' }}>
        <SketchCanvas
          style={{ flex: 1 }}
          strokeColor={'black'}
          strokeWidth={2}
        />

        {getSelector ? <View style={styles.color_selector}>
          <ColorSelector getColor={(color) => setPenColor(color)} />
        </View> : null}
      </View>
      <Suggestions openSelector={(value) => { setSelector(value) }} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 5,
  },

  color_selector: {
    position: 'absolute',
    bottom: 0
  }
});

export default Sketching;
