import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import TeacherScreen from '../screens/TeacherScreen';
import DiscoveryScreen from '../screens/DiscoveryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DictionaryScreen from "../screens/DictionaryScreen"
import ChallengesScreen from "../screens/ChallengesScreen"
import { Color } from '../assets/Colors';

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='ios-person'
      size={24}
    />
  ),
};

const ChallengesStack = createStackNavigator({
  Challenges: ChallengesScreen,
});

ChallengesStack.navigationOptions = {
  tabBarLabel: 'Challenges',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='ios-trophy'
      size={24}
    />
  ),
};

const DiscoveryStack = createStackNavigator({
  Discovery: DiscoveryScreen,
});

DiscoveryStack.navigationOptions = {
  tabBarLabel: 'Discovery',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='ios-camera'
      size={24}
    />
  ),
};

const DictionaryStack = createStackNavigator({
  Dictionary: DictionaryScreen,
});

DictionaryStack.navigationOptions = {
  tabBarLabel: 'Dictionary',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='ios-book'
      size={24}
    />
  ),
};

const TeacherStack = createStackNavigator({
  Teacher: TeacherScreen,
});

TeacherStack.navigationOptions = {
  tabBarLabel: 'Teacher',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='ios-school'
      size={24}
    />
  ),
};

export default createBottomTabNavigator({
  //ProfileStack,
  ChallengesStack,
  DiscoveryStack,
  DictionaryStack,
  TeacherStack,
},
{
  tabBarOptions: {
    activeTintColor: Color.darkBlue,
    style: {
      backgroundColor: Color.darkBlack
    },
  },
  initialRouteName: 'DiscoveryStack'
});
