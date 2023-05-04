import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Google_Location = () => {
  const [address, setAddress] = useState('');

  const handleSelect = (data, details) => {
    setAddress(data.description);
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder='Enter Location'
        onPress={handleSelect}
        fetchDetails={true}
        query={{
          key: 'YOUR_API_KEY',
          language: 'en',
          types: 'geocode'
        }}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            height: 50,
            color: '#5d5d5d',
            fontSize: 16,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
          },
          listView: {
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
            marginTop: 5,
            marginRight: 10,
            marginLeft: 10,
          },
          row: {
            padding: 13,
            height: 44,
            flexDirection: 'row',
          },
          separator: {
            height: 0.5,
            backgroundColor: '#c8c7cc',
          },
          poweredContainer: {
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: '#fff',
          },
          powered: {
            marginTop: 10,
          },
        }}
      />
      <TextInput
        value={address}
        onChangeText={(text) => setAddress(text)}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '90%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default Google_Location;
