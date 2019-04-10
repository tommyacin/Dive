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
import ProgressBar from 'react-native-progress/Bar'
import { Icon } from 'expo';

import Challenge from '../components/Challenge';
import { Color } from '../assets/Colors';

export default class ChallengesScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <Icon.Ionicons
            name='ios-person'
            size={100}
          />
          <View style={styles.profileStatsContainer}>
            <View>
              <Text>Master</Text>
            </View>
            <ProgressBar progress={1/2} />
            <View style={styles.profileLevelContainer}>
              <Icon.Ionicons
                name='ios-star'
                size={25}
              />
              <Icon.Ionicons
                name='ios-star'
                size={25}
              />
              <Icon.Ionicons
                name='ios-star'
                size={25}
              />
            </View>
          </View>
        </View>
        <View style={styles.subheaderContainer}>
          <Text style={styles.subheaderText}>Card Values</Text>
        </View>
        <View style={styles.subheaderContainer}>
          <Text style={styles.subheaderText}>Weekly Challenges</Text>
        </View>
        <Challenge
          name='ios-football'
          title='Find 5 sports balls'
          progress={2/5}
          points={100}
        />
        <Challenge
          name='ios-car'
          title='Find 3 vehicles'
          progress={2/3}
          points={200}
        />
        <Challenge
          name='ios-hammer'
          title='Find 8 tools'
          progress={0.25}
          points={300}
        />
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
  header: {
    height: 60,
    borderBottomWidth: 0,
    borderBottomColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Color.darkBlue,
    fontWeight: '500',
    fontSize: 20,
  },
  profileContainer: {
    backgroundColor: Color.gray,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  profileStatsContainer: {
    flexDirection: 'column'
  },
  profileLevelContainer: {
    flexDirection: 'row'
  },
  subheaderContainer: {
    backgroundColor: Color.darkBlack,
    width: '100%',
    alignItems: 'center',
  },
  subheaderText: {
    color: Color.lightBlue,
    fontWeight: '500',
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
  },
});