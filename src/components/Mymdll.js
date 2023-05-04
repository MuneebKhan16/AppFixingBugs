import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, } from 'react-native';
import { Colors } from '../config';
import SearchableDropdown from 'react-native-searchable-dropdown';

const items = [{ id: 1, name: 'JavaScript', },
{ id: 2, name: 'Java', },
{ id: 3, name: 'Ruby', },
{ id: 4, name: 'React Native', },
{ id: 5, name: 'PHP', },
{ id: 6, name: 'Python', },
{ id: 7, name: 'Go', },
{ id: 8, name: 'Swift', },];

const MyMdl = ({ isVisible, onClose }) => {

  const [selectedItems, setSelectedItems] = useState([]);
  const [textInputEditable, setTextInputEditable] = useState(true);

  const handleItemSelect = (item) => {
    setSelectedItems([...selectedItems, item]);
    setTextInputEditable(false);
  };

  const handleItemRemove = (item, index) => {
    setSelectedItems(selectedItems.filter((sitem) => sitem.id !== item.id));
    setTextInputEditable(true);
  };
  return (
    <Modal visible={isVisible} animationType="slide">

      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>Select Location</Text>
        </View>
        <SearchableDropdown
          multi
          selectedItems={selectedItems}
          onItemSelect={handleItemSelect}
          onRemoveItem={handleItemRemove}
          containerStyle={{ padding: 5 }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: 'purple',
            borderColor: '#bbb',
            borderWidth: 1,
            width: '95%',
            alignSelf: 'center',
            height: 40,

          }}
          itemTextStyle={{ color: '#ffff' }}
          itemsContainerStyle={{ maxHeight: 130, marginTop: 10 }}
          items={items}
          chip
          resetValue={true}
          textInputProps={{
            placeholder: 'Select Location',
            underlineColorAndroid: 'transparent',
            style: {
              padding: 12,
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 15,
              width: '95%',
              alignSelf: 'center',
              marginTop: 10
            },
            editable: textInputEditable,
          }}
          listProps={{ nestedScrollEnabled: true }}
        />
        {/* Single */}
  
     
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>{textInputEditable == false ? 'Done' : 'Close'}</Text>
        </TouchableOpacity>
  
      </View>
    </Modal>
  );
};
export default React.memo(MyMdl)

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#ffff',
    flex: 1
  },
  modalHeader: {
    padding: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center',
    marginTop: 20
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.black
  },
  modalBody: {
    padding: 20,
    alignSelf: 'stretch',
  },
  modalBodyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: Colors.purple,
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: '80%',
    height: 60,
    justifyContent: 'center',
    borderRadius: 20
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,

  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50
  },
  textInput: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    width: '90%',

  },
  flatList: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
    maxHeight: 200,

  },
  itemContainer: {
    padding: 10,

  },
  itemText: {
    fontSize: 16,
    color: Colors.black,
  },

});