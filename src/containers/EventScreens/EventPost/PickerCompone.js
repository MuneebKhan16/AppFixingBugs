/* eslint-disable prettier/prettier */
import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {Colors} from '../../../config';
const PickerCompone = props => {
  const {categories, selectedData, setSelectedData} = props;
  const [selectedPicker, setSelectedPicker] = useState();
  // const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <Picker
      style={{
        backgroundColor: '#ededed',
         marginTop: 10, 
         width: 300,
         borderRadius:10
        }
        }
      color={Colors.grey}
      selectedValue={selectedPicker}
      onValueChange={(itemValue, itemIndex) => setSelectedPicker(itemValue)}
      itemStyle={{
        color: 'white',
        fontSize: 20,
        backgroundColor: '#ededed',
        height:Platform.OS === 'ios' ? 120 : null,
        borderRadius:Platform.OS === 'ios' ? 20 : null,
      }}
      mode="dialog">
      {Platform.OS === 'android' && categories?.map(data => (
  <Picker.Item
    key={data.category_id}
    label={data.title}
    value={data || data.title}
    color={Colors.black}
    style={{ fontWeight: 'bold', backgroundColor: '#ededed' }}
  />
))}

{/* Render on iOS */}
{Platform.OS === 'ios' && categories?.map(data => (
  <Picker.Item
    key={data.category_id}
    label={data.title}
    value={data.title}
    color="black"
    style={{ fontWeight: 'bold', backgroundColor: '#ededed' }}
  />
))}
      {/* {categories?.map(data => {
        return (
          <Picker.Item
            key={data.category_id}
            label={data.title}
            value={data || data.title}
            color={Colors.black}
            style={{fontWeight: 'bold', backgroundColor: '#ededed'}}
          />
        );
      })} */}
      {/* {categories?.map(data => (
    <Picker.Item
      key={data.category_id}
      label={data.title}
      value={data.title}
      color="black"
      style={{ fontWeight: 'bold', backgroundColor: '#ededed' }}
    />
  ))} */}
    </Picker>
  );
};

export default PickerCompone;

const styles = StyleSheet.create({
});
// import {StyleSheet, Text, View,Platform} from 'react-native';
// import React, {useState} from 'react';
// import {Colors} from '../../../config';
// import {Picker} from '@react-native-picker/picker';

// const PickerCompone = () => {
//   const [selectedLanguage, setSelectedLanguage] = useState();
//   const [selectedPicker, setSelectedPicker] = useState();
  
//   return (
//     <Picker
//       style={{
//         marginTop: 10,
//         width: 300,
//         backgroundColor: '#ededed',
//         borderRadius: 10,
//       }}
//       color={Colors.grey}
//       selectedValue={selectedPicker}
//       onValueChange={(itemValue, itemIndex) => setSelectedPicker(itemValue)}
//       itemStyle={{
//         color: 'white', 
//       fontSize: 20, 
//       backgroundColor: '#ededed',
//       height: Platform.OS === 'ios' ? 140 : null,
//       borderRadius:Platform.OS === 'ios' ? 20 : null,}}
//       mode="dialog">
//       <Picker.Item
//         label="Event Occurrence"
//         value="Event Occurrence"
//         color={'black'}
//         style={{fontWeight: 'bold', backgroundColor: '#ededed'}}
//       />
//       <Picker.Item
//         label="Re-curring"
//         value="Re-curring"
//         color={'black'}
//         style={{
//           fontWeight: 'bold',
//           color: Colors.black,
//           backgroundColor: '#ededed',
//         }}
//       />
//       <Picker.Item
//         label="One-Time"
//         value="One-Time"
//         color={'black'}
//         style={{fontWeight: 'bold', backgroundColor: '#ededed'}}
//       />
//     </Picker>
//   );
// };

// export default PickerCompone;

// const styles = StyleSheet.create({});

