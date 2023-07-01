import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {Colors, GalColor} from './src/utility/Colors';
import {commonStyles} from './src/utility/commonStyles';
import FormScreen from './src/screens/FormScreen';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={[commonStyles.flexOne]}>
      <SafeAreaView style={[commonStyles.flexOne]}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={GalColor.antiquewhite}
        />
        <FormScreen />
        <Toast />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});

export default App;
