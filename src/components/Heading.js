import {
  StyleSheet,
  Text,
  View,
  Image,
  Switch,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Colors, NavService } from '../config';
import Icons from '../assets/Icons';
import { useState } from 'react';
import { themes } from '../config/globalFonts/globalFonts';
const Heading = props => {
  const { name, switchs, icon, tintclr, onpress } = props;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View
      style={styles.container}>
      <View style={styles.content}>
        <Image
          source={props?.icon}
          style={{
            width: 22,
            height: 22,
            resizeMode: 'contain',
            tintColor: tintclr ? Colors.purple : null,
          }}
        />

      </View>
      <TouchableOpacity onPress={() => NavService.navigate(props?.onpress)}>
        <Text
          style={styles.name}>
          {props?.name}
        </Text>
      </TouchableOpacity>
      {switchs ? (
        <View style={{ position: 'absolute', right: 5 }}>
          <Switch
            trackColor={{ false: Colors.darkGray, true: Colors.green }}
            thumbColor={isEnabled ? Colors.white : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      ) : null}
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: Colors.grey,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  name: {
    marginLeft: 10,
    fontSize: themes?.fontSize?.medium,
    fontFamily: themes?.font?.bold,
    color: Colors.black,
    textTransform: 'capitalize',
  }
});
