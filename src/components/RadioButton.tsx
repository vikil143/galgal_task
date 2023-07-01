import {
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {Colors, GalColor} from '../utility/Colors';
import {SCREEN_WIDTH} from '../utility/constants';

const B_SIZE = SCREEN_WIDTH - 40;

// Assumption this component used for gender radio button only
export type Gender = 'Male' | 'Female';

interface RadioButtonProps {
  onChangeValue: (name: string, type: Gender) => void;
  name: string;
  value: Gender;
}

export default function RadioButton({
  onChangeValue,
  name,
  value,
}: RadioButtonProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const animatedStyles: ViewStyle = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, B_SIZE / 2],
        }),
      },
    ],
  };

  useEffect(() => {
    if (value === 'Male') selectMale();
    if (value === 'Female') selectFeMale();
  }, [value]);

  const selectMale = () =>
    Animated.timing(animatedValue, {
      toValue: 0,
      useNativeDriver: true,
      duration: 200,
    }).start(() => onChangeValue(name, 'Male'));

  const selectFeMale = () =>
    Animated.timing(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 200,
    }).start(() => onChangeValue(name, 'Female'));

  return (
    <View style={[styles.container]}>
      <Animated.View style={[styles.layer, styles.shadow, animatedStyles]} />
      <TouchableWithoutFeedback onPress={selectMale}>
        <View style={[styles.partOne]}>
          <Animated.Text style={[styles.text]}>Male</Animated.Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={selectFeMale}>
        <View style={[styles.partTwo]}>
          <Animated.Text style={[styles.text]}>Female</Animated.Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: '800',
  },
  layer: {
    width: B_SIZE / 2 - (B_SIZE / 2) * 0.05,
    // height: '100%',
    // backgroundColor: Colors.white,
    backgroundColor: GalColor.antiquewhite,
    position: 'absolute',
    top: 50 * 0.1,
    left: (B_SIZE / 2) * 0.05,
    right: 0,
    bottom: 50 * 0.1,
  },
  partTwo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: B_SIZE / 2,
    zIndex: 1,
    paddingVertical: 15,
  },
  partOne: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    width: B_SIZE / 2,
    zIndex: 1,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.lightWhite,
  },
});
