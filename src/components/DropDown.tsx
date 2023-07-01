import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';

interface DropDownProps {
  list: string[];
  onChangeValue: (text: string) => void;
}

export default function DropDown({list, onChangeValue}: DropDownProps) {
  return (
    <>
      <SelectDropdown
        data={list}
        defaultButtonText="  "
        // buttonTextStyle={{textAlign: 'left'}}
        buttonStyle={styles.button}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          onChangeValue(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: {width: '100%', padding: 8},
  container: {},
});
