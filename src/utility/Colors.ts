import {ColorValue} from 'react-native';

export const Colors = {
  black: '#000',
  white: '#fff',
  grey: '#ddd',
  lightWhite: '#f8f8f8',
  disabled: 'rgb(236 236 236)',
};

export interface GalColorData {
  aliceblue: ColorValue;
  antiquewhite: ColorValue;
  aqua: ColorValue;
  aquamarine: ColorValue;
  azure: ColorValue;
  beige: ColorValue;
  bisque: ColorValue;
  black: ColorValue;
  blanchedalmond: ColorValue;
  blue: ColorValue;
  blueviolet: ColorValue;
  brown: ColorValue;
  ''?: ColorValue;
}

export type KeyGalColor = keyof GalColorData;

export const GalColor: GalColorData = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
};
