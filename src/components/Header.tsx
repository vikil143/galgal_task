import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GalColor} from '../utility/Colors';

export default function Header() {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.headerText]}>Register Form</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 16,
  },
  container: {
    padding: 20,
    backgroundColor: GalColor.antiquewhite,
  },
});
