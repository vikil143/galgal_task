import Toast, {ToastShowParams} from 'react-native-toast-message';

type Type = 'success' | 'error' | 'info';

interface ShowTypeParams extends ToastShowParams {
  type: Type;
}

export const showToast = ({type, text1, text2, ...params}: ShowTypeParams) =>
  Toast.show({type, text1, text2, ...params});

export function formatDateDDMMYYYY(date: Date) {
  let year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  return day + '-' + month + '-' + year;
}
