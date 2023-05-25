/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import State from './Location'
import Modal from 'react-native-modal';
import AppBackground from '../../../components/AppBackground';
import { Colors, NavService } from '../../../config';
import { connect } from 'react-redux';
import CustomButton from '../../../components/CustomButton';
import Btn from '../../../components/Btn';
import Pickdate from '../../../components/Pickdate';
import { Picker } from '@react-native-picker/picker';
import SplashScreen from 'react-native-splash-screen';
import Categories from '../../../components/Categories';
import { Get_All_Categories, localevents } from '../../../redux/APIs/index';
import Icons from '../../../assets/Icons';
import ImageURL from '../../../config/Common';
import FastImage from 'react-native-fast-image';
import Searchable from '../../../components/searchable';
import GooglePlaceAutocomplete from '../../../components/GooglePlaceAutocomplete';
import Geolocation from '@react-native-community/geolocation';
navigator.geolocation = require('@react-native-community/geolocation');

import { styles } from './Home_Styles';
import { themes } from '../../../config/globalFonts/globalFonts';

export class Home extends Component {
  Featured = () => {
    NavService.navigate('Featured');
  };

  state = {
    popUp: true,
    location: '',
    Locations: '',
    date: false,
    isVisible: false,
    selectedId: '',
    category: [],
    categoryid: null,
    feature: [],
    text: '',
    u: '',
    isFocused: false,
    modalVisible: false,
    geolocation: false,
    latitude: null,
    longitude: null,
    selectedLanguage: null,
    selectedcity: null,
    local: State


  };
  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  setLocation = location => {
    this.setState({ location });
  };

  requestCameraPermission() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(granted => {
        if (granted) {
          Geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            this.setState({ latitude });
            this.setState({ longitude });
          });
        }
      });
    } else {
      Geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        this.setState({ latitude });
        this.setState({ longitude });
      });
    }
  }

  currentLocations = async () => {
    const apiKey = 'AIzaSyB3QpMvb2IXZtJ6VI_pfH5687HyHCGVnUs';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&key=${apiKey}`;
    console.log('345', url);
    const data = await fetch(url);
    const resp = await data.json();
    this.setState({
      text: JSON.stringify(resp?.results[0]?.formatted_address).replace(
        /['"]/g,
        '',
      ),
    });
  };
  setGeoLocation = async geolocation => {
    this.setState({ geolocation });
    this.requestCameraPermission();
    setTimeout(() => {
      this.currentLocations();
    }, 3000);
  };

  componentDidMount() {
    SplashScreen.hide();
    const userData = this.props?.user?.api_token;
    Get_All_Categories().then(res => this.setState({ category: res?.Data }));
    Get_All_Categories().then(res =>
      this.setState({ categoryid: res.Data.filter(data => data?.category_id) }),
    );
    localevents(userData).then(res =>
      this.setState({ feature: res?.Data?.featured }),
    );
  }

  render() {
    const {
      popUp,
      location,
      date,
      category,
      categoryid,
      feature,
      text,
      u,
      isFocused,
      modalVisible,
    } = this.state;
    const userImage = this?.props?.user?.image;

    const togglePopUp = () => {
      if (location.name != '') {
        this.setState(previousState => ({ popUp: !previousState?.popUp }));
      }
    };

    return (
      <AppBackground marginHorizontal title={'Home'} home>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrlcontainer}>
          <Text style={styles.header}>Featured</Text>
          <View style={styles.maincontainer}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={feature}
              horizontal
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={this.Featured} style={styles.tch}>
                  <FastImage
                    source={{ uri: `${ImageURL?.ImageURL}${item.event_image}` }}
                    style={styles.imgbackground}
                    imageStyle={styles.imgbg}>
                    <View style={styles.icnstrempty}>
                      <Image
                        source={Icons.starEmpty}
                        style={styles.starempty}
                      />
                    </View>
                    <Text style={styles.ftrtitle}>{item.event_title}</Text>
                  </FastImage>
                </TouchableOpacity>
              )}
            />
          </View>
          {category && category?.length > 0 ? (
            category?.map((data, index) => {
              return (
                <Categories
                  key={index}
                  categories={data}
                  onPress={() =>
                    NavService.navigate('Event', data?.category_id)
                  }
                />
              );
            })
          ) : (
            <View style={styles.container1}>
              <Text style={styles.txtheadersty}>No Category Found</Text>
            </View>
          )}
        </ScrollView>
        {console.log('hhhhhhsssd', this.state.latitude, this.state.longitude)}
        <Modal isVisible={popUp} style={styles.modal} backdropOpacity={0.7}>
          <View style={styles.modalcontainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <Text style={styles.mdltxt}>Please enter the location</Text>
                <Btn Setlocations={this.setGeoLocation} />

                {
                  this.state.geolocation ?
                    (
                      <>
                        {/* <GooglePlaceAutocomplete
                          callback={(address, geometry) =>
                            console.log('address, geometry', address, geometry)
                          }
                          onPress={(data, details = null) => {
                            console.log(data, details);
                            // const { lat, lng } = details.geometry.location;
                            // console.log(lat, lng );
                          }}

                          // const { lat, lng } = details.geometry.location;
                          // console.log(lat, lng );
                        }}
                        wrapperStyles={{
                          width: '50%',
                        }}
                        inputStyles={{
                          borderWidth: 1,
                          borderColor: Colors.lightGrey,
                        }}
                        // textInputStyle={styles.textInput}

                        iconColor
                        placeholder={
                          text.split(' ').length > 1
                            ? text.split(' ').slice(-4, -3).pop()
                            : 'City'
                        }
                      />
                      <GooglePlaceAutocomplete
                        callback={(address, geometry) =>
                          console.log('address, geometry', address, geometry)
                        }
                        onPress={(data, details = null) => {
                          console.log(data, details);
                          // const { lat, lng } = details.geometry.location;
                          // console.log(lat, lng );
                        }}
                        wrapperStyles={{
                          width: '49%',
                        }}
                        inputStyles={{
                          borderWidth: 1,
                          borderColor: Colors.lightGrey,
                        }}
                        iconColor
                        placeholder={
                          // s = text.split(' ').map(data => data)

                          }}
                          iconColor
                          // placeholder={text !== '' ? text  : 'Current Location'}
                          placeholder={

                            text !== '' ? text.split(' ').slice(0, 1).pop() + " " + text.split(' ').slice(1, 2).pop() + " " + text.split(' ').slice(2, 3).pop() : 'Address'
                          }


                        /> */}


                        <View style={{ flexDirection: "row",  }}>
                          <GooglePlaceAutocomplete

                            callback={(address, geometry) =>
                              console.log('address, geometry', address, geometry)

                            }
                            onPress={(data, details = null) => {
                              console.log(data, details);

                              // const { lat, lng } = details.geometry.location;
                              // console.log(lat, lng );
                            }}


                            wrapperStyles={{
                              width: '50%',
                              borderColor:Colors.purple,
                              borderWidth:2,

                            }}
                            inputStyles={{
                              borderWidth: 1,


                            }}

                            // textInputStyle={styles.textInput}

                            iconColor

                            placeholder={

                              text.split(' ').length > 1 ? text.split(' ').slice(-4, -3).pop() : 'City'

                            }

                          />
                          <GooglePlaceAutocomplete
                            callback={(address, geometry) =>
                              console.log('address, geometry', address, geometry)
                            }
                            onPress={(data, details = null) => {
                              console.log(data, details);
                              // const { lat, lng } = details.geometry.location;
                              // console.log(lat, lng );
                            }}


                            wrapperStyles={{
                              width: '48%',
                              backgroundColor: '#ededed',
                              borderColor:Colors.purple,
                              borderWidth:2,
                              marginLeft:5



                            }}
                            inputStyles={{
                              borderWidth: 1,
                              borderColor: Colors.purple,

                            }}
                            iconColor

                            placeholder={


                              text.split(' ').length > 1 ? text.split(' ').slice(-2, -1).pop() : 'State'
                            }



                          />
                        </View>
                      </>
                    )
                    :
                    (
                      <>
                        {/* <GooglePlaceAutocomplete
                          callback={(address, geometry) => {
                            console.log('address, geometry', address, geometry)
                            this.setState({ Locations: address })
                          }
                          }
                          onPress={(data, details = null) => {
                            console.log(data, details);
                            // const { lat, lng } = details.geometry.location;
                            // console.log(lat, lng );
                          }}


                          wrapperStyles={{
                            width: '100%',
                          }}
                          inputStyles={{
                            borderWidth: 1,
                            borderColor: Colors.lightGrey
                          }}
                          iconColor
                          placeholder={

                            this.state.Locations.split(' ').length > 1 ? this.state.Locations.split(' ').slice(-3, -2).pop() : 'Address'

                          }


                        /> */}

                        <View style={{ flexDirection: "row",  marginTop: 10 }}>
                          <View style={{ flexDirection: 'row', 
                          borderWidth: 2, 
                          borderColor: Colors?.purple, alignItems: 'center', width: '50%', height: Platform.OS === 'ios' ? 60 : null, }}>
                            {/* <Image source={Icons?.location} style={{ height: 15, width: 15, tintColor: Colors?.purple }} resizeMode='contain' /> */}
                            {/* <TextInput
                              placeholderTextColor={Colors?.black}
                              style={{ color: Colors?.black, width: '85%', fontFamily: themes?.font?.regular }}
                              editable={false}
                              placeholder='City'
                              // value={this.state.Locations.split(' ').length > 1 ? this.state.Locations.split(' ').slice(-3, -2).pop() : 'State'}
                              value={"State"}
                            /> */}
                            {console.log('this.state.selectedLanguage', this.state.selectedLanguage)}
                            <Picker
                              style={styles.container}
                              // color={Colors.grey}
                              selectedValue={this.state.selectedLanguage}
                              onValueChange={(itemValue, itemIndex) => this.setState({ selectedLanguage: itemValue })}
                              itemStyle={{ color: 'white', fontSize: 20, }}
                              mode="dialog"
                            >
                              <Picker.Item label='States' value='null' color={'black'} style={{ fontWeight: 'bold', }} />
                              {
                                Object.keys(this.state.local).map((item) => {
                                  console.log("kji", item)
                                  return (
                                    <Picker.Item label={item} value={item} color={'black'} style={{ fontWeight: 'bold', color: Colors.black, backgroundColor: '#ededed', }} />
                                  )
                                })
                              }
                            </Picker>
                          </View>
                          <View style={{
                            flexDirection: 'row',   borderWidth: 2, 
                            borderColor: Colors?.purple, alignItems: 'center', width:'48%', height: Platform.OS === 'ios' ? 60 : null,marginHorizontal:5

                          }}>
                            {/* <Image source={Icons?.location} style={{ height: 15, width: 15, tintColor: Colors?.purple }} resizeMode='contain' /> */}
                            <Picker
                              style={styles.container}
                              color={Colors.grey}
                              selectedValue={this.state.selectedcity}
                              onValueChange={(itemValue, itemIndex) => this.setState({ selectedcity: itemValue })}
                              itemStyle={{ color: 'white', fontSize: 20, }}
                              mode="dialog"
                            >

                              {
                                this.state.selectedLanguage && this.state.local[this.state.selectedLanguage].map((city, index) => (
                                  <Picker.Item
                                    key={index}
                                    label={city}
                                    value={city}
                                    color="black"
                                    style={{ fontWeight: 'bold', color: Colors.black, backgroundColor: '#ededed', }}
                                  />
                                ))
                              }
                            </Picker>
                          </View>

                          {/* <GooglePlaceAutocomplete
                            callback={(address, geometry) => {
                              console.log('address, geometry', address, geometry)
                              this.setState({ Locations: address })
                            }
                            }
                            onPress={(data, details = null) => {
                              console.log(data, details, "hello");
                              // const { lat, lng } = details.geometry.location;
                              // console.log(lat, lng );
                            }}

                            
                            wrapperStyles={{
                              width: '49%',
                            }}
                            inputStyles={{
                              borderWidth: 1,
                              borderColor: Colors.lightGrey
                            }}
                            iconColor
                            placeholder={
                              this.state.Locations ? this.state.Locations.split(' ').slice(-5, -4).pop() + " " + this.state.Locations.split(' ').slice(-4, -3).pop() : 'City'
                            }
       
                         
                          /> */}

                          {/* <TextInput
                          placeholder='City'
                          value={details.geometry.location}
                
                          /> */}
                          {/* <GooglePlaceAutocomplete
                            callback={(address, geometry) => {
                              console.log('address, geometry', address, geometry)
                              this.setState({ Locations: address })
                            }
                            }
                            onPress={(data, details = null) => {
                              console.log(data, details);
                              // const { lat, lng } = details.geometry.location;
                              // console.log(lat, lng );
                            }}


                            wrapperStyles={{
                              width: '49%',
                            }}
                            inputStyles={{
                              borderWidth: 1,
                              borderColor: Colors.lightGrey
                            }}
                            iconColor

                            placeholder={


                              this.state.Locations.split(' ').length > 1 ? this.state.Locations.split(' ').slice(-3, -2).pop() : 'State'
                            }



                          /> */}
                        </View>
                      </>
                    )}

                {/* {console.log('bvcxz', text ,"jjjj", text.split(' ').slice( 0 ,3) , "kkk" , text.split(' ').slice( 0 ,3).pop())}  */}
                {console.log('bvcxz', this.state.Locations)}

                {/* {text.length <= 0 ? (
                  <Text style={{color: Colors?.purple, fontSize: 16}}>
                    Address required
                  </Text>
                ) : null} */}
              </View>
              <Pickdate />
              <CustomButton
                onPress={togglePopUp}
                buttonStyle={styles.btnstyle}
                title="Continue"
              />
            </ScrollView>
          </View>
        </Modal>
        <Searchable
          isVisible={this.state.modalVisible}
          onClose={() => this.setModalVisible(false)}
          setLocation={this.setLocation}
        />
      </AppBackground>
    );
  }
}

const mapStateToProp = ({ reducer: { user } }) => {
  return { user };
};

export default connect(mapStateToProp)(React.memo(Home));
