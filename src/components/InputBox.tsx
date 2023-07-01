import {StyleSheet, View, TextInput, TextInputProps} from 'react-native';
import React from 'react';
import {Colors} from '../utility/Colors';

interface InputBoxProps extends TextInputProps {
  name: string;
  onChangeValue?: (name: string, text: string) => void;
  // acceptedRegex: string;
}

export default function InputBox({
  style,
  value,
  name,
  // acceptedRegex,
  onChangeValue,
  ...props
}: InputBoxProps) {
  // const onChangeValue = (text: string) => {
  //   // if (acceptedRegex.trim() !== '') {
  //   //   text.replace(/[]/g, '');
  //   // }
  // };

  return (
    <View style={[styles.container]}>
      <TextInput
        {...props}
        style={[styles.inputBox, style]}
        value={value}
        onChangeText={text =>
          typeof onChangeValue === 'function' && onChangeValue(name, text)
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    paddingLeft: 10,
  },
  container: {
    backgroundColor: Colors.lightWhite,
  },
});
