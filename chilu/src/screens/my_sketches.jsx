/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNFetchBlob from 'react-native-fetch-blob';
import { useIsFocused } from "@react-navigation/native";

const ls = RNFetchBlob.fs.ls;
const dir = RNFetchBlob.fs.dirs.PictureDir + "/canvas/";


const My_Sketches = ({ navigation }) => {

  const [getImages, setImages] = useState([]);
  const isFocus = useIsFocused();
  const [getModal, setModal] = useState({ show: false, source: '' });


  useEffect(() => {
    if (isFocus) {
      ls(dir).then((files) => {
        let newfile = []
        files.map((file) => {
          if (getImages.indexOf(file) < 0) {
            newfile.push(file);
          }
        })
        if (newfile.length > 0)
          setImages(newfile.concat(getImages))
      });
    }

  }, [isFocus])




  return (
    <View style={styles.body}>
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <AntDesign
          name="arrowleft"
          size={28}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={{ marginLeft: '30%', fontWeight: 'bold' }}>Sketches</Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={getImages}
        numColumns={3}
        renderItem={({ item }) => {
          return (<TouchableOpacity onPress={() => { setModal({ show: true, source: `file://${dir}${item}` }) }}>
            <Image style={styles.images} source={{ uri: `file://${dir}${item}` }} />
          </TouchableOpacity>)
        }}
        keyExtractor={(item, index) => index}
      />
      <Modal animationType="fade"
        visible={getModal.show}
        onRequestClose={() => {
          setModal({ show: false, source: '' })
        }}>
        <View style={{ flex: 1, padding: 5 }}>
          <TouchableOpacity onPress={() => setModal({ show: false, source: '' })}>
            <AntDesign
              name="arrowleft"
              size={28}
              color="black"

            />
          </TouchableOpacity>
          <Image style={{ marginTop: 12, flex: 1, padding: 4, resizeMode: 'contain' }} source={{ uri: getModal.source }} /></View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 8,
    flex: 1
  },
  images: {
    height: 100,
    width: 100,
    margin: 7,
    backgroundColor: 'black',
  },
});

export default My_Sketches;
