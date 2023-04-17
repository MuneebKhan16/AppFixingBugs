import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../../../config';
const PickerCompone = () => {
      const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedPicker, setSelectedPicker] = useState();

  return (
    <Picker
          style={{
            backgroundColor: '#ededed',
            marginTop: 10,
            width: '98%',
            paddingLeft: 15,
            borderRadius: 10,
          }}
          color={Colors.grey}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="Type" value="Type" color={'black'} style={{ fontWeight: 'bold' }} />
          <Picker.Item label="event" value="event" color={'black'} style={{ fontWeight: 'bold' }} />
        </Picker> 
  )
}

export default PickerCompone

const styles = StyleSheet.create({})