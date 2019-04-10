import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  Picker,
} from 'react-native';
import { Color } from '../assets/Colors';

export default class PickerLanguages extends React.Component { 
  render() {
    return (
      <>
        <Picker.Item label="Spanish" value="es" />
        <Picker.Item label="French" value="fr" />
        <Picker.Item label="Italian" value="it" />
        <Picker.Item label="German" value="de" />
        <Picker.Item label="Russian" value="ru" />
        <Picker.Item label="Portuguese" value="pt" />
        <Picker.Item label="Japanese" value="ja" />
        <Picker.Item label="Chinese (Simplified)" value="zh" />
      </>
    );
  }
}