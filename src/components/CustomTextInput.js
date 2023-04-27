import React, {useState} from 'react';
import {TouchableOpacity, View, Image, TextInput, Text} from 'react-native';
import {Colors, Icons} from '../config';
import {Fumi} from './AnimatedTextInput';

export default function CustomTextInput(props) {
  const [hidden, setHidden] = useState(props?.isPassword);
  const {containerStyle, types} = props;
  return (
    <View style={{width: '100%', marginTop: 20}}>
      <View
        style={[
          {
            alignSelf: 'center',
            width: props.grey ? '90%' : '110%',
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
          },
          containerStyle,
        ]}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: props?.grey ? Colors.grey : Colors.white,
            flex: 1,
            paddingBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {props?.icon ? (
            <Image
              source={props?.icon}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: Colors.text,
                marginTop: 20,
              }}
            />
          ) : null}
          <Fumi
            types={types}
            label={props.label}
            inputPadding={0}
            style={{
              flex: 1,
              marginLeft: 15,
            }}
            inputStyle={{
              color: props.grey ? Colors.grey : Colors.white,
              fontSize: 14,
            }}
            labelStyle={{color: props.grey ? Colors.grey : Colors.white}}
            secureTextEntry={hidden}
            {...props}
          />
          {props?.righticon ? (
            <Image
              source={props?.righticon}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                tintColor: Colors.text,
                marginTop: 20,
              }}
            />
          ) : null}
          {props.isPassword && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setHidden(!hidden)}></TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
export function ProfileTextInput(props) {
  const {icon, heading} = props;
  return (
    <View style={{marginTop: 10}}>
      <Text
        style={{
          color: Colors.black,
          fontWeight: '700',
        }}>
        {heading}
      </Text>
      <View
        style={{
          width: '100%',
          borderRadius: 10,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.white,
          marginTop: 5,
        }}>
        <Image
          source={icon}
          style={{
            width: 20,
            height: 20,
            resizeMode: 'contain',
            tintColor: Colors.black,
          }}
        />
        <TextInput
          style={{
            width: '100%',
            height: 50,
            color: Colors.black,
            marginLeft: 10,
            fontWeight: '600',
          }}
          placeholderTextColor={'#7E7E7E'}
          {...props}
        />
      </View>
    </View>
  );
}
