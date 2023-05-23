import {StyleSheet, Text, View,Platform} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../config';
import {Picker} from '@react-native-picker/picker';

const PickerComptwo = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedPicker, setSelectedPicker] = useState();
  
  return (
    <Picker
      style={{
        marginTop: 10,
        width: 300,
        backgroundColor: '#ededed',
        borderRadius: 10,
      }}
      color={Colors.grey}
      selectedValue={selectedPicker}
      onValueChange={(itemValue, itemIndex) => setSelectedPicker(itemValue)}
      itemStyle={{
        color: 'white', 
      fontSize: 20, 
      backgroundColor: '#ededed',
      height: Platform.OS === 'ios' ? 140 : null,
      borderRadius:Platform.OS === 'ios' ? 20 : null,}}
      mode="dialog">
      <Picker.Item
        label="Event Occurrence"
        value="Event Occurrence"
        color={'black'}
        style={{fontWeight: 'bold', backgroundColor: '#ededed'}}
      />
      <Picker.Item
        label="Re-curring"
        value="Re-curring"
        color={'black'}
        style={{
          fontWeight: 'bold',
          color: Colors.black,
          backgroundColor: '#ededed',
        }}
      />
      <Picker.Item
        label="One-Time"
        value="One-Time"
        color={'black'}
        style={{fontWeight: 'bold', backgroundColor: '#ededed'}}
      />
    </Picker>
  );
};

export default PickerComptwo;

const styles = StyleSheet.create({});
