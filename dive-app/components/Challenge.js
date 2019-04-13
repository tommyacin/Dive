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

export default class Challenge extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.challengeIcon}
          source={this.props.source}
        />
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.challengeTitle}>{this.props.title}</Text>
          </View>
          <ProgressBar style={styles.progressBar} progress={this.props.progress} />
          <View>
            <Text style={styles.challengePoints}>Points: {this.props.points}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.25,
    width: '100%',
    height: 80,
    paddingLeft: 13,
  },
  infoContainer: {
    flexDirection: 'column',
    marginLeft: 24,
    backgroundColor: 'transparent'
  },
  challengeTitle: {
    fontSize: 17,
    color: 'black',
    marginTop: 10,
  },
  challengePoints: {
    fontSize: 12,
    color: 'black',
    marginTop: 10,
  },
  progressBar: {
    marginLeft: 15,
    backgroundColor: 'white',
    marginTop: 10,
    transform: [{ scaleX: 1.19 }, { scaleY: 1.25 }],
  },
});