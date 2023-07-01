import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import RNDatePicker from 'react-native-date-picker';

import {Colors} from '../utility/Colors';
import {formatDateDDMMYYYY} from '../utility/helpers';

interface DatePickerProps {
  name: string;
  //   placeholder: string;
  value: string | Date;
  onChangeValue: (name: string, date: Date) => void;
}

export default function DatePicker({
  name,
  //   placeholder,
  value,
  onChangeValue,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <View style={[styles.container]}>
          <Text style={[styles.text]}>
            {typeof value !== 'string' ? formatDateDDMMYYYY(value) : ''}
          </Text>
        </View>
      </TouchableOpacity>
      <RNDatePicker
        modal
        open={open}
        mode="date"
        date={(value as Date) || new Date()}
        onConfirm={date => {
          setOpen(false);
          onChangeValue(name, date);
          //   setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
  container: {
    padding: 18,
    backgroundColor: Colors.lightWhite,
  },
});
