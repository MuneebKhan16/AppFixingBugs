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
const Pickdate = () => {
  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            marginVertical: 10,
            paddingLeft: 5,
            borderRadius: 10,
          }}>
          <TouchableOpacity
            onPress={showDatePicker}
            style={{ width: 260, flexDirection: 'row', alignItems: 'center', height: 45, }}>
            <View style={{
              width: 38,
              height: 38,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
              <Image
                source={Icons.date}

                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />

            </View>
            <Text
              style={styles.textInput}
            // value={getDate()}
            // placeholder="Date..."
            >
              {getDate()}
            </Text>
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

export default Pickdate;

const styles = StyleSheet.create({
  textInput: {
    width: 232,
    marginLeft: 10
  },
});
