import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';

import { Camera, Permissions, ImageManipulator } from 'expo';
const console = require('console');

const Clarifai = require('clarifai');

const clarifai = new Clarifai.App({
  apiKey: '2cf93c47aa5c4af7accbdae901f724ca',
});
process.nextTick = setImmediate;

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Camera',
  };

  state = {
    hasCameraPermission: null,
    predictions: [],
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  capturePhoto = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      return photo.uri;
    }
  };

  resize = async photo => {
    let manipulatedImage = await ImageManipulator.manipulateAsync(
      photo,
      [{ resize: { height: 300, width: 300 } }],
      { base64: true }
    );
    return manipulatedImage.base64;
  };

  predict = async image => {
    let predictions = await clarifai.models.predict(
      Clarifai.GENERAL_MODEL,
      image
    );
    return predictions;
  };

  objectDetection = async () => {
    let photo = await this.capturePhoto();
    let resized = await this.resize(photo);
    let predictions = await this.predict(resized);
    this.setState({ predictions: predictions.outputs[0].data.concepts });
  };

  render() {
      const {hasCameraPermission, predictions} = this.state;
      if (hasCameraPermission === null) {
        return <Text>Nothing</Text>;
      }
      else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      }
      else {
        return (
          <View style={{ flex: 1 }}>
            <Camera
              ref={ref => {
                this.camera = ref;
              }}
              style={{ flex: 1 }}
              type={this.state.type}
            >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}
            >
            <View
              style={{
                flex: 1,
                alignSelf: 'flex-start',
                alignItems: 'center',
              }}
            >
            <FlatList
              data={predictions.map(prediction => ({
                key: `${prediction.name} ${prediction.value}`,
              }))}
              renderItem={({ item }) => (
                <Text style={{ paddingLeft: 15, color: 'white', fontSize: 20 }}>{item.key}</Text>
              )}
            />
          </View>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignItems: 'center',
              backgroundColor: 'blue',
              height: '10%',
            }}
            onPress={this.objectDetection}
          >
            <Text style={{ fontSize: 30, color: 'white', padding: 15 }}>
              {' '}
              Detect Objects{' '}
            </Text>
          </TouchableOpacity>
            </View>
          </Camera>
          </View>
        );
      }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: 'steelblue',
    borderRadius: 10,
    color: 'red',
    padding: 15,
    margin: 45
  }
});
