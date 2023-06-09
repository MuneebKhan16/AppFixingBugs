import React from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Common, Colors } from '../config';
import Icons from '../assets/Icons';

const { width } = Dimensions.get('screen');

const GooglePlaceAutocomplete = ({
  callback,
  wrapperStyles,
  inputStyles,
  placeholder,
  iconColor,
}) => {
  return (
    <View style={[styles.geoLocationView, wrapperStyles]}>
      <GooglePlacesAutocomplete
        enableHighAccuracyLocation
        fetchDetails
        disableScroll
        enablePoweredByContainer={false}
        keepResultsAfterBlur={true}

        listViewDisplayed={false}
        placeholder={placeholder ? placeholder : 'Address'}

        placeholderTextColor={iconColor ? Colors.primary : Colors.black}

        onPress={(data, details = null) => {
          const { formatted_address, geometry, location } = details;
          callback(formatted_address, geometry, location);
        }}
        renderLeftButton={() => (
          <Image
            source={Icons.marker}
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain',
              tintColor: iconColor ? Colors.purple : Colors.black,
              alignSelf: 'center',
              marginBottom: 5,
              marginLeft: 15,
              marginRight: 5,
              backgroundColor:'#ededed',


            }}
          />
        )}
        styles={{
          textInput: {
            borderRadius: 10,
            height: 45,
            color: iconColor ? Colors?.black : Colors?.black,
            // backgroundColor: iconColor ? Colors.white : Colors.black,
            backgroundColor:'#ededed',

            width: '100%',


          },
          description: { color: iconColor ? Colors.purple : Colors.black },
        }}
        textInputProps={{
          placeholderTextColor: iconColor ? Colors.black : Colors.black,
          maxLength: 30,
          // paddingLeft: 25,

        }}
        textInputStyle={{
          // borderRadius: 10,
          // height: 40,
          // color: iconColor ? Colors.black : Colors.black,
          // // backgroundColor: iconColor ? Colors.white : Colors.black,
          // width: '100%',
          // // Other text input styles...
          // backgroundColor:'red'
        }}
        query={{
          key: Common?.GEOCODE_API_KEY,
          language: 'en',
          types: 'premise',

        }}
        editable={false}
      />
    </View>
  );
};

export default GooglePlaceAutocomplete;

const styles = StyleSheet.create({
  geoLocationView: {
    width: width,
    marginTop: 20,
    // backgroundColor: Colors.white,
    borderColor: Colors.black,
    borderWidth: 1,
    backgroundColor:'#ededed',

  },
  textInput: {
    flex: 1,
    height: 50,
    color: Colors?.black,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors?.lightBlack,
    marginTop: 13,
    // backgroundColor: Colors?.white,
    width: width,
  },
});
