/* eslint-disable prettier/prettier */
import { NavService } from '../../config';
import Toast from 'react-native-toast-message';
import { store } from '../index';
import postApi from '../RequestTypes/post';
import getApi from '../RequestTypes/get';
import * as EmailValidator from 'email-validator';
import { Keyboard } from 'react-native';
import { Platform } from 'react-native';
import { saveUser, saveToken, addReviews } from '../actions';
import { cleanSingle } from 'react-native-image-crop-picker';


var passwordValidator = require('password-validator');
var schema = new passwordValidator();
schema.is().min(8).is().max(100);

function dispatch(action) {
  store.dispatch(action);
}
export function loaderStart() {
  dispatch({ type: 'LOADER_START' });
}
export function loaderStop() {
  dispatch({ type: 'LOADER_STOP' });
}



// Common APIs

export async function Get_All_Categories(api_token) {
  const data = await getApi('categories');
  return data;
}

export async function socialSignin(access_token, provider) {
  // const fcmToken = await getDeviceToken();
  const params = {
    access_token,
    provider,
    device_type: Platform.OS,
    device_token: 'fcmToken',
  };

  const data = await postApi('social-login', params, false);

  if (data?.status == 1 && data?.data?.account_verified === 1) {
    dispatch({
      type: 'SAVE_USER',
      payload: { ...data?.data, api_token: data?.access_token },
    });
    Toast.show({
      text1: data.message,
      type: 'success',
      visibilityTime: 5000,
    });
    NavService.reset(0, [{ name: 'AppStack' }]);
  } else {
    Toast.show({
      text1: data.message,
      textStyle: { textAlign: 'center' },
      type: 'error',
      visibilityTime: 5000,
    });
  }
}

export async function login(email, password, setLogin) {
  try {
    if (!email && !password)
      return Toast.show({
        text1: 'Please enter all info',
        type: 'error',
        visibilityTime: 3000,
      });
    if (!EmailValidator.validate(email))
      return Toast.show({
        text1: 'Email not valid',
        type: 'error',
        visibilityTime: 3000,
      });
    if (!schema.validate(password))
      return Toast.show({
        text1: 'Password not valid (Use atleast eight character)',
        type: 'error',
        visibilityTime: 3000,
      });

    const params = {
      email,
      password
    };

    const data = await postApi('signin', params, false)

    if (data?.status == 1) {
      NavService.reset(0, [{ name: 'CompleteProfile' }]);
      Toast.show({
        text1: data?.message,
        type: 'success',
        visibilityTime: 5000,
      });
      dispatch(saveUser(data?.Data));

      return { api_token: data?.Data?.api_token }
    }
    else if (data?.status == 0) {
      Toast.show({
        text1: data.message,
        type: 'error',
        visibilityTime: 5000,
      });
    }

  } catch (err) {
    return Toast.show({
      text: "Error exist",
      type: 'error',
      visibilityTime: 3000,
    })
  }
}

export async function signup(
  name,
  email,
  password,
  confirm_password,
  phone_number,
  date_of_birth,
) {
  if (!email && !password && !confirm_password && !name)
    return Toast.show({
      text1: 'Please enter all info',
      type: 'error',
      visibilityTime: 3000,
    });
  if (!EmailValidator.validate(email))
    return Toast.show({
      text1: 'Email not valid',
      type: 'error',
      visibilityTime: 3000,
    });
  if (!schema.validate(password))
    return Toast.show({
      text1: 'Password not valid (Use atleast eight character)',
      type: 'error',
      visibilityTime: 3000,
    });

  const params = {
    name,
    email,
    password,
    confirm_password,
  };
  console.log('params', params)
  const data = await postApi('signup', params);
  console.log("chcecking", data);
  if (data?.status == 1) {
    NavService.reset(0, [{ name: 'CompleteProfile' }])
    Toast.show({
      text1: data.message,
      type: 'success',
      visibilityTime: 5000,
    });
  }
  else if (data?.status === 0) {
    console.log("sta", data)
    Toast.show({
      text1: `${data.message.email}`,
      type: 'error',
      visibilityTime: 5000,
    });
  }

}

export async function verifyCode(otp, user_id) {
  const params = {
    otp,
    user_id,
  };

  const data = await postApi('verification', params);

  console.log('====================================');
  console.log(data);
  console.log('====================================');

  if (data?.status == 1) {
    dispatch({
      type: 'SAVE_USER',
      payload: { ...data?.data, api_token: data?.access_token },
    });
    NavService.reset(0, [{ name: 'Introduction' }]);
  }
}

export async function resendVerifyCode(user_id) {
  const params = {
    user_id,
  };

  await postApi('resend-otp', params);
}

export async function forget_password(email, otp) {

  if (!email)
    return Toast.show({
      text1: 'Please enter all info',
      type: 'error',
      visibilityTime: 3000,
    });
  if (!EmailValidator.validate(email))
    return Toast.show({
      text1: 'Email not valid',
      type: 'error',
      visibilityTime: 3000,
    });

  const params = {
    email
  };



  const data = await postApi('forget-password', params);

  if (data.status === 1) {
    NavService.navigate('ForgetPasswordOTP', { email });
    Toast.show({
      text1: data.message,
      type: 'success',
      visibilityTime: 5000,
    });
    return data.otp
  }
  else if (data.status === 0) {
    Toast.show({
      text1: data.message,
      type: 'error',
      visibilityTime: 5000,
    });
  }
  var otp = data.otp
  return Number(otp);
}

export async function verifyForgetPasswordCode(otp) {
  console.log("iiii", otp)
  // if (!otp)
  //   return Toast.show({
  //     text1: 'Please enter the code',
  //     type: 'error',
  //     visibilityTime: 3000,
  //   });
  // if (otp.length < 6)
  //   return Toast.show({
  //     text1: 'Code length should be 6 characters',
  //     type: 'error',
  //     visibilityTime: 3000,
  //   });

  const params = {
    otp,
    // email,
  };
  console.log("otpchecked", params)
  const data = await postApi('forget-password', params);
  console.log("eeeee", data.Data.otp)
  if (data?.status == 1) {
    Keyboard.dismiss;
    setTimeout(() => {
      NavService.navigate('ResetPassword', { email });
    }, 100);
  }
}

export async function resendForgetPasswordCode(email) {
  const params = {
    email,
  };

  await postApi('forgot-password-resend-otp', params);
}

export async function resetPassword(password, confirmPassword, email, otp) {
  if (!confirmPassword || !password)
    return Toast.show({
      text1: 'Please enter all info',
      type: 'error',
      visibilityTime: 3000,
    });
  if (!schema.validate(password))
    return Toast.show({
      text1: 'Password not valid (Use atleast eight character)',
      type: 'error',
      visibilityTime: 3000,
    });
  if (password !== confirmPassword)
    return Toast.show({
      text1: 'Passwords does not match',
      type: 'error',
      visibilityTime: 3000,
    });

  const params = {
    email,
    password: password,
    otp
  };

  const data = await postApi('update-password', params);
  console.log('data', params)

  if (data?.status == 1) {
    Toast.show({
      text1: data.message,
      type: 'success',
      visibilityTime: 5000,
    });
  }
}

export async function changePassword(
  old_password,
  new_password,
  new_password_confirmation,
) {
  if (!new_password_confirmation || !new_password || !old_password)
    return Toast.show({
      text1: 'Please enter all info',
      type: 'error',
      visibilityTime: 3000,
    });
  if (!schema.validate(new_password))
    return Toast.show({
      text1: 'Password not valid (Use atleast eight character)',
      type: 'error',
      visibilityTime: 3000,
    });
  if (new_password !== new_password_confirmation)
    return Toast.show({
      text1: 'Passwords does not match',
      type: 'error',
      visibilityTime: 3000,
    });

  const params = {
    old_password,
    new_password,
    new_password_confirmation,
  };

  const data = await postApi('change-password', params);

  if (data?.status == 1) {
    NavService.goBack();
  }
}

export async function logout() {
  const data = await postApi('logout');

  dispatch({ type: 'LOGOUT' });
  setTimeout(() => {
    NavService.reset(0, [{ name: 'Auth' }]);
  }, 1000);
}

export async function updateProfile(
  name,
  date_of_birth,
  bio,
  imageUrl,
  imageType,
) {
  const params = new FormData();
  if (imageType)
    params.append('attachment', {
      uri: imageUrl,
      name: `Profile${Date.now()}.${imageType.slice(
        imageType.lastIndexOf('/') + 1,
      )}`,
      type: imageType,
    });

  params.append('name', name);
  params.append('date_of_birth', date_of_birth);
  params.append('bio', bio);

  const data = await postApi('update-profile', params);

  if (data?.status == 1) {
    dispatch({ type: 'SAVE_USER', payload: data?.data });
    NavService.goBack();
  }

  console.log(data);
}

export async function getPolicies(type) {
  const response = await getApi(`content?type=${type}`, false);
  return response.data;
}

export async function localevents(api_token) {
  const data = await getApi('local-events');
  return data;
}

export async function categoryevents(api_token, category_id) {
  const params = { category_id }
  const data = await postApi('category-events', params);
  return data;
}

export async function get_reviews_event() {
  const data = await getApi('getreviews');
  return data;
}

export async function post_reviews(user_id, user_type, rating_image, tags, rating, review, event_id) {

  const params = new FormData();
  params.append("user_id", user_id);
  params.append("user_type", user_type || 'customer');
  params.append("rating_image", rating_image);
  params.append("tags", tags);
  params.append("rating", rating);
  params.append("review", review || 'miss');
  params.append("event_id", event_id);

  let y = params._parts.flat([2]).map(data => data)
  const obj = {};
  for (let i = 0; i < y.length; i += 2) {
    const key = y[i];
    let value = y[i + 1];
    if (value === 'null') {
      value = null;
    }
    obj[key] = value;
  }

  const data = await postApi('add-rating', obj);
  if(data.status == 1){
    NavService.navigate('Review')
  }

}
//Core Module APIs

