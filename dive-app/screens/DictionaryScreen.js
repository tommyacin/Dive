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

import { Color } from '../assets/Colors';

export default class DictionaryScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <StatusBar backgroundColor={Color.lightBlue} barStyle="dark-content" translucent={true} />
        </View>
        <View>
          <Text>Hello World!</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.gray
  },
});