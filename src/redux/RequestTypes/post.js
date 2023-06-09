/* eslint-disable prettier/prettier */
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {Common} from '../../config';
import {logoutUser} from '../actions';
import {store} from '../index';

let state = store.getState()?.reducer;
let user_authentication = state?.user?.api_token;

axios.defaults.baseURL = Common.baseURL;
axios.defaults.timeout = Common.defaultTimeout;
// axios.defaults.timeout = 1;

function storeUpdate() {
  state = store.getState()?.reducer;
  user_authentication = state?.user?.api_token;

  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${user_authentication}`;
}

function dispatch(action) {
  store.dispatch(action);
}

export default async function postApi(
  endpoint,
  params = null,
  sucessToast = false,
  startLoader = true,
) {
  storeUpdate();
  if (startLoader) {
    dispatch({type: 'LOADER_START'});
  }
  try {
    const headers = {
      Authorization: 'Bearer ' + user_authentication,
      'Content-Type': 'multipart/form-data',
      'Accept' : 'application/json',
      // 'Content-Type': 'multipart/form-data,octet-stream',
    };
    const response = await axios.post(endpoint, params, {headers});
    console.log('response postApi ' + response);
    console.log('params postApi ' + params);
    dispatch({type: 'LOADER_STOP'});
    {
      sucessToast
        ? Toast.show({
            text1: response.data.message,
            type: 'success',
            visibilityTime: 2000,
          })
        : null;
    }
    return response.data;
  } catch (e) {
    console.log('error', e.response);
    dispatch({type: 'LOADER_STOP'});
    if (
      e.message.includes('timeout of ') &&
      e.message.includes('ms exceeded')
    ) {
      // Toast.show({
      //   text1: "Can't connect to server",
      //   textStyle: {textAlign: 'center'},
      //   type: 'error',
      //   visibilityTime: 5000,
      // });
    } else if (e.response?.data?.message == "Request failed with status code 401") {
      console.log('e.response?.data?.message',e.response?.data?.message)
      // Toast.show({
      //   text1: e.response.data.message,
      //   textStyle: {textAlign: 'center'},
      //   type: 'error',
      //   visibilityTime: 5000,
      // });
    } else if (e.response?.data?.error?.message == "Request failed with status code 401") {
      console.log('e.response?.data?.message' , e.response?.data?.error?.message)
      // Toast.show({
      //   text1: e.response.data.error.message,
      //   textStyle: {textAlign: 'center'},
      //   type: 'error',
      //   visibilityTime: 5000,
      // });
    } else {
      // Toast.show({
      //   text1: e.message,
      //   textStyle: {textAlign: 'center'},
      //   type: 'error',
      //   visibilityTime: 5000,
      // });
    }
    return null;
  }
}
export async function fetchApi(
  endpoint,
  params = null,
  successToast = true,
  startLoader = true,
  token = null,
  stopLoader = true,
) {
  let state = store.getState()?.reducer;
  let user_authentication = state?.user?.api_token;
  if (startLoader) {
    dispatch({type: 'LOADER_START'});
  }
  try {
    const response = await fetch(Common.baseURL + endpoint, {
      method: 'POST',
      mode: 'cors',
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user_authentication}`,
      },
      body: params,
    });
    if (stopLoader) {
      dispatch({type: 'LOADER_STOP'});
    }
    let json = await response.json();
    successToast
      ? Toast.show({
          text1: response.data.message,
          type: 'success',
          visibilityTime: 5000,
        })
      : null;

    return json;
  } catch (e) {
    console.log('error', e);
    dispatch({type: 'LOADER_STOP'});
    if (
      e.message.includes('timeout of ') &&
      e.message.includes('ms exceeded')
    ) {
      Toast.show({
        text1: "Can't connect to server",
        textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 5000,
      });
    } else if (e.response?.data?.message) {
      Toast.show({
        text1: e.response.data.message,
        textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 5000,
      });
    } else if (e.response?.data?.message) {
      Toast.show({
        text1: e.response.data.message,
        textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 5000,
      });
    } else {
      Toast.show({
        text1: e.message,
        textStyle: {textAlign: 'center'},
        type: 'error',
        visibilityTime: 5000,
      });
    }
    return null;
  } finally {
    dispatch({type: 'LOADER_STOP'});
  }
}
