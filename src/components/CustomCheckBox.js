import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class CustomCheckBox extends Component {
    constructor(props) {
      super(props);
      this.state = {
        checked: false
      };
    }
  
    render() {
      const { checked } = this.state;
      const { label, onPress } = this.props;
  
      return (
        <TouchableOpacity onPress={onPress}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#ccc',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {checked ? (
                <View
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 7,
                    backgroundColor: '#00bfff'
                  }}
                />
              ) : null}
            </View>
            <Text style={{ marginLeft: 10 }}>{label}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
  
  export default CustomCheckBox;