/* eslint-disable prettier/prettier */
import { NavService } from '../../config';
import Toast from 'react-native-toast-message';
import { store } from '../index';
import postApi from '../RequestTypes/post';
import getApi from '../RequestTypes/get';
import * as EmailValidator from 'email-validator';
import { Alert, Keyboard } from 'react-native';
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
    // Toast.show({
    //   text1: data.message,
    //   type: 'success',
    //   visibilityTime: 5000,
    // });
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
      NavService.navigate('CompleteProfile', data)
     
      dispatch(saveUser(data?.Data));

      // return { api_token: data?.Data?.api_token }
    }
    

  } 
  catch (err) {
   
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
  const data = await postApi('signup', params);
  if (data?.status == 1) {
    NavService.reset(0, [{ name: 'Login' }])
    // Toast.show({
    //   text1: data.message,
    //   type: 'success',
    //   visibilityTime: 5000,
    // });
  }
  else if (data?.status === 0) {
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
    email
  };



  const data = await postApi('forget-password', params);
  
  if (data.status === 1) {
    NavService.navigate('ForgetPasswordOTP', data);
    // Toast.show({
    //   text1: data.message,
    //   type: 'success',
    //   visibilityTime: 5000,
    // });
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

  const params = {
    otp,
  };
  const data = await postApi('forget-password', params);
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

export async function resetPassword(password, otp, email) {


  const params = {
    email,
    password,
    otp
  };

  const data = await postApi('update-password', params);

  if (data?.status == 1) {
    // Toast.show({
    //   text1: data.message,
    //   type: 'success',
    //   visibilityTime: 2000,
    // });
    NavService.navigate('Login')
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
  last_name,
  email,
  address,
  profilePicture,
  auth_token
) {
 const params = new FormData();

 params.append('name' , name)
 params.append('last_name' , last_name)
 params.append('email' , email)
 params.append('address' , address)
 params.append('profilePicture',profilePicture)
 params.append('auth_token',auth_token)

 console.log('param',params)
 
const data = await postApi('update-profile',params)
console.log('object',data)
if (data.status == 1) {
    
  NavService.goBack();
  return data?.Data;

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
  const params = { category_id }
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

export async function post_reviews(user_id, user_type, rating_image, tags, rating, review, event_id) {
  console.log('user_id, user_type, rating_image, tags, rating, review, event_id',user_id, user_type, rating_image, tags, rating, review, event_id)
  const params = new FormData();
  params.append("user_id", user_id);
  params.append("user_type", user_type || 'customer');
  params.append("rating_image", rating_image);
  params.append("tags", tags);
  params.append("rating", rating);
  params.append("review", review || 'miss');
  params.append("event_id", event_id);
  

  const data = await postApi('add-rating' ,params);
  


  if (data.status == 1) {
    NavService.navigate('Tab')
    return data;
  }
  return data;
}

export async function post_events(event_title, event_type, event_description, event_image, user_id, category_id, event_location) {
  if(!event_title && !event_type && !event_description && !event_image && !category_id && !event_location){
    return Toast.show({
      text1: 'Select all fields',
      type: 'error',
      visibilityTime: 3000,
    });
  }
  else if(!event_title){
    return Toast.show({
      text1: 'No Title Selected',
      type: 'error',
      visibilityTime: 3000,
    });
  }
  else if(!event_description){
    return Toast.show({
      text1: 'No Description Selected',
      type: 'error',
      visibilityTime: 3000,
    });
  }
  else if(!event_location){
    return Toast.show({
      text1: 'No Location Selected',
      type: 'error',
      visibilityTime: 3000,
    });
  }
  else if(!category_id){
    return Toast.show({
      text1: 'No Category Selected',
      type: 'error',
      visibilityTime: 3000,
    });
  }
  else if(!event_type){
    return Toast.show({
      text1: 'No EventType Selected',
      type: 'error',
      visibilityTime: 3000,
    });
  }

  else if(event_image.path == null){
    return Toast.show({
      text: 'No Image Selecteds',
      type: 'error',
      visibilityTime: 3000,
    });
  }
else {
  if(event_title !== null  && event_type !== null && event_description !== null && event_image !== null && category_id !== null && event_location !== null){
    const params = new FormData();
    params.append("event_title", event_title)
    params.append("event_type", event_type)
    params.append("event_description", event_description)
    params.append("event_image", event_image)
    params.append("user_id", user_id)
    params.append("category_id", category_id)
    params.append("event_location", event_location)
  
   // console.log('object09876',params)
  
    const data = await postApi('add-event', params)
 
    
    if (data.status == 1) {
      NavService.navigate('TabComp',data)
      return data
    }

  } else{
    // return 
    // Toast.show({
    //   text1: 'No Events',
    //   type: 'error',
    //   visibilityTime: 3000,
    // });
  }
  

}

  


}

export async function show_eventCreater_event(user_id) {
  const body = new FormData();
  body.append('user_id', user_id);

  const data = await postApi('all-events', body);
  if (data.status == 1) {
    NavService.navigate('EventHome')
    return data?.Data;
  }
}

export async function showprofiledetail(){
  const data = await getApi('show-profile');
  return data;
}



