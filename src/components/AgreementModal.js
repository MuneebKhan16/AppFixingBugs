import React, {useState} from 'react';
import {View, Text, TouchableOpacity,Switch} from 'react-native';
import Modal from 'react-native-modal';
import {Colors, NavService} from '../config';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomButton from './CustomButton';

export default AgreementModal = ({
  isVisible = false,
  onReject = () => {},
  onAccept = () => {},
  naviagtion,
}) => {
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.8}
      onBackButtonPress={onReject}
      onModalHide={() => {
        setTerms(false);
        setPrivacy(false);
      }}
      onRequestClose={() => setModalVisible(false)}
      >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            width: '100%',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: Colors.border,
            backgroundColor: Colors.white,
          }}>
          <View style={{padding: 10}}>
            <Text
              style={{color: Colors.black, fontSize: 16, textAlign: 'center'}}>
              I have read and agreed with
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                alignItems:'center',
                justifyContent:'space-between',
                marginHorizontal:5
              }}>
              <Text style={{
                fontSize:16,
                color:Colors.black,
                fontWeight:'700'
              }}>Geolocation</Text>
              <Switch
        trackColor={{ false: "#767577", true: "purple" }}
        thumbColor={isEnabled ? "white" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
            </View>
            <CustomButton
              buttonStyle={{
                width:'99%',
                height:45
              }}
              title="Continue"
              // onPress={() =>  NavService.reset(0, [{name: 'Tab'}, ]) }
              onPress={() => setModalVisible(false)}

              // onPress={() => NavService.reset(0, [{name: 'CompleteProfile'}])}
            //   <Switch
            //   trackColor={{false: Colors.green, true: Colors.secondary}}
            //   thumbColor={notifications ? Colors.white : Colors.white}
            //   ios_backgroundColor={notifications ? Colors.green : 'red'}
            //   onValueChange={this.onNotificationPress}
            //   value={notifications}
            //   style={{marginLeft: 40}}
            // />
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
