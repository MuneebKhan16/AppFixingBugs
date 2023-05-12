import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Button,
    TextInput,
  } from 'react-native';
  import React, { useState } from 'react';
  import DateTimePickerModal from 'react-native-modal-datetime-picker';
  import Icons from '../assets/Icons';
  import { Colors } from '../config';
  const Pickeventdate = () => {
    const [date, setDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
   
    const [isFocused, setIsFocused] = useState(false);
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = date => {
      setDate(date);
      hideDatePicker();
    };
  
    const getDate = () => {
      let tempDate = date.toString().split(' ');
      return date !== ''
        ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
        : '';
    };
  
    return (
      <>
        <View style={styles.container}>
          <View
            style={styles.content}>
            <TouchableOpacity
              onPress={showDatePicker}
              style={styles.touchable}>
              <View style={styles.datepicker}>
                <Image
                  source={Icons.date}
                  style={styles.img}
                />
               
              </View>
              <TextInput
          style={{height: 40,color:Colors.black ,fontSize:17,width:'92%',}}
          placeholder="Date"
          placeholderTextColor={Colors.greey}
          editable={false}
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)} 
          onChangeText={date => setDate(date)}
          value={getDate()}
        />
              {/* <Text
                style={styles.textInput}
              >
                {getDate()}
              </Text> */}
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </>
    );
  };
  
  export default Pickeventdate;
  
  const styles = StyleSheet.create({
    textInput: {
      width: 232,
      marginLeft: 10,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      paddingLeft: 5,
      borderRadius: 10,
      backgroundColor:'#ededed'
    },
    touchable: { width: 260, flexDirection: 'row', alignItems: 'center', height: 45, },
    datepicker: {
      width: 38,
      height: 38,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    img: {
      width: 22,
      height: 22,
      resizeMode: 'contain',
      tintColor:Colors.darkGray
    }
  });
  