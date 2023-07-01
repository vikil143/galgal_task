import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

// I get this from online
export const EmailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// I get this from online
export const AstroPhy = /^[A-Z-\-\ ']+$/;
