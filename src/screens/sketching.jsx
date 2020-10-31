/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Suggestions from '../components/suggestions';
import ColorSelector from '../components/color_select';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


class Sketching extends Component {

  constructor(props) {
    super(props);
    this.Clear_btn = this.Clear_btn.bind(this);
  }


  Clear_btn() {
    this.getFunction.clear();
  }



  render() {
    return (
      <View style={styles.body}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 4
          }}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <FontAwesome name="bars" size={24} color="black" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity>
              <MaterialIcons
                style={{ padding: 4 }}
                name="undo"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons
                style={{ padding: 4 }}
                name="redo"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.Clear_btn}>
            <Text style={{ fontWeight: 'bold', padding: 4 }}>Clear</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <SketchCanvas
            ref={ref => (this.getFunction = ref)}
            style={{ flex: 1, padding: 2 }}
            strokeColor={'black'}
            strokeWidth={2}
          />
        </View>
        {/* <Animated.View>
          {getSelector ? <View style={{}}>
            <ColorSelector getColor={(color) => (console.log(color))} />
          </View> : null}
          <Suggestions showSelector={() => { }} />

        </Animated.View> */}
      </View>
    );

  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginTop: 4
  },

  color_selector: {
    position: 'absolute',
    top: 0
  }
});

export default Sketching;
