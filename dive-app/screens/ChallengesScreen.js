import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {
  Text,
  View,
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
            name='md-contact'
            size={100}
            color='white'
          />
          <View style={styles.profileStatsContainer}>
            <View>
              <Text style={{fontSize:'21', color:'white'}}>Level: Master</Text>
            </View>
            <ProgressBar style={styles.profileProgressBar} progress={1 / 2} />
            <View>
              <Text style={{fontSize:'14', color: 'white'}}>5,300/10,000</Text>
            </View>
            <View style={styles.profileLevelContainer}>
              <Icon.Ionicons
                name='ios-star'
                size={30}
                color='yellow'
              />
              <Icon.Ionicons
                name='ios-star'
                size={30}
                color='yellow'
              />
              <Icon.Ionicons
                name='ios-star'
                size={30}
                color='yellow'
              />
              <Icon.Ionicons
                name='ios-star'
                size={30}
                color='yellow'
              />
              <Icon.Ionicons
                name='ios-star'
                size={30}
                color='yellow'
              />
            </View>
          </View>
        </View>

        <ScrollView indicatorStyle={'white'} style={styles.ScrollViewContainer}>
          <View style={styles.subheaderContainer}>
            <Text style={styles.subheaderText}>Daily Challenges</Text>
          </View>

          <Challenge
            name='md-paw'
            title='Find 3 animals'
            progress={2 / 5}
            points={100}
          />
          <Challenge
            name='ios-person-add'
            title='Add a friend'
            progress={0 / 10}
            points={500}
          />
          <Challenge
            name='ios-car'
            title='Find 5 vehicles'
            progress={2 / 3}
            points={200}
          />
          <Challenge
            name='md-pizza'
            title='Find 10 food items'
            progress={3 / 10}
            points={400}
          />

          <View style={styles.subheaderContainer}>
            <Text style={styles.subheaderText}>Lifetime Challenges</Text>
          </View>

          <Challenge
            name='ios-person-add'
            title='Add 50 friends'
            progress={25 / 50}
            points={5000}
          />
          <Challenge
            name='logo-reddit'
            title='Find 2 aliens'
            progress={1 / 2}
            points={5000}
          />
          <Challenge
            name='ios-hammer'
            title='Find 8 tools'
            progress={0.25}
            points={300}
          />
          <Challenge
            name='logo-reddit'
            title='Find 2 aliens'
            progress={1 / 2}
            points={5000}
          />
          <Challenge
            name='logo-reddit'
            title='Find 2 aliens'
            progress={1 / 2}
            points={5000}
          />
        </ScrollView>

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
    backgroundColor: Color.darkBlack,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 13,
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
  profileStatsContainer: {
    flexDirection: 'column',
    paddingTop: 14,
    marginLeft: 24,
  },
  profileProgressBar: {
    marginLeft: 15,
    color: 'green',
    transform: [{ scaleX: 1.19 }, { scaleY: 1.25 }],
  },
  profileLevelContainer: {
    flexDirection: 'row'
  },
  subheaderContainer: {
    backgroundColor: Color.darkBlack,
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'red',
    borderBottomWidth: 1,
    borderBottomColor: 'red',
  },
  subheaderText: {
    color: Color.lightBlue,
    fontSize: 40,
    marginTop: 5,
    marginBottom: 5,
  },
  ScrollViewContainer: {
    flex: 1,
    width: '100%',
  }
});