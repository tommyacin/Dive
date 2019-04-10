import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  Picker,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import { Camera, Permissions, ImageManipulator, Icon } from 'expo';
import { Speech } from 'react-native-speech';
import Tts from 'react-native-tts';

import { Color } from '../assets/Colors';
import PickerLanguages from '../components/PickerLanguages'; 

const Clarifai = require('clarifai');
const clarifai = new Clarifai.App({
  apiKey: '2cf93c47aa5c4af7accbdae901f724ca',
});
process.nextTick = setImmediate;

export default class DiscoveryScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props){
    super(props);

    this.state = {
      hasCameraPermission: null,
      predictions: [],
      capturedImage: '',
      fromLang: 'en',
      toLang: 'es',
      translatedLabel: '',
      isImageModalVisible: false,
      isLanguageModalVisible: false,
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    Tts.setDefaultLanguage('en-US');
    Tts.speak('Hello, World!');
  }

  toggleImageModal = () => {
    this.setState({ isImageModalVisible: !this.state.isImageModalVisible });
  }

  toggleLanguageModal = () => {
    this.setState({ isLanguageModalVisible: !this.state.isLanguageModalVisible });
  }

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
    this.setState({ translatedLabel: '' });
    let photo = await this.capturePhoto();
    let resized = await this.resize(photo);
    //let predictions = await this.predict(resized.base64);
    //console.log(predictions.outputs)
    this.setState({
      //predictions: predictions.outputs[0].data.concepts,
      predictions: 'dog',
      capturedImage: resized.uri,
      translatedLabel: 'perro',
    })
    //this.translate();
    this.toggleImageModal();
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
        <SafeAreaView style={styles.container}>
          <StatusBar hidden={false} barStyle='light-content' />
          <Camera
            ref={ref => {this.camera = ref;}}
            type={this.state.type}
            style={styles.camera}
				  >
            <View 
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'flex-end',
                justifyContent: 'space-between'
                }}
            >
              <Icon.Ionicons
                name='ios-globe'
                size={50}
                onPress={this.toggleLanguageModal}
                color={Color.white}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}
            > 
              <Icon.Ionicons
                name='ios-radio-button-on'
                size={75}
                onPress={this.objectDetection}
                color={Color.white}
              />
					  </View>
          </Camera>
          <Modal isVisible={this.state.isImageModalVisible} backdropOpacity={0.8}>
            <View style={styles.imageModal}>
              <Image source={{uri: this.state.capturedImage}} style={{height: '80%', width: '90%'}}></Image>
              <Text style={styles.labelText}>{this.state.translatedLabel}</Text>
              <Button title="Add to Dictionary (change onPress)" onPress={this.toggleImageModal}></Button>
              <Button title="Close" onPress={this.toggleImageModal}></Button>
            </View>
          </Modal>
          <Modal isVisible={this.state.isLanguageModalVisible} backdropOpacity={0.5}>
            <View style={styles.languageModal}>
              <Picker
                style={{
                  width:'100%',
                  height: '40%',
                  paddingBottom: '100%',
                }}
                selectedValue={this.state.toLang}
                onValueChange={(itemValue) => this.setState({toLang: itemValue})}
              >
                <Picker.Item label="Spanish" value="es" />
                <Picker.Item label="French" value="fr" />
                <Picker.Item label="Italian" value="it" />
                <Picker.Item label="German" value="de" />
                <Picker.Item label="Russian" value="ru" />
                <Picker.Item label="Portuguese" value="pt" />
                <Picker.Item label="Japanese" value="ja" />
                <Picker.Item label="Chinese (Simplified)" value="zh" />
              </Picker>
              <Button title="Close" onPress={this.toggleLanguageModal}></Button>
            </View>
          </Modal>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Color.darkBlack
  },
  camera: {
    flex: 1
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
  imageModal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  labelText: {
    fontSize: 35,
    color: Color.lightBlue,
    lineHeight: 40,
    textAlign: 'center',
  },
  languageModal: {
    flex: 1,
    backgroundColor: Color.lightBlue,
    justifyContent: 'center',
    borderRadius: 15
  },
});
