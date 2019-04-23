import React from 'react';
import { StyleSheet, ScrollView, SectionList } from 'react-native';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Card } from 'react-native-elements'
import Modal from 'react-native-modal';
import { Icon } from 'expo';

import { FlatGrid, SectionGrid } from 'react-native-super-grid';


import DictionaryItem from '../components/DictionaryItem';
import { Color } from '../assets/Colors';
import { Data } from '../assets/Dictionary/Data'

export default class DictionaryScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  _renderSectionComponent = (data) => {
    return (
      <View style={styles.section}>
        <Text>{data.sectionId}</Text>
      </View>
    );
  }

  _renderCellComponent = (data) => {
    return (
      <View>
        <Text>
          {data.name}
        </Text>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 0, name: 'Agua', source: require('../assets/images/water.jpg'), color: '#EF767A'},  //water
        { id: 1, name: 'Ananá', source: require('../assets/images/pineapple.jpg'), color: '#EF767A'}, //pineapple
        { id: 2, name: 'Águila', source: require('../assets/images/eagle.jpg'), color: '#EF767A'},  //eagle
        { id: 3, name: 'Barco', source: require('../assets/images/boat.jpg'), color: '#23F0C7'}, //boat
        { id: 4, name: 'Bota', source: require('../assets/images/boot.jpg'), color: '#23F0C7'},  //boot
        { id: 5, name: 'Balón', source: require('../assets/images/ball.jpg'), color: '#23F0C7'}, //ball
        { id: 6, name: 'Choclo', source: require('../assets/images/corn.jpg'), color: '#2BD9FE'},  //corn
        { id: 7, name: 'Carro', source: require('../assets/images/car.jpg'), color: '#2BD9FE'}, //car
        { id: 8, name: 'Camisa', source: require('../assets/images/shirt.jpg'), color: '#2BD9FE'},  //shirt
        { id: 9, name: 'Dados', source: require('../assets/images/dice.jpg'), color: '#FFE347'},  //shirt
      ],
    }
  }


  render() {
    return (

      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='dark-content' />
        <Text style={styles.headerText}> My Cards </Text>

        <SectionGrid
          itemDimension={130}
          items={this.state.items}
          sections={[
            {title: 'A', data: this.state.items.slice(0, 2), },
            {title: 'B', data: this.state.items.slice(3, 6), },
            {title: 'C', data: this.state.items.slice(6, 8), },
            {title: 'D', data: this.state.items.slice(9, 10), },
          ]}

          style={styles.gridView}

          renderItem={({ item, section, index }) => (
            <View style={[styles.cardContainer]}>
              <Image style={styles.cardPicture}source={item.source}/>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={ [styles.cardBottomColor]}>
                <Text style={styles.cardBottomText}>View More</Text>
              </Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}

        />


      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.white,
    width: '100%',
    fontFamily: 'Arial Rounded MT Bold'
  },
  headerText: {
    color: '#EF767A',
    fontSize: 40,
    fontWeight: 'bold',
  },
  ScrollViewContainer: {
    width: '100%',
    //justifyContent: 'center',
    alignItems: 'center',
  
  },
  sectionList: {
    borderBottomWidth: 1,
    borderBottomColor: 'green',
  },
  listContainer: {
    width: '100%'
  },
  section: {
    height: 35,
    //justifyContent: 'center',
    backgroundColor: '#eee',
    width: '100%'
  },
  gridView: {
    flex: 1,
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
  },
  cardName: {
    color: '#23F0C7', //turqouise #2BD9FE
    fontSize: 27,
    fontWeight: '400',
  },
  cardPicture: {
    height: 155,
    width: 165,
    borderRadius: 20,
    paddingBottom: 20,
  },
  cardBottomColor: {
    backgroundColor: '#2BD9FE', //baby blue
    height: 30,
    width: 185,
    color: 'white',
    fontWeight: '900',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,

  },
  cardBottomText: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  sectionHeader: {
    flex: 1,
    fontSize: 25,
    fontWeight: '900',
    alignItems: 'center',
    backgroundColor: 'white',
    color: '#FFE347', //Yellow
    paddingLeft: 20,
    borderBottomWidth: 15,
    borderBottomColor: 'red',
    height: 30,
  },
  
});