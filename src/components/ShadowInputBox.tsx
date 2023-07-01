import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {Colors} from '../utility/Colors';

interface ShadowInputBoxProps {
  value: string;
}

export default function ShadowInputBox({value}: ShadowInputBoxProps) {
  return (
    <View style={[styles.container]} pointerEvents="box-none">
      <TextInput style={[styles.textInput]} />
      <View style={[styles.inputContainer]} pointerEvents="none">
        <Text style={[styles.inputText]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputText: {},
  inputContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  textInput: {
    opacity: 0,
  },
  container: {
    backgroundColor: Colors.lightWhite,
  },
});
