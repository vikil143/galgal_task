import {StyleSheet, Text, View, ColorValue} from 'react-native';
import React from 'react';
import {Colors} from '../utility/Colors';

interface LabelProps {
  value: string;
  color?: ColorValue;
}

export default function Label({value, color}: LabelProps) {
  return <Text style={[styles.label, {color}]}>{value}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: Colors.black,
  },
});
