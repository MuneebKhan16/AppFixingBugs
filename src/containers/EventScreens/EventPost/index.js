/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import React, { useState, useRef, useEffect, useContext } from 'react';
import AppBackground from '../../../components/AppBackground';
import Icons from '../../../assets/Icons';
import { Colors, NavService, Common } from '../../../config';
import CustomButton from '../../../components/CustomButton';
import PickerCompone from './PickerCompone';
import PickerComptwo from './PickerComptwo';
import ActionSheet from 'react-native-actions-sheet';
import ProfileImage from '../../../components/ProfileImage';
import CustomImagePicker from '../../../components/CustomImagePicker';
import Modal from 'react-native-modal';
import { styles } from './eventpost_styles';
import { post_events, Get_All_Categories, loaderStop, loaderStart } from '../../../redux/APIs';
import { useSelector } from 'react-redux';
import eventContext from '../eventContext';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { store } from '../../../redux/index';
import { ActivityIndicator } from 'react-native-paper';
const EventPost = (props) => {
  const { user } = props
  const actionSheetStateRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [popUp, setPopUp] = useState(true);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [title, setTitle] = useState('');
  const [dec, setDec] = useState('');
  const [state, setState] = useState(user?.state);
  const [userImage, setUserImage] = useState(user?.image);
  const [selectedImage, setSelectedImage] = useState(null);

  const [selectedData, setSelectedData] = useState(null);

  const GoogleAPiKey = 'AIzaSyCzeJMBG7dupF95sa6qz5USqXYLJlGpjI4'

  const users = useSelector((state) => state?.reducer?.user)

  const { Categorys } = useContext(eventContext);



  const togglePopUp = () => {
    setPopUp((previousState) => previousState?.popUp);
  };

  function dispatch(action) {
    store.dispatch(action);
  }


  const handlesubmit = () => {

    if (!title) {
      return Toast.show({
        text1: 'No Title Found',
        type: 'error',
        visibilityTime: 3000,
      });
    }

    if (!dec) {
      return Toast.show({
        text1: 'No Description Found',
        type: 'error',
        visibilityTime: 3000,
      });
    }

    if (!selectedData) {
      return Toast.show({
        text1: 'No Category Found',
        type: 'error',
        visibilityTime: 3000,
      });
    }


    if (!location) {
      return Toast.show({
        text1: 'No Location Found',
        type: 'error',
        visibilityTime: 3000,
      });
    }

    if (!selectedImage) {
      return Toast.show({
        text1: 'No Image Found',
        type: 'error',
        visibilityTime: 3000,
      });
    }


    const event_title = title;
    const event_type = 'local';
    const event_description = dec;
    const event_image = { uri: selectedImage?.path, name: `rating`, type: selectedImage?.mime }
    const user_id = users?.id;
    const category_id = selectedData?.category_id;
    const event_location = location;


    const params = new FormData();
    params.append('event_title', event_title)
    params.append('event_type', event_type)
    params.append('event_description', event_description)
    params.append('event_image', event_image)
    params.append('user_id', user_id)
    params.append('category_id', category_id)
    params.append('event_location', event_location)



    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    }

    axios
      .post(`${Common.baseURL}add-event`, params, config)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: 'LOADER_STOP' });
          NavService.goBack();
        } else {
          dispatch({ type: 'LOADER_START' });
        }
      }).catch(() => {
        dispatch({ type: 'LOADER_START' });
      })


  };
  return (

    <AppBackground title={'Events'} home back>
      {
        isLoading ?
          (
            <ActivityIndicator />
          )
          :
          (
            <View style={styles.container}>
              <ActionSheet
                ref={actionSheetStateRef}
                containerStyle={styles.sheet}
              >
                <View style={styles.action}>
                  <TouchableOpacity
                    onPress={() => actionSheetStateRef.current.hide()}
                    style={styles.touchable}
                  >
                    <Text style={styles.cancel}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </ActionSheet>
              <View style={styles.user}>
                <ProfileImage
                  name={user?.name}
                  imageUri={selectedImage ? selectedImage.path : userImage}
                />

                <View style={styles.picker}>

                  <CustomImagePicker
                    onImageChange={(path, mime) => {
                      setSelectedImage({ path, mime });
                    }}
                  >
                    <View style={styles.mime}>
                      <Image
                        source={Icons.upload}
                        style={styles.upload}
                      />
                      <Text style={styles.txtclr} >Upload</Text>
                    </View>
                  </CustomImagePicker>
                </View>

              </View>
              <View style={styles.top}>
                <TextInput
                  style={styles.maincontainer}
                  onChangeText={(title) => setTitle(title)}
                  value={title}
                  placeholder="Title"
                  placeholderTextColor={Colors.black}
                />
                <PickerCompone categories={Categorys} setSelectedData={setSelectedData} />
                <View style={styles.location}>
                  {/* <GooglePlacesAutocomplete
                    placeholder='Enter Location'
                    onPress={(data, details = null) => {
                      setLocation(data, details)
                    }}
                    query={{
                      key: 'YOUR_API_KEY',
                      language: 'en',
                    }}
                  /> */}
                  <TextInput
                    onChangeText={(location) => setLocation(location)}
                    value={location}
                    placeholder="Location"
                    style={styles.loc}
                    placeholderTextColor={Colors.black}

                  />
                  <Image source={Icons.marker} style={styles.marker} />
                </View>
                <View style={styles.descp}>
                  <TextInput
                    placeholder="Descriptions"
                    multiline={true}
                    style={styles.description}
                    onChangeText={(dec) => setDec(dec)}
                    value={dec}
                    placeholderTextColor={Colors.black}

                  />
                </View>
                <PickerComptwo />
                <CustomButton
                  buttonStyle={styles.btn}
                  title="Posts"
                  onPress={handlesubmit}
                />
              </View>
            </View>
          )
      }

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
          onPress={() => togglePopUp()}
        />

      </Modal>
    </AppBackground>
  )
}

export default React.memo(EventPost)


