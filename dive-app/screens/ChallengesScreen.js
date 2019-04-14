import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar
} from 'react-native';
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
        <StatusBar barStyle='light-content' />
        <View style={styles.profileContainer}>
          <Image 
            style={styles.userImage}
            source={require('../assets/images/student.png')} 
          />        
          <View style={styles.profileStatsContainer}>
            <View>
              <Text style={{fontSize:21, color:'black'}}>Level: Master</Text>
            </View>
            <ProgressBar style={styles.profileProgressBar} progress={1/2} />
            <View>
              <Text style={{fontSize:14, color: 'black'}}>5,000/10,000</Text>
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
          <Image 
            style={styles.trophyImage}
            source={require('../assets/images/trophy.png')} 
          /> 
        </View>
        <ScrollView indicatorStyle={'black'} style={styles.ScrollViewContainer}>
          <View style={styles.subheaderContainer1}>
            <Text style={styles.subheaderText}>Daily Challenges</Text>
          </View>
          <Challenge
            source= {require('../assets/images/squirrel.png')}
            title='Find 3 animals'
            progress={2/5}
            points={100}
          />
          <Challenge
            source= {require('../assets/images/addFriend.png')}
            title='Add a friend'
            progress={0/10}
            points={500}
          />
          <Challenge
            source= {require('../assets/images/convertible.png')}
            title='Find 5 vehicles'
            progress={2/3}
            points={200}
          />
          <Challenge
            source= {require('../assets/images/broccoli.png')}
            title='Find 7 vegetables'
            progress={3/10}
            points={400}
          />
          <Challenge
            source= {require('../assets/images/pineapple.png')}
            title='Find 7 fruits'
            progress={5/7}
            points={400}
          />
          <View style={styles.subheaderContainer2}>
            <Text style={styles.subheaderText}>Lifetime Challenges</Text>
          </View>
          <Challenge
            source= {require('../assets/images/camera.png')}
            title='Find 300 objects'
            progress={0.65}
            points={3000}
          />
          <Challenge
            source= {require('../assets/images/alien.png')}
            title='Find 2 aliens'
            progress={1 / 2}
            points={5000}
          />
          <Challenge
            source= {require('../assets/images/addFriend.png')}
            title='Add 50 friends'
            progress={25 / 50}
            points={5000}
          />
          <Challenge
            source= {require('../assets/images/exam.png')}
            title='Ace 50 quizzes'
            progress={30 / 50}
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
    borderBottomColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Color.darkBlue,
    fontWeight: '500',
    fontSize: 20,
  },
  profileContainer: {
    backgroundColor: Color.white,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.35,
    borderBottomColor: 'grey',
    paddingTop: 10
  },
  profileStatsContainer: {
    flexDirection: 'column',
  },
  profileProgressBar: {
    color: 'green',
    transform: [{ scaleX: 1.0 }, { scaleY: 1.25 }],
  },
  profileLevelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userImage: {
    width: 70, 
    height: 70, 
    marginLeft: 10,
  },
  trophyImage: {
    width: 85, 
    height: 85, 
  },
  subheaderContainer1: {
    backgroundColor: '#FFBA49',
    width: '100%',
    alignItems: 'center',
  },
  subheaderContainer2: {
    backgroundColor: '#2BD9FE',
    width: '100%',
    alignItems: 'center',
  },
  subheaderText: {
    color: Color.white,
    fontSize: 35,
    marginTop: 5,
    marginBottom: 5,
    //paddingTop: 10,
    //fontFamily: 'AlNile-Bold'
    //fontFamily: 'AppleSDGothicNeo-Medium'
    fontFamily: 'Arial Rounded MT Bold',
  },
  ScrollViewContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Color.white
  }
});