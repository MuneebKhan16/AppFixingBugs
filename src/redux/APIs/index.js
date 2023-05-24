/* eslint-disable prettier/prettier */
import {NavService} from '../../config';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import {store} from '../index';
import postApi, {fetchApi} from '../RequestTypes/post';
import getApi from '../RequestTypes/get';
import * as EmailValidator from 'email-validator';
import {Alert, Keyboard} from 'react-native';
import {Platform} from 'react-native';
import {saveUser, saveToken, addReviews} from '../actions';

var passwordValidator = require('password-validator');
var schema = new passwordValidator();
schema.is().min(8).is().max(100);

function dispatch(action) {
  store.dispatch(action);
}
export function loaderStart() {
  dispatch({type: 'LOADER_START'});
}
export function loaderStop() {
  dispatch({type: 'LOADER_STOP'});
}
export const getDeviceToken = async () => {
  try {
    const token = await messaging().getToken();
    if (token) return token;
    else return '';
  } catch (error) {
    console.log(error);
  }
};

// Common APIs

export async function Get_All_Categories(api_token) {
  const data = await getApi('categories');
  return data;
}

export async function socialSignin(access_token, provider, name, email) {
  const params = {
    social_token: access_token,
    login_type: provider,
    device_token: 'fcmToken',
    device_type: Platform.OS,
    name,
    email,
  };

  const data = await postApi('social-login', params, false);

  if (data?.status == 1) {
    // dispatch({
    //   type: 'SAVE_USER',
    //   payload: {...data?.data, api_token: data?.access_token},
    // });
    dispatch(saveUser(data?.Data));
    // Toast.show({
    //   text1: data.message,
    //   type: 'success',
    //   visibilityTime: 5000,
    // });
    NavService.reset(0, [{name: 'AppStack'}]);
  } else {
    Toast.show({
      text1: data.message,
      textStyle: {textAlign: 'center'},
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
      const fcmToken = await getDeviceToken();
    const params = {
      email,
      password,
      device_type: Platform.OS,
      device_token: fcmToken,
    };

    const data = await postApi('signin', params, false);

    if (data?.status == 1) {
      NavService.navigate('CompleteProfile', data);

      dispatch(saveUser(data?.Data));

      // return { api_token: data?.Data?.api_token }
    }
  } catch (err) {}
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
  const data = await postApi('signup', params);
  if (data?.status == 1) {
    NavService.reset(0, [{name: 'Login'}]);
    // Toast.show({
    //   text1: data.message,
    //   type: 'success',
    //   visibilityTime: 5000,
    // });
  } else if (data?.status === 0) {
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

  if (data?.status == 1) {
    dispatch({
      type: 'SAVE_USER',
      payload: {...data?.data, api_token: data?.access_token},
    });
    NavService.reset(0, [{name: 'Introduction'}]);
  }
}

export async function resendVerifyCode(user_id) {
  const params = {
    user_id,
  };

  await postApi('resend-otp', params);
}

export async function forget_password(email) {
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
    email,
  };

  const data = await postApi('forget-password', params);

  if (data.status === 1) {
    NavService.navigate('ForgetPasswordOTP', data);
    // Toast.show({
    //   text1: data.message,
    //   type: 'success',
    //   visibilityTime: 5000,
    // });
    return data.otp;
  } else if (data.status === 0) {
    Toast.show({
      text1: data.message,
      type: 'error',
      visibilityTime: 5000,
    });
  }
  var otp = data.otp;
  return Number(otp);
}

export async function verifyForgetPasswordCode(otp) {
  const params = {
    otp,
  };
  const data = await postApi('forget-password', params);
  if (data?.status == 1) {
    Keyboard.dismiss;
    setTimeout(() => {
      NavService.navigate('ResetPassword', {email});
    }, 100);
  }
}

export async function resendForgetPasswordCode(email) {
  const params = {
    email,
  };

  await postApi('forgot-password-resend-otp', params);
}

export async function resetPassword(password, otp, email) {
  const params = {
    email,
    password,
    otp,
  };

  const data = await postApi('update-password', params);

  if (data?.status == 1) {
    // Toast.show({
    //   text1: data.message,
    //   type: 'success',
    //   visibilityTime: 2000,
    // });
    NavService.navigate('Login');
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

  dispatch({type: 'LOGOUT'});
  setTimeout(() => {
    NavService.reset(0, [{name: 'Auth'}]);
  }, 1000);
}

export async function updateProfile(
  name,
  last_name,
  email,
  address,
  profile_picture,
  auth_token,
) {
  const params = new FormData();
  params.append('name', name);
  params.append('last_name', last_name);
  params.append('email', email);
  params.append('address', address);
  if (profile_picture && profile_picture !== null) {
    params.append('profile_picture', {
      uri: profile_picture?.path,
      name: `Profile${Date.now()}.${profile_picture?.mime.slice(
        profile_picture?.mime.lastIndexOf('/') + 1,
      )}`,
      type: profile_picture?.mime,
    });
  }
  // params.append('auth_token', auth_token);
  console.log('params', params);
  const data = await postApi('update-profile', params);
  console.log('object', data?.Data);
  if (data.status == 1) {
    saveUser(data?.Data);
    NavService.goBack();
  }
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
  const params = {category_id};
  const data = await postApi('category-events', params);
  return data;
}
export async function chatList(senderId) {
  const data = await getApi(`get-conversations`);
  return data;
}
export async function createChatConnection(senderAndRecieverId) {
  const data = await postApi('chat', {conversation_id: senderAndRecieverId});
  return data;
}
export async function get_reviews_event() {
  const data = await getApi('getreviews');
  return data;
}
export async function delete_rating(id) {
  const params = {
    id,
  };
  const data = await postApi('delete-rating', params);
  if (data?.status == 1) {
    Toast.show({
      text1: data.message,
      type: 'success',
      visibilityTime: 2000,
    });
    return data;
  }
  // get_reviews_event();
}
export async function post_reviews(
  user_id,
  user_type,
  rating_image,
  tags,
  rating,
  review,
  event_id,
) {
  console.log(
    'user_id, user_type, rating_image, tags, rating, review, event_id',
    user_id,
    user_type,
    rating_image,
    tags,
    rating,
    review,
    event_id,
  );
  const params = new FormData();
  params.append('user_id', user_id);
  params.append('user_type', user_type || 'customer');
  params.append('rating_image', rating_image);
  params.append('tags', tags);
  params.append('rating', rating);
  params.append('review', review || 'miss');
  params.append('event_id', event_id);
  console.log('rating_image', rating_image);

  const data = await postApi('add-rating', params);

  if (data.status == 1) {
    console.log('data', data, 'data');
    NavService.navigate('Tab');
    return data;
  }
  return data;
}

export async function post_events(
  event_title,
  event_type,
  event_description,
  event_image,
  user_id,
  category_id,
  event_location,
  event_date,
) {
  const params = new FormData();
  params.append('event_title', event_title);
  params.append('event_type', event_type);
  params.append('event_description', event_description);
  // params.append('event_image', event_image);
  if (event_image?.length) {
    const result = event_image?.map((asset, index) => {
      params.append(`event_image[${index + 1}]`, {
        uri: asset?.path,
        name: `EventAsset${Date.now()}.${asset?.mime.slice(
          asset?.mime.lastIndexOf('/') + 1,
        )}`,
        type: asset?.mime,
      });
      console.log('image data', {
        uri: asset?.path,
        name: `EventAsset${Date.now()}.${asset?.mime.slice(
          asset?.mime.lastIndexOf('/') + 1,
        )}`,
        type: asset?.mime,
      });
    });
    await Promise.all(result);
  }
  params.append('user_id', user_id);
  params.append('category_id', category_id);
  params.append('event_location', event_location);
  params.append('state', 'New Jersey');
  params.append('city', 'San Fransisco');
  params.append('event_date', event_date);

  console.log('object09876', params);

  // const data = await fetchApi('add-event', params);
  // console.log('fetch api result data', data, 'fetch api result data');

  const data = await postApi('add-event', params);

  if (data.status == 1) {
    NavService.navigate('TabComp', data);
    return data;
  }
}
export async function edit_events(
  event_title,
  event_type,
  event_description,
  event_image,
  user_id,
  category_id,
  event_location,
  event_date,
  event_id,
) {
  const params = new FormData();
  params.append('id', event_id);
  params.append('event_title', event_title);
  params.append('event_type', event_type);
  params.append('event_description', event_description);
  // params.append('event_image', event_image);
  if (event_image?.length) {
    const result = event_image?.map((asset, index) => {
      if (asset?.path) {
        params.append(`event_image[]`, {
          uri: asset?.path,
          name: `EventAsset${Date.now()}.${asset?.mime.slice(
            asset?.mime.lastIndexOf('/') + 1,
          )}`,
          type: asset?.mime,
        });
      }
    });
    await Promise.all(result);
  }
  params.append('user_id', user_id);
  params.append('category_id', category_id);
  params.append('event_location', event_location);
  params.append('state', 'New Jersey');
  params.append('city', 'San Fransisco');
  params.append('event_date', event_date);

  console.log('object09876', params);

  // const data = await fetchApi('add-event', params);
  // console.log('fetch api result data', data, 'fetch api result data');

  const data = await postApi('update-event', params);

  if (data.status == 1) {
    NavService.navigate('TabComp', data);
    return data;
  }
}
export async function deleteCurrentEventImage(event_id) {
  const params = new FormData();
  params.append('id', event_id);
  const data = await postApi('delete-media', params);
  if (data.status == 1) {
    return data;
  }
}
export async function deleteCurrentEvent(event_id) {
  const params = {
    id: event_id,
  };
  // const params = new FormData();
  // params.append('id', event_id);
  const data = await postApi('delete-event', params);
  if (data.status == 1) {
    NavService.navigate('TabComp', data);
  }
}

export async function show_eventCreater_event(user_id) {
  const body = new FormData();
  body.append('user_id', user_id);

  const data = await postApi('all-events', body);
  if (data.status == 1) {
    // NavService.navigate('EventHome');
    return data?.Data;
  }
}

export async function showprofiledetail() {
  const data = await getApi('show-profile');
  return data;
}

export async function searchEvents(state, city, event_date) {
  const params = new FormData();

  params.append('state', state);
  params.append('city', city);
  params.append('event_date', event_date);

  const data = await postApi('search-event', params);
  if (data.status == 1) {
    return data?.Data;
  }
}
