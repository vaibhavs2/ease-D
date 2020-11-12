/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';

let DIR = RNFetchBlob.fs.dirs.PictureDir + "/canvas/datasets/";

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

  const [getImage, setImage] = useState([])

  useEffect(() => {
    if (props.modelResult.first) {

      filesList = []

      RNFetchBlob.fs.ls(DIR + props.modelResult.first)
        // files will an array contains filenames
        .then((files) => {
          for (var i = 0; i < files.length; i++) {
            filesList.push(`${props.modelResult.first}/${files[i]}`)
          }
        }).catch(() => { console.log("path not exists"); });
      RNFetchBlob.fs.ls(DIR + props.modelResult.second)
        .then((files) => {
          for (var i = 0; i < files.length; i++) {
            filesList.push(`${props.modelResult.second}/${files[i]}`)
          }

        }).catch(() => { console.log("path not exists"); });
      RNFetchBlob.fs.ls(DIR + props.modelResult.third)
        .then((files) => {
          for (var i = 0; i < files.length; i++) {
            filesList.push(`${props.modelResult.third}/${files[i]}`)
          }
          filesList.sort(() => 0.5 - Math.random()).slice(0, 6)
          setImage(filesList.slice(0, 6))

        }).catch(() => { console.log("path not exists"); });

      console.log(getImage);

    }
  }, [props.modelResult.first, props.modelResult.second, props.modelResult.third])




  // const preprocessCanvas = (canvas) => {
  //   let tensor = tf
  //     .fromPixels(canvas) // Shape: (300, 300, 3) - RGB image
  //     .resizeNearestNeighbor([28, 28]) // Shape: (28, 28, 3) - RGB image
  //     .mean(2) // Shape: (28, 28) - grayscale
  //     .expandDims(2) // Shape: (28, 28, 1) - network expects 3d values with channels in the last dimension
  //     .expandDims() // Shape: (1, 28, 28, 1) - network makes predictions for "batches" of images
  //     .toFloat(); // Network works with floating points inputs
  //   return tensor.div(255.0); // Normalize [0..255] values into [0..1] range
  // }
  // console.log(`${dir}${props.mlImageName}`);

  // async function processModel() {
  //   const model = await tf.loadLayersModel("../staticfiles/model.json");
  //   console.log(model.summary());
  //   var b = await model.predict(preprocessCanvas(`${dir}${props.mlImageName}`)).data();
  //   console.log(b);
  //   return
  // }
  // processModel().then(() => { }).catch((error) => { console.log(error); })


  //   fetch(Image.resolveAssetSource(require('../staticfiles/stroke.png')).uri).then((res) => {
  //     var b = new ImageData
  //     console.log(b);
  //   })



  //   const imageGet = require('get-image-data');
  //   async function loadLocalImage(filename) {
  //       return new Promise((res,rej)=>{
  //       imageGet(filename, (err, info) => {
  //         if(err){
  //            rej(err);
  //            return;
  //         }
  //         const image = tf.fromPixels(info.data)
  //         console.log(image, '127');
  //         res(image);
  //       });
  //     }
  // loadLocalImage('../staticfiles/stroke.png');


  // console.log(Image.resolveAssetSource(require('../staticfiles/stroke.png')).uri);



  // async function Model() {
  //   model = await tf
  //     .loadModel("https://epfl-exts.github.io/react-course-project/public/model/model.json");

  //   let b = await model.predict(preprocessCanvas(`${dir}${props.mlImageName}`)).data();
  //   console.log(b);
  // }





  return (
    <View style={{ flexDirection: 'row', }}>

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

      {getImage.length > 0 ? (<FlatList
        horizontal
        data={getImage}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => props.showSelectedImage(`file://${DIR}${item}`)}>
            <Image
              source={{ uri: `file://${DIR}${item}` }}
              style={[styles.square]}
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
        keyExtractor={(color) => color}
      />) : (
          <FlatList
            horizontal
            data={colors}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => props.showSelectedImage('file:///storage/emulated/0/Pictures/canvas/Default.png')}>
                <Image
                  source={require('../staticfiles/pencil.png')}
                  style={[styles.square]}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            )}
            keyExtractor={(color) => color}
          />
        )}

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
