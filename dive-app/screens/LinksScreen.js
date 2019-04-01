import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, TouchableOpacity, Image, Button } from 'react-native';
import Modal from 'react-native-modal';
import { Camera, Permissions, ImageManipulator, ImagePicker } from 'expo';

const Clarifai = require('clarifai');

const clarifai = new Clarifai.App({
  apiKey: '2cf93c47aa5c4af7accbdae901f724ca',
});
process.nextTick = setImmediate;

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Camera',
  };

  constructor(props){
    super(props);

    this.state = {
      hasCameraPermission: null,
      predictions: [],
      capturedImage: '',
      fromLang: 'en',
      toLang: 'fr',
      translatedLabel: '',
      isModalVisible: false,
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  _toggleModal = () =>
  this.setState({ isModalVisible: !this.state.isModalVisible });

  translate = async () => {
    console.log('in translate')
    console.log(this.state.predictions[0]);
    //const query = this.state.predictions[0].name; //REMEMBER TO CHANGE
    const query = this.state.predictions;
    const from = this.state.fromLang;
    const to = this.state.toLang;

    fetch(`https://api.mymemory.translated.net/get?q=${query}&langpair=${from}|${to}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.responseData.translatedText);
        this.setState({
          translatedLabel: data.responseData.translatedText
        })
      });
  }

  capturePhoto = async () => {
    console.log('in capture photo')
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      return photo.uri;
    }
  };

  resize = async (photo) => {
    console.log('in resize')
    let manipulatedImage = await ImageManipulator.manipulateAsync(
      photo,
      [{ resize: { height: 300, width: 300 } }],
      { base64: true }
    );
    return manipulatedImage;
  };

  predict = async (image) => {
    console.log('in predict')
    let predictions = await clarifai.models.predict(
      Clarifai.GENERAL_MODEL,
      image
    );
    return predictions;
  };

  objectDetection = async () => {
    let photo = await this.capturePhoto();
    //let photo = await ImagePicker.launchCameraAsync();
    let resized = await this.resize(photo);
    //console.log(resized)
    //let predictions = await this.predict(resized.base64);
    //console.log(predictions.outputs)
    this.setState({
      //predictions: predictions.outputs[0].data.concepts,
      predictions: 'dog',
      capturedImage: resized.uri,
      translatedLabel: 'perro',
    })
    //this.translate();
    this._toggleModal();
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
          </View>
          <View>
            <Text>{this.state.translatedWord}</Text>
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
          <Modal isVisible={this.state.isModalVisible} backdropOpacity={0.8}>
            <View style={{flex: 1}}>
              <Image source={{uri: this.state.capturedImage}} style={{height: 500, width: 300}}></Image>
              <Text style={styles.getStartedText}>{this.state.translatedLabel}</Text>
              <Button title="Add to Dictionary" onPress={this._toggleModal}></Button>
              <Button title="Close" onPress={this._toggleModal}></Button>
            </View>
          </Modal>
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
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
});
