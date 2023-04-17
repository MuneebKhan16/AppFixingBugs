import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState, Component } from 'react';
import AppBackground from '../../../components/AppBackground';
import Icons from '../../../assets/Icons';
import { Colors, NavService } from '../../../config';
import CustomImagePicker from '../../../components/CustomImagePicker';
import CustomButton from '../../../components/CustomButton';
import RNBounceable from "@freakycoder/react-native-bounceable";
import PickerCompone from './PickerCompone';
import PickerComptwo from './PickerComptwo';
import Modal from 'react-native-modal';

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

  };
  render() {
    const { popUp, location, date, isVisible, selectedId, title, dec, } = this.state;
    const togglePopUp = () => {
      this.setState(previousState => ({ popUp: !previousState?.popUp }));
    };
    return (
      <AppBackground title={'Events'} home back>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              borderWidth: 2,
              borderColor: Colors.purple,
              alignSelf: 'center',
              height: 180,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
            }}>
            <CustomImagePicker>
              <RNBounceable style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
                <Image
                  source={Icons.upload}
                  style={{
                    width: 22,
                    height: 22,
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: 16,
                    color: Colors.darkGray,
                  }}>
                  Upload
                </Text>
              </RNBounceable>
            </CustomImagePicker>
          </View>
          <TextInput
            style={{
              backgroundColor: '#ededed',
              marginTop: 10,
              width: '98%',
              paddingLeft: 15,
              borderRadius: 10,
              height: 50
            }}
            value={title}
            placeholder="Title"
          />
          <PickerCompone />

          <View
            style={{
              backgroundColor: '#ededed',
              marginTop: 10,
              width: '98%',
              paddingLeft: 15,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              height: 50
            }}>
            <TextInput value={location} placeholder="Location" style={{ width: '90%' }} />
            <Image source={Icons.marker} style={{ width: 15, height: 18, position: 'absolute', right: 10, tintColor: '#434343' }} />
          </View>
          <View
            style={{
              height: 150,
              backgroundColor: '#ededed',
              width: '98%',
              borderRadius: 10,
              marginTop: 10
            }}>
            <TextInput
              placeholder="Description"
              multiline={true}
              style={{ maxHeight: 150, marginLeft: 10, marginTop: 10 }}
              value={dec}
            />
          </View>
          <PickerComptwo />

          <CustomButton
            buttonStyle={{
              marginTop: 10,
              alignSelf: 'center',
            }}
            title="Post"
            onPress={() => NavService.goBack()}
          // onPress={() => NavService.reset(0, [{name: 'CompleteProfile'}])}
          />
        </ScrollView>
        <Modal
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
              <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 16 ,lineHeight:28,paddingHorizontal:10}}>
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

        </Modal>
      </AppBackground>
    )
  }
}

export default EventPost

