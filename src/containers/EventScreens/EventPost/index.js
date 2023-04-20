import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState, Component ,createRef} from 'react';
import AppBackground from '../../../components/AppBackground';
import Icons from '../../../assets/Icons';
import { Colors, NavService } from '../../../config';
import CustomImagePicker from '../../../components/CustomImagePicker';
import CustomButton from '../../../components/CustomButton';
import RNBounceable from "@freakycoder/react-native-bounceable";
import PickerCompone from './PickerCompone';
import PickerComptwo from './PickerComptwo';
import Modal from 'react-native-modal';
import ActionSheet from 'react-native-actions-sheet';
import ProfileImage from '../../../components/ProfileImage';

export class EventPost extends Component {
  state = {
    popUp: true,
    location: false,
    date: false,
    isVisible: false,
    selectedId: '',
    title: '',
    dec: '',
    location: '',
    state: this.props.user?.state,
    userImage: this.props.user?.image,
    selectedImage: null,


  };
  constructor(props) {
    super(props);
    this.actionSheetStateRef = createRef();
  }

  render() {
    const { popUp, location, date, isVisible, selectedId, title, dec, userImage, selectedImage, } = this.state;
    const togglePopUp = () => {
      this.setState(previousState => ({ popUp: !previousState?.popUp }));
    };
    const { user } = this.props

    return (
      <AppBackground title={'Events'} home back>
           <View style={{ flex: 1, height: '100%',  }}>
        <ScrollView showsVerticalScrollIndicator={false}  >
      
          <TextInput
            style={{
              backgroundColor: '#ededed',
              marginTop: 10,
              width:300,
              paddingLeft: 15,
              borderRadius: 10,
              height: 50,
            }}
            onChangeText={(title) => this.setState({ title })}
            value={this.state.title}
            placeholder="Title"
          />
          <PickerCompone />

          <View
            style={{
              backgroundColor: '#ededed',
              marginTop: 10,
              width: 300,
              paddingLeft: 15,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              height: 50
            }}>
            <TextInput onChangeText={(location) => this.setState({ location })}
              value={this.state.location} placeholder="Location" style={{ width: '90%' }} />
            <Image source={Icons.marker} style={{ width: 15, height: 18, position: 'absolute', right: 10, tintColor: '#434343' }} />
          </View>
          <View
            style={{
              height: 150,
              backgroundColor: '#ededed',
              width: 300,
              borderRadius: 10,
              marginTop: 10
            }}>
            <TextInput
              placeholder="Description"
              multiline={true}
              style={{ maxHeight: 150, marginLeft: 10, marginTop: 10 }}
              onChangeText={(dec) => this.setState({ dec })}
              value={this.state.dec}
            />
          </View>
          <PickerComptwo />

          <CustomButton
            buttonStyle={{
              marginTop: 10,
              alignSelf: 'center',
top:20,
              width:300
            }}
            title="Post"
            onPress={() => NavService.goBack()}
          // onPress={() => NavService.reset(0, [{name: 'CompleteProfile'}])}
          />
          
        </ScrollView>
          </View>
        {/* <Modal
          isVisible={popUp}
          style={{ margin: 0, padding: 0 }}
          backdropOpacity={0.7}
        // onBackButtonPress={() => togglePopUp()}
        >
          <View style={{ backgroundColor: Colors.purple, borderTopLeftRadius: 10, borderTopRightRadius: 10, alignItems: 'center', paddingTop: 10, width: '90%', alignSelf: 'center' }}>
            <Text style={{ fontSize: 18, color: Colors.white, fontWeight: 'bold' }}>Requirements and Tips for Posting</Text>
          </View>
          <View style={{ backgroundColor: Colors.purple, paddingHorizontal: 8, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, width: '90%', alignSelf: 'center', padding: 20, alignItems: 'center', justifyContent: 'center' }}>
            <View>
              <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 16, lineHeight: 28, paddingHorizontal: 10 }}>
                1-Name of Location (mandatory){'\n'}
                2-Official Address (mandatory){'\n'}
                3-Clear Photo of Building (mandatory){'\n'}
                4-Operating Hours (Mandatory){'\n'}
                5-Parking tips, where to park in description field (helpful tip){'\n'}
                6-If crowd (age, genre) differs from night to night, please include this helpful tip for outsiders{'\n'}
                7-If specified dress code is required on a specific night or on all nights, please include this helpful tip for outsiders{'\n'}
                8-Flyers, Pictures and videos of your most recent nights or events! (helpful){'\n'}
                9-Don't forget you may purchase optimisation to have your events featured on main home page!{'\n'}


              </Text>
            </View>

          </View>
          <CustomButton
            buttonStyle={{
              alignSelf: 'center',
              marginTop: 50
            }}
            title="Close"
            onPress={togglePopUp}
          />

        </Modal> */}
      </AppBackground>
    )
  }
}

export default EventPost


const styles = StyleSheet.create({
  cancel: {
    color: 'rgb(0,88,200)',
    fontSize: 18,
    fontWeight: '600',
  },
  action: { padding: 10, paddingBottom: 20 },
  picker: {
    width: 60,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: -90,
  },
})