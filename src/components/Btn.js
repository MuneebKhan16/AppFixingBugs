import {StyleSheet, Text, View, Image, Switch} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../config';
const Btn = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={{marginVertical:10}}>
      <Text
        style={{
          fontWeight: '600',
          fontSize: 18,
          color: Colors.black,
        }}>
        Geolocation
      </Text>

      <View style={{position: 'absolute', right: 1}}>
        <Switch
          trackColor={{false: Colors.darkGray, true: Colors.purple}}
          thumbColor={isEnabled ? Colors.white : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          
        />
      </View>
    </View>
  );
};

export default Btn;

const styles = StyleSheet.create({});
