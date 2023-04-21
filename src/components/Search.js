/* eslint-disable prettier/prettier */
import React from 'react';
import {View, TextInput, Image ,StyleSheet} from 'react-native';
import Icons from '../assets/Icons';
import {Colors, Shadows} from '../config';

const Search = ({onChangeText = () => {}}) => {
  const [search, setSearch] = React.useState('');
  return (
    <View
      style={styles.container}>
      <TextInput
        onChangeText={text => {
          setSearch(text);
          onChangeText(text);
        }}
        returnKeyType="search"
        placeholder={'Search'}
        // label={'Search'}
        value={search}
        placeholderTextColor={Colors.grey}
        style={styles.txtinput}
        maxLength={20}
      />
      <Image
        source={Icons.search}
        style={styles.search}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container:{
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    marginHorizontal: 30,
    borderRadius:5
  },
  txtinput:{
    flex: 1,
    color: Colors.grey,
    fontSize: 14,
    paddingHorizontal: 4,
  },
  search:{
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginRight: 10,
    tintColor:Colors.lightGrey
  }
})