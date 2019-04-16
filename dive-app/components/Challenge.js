import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
  View,
  Image,
} from 'react-native';
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
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsText}>{this.props.points} </Text>
            <Icon.MaterialCommunityIcons
              name='coin'
              size={17}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Color.gray,
    borderBottomWidth: 0.40,
    width: '100%',
    height: 110,
    paddingLeft: 13,
  },
  infoContainer: {
    flexDirection: 'column',
    marginLeft: 24,
  },
  challengeTitle: {
    fontSize: 20,
    color: Color.black,
    fontWeight: '400'
  },
  pointsContainer: {
    flexDirection: 'row',
  },
  pointsText: {
    fontSize: 15,
    color: Color.black,
    fontWeight: 'bold'
  },
  progressBar: {
    backgroundColor: Color.progressBarOrange,
    borderColor: Color.gray,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 35,
    transform: [{ scaleX: 1.5 }, { scaleY: 4 }],
  },
});