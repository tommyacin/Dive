import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View} from 'react-native';
import Modal from 'react-native-modal';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return (
      <View>
        <Text>Hello World!</Text>
      </View>
    );
  }
}
