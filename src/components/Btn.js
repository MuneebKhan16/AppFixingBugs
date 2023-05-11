import {StyleSheet, Text, View, Image, Switch} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../config';
const Btn = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.maincontainer}>
      <Text
        style={styles.content}>
        Geolocation
      </Text>

      <View style={styles.swich}>
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

export default React.memo(Btn);

const styles = StyleSheet.create({
 content:{
  fontWeight: '600',
  fontSize: 18,
  color: Colors.black,
   textTransform: 'capitalize',
   left:5
},
swich:{position: 'absolute', right: 2}
});
