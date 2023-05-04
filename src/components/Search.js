import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList,StyleSheet } from 'react-native';

const SearchableDropdown = ({ data = [], onSelect }) => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const filtered = data.filter(item => {
      return item.name.toLowerCase().includes(formattedQuery);
    });
    setFilteredData(filtered);
    setQuery(text);
  };

  const handleSelect = item => {
    setIsDropdownOpen(false);
    setQuery(item.name);
    onSelect(item);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleSelect(item)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
    <TextInput
      placeholder="Search"
      style={styles.textInput}
      value={query}
      onChangeText={handleSearch}
      onFocus={() => setIsDropdownOpen(true)}
      onBlur={() => setIsDropdownOpen(false)}
    />
    {isDropdownOpen && (
      <FlatList
        style={styles.flatList}
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    )}
  </View>
  );
};

export default SearchableDropdown;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    width: '80%',
  },
  flatList: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    maxHeight: 200,
  },
  itemContainer: {
    padding: 10,
  },
  itemText: {
    fontSize: 16,
  },
})