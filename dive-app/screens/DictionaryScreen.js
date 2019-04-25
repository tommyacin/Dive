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
import { FlatGrid, SectionGrid } from 'react-native-super-grid';


import DictionaryItem from '../components/DictionaryItem';
import { Color } from '../assets/Colors';

export default class DictionaryScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 0, name: 'Agua', source: require('../assets/images/water.jpg'), color: '#FF4F66', example: 'Me puedes llenar el baso con agua por favor?'},  //water
        { id: 1, name: 'Ananá', source: require('../assets/images/pineapple.jpg'), color: '#FF4F66', example: 'Voy a comer un ananá.'}, //pineapple
        { id: 2, name: 'Águila', source: require('../assets/images/eagle.jpg'), color: '#FF4F66', example: 'El aguila vola por el cielo.'},  //eagle
        { id: 3, name: 'Barco', source: require('../assets/images/boat.jpg'), color: '#23F0C7', example: 'Los piratas viven en un barco.'}, //boat
        { id: 4, name: 'Bota', source: require('../assets/images/boot.jpg'), color: '#23F0C7', example: 'Perdi una de mis botas en el parque.'},  //boot
        { id: 5, name: 'Balón', source: require('../assets/images/ball.jpg'), color: '#23F0C7', example: 'El futbol se juega con un balón'}, //ball
        { id: 6, name: 'Choclo', source: require('../assets/images/corn.jpg'), color: '#2BD9FE', example: 'El choclo es amarillo.'},  //corn
        { id: 7, name: 'Carro', source: require('../assets/images/car.jpg'), color: '#2BD9FE', example: 'Nunca he chocado mi carro.'}, //car
        { id: 8, name: 'Camisa', source: require('../assets/images/shirt.jpg'), color: '#2BD9FE', example: 'Te gusta la camisa que tengo puesto?'},  //shirt
        { id: 9, name: 'Dados', source: require('../assets/images/dice.jpg'), color: '#FFE347', example: 'Los casinos utilizan los dados.'},  //dice
      ],
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='light-content' />
        <Text style={styles.headerText}> My Cards </Text>
        <SectionGrid
          itemDimension={130}
          items={this.state.items}
          sections={[
            {title: 'A', data: this.state.items.slice(0, 3), },
            {title: 'B', data: this.state.items.slice(3, 6), },
            {title: 'C', data: this.state.items.slice(6, 9), },
            {title: 'D', data: this.state.items.slice(9, 10), },
          ]}
          style={styles.gridView}
          renderItem={({ item, section, index }) => (
            <DictionaryItem
              word={item.name}
              source={item.source}
              backgroundColor={item.color}
              example={item.example}
            />
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
  },
  headerText: {
    color: '#EF767A',
    fontSize: 40,
    fontWeight: 'bold',
  },
  ScrollViewContainer: {
    width: '100%',
    alignItems: 'center',
  
  },
  sectionList: {
    // borderBottomWidth: 1,
    // borderBottomColor: 'green',
  },
  listContainer: {
    width: '100%'
  },
  section: {
    height: 35,
    backgroundColor: Color.white,
    width: '100%'
  },
  gridView: {
    flex: 1,
  },
  sectionHeader: {
    flex: 1,
    fontSize: 27,
    fontWeight: '900',
    alignItems: 'center',
    backgroundColor: Color.white,
    color: '#FFBA49', //Yellow
    paddingLeft: 20,
    borderBottomWidth: 15,
    borderBottomColor: 'red',
    height: 30,
  },
});