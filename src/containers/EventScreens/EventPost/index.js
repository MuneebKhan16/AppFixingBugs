/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';
import React, { useState, useRef, useEffect , useContext } from 'react';
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
import { post_events, Get_All_Categories } from '../../../redux/APIs';
import { useSelector } from 'react-redux';
import eventContext from '../eventContext';
import Toast from 'react-native-toast-message';
const EventPost = (props) => {
  const { user } = props
  const actionSheetStateRef = useRef();
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



const users = useSelector((state) => state.reducer.user)
 
const { Categorys } = useContext(eventContext);

console.log('Categorys',Categorys)

  const togglePopUp = () => {
    setPopUp((previousState) => previousState?.popUp);
  };

  const goback = () => {
    NavService.goBack();
  };


  const handlesubmit = () => {
    const event_title = title;
    const event_type = 'local';
    const event_description = dec;
    const event_image =  { uri: selectedImage?.path, name: `rating`, type: selectedImage?.mime } 
    const user_id = users?.id;
    const category_id = selectedData?.category_id;
    const event_location = location;


      post_events(
        event_title,
        event_type,
        event_description,
        event_image,
        user_id,
        category_id,
        event_location
      );

    
  };
    return (
      <AppBackground title={'Events'} home back>
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
              <Text style={styles.upload}>Upload</Text>
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
        />
        <PickerCompone categories={Categorys}  setSelectedData={setSelectedData}  />
        <View style={styles.location}>
          <TextInput
            onChangeText={(location) => setLocation(location)}
            value={location}
            placeholder="Location"
            style={styles.loc}
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


