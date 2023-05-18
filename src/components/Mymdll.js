import React, { useEffect, useState } from 'react';
import { View, Text, Modal,Platform ,PermissionsAndroid , TouchableOpacity, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, } from 'react-native';
import { Colors } from '../config';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import GooglePlaceAutocomplete from '../components/Google_Location'
import Geolocation from '@react-native-community/geolocation';


const MyMdl = ({ isVisible, onClose , setLocation,location ,currentlocation ,setcurrentlocation }) => {

  const [selectedItems, setSelectedItems] = useState([]);
  const [textInputEditable, setTextInputEditable] = useState(true);

  const requestCameraPermission = () => {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
          .then(granted => {
            if (granted) {
              Geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
              });
            } else {
              reject();
            }
          })
          .catch(err => reject(err));
      } else {
        Geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        });
      }
    });
  };

 const currentLocations = async () => {
  try {
    const { latitude, longitude } = await requestCameraPermission();
    const apiKey = 'AIzaSyB3QpMvb2IXZtJ6VI_pfH5687HyHCGVnUs';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    const data = await fetch(url);
    const resp = await data.json();
    const currentLocation = JSON.stringify(resp?.results[0]?.formatted_address).replace(/['"]/g, '');
    setcurrentlocation(currentLocation)
    return currentLocation;
  } catch (error) {
    console.error(error);
  }
  }

  const handleLocationPermission = async () => {
     await currentLocations();
    
  };

  useEffect(() => {
    handleLocationPermission()
  },[])

  return (
    <Modal visible={isVisible} animationType="slide">
<ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>Select Location</Text>
        </View>
          <GooglePlaceAutocomplete
          
                  callback={(address, geometry) =>{
                    console.log('address, geometry', address, geometry)
                    setLocation(address)

                  }
                    
                  }
                  onPress={(data, details) => {
                    console.log("oooo",data , details)
                  }}
                  wrapperStyles={{
                    width: 300,
                    alignSelf:'center'
                  }}
                  inputStyles={{
                    borderWidth: 1,
                    borderColor: Colors.lightGrey,
                    
                  }}
                  iconColor
                  placeholder={ location !== '' ?  location  : currentlocation !== '' ? currentlocation : 'Address'}

                />
        {/* Single */}
  
     {/* {console.log('currentlocation',currentlocation)} */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>{textInputEditable == false ? 'Done' : 'Close'}</Text>
        </TouchableOpacity>
  
      </View>
      </ScrollView>
    </Modal>
  );
};
export default React.memo(MyMdl)

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#ffff',
    flex: 1
  },
  modalHeader: {
    padding: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center',
    marginTop: 20
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.black
  },
  modalBody: {
    padding: 20,
    alignSelf: 'stretch',
  },
  modalBodyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: Colors.purple,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    width: '80%',
    height: 55,
    justifyContent: 'center',
    borderRadius: 20,
    marginTop:30
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,

  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
  },
  textInput: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    width: '90%',

  },
  flatList: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
    maxHeight: 200,

  },
  itemContainer: {
    padding: 10,

  },
  itemText: {
    fontSize: 16,
    color: Colors.black,
  },

});