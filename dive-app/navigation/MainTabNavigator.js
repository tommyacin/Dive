import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-vector-icons/Ionicons';

import TabBarIcon from '../components/TabBarIcon';
import SettingsScreen from '../screens/SettingsScreen';
import DiscoveryScreen from '../screens/DiscoveryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DictionaryScreen from "../screens/DictionaryScreen"
import ChallengesScreen from "../screens/ChallengesScreen"

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
  tabBarLabel: 'Leaderboard',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='ios-trophy'
      size={24}    />
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
      size={24}    />
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
      size={24}    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='ios-globe'
      size={24}    />
  ),
};

export default createBottomTabNavigator({
  ProfileStack,
  ChallengesStack,
  DiscoveryStack,
  DictionaryStack,
  SettingsStack,
});
