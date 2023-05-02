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
            marginTop: 10,
            width: 300,
            backgroundColor: '#ededed',
            borderRadius: 10
           
          }}
          color={Colors.grey}
          selectedValue={selectedPicker}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedPicker(itemValue)
            }
            itemStyle={{ color: 'white', fontSize: 20 ,  backgroundColor: '#ededed',}}
            mode="dropdown"
            >
          <Picker.Item
            label="Event Type (i.e Recurring)"
            value="Event Type (i.e Recurring)"
            color={'black'} style={{ fontWeight: 'bold',backgroundColor: '#ededed',}}
          />
           <Picker.Item
            label="local"
            value="local"
            color={'black'} style={{ fontWeight: 'bold',color:Colors.black ,backgroundColor: '#ededed',}}
          />
          <Picker.Item label="event" value="event" color={'black'} style={{fontWeight: 'bold',backgroundColor: '#ededed', }} />
        </Picker> 
  )
}

export default PickerComptwo

const styles = StyleSheet.create({})