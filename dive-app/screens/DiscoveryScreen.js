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
import { Camera, Permissions, ImageManipulator, Icon, Speech } from 'expo';

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
  }

  toggleImageModal = () => {
    this.setState({ isImageModalVisible: !this.state.isImageModalVisible });
  }

  toggleLanguageModal = () => {
    this.setState({ isLanguageModalVisible: !this.state.isLanguageModalVisible });
  }

  pronounce = () => {
    Speech.speak(
      text=this.state.translatedLabel,
      options={
        language: this.state.toLang,
        rate: 0.6
      }
    );
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
        this.setState({translatedLabel: data.responseData.translatedText});
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
    this.setState({
      //predictions: predictions.outputs[0].data.concepts,
      predictions: 'computer',
      capturedImage: resized.uri,
      translatedLabel: 'ordenador',
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
          <StatusBar barStyle='light-content' />
          <Camera
            ref={ref => {this.camera = ref;}}
            type={this.state.type}
            style={styles.camera}
				  >
            <View style={styles.globeIcon}>
              <Icon.Ionicons
                name='ios-globe'
                size={50}
                onPress={this.toggleLanguageModal}
                color={Color.white}
              />
            </View>
            <View
              style={styles.capture}
            > 
              <Icon.Ionicons
                name='ios-radio-button-on'
                size={75}
                onPress={this.objectDetection}
                color={Color.white}
              />
					  </View>
          </Camera>
          <Modal
            isVisible={this.state.isImageModalVisible}
            backdropOpacity={1}
            animationInTiming={350}
            animationOutTiming={350}
          >
            <View style={styles.imageModal}>
              <View style={styles.imageCloseIcon}>
                <Icon.Ionicons
                  name='ios-close'
                  size={50}
                  onPress={this.toggleImageModal}
                  color={Color.white}
                />
              </View>
              <Image source={{uri: this.state.capturedImage}} style={styles.capturedImage}></Image>
              <View style={styles.labelContainer}>
                <Text style={styles.labelText}>{this.state.translatedLabel}</Text>
                <Icon.Ionicons
                  name='ios-volume-high'
                  size={50}
                  onPress={this.pronounce}
                  color={Color.white}
                />
              </View>
            </View>
          </Modal>
          <Modal
            isVisible={this.state.isLanguageModalVisible}
            backdropOpacity={0.5} 
            animationInTiming={350}
            animationOutTiming={350}
          >
            <View style={styles.languageModal}>
              <Picker
                style={styles.languagePicker}
                itemStyle={styles.languagePickerItems}
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
              <Icon.Ionicons
                name='ios-checkmark'
                size={75}
                onPress={this.toggleLanguageModal}
                color={Color.white}
              />
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
  globeIcon: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingEnd: 10
  },
  capture: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  imageModal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  imageCloseIcon: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%'
  },
  capturedImage: {
    height: '85%',
    width: '90%',
    borderRadius: 15
  },
  labelContainer: {
    flexDirection: 'row'
  },
  labelText: {
    fontSize: 35,
    color: Color.lightBlue,
    lineHeight: 40,
    textAlign: 'center',
    marginRight: 40
  },
  languageModal: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Color.lightBlue,
    justifyContent: 'center',
    borderRadius: 15,
  },
  languagePicker: {
    width:'100%',
  },
  languagePickerItems: {

  },
});
