import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ColorValue,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {Colors} from '../utility/Colors';

interface ButtonProps {
  text: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
  disabled?: boolean;
  color: ColorValue;
}

export default function Button({
  containerStyle,
  text,
  textStyle,
  disabled,
  color,
  onPress,
}: ButtonProps) {
  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
      <View
        style={[
          styles.container,
          containerStyle,
          {backgroundColor: disabled ? Colors.disabled : color},
        ]}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  text: {},
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
