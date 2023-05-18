/* eslint-disable prettier/prettier */
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
import React, {useState, useRef, useEffect, useContext} from 'react';
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
import {update_event} from '../../../redux/APIs';
import Pickeventdate from '../../../components/Pickeventdate';
import Swiper from 'react-native-swiper';
import ImageURL from '../../../config/Common';
import postApi from '../../../redux/RequestTypes/post';
const Editevent = ({navigation, route}) => {
  const {eventDetail} = route?.params;

  const token = useSelector(state => state.reducer.user.api_token);
  const user = useSelector(state => state.reducer.user);
  const actionSheetStateRef = useRef();
  const [location, setLocation] = useState(eventDetail?.item?.event_location);
  const [currentlocation, setcurrentlocation] = useState(
    eventDetail?.item?.event_location,
  );
  const [date, setDate] = useState(eventDetail?.item?.created_at);
  const [title, setTitle] = useState(eventDetail?.item?.event_title);
  const [dec, setDec] = useState(eventDetail?.item?.event_description);

  const [selectedImage, setSelectedImage] = useState(eventDetail?.item?.images);
  const [selectedData, setSelectedData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    const event_image = selectedImage;
    const user_id = user?.id;
    const category_id = 1;
    const event_location = location;
    const id = eventDetail?.item?.id
    console.log('first', location);

    console.log("&*(*&^",
      event_title,
      event_type,
      event_description,
      event_image,
      user_id,
      category_id,
      event_location,
      id
    )

    update_event(
      event_title,
      event_type,
      event_description,
      event_image,
      user_id,
      category_id,
      event_location,
      id
    );
  };
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const Delete_Event = async (item) => {
    
    const id = item?.item?.id
    const params = {
      id : id
    }
    const data = await  postApi('delete-event',params);
    if(data.status == 1){
    
      NavService.navigate('CompleteProfile')
    }
   
  }

  const DateReadbleFunction = date => {
    var date = new Date();
    return date.toLocaleDateString();
  };

  
  return (
    <AppBackground title={'Edit'} home back save={handlesubmit}>
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

          <View style={{ marginTop: 40, height: 150 }}>
            {/* {console.log('eventDetail?.item?.images1111',selectedImage)} */}
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
                      image?.mime?.startsWith('image/') ? image?.path : null
                    }
                    videoUri={
                      image?.mime?.startsWith('video/') ? image?.path : null
                    }
                  />
                ))}
              </Swiper>
            ) : (
              <ProfileImage
                name={user?.name}
                imageUri={{ uri : selectedImage ? selectedImage.path : null}}
                // videoUri={selectedVideo ? selectedVideo.path : null}
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
                {/* <View style={styles.mime}> */}
                <View style={[styles.mime, { height: 50 }]}>
                  {!selectedImage ? (
                    <>
                      <TouchableOpacity>
                        <Image source={Icons.upload} style={styles.upload} />
                        <Text style={styles.txtclr}>Upload</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity style={{ marginTop: -40 }}>
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
                  )}
                  {/* <Image source={Icons.upload} style={styles.upload} />
                  <Text style={styles.txtclr}>Upload</Text> */}
                </View>
              </CustomImagePicker>
            </View>
          </View>

          <View style={{marginTop: 30, alignSelf: 'center', height: 500}}>
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
                <Text style={{color: '#000'}}>
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
              <TouchableOpacity style={styles.city} onPress={handleOpenModal}>
                {location ? (
                  <Text style={{color: '#000'}}>
                    {location.split(' ').slice(-5, -4).pop() +
                      ' ' +
                      location.split(' ').slice(-4, -3).pop()}
                  </Text>
                ) : currentlocation ? (
                  <Text style={{color: '#000'}}>
                    {currentlocation.split(' ').length > 1
                      ? currentlocation.split(' ').slice(-4, -3).pop()
                      : 'City'}
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

              <TouchableOpacity style={styles.state} onPress={handleOpenModal}>
                {location ? (
                  <Text style={{color: '#000'}}>
                    {location.split(' ').slice(-3, -2).pop()}
                  </Text>
                ) : currentlocation ? (
                  <Text style={{color: '#000'}}>
                    {currentlocation.split(' ').length > 1
                      ? currentlocation.split(' ').slice(-2, -1).pop()
                      : 'State'}
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
            <Pickeventdate  date={date} setDate={setDate}  />
            <CustomButton
              buttonStyle={styles.btn}
              title="Delete"
              onPress={() => Delete_Event(eventDetail)}
            />
          </View>
        </View>
        {/* Modal */}
      </ScrollView>
    </AppBackground>
  );
};

export default React.memo(Editevent);
