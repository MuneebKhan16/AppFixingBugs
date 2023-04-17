import { NavService } from '../../config';
import Toast from 'react-native-toast-message';
import { store } from '../index';
import postApi from '../RequestTypes/post';
import getApi from '../RequestTypes/get';
import * as EmailValidator from 'email-validator';
import { Keyboard } from 'react-native';
import { Platform } from 'react-native';
import { saveUser , saveToken } from '../actions';
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

export async function Get_All_Categories(api_token){
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
  try{
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
    
  if(data?.status == 1){
    NavService.reset(0, [{ name: 'CompleteProfile' }]);
    Toast.show({
      text1: data?.message,
      type: 'success',
      visibilityTime: 5000,
    });
    dispatch(saveUser(data?.Data));
    
    return { api_token : data?.Data?.api_token }
  }
  else if(data?.status == 0){
      Toast.show({
        text1: data.message,
        type: 'error',
        visibilityTime: 5000,
      });
  } 
  
  }catch(err){
    return Toast.show({
      text:"Error exist",
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
console.log('params',params)
  const data = await postApi('signup', params);
  console.log("chcecking",data);
  if(data?.status == 1){
    NavService.reset(0, [{name: 'CompleteProfile'}])
    Toast.show({
      text1: data.message,
      type: 'success',
      visibilityTime: 5000,
    });
  }
  else if(data?.status === 0){
    console.log("sta",data)
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

export async function forget_password(email,otp) {

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

  if( data.status === 1){
    NavService.navigate('ForgetPasswordOTP', { email});
    Toast.show({
      text1: data.message,
      type: 'success',
      visibilityTime: 5000,
    });
    return data.otp
  }
  else if(data.status === 0){
    Toast.show({
      text1:data.message,
      type: 'error',
      visibilityTime: 5000,
    });
  }
  var otp = data.otp
  return Number(otp);
}

export async function verifyForgetPasswordCode(otp) {
  console.log("iiii",otp)
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
  console.log("otpchecked",params)
  const data = await postApi('forget-password',params);
  console.log("eeeee",data.Data.otp)
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

export async function resetPassword(password, confirmPassword, email,otp) {
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
    // NavService.reset(0, [{ name: 'Auth' }]);
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

export async function localevents(api_token){
  const data = await getApi('local-events');
  return data;
  }

export async function categoryevents(api_token,category_id){
  const params = { category_id }
  const data = await postApi('category-events', params);
  return data;
}

export async function get_reviews_event(){
  const data = await getApi('getreviews');
  return data;
}

export async function post_reviews(){


  const params = new FormData();
  params.append("user_id" , user_id);
  params.append("user_type" , user_type);
  params.append("rating_image" , rating_image);
  params.append("event_id" , event_id);
  params.append("tags" , tags);


  const data = await postApi('add-rating',params);
  

}
//Core Module APIs

export async function getIntroduction() {
  const response = await getApi('introduction', false);
  return response.data;
}

export async function getAllPosts() {
  const response = await getApi('view-list', false, false);

  if (response?.status == 1) {
    dispatch({ type: 'SAVE_POSTS', payload: response.data });

    return null;
  }
  Toast.show({
    text1: response?.message,
    type: 'error',
    visibilityTime: 5000,
  });
  return null;
}

export async function searchPosts(search) {
  const params = new FormData();
  params.append('search', search);

  const response = await postApi('search', params, false);

  if (response?.status == 1) return response.data;
  return [];
}

//Posts APIs

export async function createPost(
  place_name,
  location,
  city,
  description,
  recommend_time,
  media,
) {
  if (!description || !recommend_time) {
    return Toast.show({
      text1: 'Please enter all info',
      type: 'error',
      visibilityTime: 3000,
    });
  }

  const params = new FormData();
  params.append('place_name', place_name);
  params.append('location', location);
  params.append('city', city);
  params.append('description', description);
  params.append('recommend_time', recommend_time);
  params.append('image[]', {});
  params.append('video[]', {});
  if (media?.length)
    media.map(item => {
      if (item.type.includes('video')) params.append('video[]', item);
      else params.append('image[]', item);
    });

  const response = await postApi('create-post', params);

  if (response?.status == 1) {
    await getAllPosts();
    NavService.navigate('Home');
  }
}

export async function likePost(post_id) {
  const params = new FormData();
  params.append('post_id', post_id);

  await postApi('post-like', params, false);

  await getAllPosts();
}

export async function getComments(post_id) {
  const response = await getApi(
    `comment-detail?post_id=${post_id}`,
    false,
    true,
    false,
    false,
  );

  if (response?.status == 1) {
    dispatch({ type: 'SAVE_COMMENTS', payload: response.data });
    return null;
  }
  dispatch({ type: 'SAVE_COMMENTS', payload: [] });
  return null;
}

export async function postComment(post_id, comment) {
  const params = new FormData();
  params.append('post_id', post_id);
  params.append('comment', comment);

  const data = await postApi('post-comment', params, false);
  getComments(post_id);
}

export async function likeComment(post_id, comment_id) {
  const params = new FormData();
  params.append('post_id', post_id);
  params.append('comment_id', comment_id);

  const data = await postApi('comment-like', params, false);

  getComments(post_id);
}

export async function getReplies(post_id, comment_id) {
  const response = await getApi(
    `comment-reply-detail?post_id=${post_id}&comment_id=${comment_id}`,
    false,
    true,
    false,
    false,
  );

  if (response?.status == 1) {
    dispatch({ type: 'SAVE_REPLIES', payload: response.data });
    return null;
  }
  dispatch({ type: 'SAVE_REPLIES', payload: [] });
  return null;
}

export async function postReply(post_id, comment_id, comment) {
  const params = new FormData();
  params.append('post_id', post_id);
  params.append('comment_id', comment_id);
  params.append('comment', comment);

  const data = await postApi('comment-reply', params, false);
  getReplies(post_id, comment_id);
  getComments(post_id);
}

export async function likeReply(post_id, comment_id, comment_com_id) {
  const params = new FormData();
  params.append('post_id', post_id);
  params.append('comment_id', comment_id);
  params.append('comment_com_id', comment_com_id);

  console.log(params);

  const data = await postApi('comment-reply-like', params, false);

  getReplies(post_id, comment_id);
}

// Bookmark Apis

export async function addBookmark(post_id) {
  const params = new FormData();
  params.append('post_id', post_id);

  const response = await postApi('add-to-bookmark', params);
  getAllPosts();
  bookmarkList();

  // if (response?.status != 1 || response == null) {
  //   revert(shouldSync);
  // }
}

export async function removeBookmark(post_id) {
  const params = new FormData();
  params.append('post_id', post_id);

  const response = await postApi('delete-to-bookmark', params);
  await getAllPosts();

  bookmarkList();

  // if (response?.status != 1 || response == null) {
  //   revert(shouldSync);
  // }
}

export async function bookmarkList() {
  const response = await getApi('bookmark-list', false, true, false);

  dispatch({ type: 'SAVE_BOOKMARKS', payload: response.data });
  return null;
}

// Other Apis

export async function getNotifications() {
  const response = await getApi('notifications', false);

  if (response?.status == 1) {
    return response.data;
  }
  return null;
}

export async function getFAQs() {
  const response = await getApi('faqs', false);

  if (response?.status == 1) {
    return response.data;
  }
  return null;
}

export async function getChats() {
  const response = await getApi('chat-messages', false);

  if (response?.status == 1) {
    return response.data;
  }
  return null;
}

export async function getAbout() {
  const response = await getApi('about', false);

  if (response?.status == 1) {
    return response.data;
  }
  return null;
}

export async function syncSocialMedia(shouldSync, revert) {
  const params = new FormData();
  params.append('social_media', shouldSync ? 'on' : 'off');

  const response = await postApi('social-media-setting', params, false);

  if (response?.status != 1 || response == null) {
    revert(shouldSync);
  }
}

export async function sendNotifications(shouldSend, revert) {
  const params = new FormData();
  params.append('notification', shouldSend ? 'on' : 'off');

  const response = await postApi('notification-setting', params, false);

  if (response?.status != 1 || response == null) {
    revert(shouldSend);
  }
}

export async function sendFeedback(comment) {
  const params = new FormData();
  params.append('comment', comment);

  await postApi('feedback', params);
}
