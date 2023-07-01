import {StyleSheet, View, ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, {useState, useEffect, useMemo, useRef} from 'react';
const Buffer = require('buffer').Buffer;

import {commonStyles} from '../utility/commonStyles';
import Header from '../components/Header';
import {Colors, GalColor, KeyGalColor} from '../utility/Colors';
import InputBox from '../components/InputBox';
import Spacing from '../components/Spacing';
import Label from '../components/Label';
import RadioButton, {Gender} from '../components/RadioButton';
import {zipCode} from '../utility/data';
import DropDown from '../components/DropDown';
import DatePicker from '../components/DatePicker';
import ShadowInputBox from '../components/ShadowInputBox';
import Button from '../components/Button';
import {formatDateDDMMYYYY, showToast} from '../utility/helpers';
import {AstroPhy, EmailRegex} from '../utility/constants';
import Loader from '../components/Loader';
import {getLocalData, setLocalData} from '../utility/localStorage';

/*
    Need to be done this things 
    1. Proper form validation ==> Validation was done
    2. all three buttons should be disabled by default ==> All are maked disbled ==> add condition
    3. Select Color Dropdown select ==> Color drop haded proper validation
    4. Submit button flow
        a). After submit show 2 sec loader ==> done
        b). formdata storaged in local storage ==> done
        c). encode all in base64 and show as alert ==> done
        d). Form should not clicked more than once ==> done
        e). Submit button should enabled after
        all form data is entered and validation satisfied ==> this is done
    5). Show Data button was enabled after submit steps completed ==> THis point is done
        a). Click on show data will show all data in multiline textbox ==> done
        b). =============show on docs========== ===> this also done
    6). Reset button will be enabled once submit steps are completed
        a). It should reset the form ==> done
        // =========================================
    7). Only mobile formatter left
*/

interface InputFieldsState {
  name: string;
  email: string;
  mobile: string;
  dob: Date | string;
  gender: Gender;
  zip: string;
  city: string;
  state: string;
  color: KeyGalColor;
  multiline: string;
}

const initState: InputFieldsState = {
  name: '',
  email: '',
  mobile: '',
  dob: '',
  gender: 'Male',
  zip: '',
  city: '',
  state: '',
  color: '',
  multiline: '',
};

export default function FormScreen() {
  const [inputFields, setInputFields] = useState<InputFieldsState>({
    ...initState,
  });
  const [loader, setLoader] = useState(false);
  const noOfClicks = useRef(0);

  let isSubmitted = useRef(false);

  /* Filtered because as requirement */
  const colorsList = useMemo(
    () => [
      'None of them',
      ...Object.keys(GalColor).filter((_, index) => index < 5),
    ],
    [],
  );
  const selectedColor = useMemo(
    () => GalColor[inputFields.color],
    [inputFields.color],
  );
  const isColorPresent = selectedColor;

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    if (inputFields.zip.length < 3) return;
    console.log('UseEffect called');
    const findedIndex = zipCode.findIndex(
      (item, _) => inputFields.zip.indexOf(item.zipcode) > -1,
    );
    const findedItem = zipCode[findedIndex] ?? {city: '', state: ''};

    setInputFields({
      ...inputFields,
      city: findedItem.city,
      state: findedItem.state,
    });
  }, [inputFields.zip]);

  const initData = async () => {
    let localData = await getLocalData();
    console.log('init Data', localData);
  };

  const handleReqValidate = () => {
    if (inputFields.name.trim() === '') {
      return false;
    }

    if (inputFields.email.trim() === '') {
      return false;
    }

    if (inputFields.mobile.trim() === '') {
      return false;
    }

    if (inputFields.dob === '') {
      return false;
    }

    if (inputFields.zip.trim() === '') {
      return false;
    }

    // let indexOfExistingZip = zipCode.findIndex(
    //   item => inputFields.zip.indexOf(item.zipcode) > -1,
    // );

    // if (indexOfExistingZip < 0) {
    //   return false;
    // }

    return true;
  };

  const handleValidate = () => {
    if (inputFields.name.trim() === '') {
      showToast({
        type: 'error',
        text1: 'Required!',
        text2: 'Please enter name',
      });
      return false;
    }

    if (!AstroPhy.test(inputFields.name)) {
      showToast({
        type: 'error',
        text1: 'Invalide!',
        text2: 'Please enter valide name, use Apostrophe',
      });
      return false;
    }

    if (inputFields.email.trim() === '') {
      showToast({
        type: 'error',
        text1: 'Required!',
        text2: 'Please enter email',
      });
      return false;
    }

    if (!EmailRegex.test(inputFields.email)) {
      showToast({
        type: 'error',
        text1: 'Invalide!',
        text2: 'Please enter valide email',
      });
      return false;
    }

    if (inputFields.mobile.trim() === '') {
      showToast({
        type: 'error',
        text1: 'Required!',
        text2: 'Please enter mobile',
      });
      return false;
    }

    if (inputFields.mobile.length !== 10) {
      showToast({
        type: 'error',
        text1: 'InValide!',
        text2: 'Please enter mobile',
      });
      return false;
    }

    if (inputFields.dob === '') {
      showToast({
        type: 'error',
        text1: 'Required!',
        text2: 'Please enter DOB',
      });

      return false;
    }

    if (inputFields.zip.trim() === '') {
      showToast({
        type: 'error',
        text1: 'Required!',
        text2: 'Please enter DOB',
      });

      return false;
    }

    let indexOfExistingZip = zipCode.findIndex(
      item => inputFields.zip.indexOf(item.zipcode) > -1,
    );

    console.log('Zip COde', indexOfExistingZip);

    if (indexOfExistingZip < 0) {
      showToast({
        type: 'error',
        text1: 'Range!',
        text2: 'Please enter given range zip code',
      });

      return false;
    }

    // // Its
    // if (inputFields.color === '' || inputFields.color === 'None of them') {
    //
    //     showToast({
    //       type: 'error',
    //       text1: 'Required!',
    //       text2: 'Please select color',
    //     });

    //   return false;
    // }

    return true;
  };

  const onSubmit = () => {
    const isValide = handleValidate();
    if (isValide) {
      setLoader(true);
      setTimeout(() => {
        const formData = {
          ...inputFields,
          dob: formatDateDDMMYYYY(inputFields.dob as Date),
        };
        const base64 = new Buffer(JSON.stringify(formData)).toString('base64');
        setLocalData(JSON.stringify(formData));
        alert(JSON.stringify(base64, undefined, 3));
        isSubmitted.current = true;
        setLoader(false);
      }, 2000);
      console.log('Subitted');
    }
  };

  const onReset = () => {
    isSubmitted.current = false;
    setInputFields({...initState});
  };

  const onShow = () => {
    let message = 'Your all enter data was showned below \n';
    let counts = 'Counts';
    if (inputFields.multiline.trim() === '') {
      for (let key in inputFields) {
        // For Date format
        if (inputFields[key] instanceof Date) {
          message += `${key.toUpperCase()} :- ${formatDateDDMMYYYY(
            inputFields[key],
          )} \n`;
        } else {
          message += `${key.toUpperCase()} :- ${inputFields[key]} \n`;
        }
      }
      noOfClicks.current += 1;
      message += `${counts}:- ${noOfClicks.current}`;
    } else {
      message = inputFields.multiline;
      let indexOfCount = message.lastIndexOf(counts);
      message = message.substring(0, indexOfCount);
      noOfClicks.current += 1;
      message += `${counts}:- ${noOfClicks.current}`;
    }

    setInputFields({...inputFields, multiline: message});
  };

  const onChangeValue = (name: string, text: string | Date) =>
    setInputFields({...inputFields, [name]: text});

  const onChangeDropDown = (colorKey: KeyGalColor) =>
    setInputFields({...inputFields, color: colorKey});

  // Placed below to reuse handleValide
  const submitDisability = useMemo(
    () => (!isSubmitted.current ? !handleReqValidate() : true),
    [inputFields, isSubmitted.current],
  );
  const showMoreDisability = useMemo(
    () => !isSubmitted.current,
    [isSubmitted.current],
  );
  const resetDisability = useMemo(
    () => !isSubmitted.current,
    [isSubmitted.current],
  );

  console.log('Form Screen', inputFields);
  return (
    <View style={[styles.root]}>
      <Loader show={loader} />
      <Header />
      <KeyboardAwareScrollView>
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          contentContainerStyle={[commonStyles.scrollContainer]}
          keyboardShouldPersistTaps="handled">
          <View
            style={[
              styles.container,
              // This color was added to show label color
              {backgroundColor: isColorPresent ? Colors.black : Colors.white},
            ]}>
            <Label value="Name" color={selectedColor}></Label>
            <InputBox
              name="name"
              value={inputFields.name}
              onChangeValue={onChangeValue}
              placeholder="Enter name..."
              autoCapitalize="characters"
            />
            <Spacing />
            <Label value="Email" color={selectedColor}></Label>
            <InputBox
              name="email"
              value={inputFields.email}
              onChangeValue={onChangeValue}
              placeholder="Enter email..."
            />
            <Spacing />
            <Label value="Mobile" color={selectedColor}></Label>
            {/* <ShadowInputBox /> */}
            {/* <TextInputMask /> */}
            <InputBox
              name="mobile"
              value={inputFields.mobile}
              onChangeValue={onChangeValue}
              keyboardType="number-pad"
              maxLength={10}
            />
            <Spacing />
            <Label value="DOB" color={selectedColor}></Label>
            <DatePicker
              name="dob"
              value={inputFields.dob}
              onChangeValue={onChangeValue}
            />
            <Spacing />
            <Label value="Gender" color={selectedColor}></Label>
            <RadioButton
              value={inputFields.gender}
              name="gender"
              onChangeValue={onChangeValue}
            />
            <Spacing />
            <Label value="Zip" color={selectedColor}></Label>
            <InputBox
              name="zip"
              value={inputFields.zip}
              onChangeValue={onChangeValue}
              keyboardType="number-pad"
            />
            <Spacing />

            <Label value="City" color={selectedColor}></Label>
            <InputBox name="city" value={inputFields.city} editable={false} />
            <Spacing />

            <Label value="State" color={selectedColor}></Label>
            <InputBox name="state" value={inputFields.state} editable={false} />
            <Spacing />

            <Label value="Colors" color={selectedColor}></Label>
            <DropDown list={colorsList} onChangeValue={onChangeDropDown} />
            <Spacing />

            <Label value="Multiline" color={selectedColor}></Label>
            <InputBox
              name="multiline"
              value={inputFields.multiline}
              numberOfLines={12}
              textAlignVertical="top"
              multiline
              editable={false}
            />
            <Spacing />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View style={[commonStyles.pA15]}>
        <Button
          color={GalColor.antiquewhite}
          text="Show Data"
          onPress={onShow}
          disabled={showMoreDisability}
        />
        <Spacing size={5} />
        <View style={[commonStyles.row]}>
          <Button
            color={GalColor.antiquewhite}
            text="Submit"
            onPress={onSubmit}
            // By comment this see form validation
            disabled={submitDisability}
            containerStyle={styles.button}
          />
          <View style={[styles.line]} />
          <Button
            color={GalColor.antiquewhite}
            text="Reset"
            onPress={onReset}
            containerStyle={styles.button}
            disabled={resetDisability}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    height: '100%',
    width: 2,
    backgroundColor: Colors.grey,
  },
  button: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
