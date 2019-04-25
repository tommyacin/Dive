import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
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
          <Text style={styles.classNameHeader} >{this.state.class}</Text>
        </TouchableOpacity>
        <Modal
            isVisible={this.state.isClassModalVisible}
            backdropOpacity={0.5} 
            animationInTiming={350}
            animationOutTiming={350}
          >
            <View style={styles.classesModal}>
              <Picker
                style={styles.classesPicker}
                selectedValue={this.state.class}
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

          <View style={styles.subheaderContainer}>
            <View style={styles.subheaderTextContainer}>
              <Text style={styles.subheaderText}>Attendance</Text>
            </View>
            <View style={styles.subheaderTextContainer}>
              <Text style={ [styles.subheaderText, {color:'orange'}, {textDecorationLine: 'underline'}] }>Roster</Text>
            </View>
            <View style={styles.subheaderTextContainer}>
              <Text style={styles.subheaderText}>Assign</Text>
            </View>
            </View>

          <ScrollView
            showsVerticalScrollIndicator={true}
            style={styles.scrollViewContainer}
          > 

            <View style={styles.studentComponent}>
              <Image style={styles.studentPic} source={require('../assets/images/Kevin-Yeung.png')}/>
              <Text style={styles.studentName}>Kevin Yeung</Text>
              <Image style={styles.arrowPic} source={require('../assets/images/arrow.png')}/>
            </View>

            <View style={styles.studentComponent}>
              <Image style={styles.studentPic} source={require('../assets/images/Tomas-Acin.png')}/>
              <Text style={styles.studentName}>Tomas Acin-Chediex</Text>
              <Image style={styles.arrowPic} source={require('../assets/images/arrow.png')}/>
            </View>

            <View style={styles.studentComponent}>
              <Image style={styles.studentPic} source={require('../assets/images/Rodrigo-Pecchio.png')}/>
              <Text style={styles.studentName}>Rodrigo Pecchio</Text>
              <Image style={styles.arrowPic} source={require('../assets/images/arrow.png')}/>
            </View>

            <View style={styles.studentComponent}>
              <Image style={styles.studentPic} source={require('../assets/images/Christian-Leong.png')}/>
              <Text style={styles.studentName}>Christian Leong</Text>
              <Image style={styles.arrowPic} source={require('../assets/images/arrow.png')}/>
            </View>

            <View style={styles.studentComponent}>
              <Image style={styles.studentPic} source={require('../assets/images/John-Doe.png')}/>
              <Text style={styles.studentName}>John Doe</Text>
              <Image style={styles.arrowPic} source={require('../assets/images/arrow.png')}/>
            </View>

            <View style={styles.studentComponent}>
              <Image style={styles.studentPic} source={require('../assets/images/Frank-McDonald.png')}/>
              <Text style={styles.studentName}>Frank McDonald</Text>
              <Image style={styles.arrowPic} source={require('../assets/images/arrow.png')}/>
            </View>

            <View style={styles.studentComponent}>
              <Image style={styles.studentPic} source={require('../assets/images/Sally-Mae.png')}/>
              <Text style={styles.studentName}>Sally Mae</Text>
              <Image style={styles.arrowPic} source={require('../assets/images/arrow.png')}/>
            </View>

            <View style={styles.studentComponent}>
              <Image style={styles.studentPic} source={require('../assets/images/Alex-Newell.png')}/>
              <Text style={styles.studentName}>Alex Newell</Text>
              <Image style={styles.arrowPic} source={require('../assets/images/arrow.png')}/>
            </View>

            <View style={styles.studentComponent}>
              <Image style={styles.studentPic} source={require('../assets/images/Jesse-Park.png')}/>
              <Text style={styles.studentName}>Jesse Park</Text>
              <Image style={styles.arrowPic} source={require('../assets/images/arrow.png')}/>
            </View>

            <View style={styles.studentComponent}>
              <Image style={styles.studentPic} source={require('../assets/images/Alfredo-Rodriguez.png')}/>
              <Text style={styles.studentName}>Alfredo Rodriguez</Text>
              <Image style={styles.arrowPic} source={require('../assets/images/arrow.png')}/>
            </View>

            <View style={styles.studentComponent}>
              <Image style={styles.studentPic} source={require('../assets/images/Kim-Rowell.png')}/>
              <Text style={styles.studentName}>Kim Rowell</Text>
              <Image style={styles.arrowPic} source={require('../assets/images/arrow.png')}/>
            </View>

            <View style={styles.studentComponent}>
              <Image style={styles.studentPic} source={require('../assets/images/Darren-Smith.png')}/>
              <Text style={styles.studentName}>Darren Smith</Text>
              <Image style={styles.arrowPic} source={require('../assets/images/arrow.png')}/>
            </View>
          

          </ScrollView>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Color.gray,
  },
  scrollViewContainer: {
    width: '100%',
    backgroundColor: Color.white
  },
  classHeader: {

  },
  classesModal: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Color.lightBlue,
    justifyContent: 'center',
    borderRadius: 15,
  },
  classesPicker: {
    width:'100%',
  },
  classNameHeader: {
    fontSize: 40,
    color: Color.black,
    fontFamily: 'Arial Rounded MT Bold',
    paddingTop: 15,
  },
  subheaderTextContainer: {
    flex: 1,
  },
  subheaderContainer: {
    width: '100%',
    backgroundColor: Color.gray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
  },
  subheaderText: {
    fontSize: 13.5,
    color: '#585858',
    fontFamily: 'Arial Rounded MT Bold',
    marginRight: 19,
    marginLeft: 29,
    paddingBottom: 10,
  },
  studentComponent: {
    backgroundColor: Color.gray,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: Color.darkGray,
    borderTopWidth: 0.40,
    width: '100%',
    height: 80,
    paddingLeft: 13,
  },
  studentPic: {
    height: 50,
    width: 50,
  },
  studentName: {
    fontSize: 20,
    color: '#404040',
    fontFamily: 'Arial Rounded MT Bold',
    position: 'absolute',
    left: 90,
  },
  arrowPic: {
    height: 17,
    width: 17,
    position: 'absolute',
    right: 20,
  }

});