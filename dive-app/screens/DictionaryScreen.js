import React from 'react';
import { StyleSheet } from 'react-native';
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

  render() {
    return (
      <SafeAreaView style={styles.container}>        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.gray,
    width: '100%'
  },
  listContainer: {
    width: '100%'
  },
  section: {
    height: 35,
    justifyContent: 'center',
    backgroundColor: '#eee',
    paddingLeft: 10,
    width: '100%'
  },
  cell: {

  }
});