/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

const SearchableDropdown = ({ data = [], onSelect , query ,setQuery }) => {
//   const [query, setQuery] = useState('');
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
    <View>
      <TextInput
        placeholder="Search"
        value={query}
        onChangeText={handleSearch}
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => setIsDropdownOpen(false)}
        style={{backgroundColor:'red'}}
      />
      {isDropdownOpen && (
        <FlatList
        style={{backgroundColor:'red'}}
          data={filteredData}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default SearchableDropdown;