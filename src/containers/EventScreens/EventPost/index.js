import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import State from '../../UserScreens/Home/Location'
import React, { useState, useRef, useEffect, useContext } from 'react';
import moment from 'moment';
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
import { post_events } from '../../../redux/APIs';
import GooglePlaceAutocomplete from '../../../components/Google_Location';
import Pickeventdate from '../../../components/Pickeventdate';
import Swiper from 'react-native-swiper';
const EventPost = props => {
  const { user } = props;
  const actionSheetStateRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [popUp, setPopUp] = useState(true);
  const [text, settext] = useState();

  const [location, setLocation] = useState(null);
  const [locations, setLocations] = useState('');
  
  const [citys, setCity] = useState(null);
  const [states, setStates] = useState(null);

  const [currentlocation, setcurrentlocation] = useState(null);
  const [date, setDate] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [title, setTitle] = useState('');
  const [dec, setDec] = useState('');
  const [state, setState] = useState(user?.state);
  const [userImage, setUserImage] = useState(user?.image);
  const [selectedImage, setSelectedImage] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [locals, Setlocals] = useState(State);

  const handleSelect = item => {
    setSelectedItem(item);
  };
  const [selectedData, setSelectedData] = useState(null);
  const users = useSelector(state => state?.reducer?.user);
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

    if (selectedImage?.length == 0) {
      return Toast.show({
        text1: 'No Image Found',
        type: 'error',
        visibilityTime: 3000,
      });
    }

    const event_title = title;
    const event_type = 'local';
    const event_description = dec;
    // if(selectedImage?.length > 0){
    //   selectedImage?.map((asset,index)=>{})
    // }
    const event_image = selectedImage;
    const user_id = users?.id;
    // const category_id = selectedData?.category_id;
    const category_id = selectedData ? selectedData?.category_id : null;

    const event_location = location;
    const event_date = moment(date).format('YYYY-MM-DD');
    const state = states
    const city = citys
    // console.log("check",event_location,state,city)
    post_events(
      event_title,
      event_type,
      event_description,
      event_image,
      user_id,
      category_id,
      event_location,
      state,
      city,
      event_date,

    );
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
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
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
          <View style={{ marginTop: 40, height: 150 }}>
            {console.log('selectedImageselectedImage', selectedImage)}
            {selectedImage?.length > 0 ? (
              <Swiper
                style={{ height: 150 }}
                activeDotColor="transparent"
                dotColor="transparent">
                {selectedImage.map(image => (
                  <ProfileImage
                    key={image.path}
                    name={user?.name}
                    imageUri={
                      image?.mime.startsWith('image/') ? image.path : null
                    }
                    videoUri={
                      image?.mime.startsWith('video/') ? image.path : null
                    }
                  />
                ))}
              </Swiper>
            ) : (
              <ProfileImage
                name={user?.name}
                imageUri={selectedImage ? selectedImage.path : userImage}
                videoUri={selectedVideo ? selectedVideo.path : null}
              />
            )}

            <View style={styles.picker}>
              <CustomImagePicker
                isMultiple
                uploadVideo
                onImageChange={(path, mime) => {
                  // setSelectedImage({ path, mime });
                  if (mime.startsWith('image/')) {
                    if (Array.isArray(path.slice(0, 10))) {
                      const currentGalleryAsset = [...selectedImage];
                      const mergedUpdatedAsset = [
                        ...currentGalleryAsset,
                        ...path,
                      ];
                      setSelectedImage(mergedUpdatedAsset);
                    } else {
                      const currentGalleryAsset = [...selectedImage];
                      currentGalleryAsset.push({ path, mime });
                      setSelectedImage(currentGalleryAsset);
                    }
                  } else if (mime.startsWith('video/')) {
                    const currentGalleryAsset = [...selectedImage];
                    currentGalleryAsset.push({ path, mime });
                    setSelectedImage(currentGalleryAsset);
                  }
                }}>
                <View style={styles.item}>
                  <Image source={Icons.upload} style={styles.uploadimg} />
                  <Text style={styles.upload}>Upload</Text>
                </View>
                {/* <View style={styles.mime}> */}
                {/* <View style={[styles.mime, {height: 50}]}> */}
                {/* {!selectedImage ? (
                    <>
                      <TouchableOpacity style={{marginTop:40,backgroundColor:'red'}}>
                        <Image source={Icons.upload} style={styles.upload} />
                        <Text style={styles.txtclr}>Upload</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity style={{marginTop: -40}}>
                        <Image
                          source={Icons.upload}
                          style={{
                            width: 50,
                            height: 20,
                            resizeMode: 'contain',
                            color: Colors.black,
                          }}
                        />
                      </TouchableOpacity>
                      <Text style={styles.txtclr}>Upload</Text>
                    </>
                  )} */}
                {/* <Image source={Icons.upload} style={styles.upload} />
                  <Text style={styles.txtclr}>Upload</Text> */}
                {/* </View> */}
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
              {location ? (
                <Text style={{ color: '#000', width: 250 }} numberOfLines={1}>
                  {location.split(' ').slice(0, 1).pop() +
                    ' ' +
                    location.split(' ').slice(1, 2).pop() +
                    ' ' +
                    location.split(' ').slice(2, 3).pop() +
                    ' ' +
                    location.split(' ').slice(3, 4).pop() +
                    ' ' +
                    location.split(' ').slice(4, 5).pop() +
                    ' ' +
                    location.split(' ').slice(5, 6).pop() +
                    ' ' +
                    location.split(' ').slice(6, 7).pop()}
                </Text>
              ) : currentlocation ? (
                <Text style={{ color: '#000', width: 250 }} numberOfLines={1}>
                  {currentlocation.split(' ').slice(0, 1).pop() +
                    ' ' +
                    currentlocation.split(' ').slice(1, 2).pop() +
                    ' ' +
                    currentlocation.split(' ').slice(2, 3).pop()}
                </Text>
              ) : null}

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
            {console.log('locations***********',locations) }
            {
              location != null ?
                (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <TouchableOpacity style={styles.city} onPress={handleOpenModal}>
                      {/* {location ? (
                        <Text style={{ color: '#000', width: 95 }} numberOfLines={1}>
                          {location.split(' ').slice(-5, -4).pop() +
                            ' ' +
                            location.split(' ').slice(-4, -3).pop()}
                        </Text>
                      ) : currentlocation ? (
                        <Text style={{ color: '#000', width: 95 }} numberOfLines={1}>
                          {currentlocation.split(' ').length > 1
                            ? currentlocation.split(' ').slice(-4, -3).pop()
                            : 'City'}
                        </Text>
                      ) : null} */}

                      <Image source={Icons.marker} style={styles.marker} />
                      {/* <Mymdll
                        isVisible={isModalVisible}
                        onClose={handleCloseModal}
                        setLocation={setLocation}
                        location={location}
                        currentlocation={currentlocation}
                        setcurrentlocation={setcurrentlocation}
                      /> */}

                      <TextInput
                        editable={true}
                        style={{
                          flex: 1,
                          marginLeft: 10,
                          color: 'black',
                          alignContent:'center'
                        }}
                        onChangeText={state => {
                          if(state == ' '){
                            setStates(state);
                          }
                          setLocation(null);
                        }}
                        value={location ? location.split(' ').slice(-5, -4).pop() +
                        ' ' +
                        location.split(' ').slice(-4, -3).pop() : states}
                        placeholderTextColor="black"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.state} onPress={handleOpenModal}>
                      {/* {location ? (
                        <Text style={{ color: '#000', width: 95 }} numberOfLines={1}>
                          {location.split(' ').slice(-3, -2).pop()}
                        </Text>
                      ) : currentlocation ? (
                        <Text style={{ color: '#000', width: 95 }} numberOfLines={1}>
                          {currentlocation.split(' ').length > 1
                            ? currentlocation.split(' ').slice(-2, -1).pop()
                            : 'State'}
                        </Text>
                      ) : null} */}

                      <Image source={Icons.marker} style={styles.marker} />

                      <TextInput
                        editable={true}
                        style={{
                          flex: 1,
                          marginLeft: 10,
                          color: 'black',
                          alignContent:'center'
                        }}
                        onChangeText={city => setCity(city)}
                        value={  location ? location.split(' ').slice(-3, -2).pop() : citys}
                        placeholderTextColor="black"
                      />

                      {/* <Mymdll
                        isVisible={isModalVisible}
                        onClose={handleCloseModal}
                        setLocation={setLocation}
                        location={location}
                        currentlocation={currentlocation}
                        setcurrentlocation={setcurrentlocation}
                      /> */}

                    </TouchableOpacity>


                  </View>
                )
                :
                (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Picker
                      style={styles.containers}
                      // color={Colors.grey}
                      selectedValue={states}
                      onValueChange={(itemValue, itemIndex) => setStates(itemValue)}
                      itemStyle={{ color: 'white', fontSize: 20, }}
                      mode="dropdown"
                    >
                      <Picker.Item label='States' value='null' color={'black'} style={{ fontWeight: 'bold' }} />
                      {
                        Object.keys(locals).map((item) => {
                          console.log("kji", item)
                          return (
                            <Picker.Item label={item} value={item} color={'black'} style={{ fontWeight: 'bold', }} />
                          )
                        })
                      }
                    </Picker>

                    <Picker
                      style={styles.containers}
                      color={Colors.grey}
                      selectedValue={citys}
                      onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
                      itemStyle={{ color: 'white', fontSize: 20, }}
                      mode="dropdown"
                    >

                      {
                        states && locals[states].map((city, index) => (
                          <Picker.Item
                            key={index}
                            label={city}
                            value={city}
                            color="black"
                            style={{ fontWeight: 'bold', }}
                          />
                        ))
                      }
                    </Picker>
                  </View>

                )
            }

            <View
              style={{
                height: 150,
                backgroundColor: '#ededed',
                width: 300,
                borderRadius: 10,
                marginTop: 10,
                paddingVertical: 10,
              }}>
              <TextInput
                placeholder="Description"
                multiline={true}
                style={{
                  flex: 1,
                  marginLeft: 10,
                  color: 'black',
                  textAlignVertical: 'top', // Add this property to align the placeholder text at the top
                }}
                onChangeText={dec => setDec(dec)}
                value={dec}
                placeholderTextColor="black"
              />
            </View>

            <PickerComptwo />

            <Pickeventdate date={date} setDate={setDate} />

            <CustomButton
              buttonStyle={styles.btn}
              title="Post"
              onPress={handlesubmit}
            />
          </View>
        </View>
        {/* Modal */}
        <Modal isVisible={popUp} style={styles.modal} backdropOpacity={0.7}>
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
            <Text style={styles.requriment}>
              Requirements and Tips for Posting{'   '}
            </Text>
          </View>
          <View style={styles.category}>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.modaltxt}>
                1- Name of Location (mandatory){'\n'}
              </Text>
              <Text style={styles.modaltxt}>
                2- Upload Clear Photo of Building (Mandatory){'\n'}
              </Text>
              <Text style={styles.modaltxt}>
                3- Operating Hours (Mandatory){'\n'}
              </Text>
              <Text style={styles.modaltxt}>
                4- Helpful Tips in Description field such as Parking tips, Crowd
                (Age, Music Genre) on Specific Nights if Differs, Dress code,
                {'\n'}
              </Text>
              <Text style={styles.modaltxt}>
                5- Flyers, Pictures and videos of your most recent nights or
                events! (helpful) & Don’t forget you may purchase optimization
                to have your events featured on main home page!{'\n'}
              </Text>
              {/* <Text style={styles.modaltxt}>6-If crowd (age, genre) differs from night to night, please include this helpful tip for outsiders{'\n'}</Text>
            <Text style={styles.modaltxt}>7-If specified dress code is required on a specific night or on all nights, please include this helpful tip for outsiders{'\n'}</Text>
            <Text style={styles.modaltxt}>8-Flyers, Pictures and videos of your most recent nights or events! (helpful){'\n'}</Text>
          <Text style={styles.modaltxt}>9-Don't forget you may purchase optimisation to have your events featured on main home page!{'\n'}</Text> */}
            </View>
          </View>
          <CustomButton
            buttonStyle={{
              alignSelf: 'center',
              width: '95%',
            }}
            title="Close"
            onPress={() => togglePopUp()}
          />
        </Modal>
      </ScrollView>
    </AppBackground>
  );
};

export default React.memo(EventPost);