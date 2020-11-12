/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated, Easing, TouchableOpacity, Dimensions, ToastAndroid, Modal, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Suggestions from '../components/suggestions';
import ColorSelector from '../components/color_select';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RandomColor from 'randomcolor'
import RNFetchBlob from 'react-native-fetch-blob';

let dir = RNFetchBlob.fs.dirs.PictureDir + "/canvas/temp/";

class Sketching extends Component {

  constructor(props) {
    super(props);
    this.Clear_btn = this.Clear_btn.bind(this);
    this.Undo = this.Undo.bind(this);
    this.Redo = this.Redo.bind(this);
    this.Redo_array = [];
    this.OnStrokeEnd = this.OnStrokeEnd.bind(this);
    this.showHideColorSelect = this.showHideColorSelect.bind(this)
    this.SaveImage = this.SaveImage.bind(this)
    this.state = { showRedo: false, showUndo: false, stroke: 1, strokeColor: 'black', isColorPickerShowing: false, showModal: { show: false, url: '' }, modelResult: {} };
    this.SelectorColor = RandomColor({ count: (Dimensions.get('window').width / 41) - 1, hue: 'random' });
    this.colorPickerSlideValue = new Animated.Value(40);
    this.colorPickerHideValue = new Animated.Value(0);
  }



  componentDidMount() {
    RNFetchBlob.fs.isDir(dir)
      .then((isDir) => {
        if (isDir) {
          RNFetchBlob.fs.unlink(dir)
            .then(() => {
              RNFetchBlob.fs.mkdir(dir)
                .then(() => { })
                .catch((err) => {
                })
            })
            .catch((err) => { })
        }
        else {
          RNFetchBlob.fs.mkdir(dir)
            .then(() => { })
            .catch((err) => {
            })
        }
      })
  }

  componentWillUnmount() {
    RNFetchBlob.fs.unlink(dir)
      .then(() => {
      })
      .catch((err) => { })
  }



  SaveImage() {
    if (this.getFunction.getPaths().length > 0)
      this.getFunction.save('png', true, 'canvas', 'IMG' + Math.floor(new Date().getTime() / 1000).toString(), false, false, true)
    else {
      ToastAndroid.show("First Sketch something", ToastAndroid.SHORT)
    }
  }
  Clear_btn() {
    this.getFunction.clear();
    this.setState({ showRedo: false, showUndo: false })
  }

  Undo() {
    let lastNode = this.getFunction.getPaths();
    if (lastNode.length > 0) {
      this.Redo_array.push(lastNode[lastNode.length - 1]);
      this.setState({ showRedo: true })
      this.getFunction.undo();
      if (lastNode.length < 2)
        this.setState({ showUndo: false })

    }
  }

  Redo() {
    if (this.Redo_array.length > 0) {
      this.getFunction.addPath(this.Redo_array.pop());
      if (this.Redo_array.length < 1)
        this.setState({ showRedo: false, showUndo: true })
    }
  }

  OnStrokeEnd() {
    let undo = false
    if (this.getFunction.getPaths().length < 1) {
      undo = true
    }


    this.getFunction.getBase64('png', false, false, false, true, (error, result) => {
      if (error)
        console.log("error");
      else {
        RNFetchBlob.fetch('POST', 'http://192.168.1.101:5000/get', {
          Authorization: "",
          otherHeader: "foo",
          'Content-Type': 'multipart/form-data',
        }, [
          // element with property `filename` will be transformed into `file` in form data
          { name: 'image', filename: 'image.png', data: result },
          // { name: 'image', filename: 'image.png', type: 'image/png', data: result },
        ]).then((resp) => {
          this.setState({ showUndo: undo, showRedo: false, modelResult: resp.json() })
          console.log(resp.json());
        }).catch((err) => {
          // ...
        })
      }
    })


    // {
    //   let imageName = Math.floor(new Date().getTime() / 1000).toString()

    //   this.getFunction.save('png', true, 'canvas/temp', imageName, false, false, true)
    //   this.setState({ mlImageName: imageName + '.png' })


    // }



  }


  setStroke() {
    let stroke = this.state.stroke
    if (stroke >= 12)
      stroke = 1;
    else if (stroke < 3)
      stroke++;
    else
      stroke += 3

    this.setState({ stroke: stroke })
  }


  showHideColorSelect() {
    let [changeHide, changeSlide] = this.state.isColorPickerShowing ? [0, 40] : [1, 0]

    Animated.parallel([
      Animated.timing(
        this.colorPickerSlideValue,
        {
          toValue: changeSlide,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        this.colorPickerHideValue,
        {
          toValue: changeHide,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )



    ]).start(() => {
      this.colorPickerSlideValue.setValue(changeSlide)
      this.colorPickerHideValue.setValue(changeHide)
      this.setState({ isColorPickerShowing: changeHide ? true : false })
    })
  }




  render() {
    return (
      <View style={styles.body}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
          }}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={{ marginVertical: 3 }}>
            <FontAwesome name="bars" size={24} color="black" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={this.Undo} style={styles.undo_redo}>
              <MaterialIcons
                name="undo"
                size={this.state.showUndo ? 32 : 24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.Redo}>
              <MaterialIcons
                name="redo"
                style={styles.undo_redo}
                size={this.state.showRedo ? 32 : 24}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.undo_redo} onPress={this.SaveImage}>
            <MaterialIcons name="save" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.Clear_btn}>
            <Text style={{ fontWeight: 'bold', paddingHorizontal: 2, paddingVertical: 3, fontSize: 16 }}>Clear</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, flexDirection: 'column', }}>

          <View style={{
            height: 1, width: '100%', backgroundColor: 'black', position: 'absolute', Top: 0, end: 0, borderStyle: 'dashed', borderWidth: 1, borderRadius: 1,
          }} />



          <SketchCanvas
            ref={ref => (this.getFunction = ref)}
            onStrokeEnd={this.OnStrokeEnd}
            style={{ flex: 1, padding: 2 }}
            strokeColor={this.state.strokeColor}
            strokeWidth={this.state.stroke}
            onSketchSaved={(result, path) => { result ? ToastAndroid.show("Image saved in \'Picture/Canvas\'", ToastAndroid.SHORT) : alert("Imaeg not saved!\n May be App don't have access to storage, Do it mannually") }}
            permissionDialogTitle="Required Storage access"
            permissionDialogMessage="You can save your sketches in your Phone"
          />
        </View>
        <Animated.View style={{ position: 'absolute', bottom: 67, overflow: 'hidden', opacity: this.colorPickerHideValue, transform: [{ translateY: this.colorPickerSlideValue }] }}>
          <ColorSelector down={this.colorPickerSlideValue} colors={this.SelectorColor} setStroke={() => this.setStroke()} setColor={(newColor) => { this.setState({ strokeColor: newColor }) }} />
        </Animated.View>

        <Suggestions showSelector={this.showHideColorSelect} showSelectedImage={(url) => this.setState({ showModal: { show: true, url: url } })} modelResult={this.state.modelResult} />


        <Modal animationType="fade"
          visible={this.state.showModal.show}
          onRequestClose={() => {
            this.setState({ showModal: { show: false, url: '' } })
          }}>
          <View style={{ flex: 1, padding: 5 }}>
            <TouchableOpacity onPress={() => this.setState({ showModal: { show: false, url: '' } })}>
              <MaterialIcons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
            <Image style={{ marginTop: 12, width: '100%', resizeMode: 'contain', flex: 1, padding: 4, alignSelf: 'center' }} source={{ uri: this.state.showModal.url }} /></View>
        </Modal>

      </View>
    );

  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },

  color_selector: {
    position: 'absolute',
    top: 0,
    padding: 4
  },
  undo_redo: { height: 32, width: 32, marginHorizontal: 8 }
});

export default Sketching;
