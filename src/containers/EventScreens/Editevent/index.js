/* eslint-disable prettier/prettier */
import React, {useState, useRef, useEffect, useContext} from 'react';
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
import {Picker} from '@react-native-picker/picker';
import State from '../../UserScreens/Home/Location';
import AppBackground from '../../../components/AppBackground';
import Icons from '../../../assets/Icons';
import {Colors, NavService, Common} from '../../../config';
import CustomButton from '../../../components/CustomButton';
import PickerCompone from '../EventPost/PickerCompone';
import PickerComptwo from '../EventPost/PickerComptwo';
import ActionSheet from 'react-native-actions-sheet';
import ProfileImage from '../../../components/ProfileImage';
import CustomImagePicker from '../../../components/CustomImagePicker';
import {useSelector} from 'react-redux';
import eventContext from '../eventContext';
import Toast from 'react-native-toast-message';
import {store} from '../../../redux/index';
import Mymdll from '../../../components/Mymdll';
import {styles} from '../EventPost/eventpost_styles';
import {
  edit_events,
  deleteCurrentEvent,
  deleteCurrentEventImage,
} from '../../../redux/APIs';
import Pickeventdate from '../../../components/Pickeventdate';
import Swiper from 'react-native-swiper';
import ImageURL from '../../../config/Common';

const Editevent = ({navigation, route}) => {
  const {eventDetail} = route?.params;
  console.log('eventDetail', eventDetail, 'eventDetail');
  const token = useSelector(state => state.reducer.user.api_token);
  const user = useSelector(state => state.reducer.user);
  const actionSheetStateRef = useRef();
  const [location, setLocation] = useState(eventDetail?.event_location);
  const [currentlocation, setcurrentlocation] = useState(
    eventDetail?.event_location,
  );
  const [title, setTitle] = useState(eventDetail?.event_title);
  const [citys, setCity] = useState(null);
  const [states, setStates] = useState(null);
  const [locals, Setlocals] = useState(State);
  const [dec, setDec] = useState(eventDetail?.event_description);
  const [selectedImage, setSelectedImage] = useState(eventDetail?.images);
  const [selectedData, setSelectedData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [date, setDate] = useState(eventDetail?.event_date);
  const {Categorys} = useContext(eventContext);

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
    const event_image = selectedImage;
    const user_id = user?.id;
    const event_id = eventDetail?.id;
    const category_id =
      selectedData == null
        ? eventDetail?.category?.category_id
        : selectedData?.category_id;
    const event_location = location;
    const state = states ? states : eventDetail?.state;
    const city = citys ? citys : eventDetail?.city;
    const event_date = date ? date : moment(date).format('MM DD YYYY');
    console.log('first', location);

    edit_events(
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
      event_id,
    );
  };
  const deleteCurrentGalleryAsset = async (assetId, customImagePath) => {
    let result;
    if (assetId) {
      result = await deleteCurrentEventImage(assetId);
      if (result) {
        const currentGalleryImages = [...selectedImage];
        const remainingAsset = currentGalleryImages?.filter(
          images => images?.id !== assetId,
        );
        setSelectedImage(remainingAsset);
      }
    } else {
      const currentGalleryImages = [...selectedImage];
      const remainingAsset = currentGalleryImages?.filter(
        images => images?.path !== customImagePath,
      );
      setSelectedImage(remainingAsset);
    }
  };
  const handleDeleteEvent = async () => {
    // console.log('bjdg')
    await deleteCurrentEvent(eventDetail?.id);
  };
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  console.log('eventDetail', eventDetail, 'eventDetail');
  return (
    <AppBackground
      title={'Edit'}
      home
      back
      save
      onSavePress={() => handlesubmit()}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
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
          <View style={{marginTop: 40, height: 150}}>
            {selectedImage?.length > 0 ? (
              <Swiper
                style={{height: 150}}
                activeDotColor="transparent"
                dotColor="transparent">
                {selectedImage.map(image => (
                  <ProfileImage
                    key={image.path}
                    name={user?.name}
                    imageUri={
                      !image?.path &&
                      image?.event_images &&
                      !image?.event_images.includes('mp4') &&
                      image?.event_images?.includes('images/')
                        ? `${ImageURL?.ImageURL}${image?.event_images}`
                        : `${image?.path}`
                    }
                    showAssetDeleteIcon={true}
                    deleteIconPress={() =>
                      deleteCurrentGalleryAsset(image?.id, image?.path)
                    }
                    videoUri={
                      !image?.path &&
                      image?.event_images &&
                      image?.event_images.startsWith('mp4') &&
                      image?.event_images?.includes('video/')
                        ? `${ImageURL?.ImageURL}${image?.event_images}`
                        : `${image?.path}`
                    }
                  />
                ))}
              </Swiper>
            ) : null}
          </View>
          <View>
            <CustomImagePicker
              isMultiple
              uploadVideo
              onImageChange={(path, mime) => {
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
                    currentGalleryAsset.push({path, mime});
                    setSelectedImage(currentGalleryAsset);
                  }
                } else if (mime.startsWith('video/')) {
                  const currentGalleryAsset = [...selectedImage];
                  currentGalleryAsset.push({path, mime});
                  setSelectedImage(currentGalleryAsset);
                }
              }}>
              <View style={[styles.mime, {height: 50, marginTop: 10}]}>
                <Image source={Icons.upload} style={styles.uploadimg} />
                <Text style={{color: Colors.black, fontWeight: 'bold'}}>
                  Upload
                </Text>
              </View>
            </CustomImagePicker>
          </View>
          <View style={{marginTop: 20, alignSelf: 'center', height: 500}}>
            <TextInput
              style={styles.maincontainer}
              onChangeText={title => setTitle(title)}
              value={title}
              placeholder="Name of Location"
              placeholderTextColor={Colors.black}
            />

            <PickerCompone
              categories={Categorys}
              selectedData={eventDetail?.event_type}
              placeholderCategory={eventDetail?.category?.title}
              setSelectedData={setSelectedData}
            />

            <TouchableOpacity style={styles.location} onPress={handleOpenModal}>
              {location ? (
                <Text style={{color: '#000', width: 250}} numberOfLines={1}>
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
                <Text style={{color: '#000'}}>
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

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Picker
                style={styles.containers}
                color={Colors.grey}
                selectedValue={states}
                onValueChange={(itemValue, itemIndex) => setStates(itemValue)}
                itemStyle={{color: 'white', fontSize: 20}}
                mode="dialog">
                <Picker.Item
                  label={eventDetail?.state ? eventDetail?.state : 'States'}
                  value="null"
                  style={{fontWeight: 'bold'}}
                />
                {Object.keys(locals).map(item => {
                  console.log('kji', item);
                  return (
                    <Picker.Item
                      label={item}
                      value={item}
                      style={{
                        fontWeight: 'bold',
                        backgroundColor: '#ededed',
                        color: Colors.black,
                      }}
                    />
                  );
                })}
              </Picker>

              <Picker
                style={styles.containers}
                selectedValue={citys}
                onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
                itemStyle={{color: 'white', fontSize: 20}}
                mode="dialog">
                <Picker.Item
                  label={eventDetail?.city ? eventDetail?.city : 'Cities'}
                  value="null"
                  style={{fontWeight: 'bold'}}
                />
                {states &&
                  locals[states].map((city, index) => (
                    <Picker.Item
                      key={index}
                      label={city}
                      value={city}
                      style={{
                        fontWeight: 'bold',
                        backgroundColor: '#ededed',
                        color: Colors.black,
                      }}
                    />
                  ))}
              </Picker>
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
            {/* <PickerComptwo /> */}
            <Pickeventdate date={date} setDate={setDate} />
            <CustomButton
              buttonStyle={styles.btn}
              title="Delete"
              onPress={handleDeleteEvent}
            />
          </View>
        </View>
        {/* Modal */}
      </ScrollView>
    </AppBackground>
  );
};

export default React.memo(Editevent);
