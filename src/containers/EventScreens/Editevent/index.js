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
import PickerCompone from '../EventPost/PickerCompone';
import PickerComptwo from '../EventPost/PickerComptwo';
import PickerLocation from '../EventPost/PickerLocation';
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
import { styles } from '../EventPost/eventpost_styles';
import { post_events } from '../../../redux/APIs'
import GooglePlaceAutocomplete from '../../../components/Google_Location'
import Pickeventdate from '../../../components/Pickeventdate';
import Swiper from 'react-native-swiper';
const Editevent = props => {
  const { user } = props;
  const actionSheetStateRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [popUp, setPopUp] = useState(true);
  const [text, settext] = useState();

  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [states, setStates] = useState(null);

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
  const [selectedVideo, setSelectedVideo] = useState(null);
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
    <AppBackground title={'Edit'} home back save>
      <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
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
            {/* {selectedImage?.length > 0 ? (
                <Swiper style={{backgroundColor:'red'}}>
                  {selectedImage.map((image) => (
                    <ProfileImage
                      key={image.path} // Add a unique key prop for each image
                      name={user?.name}
                      imageUri={image.path}
                      videoUri={selectedVideo ? selectedVideo.path : null}
                    />
                  ))}
                </Swiper>
              ) : (
                <ProfileImage
                  name={user?.name}
                  imageUri={selectedImage ? selectedImage.path : userImage}
                  videoUri={selectedVideo ? selectedVideo.path : null}
                />
              )} */}
            {
              selectedImage?.length > 0 ? selectedImage.map((image) => {
                return (
                  <ProfileImage
                    name={user?.name}
                    imageUri={image ? image.path : userImage}
                    videoUri={selectedVideo ? selectedVideo?.path : null}
                  />
                )
              }) :
                <ProfileImage
                  name={user?.name}
                  imageUri={selectedImage ? selectedImage.path : userImage}
                  videoUri={selectedVideo ? selectedVideo?.path : null}
                />
            }
            {/* {
                selectedVideo?.length > 0 ? selectedVideo.map((video) => {
                  return (
                    <ProfileImage
                      name={user?.name}
                      imageUri={selectedImage ? selectedImage.path : userImage}
                      videoUri={video ? video.path : null}
                    />
                  )
                }) :
                  <ProfileImage
                    name={user?.name}
                    imageUri={selectedImage ? selectedImage.path : userImage}
                    videoUri={selectedVideo ? selectedVideo.path : null}
                  />
              } */}

            <View style={styles.picker}>
              <CustomImagePicker
                isMultiple
                uploadVideo
                onImageChange={(path, mime) => {
                  // setSelectedImage({ path, mime });
                  if (mime.startsWith('image/')) {
                    if (Array.isArray(path)) {
                      setSelectedImage(path);
                      setSelectedVideo(null);
                    } else {

                      setSelectedImage([{ path, mime }]);
                      setSelectedVideo(null);

                    }
                  } else if (mime.startsWith('video/')) {
                    setSelectedVideo({ path, mime });
                    setSelectedImage(null);
                  }
                }}>
                {/* <View style={styles.mime}> */}
                <View style={[styles.mime, { height: 50 }]}>
                  <Image source={Icons.upload} style={styles.upload} />
                  <Text style={styles.txtclr}>Upload</Text>
                </View>
              </CustomImagePicker>
            </View>
          </View>
          <View style={{ marginTop: 60, alignSelf: 'center', height: 500, }}>
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
                  {location.split(' ').slice(0, 1).pop() + " " + location.split(' ').slice(1, 2).pop() + " " + location.split(' ').slice(2, 3).pop() + " " + location.split(' ').slice(3, 4).pop() + " " + location.split(' ').slice(4, 5).pop() + " " + location.split(' ').slice(5, 6).pop() + " " + location.split(' ').slice(6, 7).pop()}
                </Text>
                : currentlocation ?
                  <Text style={{ color: '#000' }}>
                    {currentlocation.split(' ').slice(0, 1).pop() + " " + currentlocation.split(' ').slice(1, 2).pop() + " " + currentlocation.split(' ').slice(2, 3).pop()}
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

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={styles.city} onPress={handleOpenModal}>
                {location ?
                  <Text style={{ color: '#000' }}>
                    {location.split(' ').slice(-5, -4).pop() + " " + location.split(' ').slice(-4, -3).pop()}
                  </Text>
                  : currentlocation ?
                    <Text style={{ color: '#000' }}>
                      {currentlocation.split(' ').length > 1 ? currentlocation.split(' ').slice(-4, -3).pop() : 'City'}

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

              <TouchableOpacity style={styles.state} onPress={handleOpenModal}>
                {location ?
                  <Text style={{ color: '#000' }}>
                    {location.split(' ').slice(-3, -2).pop()}
                  </Text>
                  : currentlocation ?
                    <Text style={{ color: '#000' }}>
                      {currentlocation.split(' ').length > 1 ? currentlocation.split(' ').slice(-2, -1).pop() : 'State'}
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

            </View>
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
            <Pickeventdate />
            <CustomButton
              buttonStyle={styles.btn}
              title="Delete"
              onPress={handlesubmit}
            />
          </View>
        </View>
        {/* Modal */}

      </ScrollView>
    </AppBackground>
  );
};

export default React.memo(Editevent);
