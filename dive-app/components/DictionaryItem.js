import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Icon, Speech } from 'expo';
import Modal from 'react-native-modal';
import { Color } from '../assets/Colors';

export default class DictionaryItem extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isItemVisible: false
    };
  }

  toggleItemModal = () => {
    this.setState({ isItemVisible: !this.state.isItemVisible });
  }

  pronounce = () => {
    Speech.speak(
      text=this.props.word,
      options={
        language: 'es',
        rate: 0.6
      }
    );
  }

  render() {
    return (
      <TouchableOpacity 
        style={styles.cardContainer}
        onPress={this.toggleItemModal}
      >
        <Image style={styles.cardPicture} source={this.props.source}/>
        <Text style={styles.cardName}>{this.props.word}</Text>
        <View style={ [styles.cardBottomColor, {backgroundColor: this.props.backgroundColor} ] }>
          <Text style={styles.cardBottomText}> </Text>
        </View>
        <Modal
          isVisible={this.state.isItemVisible}
          backdropOpacity={1}
        >
          <View style={styles.itemModal}>
            <View style={styles.imageCloseIcon}>
              <Icon.Ionicons
                name='ios-close'
                size={50}
                onPress={this.toggleItemModal}
                color={Color.white}
              />  
            </View>
            <Image
              source={this.props.source}
              style={styles.itemModalImage}
            />
            <Text style={styles.itemModalText}>{this.props.word}</Text>
            <Text style={styles.itemModalExampleText}>{this.props.example}</Text>
            <Icon.Ionicons
              name='ios-volume-high'
              size={50}
              onPress={this.pronounce}
              color={Color.white}
            />
          </View>
        </Modal>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // borderBottomColor: Color.black,
    // borderBottomWidth: 5,
    width: '100%',
    backgroundColor: 'grey',
  },
  cardContainer: {
    justifyContent: 'flex-end',
    padding: 10,
    margin: 5,
    height: 250,
    width: 185,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    shadowOffset:{ width: 5, height: 5},
    shadowColor: 'grey',
    shadowOpacity: 0.35,
    borderRadius: 20,
  },
  cardName: {
    color: '#585858', //bright red
    fontSize: 27,
    fontWeight: '400',
    paddingTop: 5,
    paddingBottom: 5,
  },
  cardPicture: {
    height: 180,
    width: 165,
    borderRadius: 10,
    paddingBottom: 20,
    justifyContent: 'flex-start',
  },
  cardBottomColor: {
    backgroundColor: '#99ECFF', //baby blue
    height: 17,
    width: 185,
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

  },
  cardBottomText: {
    color: 'white',
    fontWeight: '900',
    flex: 1,
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemModal: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  itemModalText: {
    fontSize: 35,
    color: Color.lightBlue,
    lineHeight: 40,
    textAlign: 'center',
    paddingTop: 10,
  },
  itemModalExampleText: {
    fontSize: 20,
    color: Color.lightBlue,
    lineHeight: 40,
    textAlign: 'center',
  },
  itemModalImage: {
    height: '60%',
    width: '70%',
    borderRadius: 15
  },
  imageCloseIcon: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%'
  },
});