import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import { Card } from 'react-native-elements'
import Modal from 'react-native-modal';
import ProgressBar from 'react-native-progress/Bar'
import { Icon } from 'expo';
import { Color } from '../assets/Colors';

export default class DictionaryItem extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomColor: Color.black,
    borderBottomWidth: 5,
    width: '100%'
  },
});