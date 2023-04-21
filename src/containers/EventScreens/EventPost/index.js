import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';
import React, { useState, Component, createRef } from 'react';
import AppBackground from '../../../components/AppBackground';
import Icons from '../../../assets/Icons';
import { Colors, NavService } from '../../../config';
import CustomButton from '../../../components/CustomButton';
import PickerCompone from './PickerCompone';
import PickerComptwo from './PickerComptwo';
import ActionSheet from 'react-native-actions-sheet';
import ProfileImage from '../../../components/ProfileImage';
import CustomImagePicker from '../../../components/CustomImagePicker';
import Modal from 'react-native-modal';
import { styles } from './eventpost_styles';
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
    const { popUp, userImage, selectedImage, } =
      this.state;
    const { user } = this.props

    const togglePopUp = () => {
      this.setState(previousState => ({ popUp: !previousState?.popUp }));
    };

    const goback = () => {
      NavService.goBack()
    }

    return (
      <AppBackground title={'Events'} home back>
        <View style={styles.contanier}>
          <ActionSheet
            ref={this.actionSheetStateRef}
            containerStyle={styles.sheet}>
            <View style={styles.action}>

              <TouchableOpacity
                onPress={() => actionSheetStateRef.current.hide()}
                style={styles.touchable}>
                <Text
                  style={styles.cancel}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </ActionSheet>
          <View style={styles.user}>
            <ProfileImage
              name={user?.name}
              imageUri={selectedImage ? selectedImage.path : userImage}
            />
            <View
              style={styles.picker}>
              <CustomImagePicker
                onImageChange={(path, mime) => {
                  console.log('path', path);
                  this.setState({ selectedImage: { path, mime } });
                }}>
                <View style={styles.mime}>

                  <Image
                    source={Icons.upload}
                    style={styles.upload}
                  />
                  <Text style={styles.upload}>Upload</Text>
                </View>
              </CustomImagePicker>
            </View>
          </View>
          <View style={styles.top}>
            <TextInput
              style={styles.maincontainer}
              onChangeText={(title) => this.setState({ title })}
              value={this.state.title}
              placeholder="Title"
            />
            <PickerCompone />
            <View
              style={styles.location}>
              <TextInput onChangeText={(location) => this.setState({ location })}
                value={this.state.location} placeholder="Location" style={styles.loc} />
              <Image source={Icons.marker} style={styles.marker} />
            </View>
            <View
              style={styles.descp}>
              <TextInput
                placeholder="Description"
                multiline={true}
                style={styles.description}
                onChangeText={(dec) => this.setState({ dec })}
                value={this.state.dec}
              />
            </View>
            <PickerComptwo />
            <CustomButton
              buttonStyle={styles.btn}
              title="Post"
              onPress={goback}
            />
          </View>

        </View>

        {/* Modal */}

        <Modal
          isVisible={popUp}
          style={styles.modal}
          backdropOpacity={0.7}
        >
          <View style={styles.posting}>
            <Text style={styles.requriment}>Requirements and Tips for Posting</Text>
          </View>
          <View style={styles.category}>
            <View>
              <Text style={styles.modaltxt}>
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

export default React.memo(EventPost)


