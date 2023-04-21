import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { Colors } from '../../../config';
import { Picker } from '@react-native-picker/picker';

const PickerComptwo = () => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [selectedPicker, setSelectedPicker] = useState();
  return (
    <Picker
          style={{
            backgroundColor: '#ededed',
            marginTop: 10,
            width: 300,
            paddingLeft: 15,
            borderRadius: 10,
          }}
          color={Colors.grey}
          selectedValue={selectedPicker}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedPicker(itemValue)
          }>
          <Picker.Item
            label="Event Type (i.e Recurring)"
            value="Event Type (i.e Recurring)"
            color={'black'} style={{ fontWeight: 'bold' }}
          />
           <Picker.Item
            label="local"
            value="local"
            color={'black'} style={{ fontWeight: 'bold' }}
          />
          <Picker.Item label="event" value="event" color={'black'} style={{ fontWeight: 'bold' }} />
        </Picker> 
  )
}

export default PickerComptwo

const styles = StyleSheet.create({})