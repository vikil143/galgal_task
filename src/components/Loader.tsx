import {StyleSheet, Text, View, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import {Colors, GalColor} from '../utility/Colors';

interface LoaderProps {
  show: boolean;
}

export default function Loader({show}: LoaderProps) {
  return (
    <Modal visible={show} transparent>
      <View style={[styles.container]}>
        <View style={[styles.loader]}>
          <ActivityIndicator color={Colors.white} />
        </View>
      </View>
    </Modal>
  );
}

const SIZE = 60;

const styles = StyleSheet.create({
  loader: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: GalColor.antiquewhite,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
