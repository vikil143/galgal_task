import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLocalData = (value: string) =>
  AsyncStorage.setItem('LocalData', value);

export const getLocalData = async () => await AsyncStorage.getItem('LocalData');
