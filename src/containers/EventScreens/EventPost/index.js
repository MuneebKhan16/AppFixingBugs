/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView
} from 'react-native';
import React, { useState, useRef, useEffect, useContext } from 'react';
import AppBackground from '../../../components/AppBackground';
import Icons from '../../../assets/Icons';
import { Colors, NavService, Common } from '../../../config';
import CustomButton from '../../../components/CustomButton';
import PickerCompone from './PickerCompone';
import PickerComptwo from './PickerComptwo';
import PickerLocation from './PickerLocation';
import ActionSheet from 'react-native-actions-sheet';
import ProfileImage from '../../../components/ProfileImage';
import CustomImagePicker from '../../../components/CustomImagePicker';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import eventContext from '../eventContext';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { store } from '../../../redux/index';
import Mymdll from '../../../components/Mymdll';
import { styles } from './eventpost_styles';
import { post_events } from '../../../redux/APIs'
import GooglePlaceAutocomplete from '../../../components/Google_Location'
const EventPost = props => {
  const { user } = props;
  const actionSheetStateRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [popUp, setPopUp] = useState(true);
  const [text, settext] = useState();

  const [location, setLocation] = useState(null);
  const [currentlocation, setcurrentlocation] = useState(null);
  const [date, setDate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [title, setTitle] = useState('');
  const [dec, setDec] = useState('');
  const [state, setState] = useState(user?.state);
  const [userImage, setUserImage] = useState(user?.image);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = item => {
    setSelectedItem(item);
  };
  const [selectedData, setSelectedData] = useState(null);
  const users = useSelector((state) => state?.reducer?.user)
  const { Categorys } = useContext(eventContext);
  const togglePopUp = () => {
    setPopUp(previousState => previousState?.popUp);
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
    const event_image = {
      uri: selectedImage?.path,
      name: `rating`,
      type: selectedImage?.mime,
    };
    const user_id = users?.id;
    const category_id = selectedData?.category_id;
    const event_location = location;
    console.log('first', location)

    post_events(event_title, event_type, event_description, event_image, user_id, category_id, event_location)


  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <AppBackground title={'Events'} home back>
      <ScrollView style={{ flex: 1, height: 280 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <ActionSheet ref={actionSheetStateRef} containerStyle={styles.sheet}>
            <View style={styles.action}>
              <TouchableOpacity
                onPress={() => actionSheetStateRef.current.hide()}
                style={styles.touchable}>
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
                }}>
                <View style={styles.mime}>
                  <Image source={Icons.upload} style={styles.upload} />
                  <Text style={styles.txtclr}>Upload</Text>
                </View>
              </CustomImagePicker>
            </View>
          </View>
          <View style={styles.top}>
            <TextInput
              style={styles.maincontainer}
              onChangeText={title => setTitle(title)}
              value={title}
              placeholder="Name of Location"
              placeholderTextColor={Colors.black}
            />
            <PickerCompone
              categories={Categorys}
              setSelectedData={setSelectedData}
            />


            <TouchableOpacity style={styles.location} onPress={handleOpenModal}>
              {location ?
                <Text style={{ color: '#000' }}>
                  {location}
                </Text>
                : currentlocation ?
                  <Text style={{ color: '#000' }}>
                    {currentlocation}
                  </Text>
                  : null
              }

              <Image source={Icons.marker} style={styles.marker} />
              <Mymdll
                isVisible={isModalVisible}
                onClose={handleCloseModal}
                setLocation={setLocation}
                location={location}
                currentlocation={currentlocation}
                setcurrentlocation={setcurrentlocation}
              />
            </TouchableOpacity>

            <View style={styles.descp}>
              <TextInput
                placeholder="Description"
                multiline={true}
                style={styles.description}
                onChangeText={dec => setDec(dec)}
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
      </ScrollView>
      {/* Modal */}
      <Modal
        isVisible={popUp}
        style={styles.modal}
        backdropOpacity={0.7}

      >
        <View style={styles.posting}>
          {/* <TouchableOpacity 
          onPress={() => togglePopUp()}
          style={{
            marginVertical: 10,
            position: 'absolute',
            right: 15,
            backgroundColor: 'white',
            padding: 8,
            alignItems: 'center',
            justifyContent: 'center',
            height:28,
            marginTop:15,
            borderRadius:10,
           
          }}>
            <Text style={{ color: Colors.purple, fontWeight: 'bold', }}>X</Text>
          </TouchableOpacity> */}
          <Text style={styles.requriment}>Requirements and Tips for Posting{'   '}</Text>
        </View>
        <View style={styles.category}>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.modaltxt}>1-Name of Location (mandatory){'\n'}</Text>
            <Text style={styles.modaltxt}>2-Upload Clear Photo of Building (Mandatory){'\n'}</Text>
            <Text style={styles.modaltxt}>3-Operating Hours (Mandatory){'\n'}</Text>
            <Text style={styles.modaltxt}>4-Helpful Tips in Description field such as Parking tips, Crowd (Age, Music Genre) on SpecificNights if Differs, Dress code,{'\n'}</Text>
            <Text style={styles.modaltxt}>5-Flyers, Pictures and videos of your most recent nights or events! (helpful)
              & Don’t forget you may purchase optimization to have your events featured on main home
              page!{'\n'}</Text>
            {/* <Text style={styles.modaltxt}>6-If crowd (age, genre) differs from night to night, please include this helpful tip for outsiders{'\n'}</Text>
            <Text style={styles.modaltxt}>7-If specified dress code is required on a specific night or on all nights, please include this helpful tip for outsiders{'\n'}</Text>
            <Text style={styles.modaltxt}>8-Flyers, Pictures and videos of your most recent nights or events! (helpful){'\n'}</Text>
            <Text style={styles.modaltxt}>9-Don't forget you may purchase optimisation to have your events featured on main home page!{'\n'}</Text> */}
          </View>

        </View>
        <CustomButton
          buttonStyle={{
            alignSelf: 'center',
            width: 360
          }}
          title="Close"
          onPress={() => togglePopUp()}
        />

      </Modal>
    </AppBackground>
  );
};

export default React.memo(EventPost);
