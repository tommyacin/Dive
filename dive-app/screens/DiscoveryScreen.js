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

//import PickerLanguages from '../components/PickerLanguages'; PROBABLY NEED TO REMOVE
import { Color } from '../assets/Colors';

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
        <SafeAreaView style={{ flex: 1 }}>
          <View>
            <StatusBar backgroundColor={Color.lightBlue} barStyle="dark-content" translucent={true} />
          </View>
          <View 
            style={{
              backgroundColor: Color.lightBlue,
              flexDirection: 'row-reverse',
              alignItems: 'flex-end',
              justifyContent: 'space-between'
              }}
          >
            <Icon.Ionicons
              name='ios-globe'
              size={40}
              onPress={this.toggleLanguageModal}
            />
          </View>
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
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignItems: 'center',
                  backgroundColor: Color.lightBlue,
                  height: '10%',
                }}
                onPress={this.objectDetection}
              >
                <Text style={{ fontSize: 30, color: 'black', padding: 15 }}>
                {' '}
                Detect Objects{' '}
                </Text>
              </TouchableOpacity>
					  </View>
          </Camera>
          <Modal
            isVisible={this.state.isImageModalVisible}
            backdropOpacity={0.8}
          >
            <View style={{flex: 1}}>
              <Image source={{uri: this.state.capturedImage}} style={{height: 500, width: 300}}></Image>
              <Text style={styles.getStartedText}>{this.state.translatedLabel}</Text>
              <Button title="Add to Dictionary (change onPress)" onPress={this.toggleImageModal}></Button>
              <Button title="Close" onPress={this.toggleImageModal}></Button>
            </View>
          </Modal>
          <Modal isVisible={this.state.isLanguageModalVisible} backdropOpacity={0.5}>
            <View style={{
                    flex: 1,
                    backgroundColor: Color.lightBlue,
                    justifyContent: 'center',
                    borderRadius: '15'
                  }}>
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
