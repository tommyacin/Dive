import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Text, 
  View,
  SafeAreaView,
  Image,
  StatusBar
} from 'react-native';
import Modal from 'react-native-modal';

export default class TeacherScreen extends React.Component {
  static navigationOptions = {
    title: 'Teacher',
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.darkBlack,
  },
});