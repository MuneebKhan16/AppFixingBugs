/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View,  } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../../../config';
const PickerCompone = props => {
  const { categories, setSelectedData } = props;

  const [selectedLanguage, setSelectedLanguage] = useState();

  const handletransfer = () => {
    setSelectedData(selectedLanguage);
  };

  useEffect(() => {
    handletransfer();
  }, [selectedLanguage]);


  return (
    <Picker
      style={styles.container}
      color={Colors.grey}
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      itemStyle={{
        color: 'white',
        fontSize: 20,
        backgroundColor: '#ededed',
      }}
      mode="dialog">
      <Picker.Item
        label="Select an Option"
        value="null"
        color={'black'}
        style={{ fontWeight: 'bold', backgroundColor: '#ededed' }}
      />
      {categories?.map(data => {
        return (
          <Picker.Item
            key={data.category_id}
            label={data.title}
            value={data || data.title}
            color={Colors.black}
            style={{ fontWeight: 'bold', backgroundColor: '#ededed' }}
          />
        );
      })}
    </Picker>
  );
};

export default PickerCompone;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ededed',
    marginTop: 10,
    width: 300,
    paddingLeft: 15,
    borderRadius: 20,
  },
});
