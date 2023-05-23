import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icons from '../assets/Icons';
import {Colors} from '../config';
const Pickeventdate = ({date, setDate}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDate(moment(date).format('YYYY-MM-DD'));
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
      {/* <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={showDatePicker} style={styles.touchable}>
            <View style={styles.datepicker}>
              <Image source={Icons.date} style={styles.img} />
            </View>
            <TextInput
              style={{
                height: 40,
                color: Colors.black,
                fontSize: 17,
                width: '92%',
              }}
              placeholder="Date"
              placeholderTextColor={Colors.greey}
              editable={false}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChangeText={pickedDate => {
                console.log('date', pickedDate);
                setDate(moment(pickedDate).format('MM DD YYYY'));
              }}
              value={date}
            />
           
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View> */}
      <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={showDatePicker} style={styles.touchable}>
          <View style={styles.datepicker}>
            <Image source={Icons.date} style={styles.img} />
          </View>
          {Platform.OS === 'ios' ? (
            <Text style={styles.dateText}>{date || 'Date'}</Text>
          ) : (
            <TextInput
              style={{
                height: 40,
                color: Colors.black,
                fontSize: 17,
                width: '92%',
              }}
              placeholder="Date"
              placeholderTextColor={Colors.black}
              editable={false}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChangeText={(pickedDate) => {
                console.log('date', pickedDate);
                setDate(moment(pickedDate).format('MM DD YYYY'));
              }}
              value={date}
            />
          )}
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
    borderWidth:1
  },
  touchable: {
    width: 270,
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
  },
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
    tintColor: Colors.darkGray,
  },
});
