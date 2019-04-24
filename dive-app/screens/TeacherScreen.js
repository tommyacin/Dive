import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Text, 
  View,
  SafeAreaView,
  Image,
  StatusBar,
  Picker,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'expo';
import Modal from 'react-native-modal';
import { Color } from '../assets/Colors';

export default class TeacherScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);

    this.state = {
      isClassModalVisible: false,
      class: 'Spanish 101'
    }
  }

  toggleClassModal = () => {
    this.setState({ isClassModalVisible: !this.state.isClassModalVisible });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='light-content' />
        <TouchableOpacity
          onPress={this.toggleClassModal}
          style={styles.classHeader}
        >
          <Text>{this.state.class}</Text>
        </TouchableOpacity>
        <Modal
            isVisible={this.state.isClassModalVisible}
            backdropOpacity={0.5} 
            animationInTiming={350}
            animationOutTiming={350}
          >
            <View style={styles.classModal}>
              <Picker
                style={styles.classPicker}
                selectedValue={this.state.classCode}
                onValueChange={(itemValue) => this.setState({class: itemValue})}
              >
                <Picker.Item label="Spanish 101" value="Spanish 101" />
                <Picker.Item label="Spanish 201" value="Spanish 201" />
                <Picker.Item label="Spanish 301" value="Spanish 301" />
              </Picker>
              <Icon.Ionicons
                name='ios-checkmark'
                size={75}
                onPress={this.toggleClassModal}
                color={Color.white}
              />
            </View>
          </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  classHeader: {

  },
  classModal: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Color.lightBlue,
    justifyContent: 'center',
    borderRadius: 15,
  },
  classPicker: {

  }
});