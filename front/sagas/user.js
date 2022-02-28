import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  /////////////////////////////
  LOGIN_ADMIN_REQUEST,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_FAILURE,
  /////////////////////////////
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  /////////////////////////////
  USERLIST_REQUEST,
  USERLIST_SUCCESS,
  USERLIST_FAILURE,
  /////////////////////////////
  USERLIST_UPDATE_REQUEST,
  USERLIST_UPDATE_SUCCESS,
  USERLIST_UPDATE_FAILURE,
  /////////////////////////////
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  /////////////////////////////
  KAKAO_LOGIN_REQUEST,
  KAKAO_LOGIN_SUCCESS,
  KAKAO_LOGIN_FAILURE,
  /////////////////////////////
  FIND_USER_ID_REQUEST,
  FIND_USER_ID_SUCCESS,
  FIND_USER_ID_FAILURE,
  /////////////////////////////
  FIND_USER_PASS_REQUEST,
  FIND_USER_PASS_SUCCESS,
  FIND_USER_PASS_FAILURE,
  /////////////////////////////
  FIND_USER_PASS_UPDATE_REQUEST,
  FIND_USER_PASS_UPDATE_SUCCESS,
  FIND_USER_PASS_UPDATE_FAILURE,
  /////////////////////////////
  USER_INFO_UPDATE_REQUEST,
  USER_INFO_UPDATE_SUCCESS,
  USER_INFO_UPDATE_FAILURE,
  /////////////////////////////
  FIND_USER_CHECK_SECRET_REQUEST,
  FIND_USER_CHECK_SECRET_SUCCESS,
  FIND_USER_CHECK_SECRET_FAILURE,
  /////////////////////////////
  EMAIL_CHECK_REQUEST,
  EMAIL_CHECK_SUCCESS,
  EMAIL_CHECK_FAILURE,
  /////////////////////////////
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILURE,
  /////////////////////////////
} from "../reducers/user";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function loadMyInfoAPI(data) {
  return axios.get("/api/user/signin", data);
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// *****

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function signinPI(data) {
  return axios.post(`/api/user/signin`, data);
}

function* signin(action) {
  try {
    const result = yield call(signinPI, action.data);
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function signinAdminPI(data) {
  return axios.post(`/api/user/signin/admin`, data);
}

function* signinAdmin(action) {
  try {
    const result = yield call(signinAdminPI, action.data);
    yield put({
      type: LOGIN_ADMIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGIN_ADMIN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function signUpAPI(data) {
  return axios.post(`/api/user/signup`, data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGNUP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userListAPI(data) {
  return axios.get(
    `/api/user/list/${data.listType}?name=${data.name}&email=${data.email}`
  );
}

function* userList(action) {
  try {
    const result = yield call(userListAPI, action.data);
    yield put({
      type: USERLIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USERLIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userListUpdateAPI(data) {
  return axios.patch(`/api/user/level/update`, data);
}

function* userListUpdate(action) {
  try {
    const result = yield call(userListUpdateAPI, action.data);
    yield put({
      type: USERLIST_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USERLIST_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function kakaoLoginAPI() {
  return axios.get(`/api/user/kakaoLogin`);
}

function* kakaoLogin() {
  try {
    const result = yield call(kakaoLoginAPI);

    yield put({
      type: KAKAO_LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KAKAO_LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function findUserIdByEmailAPI(data) {
  return axios.post(`/api/user/findUserIdByEmail`, data);
}

function* findUserIdByEmail(action) {
  try {
    const result = yield call(findUserIdByEmailAPI, action.data);

    yield put({
      type: FIND_USER_ID_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FIND_USER_ID_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function findUserPassAPI(data) {
  console.log(data);
  return axios.post(`/api/user/modifypass`, data);
}

function* findUserPass(action) {
  try {
    const result = yield call(findUserPassAPI, action.data);

    yield put({
      type: FIND_USER_PASS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FIND_USER_PASS_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function userInfoUpdateAPI(data) {
  return axios.post(`/api/user/me/update`, data);
}

function* userInfoUpdate(action) {
  try {
    const result = yield call(userInfoUpdateAPI, action.data);

    yield put({
      type: USER_INFO_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_INFO_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************

function findUserPassUpdateAPI(data) {
  return axios.patch(`/api/user/modifypass/update`, data);
}

function* findUserPassUpdate(action) {
  try {
    const result = yield call(findUserPassUpdateAPI, action.data);

    yield put({
      type: FIND_USER_PASS_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FIND_USER_PASS_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function findUserCheckSecretAPI(data) {
  return axios.post(`/api/user/checkSecret`, data);
}

function* findUserCheckSecret(action) {
  try {
    const result = yield call(findUserCheckSecretAPI, action.data);

    yield put({
      type: FIND_USER_CHECK_SECRET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FIND_USER_CHECK_SECRET_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function checkEmailAPI(data) {
  return axios.post(`/api/user/emailCheck`, data);
}

function* checkEmail(action) {
  try {
    const result = yield call(checkEmailAPI, action.data);

    yield put({
      type: EMAIL_CHECK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EMAIL_CHECK_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function logoutAPI() {
  return axios.get(`/api/user/logout`);
}

function* logout(action) {
  try {
    const result = yield call(logoutAPI, action.data);

    yield put({
      type: USER_LOGOUT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_LOGOUT_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchSignin() {
  yield takeLatest(LOGIN_REQUEST, signin);
}

function* watchSigninAdmin() {
  yield takeLatest(LOGIN_ADMIN_REQUEST, signinAdmin);
}

function* watchSignUp() {
  yield takeLatest(SIGNUP_REQUEST, signUp);
}

function* watchUserList() {
  yield takeLatest(USERLIST_REQUEST, userList);
}

function* watchUserListUpdate() {
  yield takeLatest(USERLIST_UPDATE_REQUEST, userListUpdate);
}

function* watchKakaoLogin() {
  yield takeLatest(KAKAO_LOGIN_REQUEST, kakaoLogin);
}

function* watchFindUserIdByEmail() {
  yield takeLatest(FIND_USER_ID_REQUEST, findUserIdByEmail);
}

function* watchFindUserPass() {
  yield takeLatest(FIND_USER_PASS_REQUEST, findUserPass);
}

function* watchFindUserPassUpdate() {
  yield takeLatest(FIND_USER_PASS_UPDATE_REQUEST, findUserPassUpdate);
}
function* watchUserInfoUpdate() {
  yield takeLatest(USER_INFO_UPDATE_REQUEST, userInfoUpdate);
}

function* watchFindUserCheckSecret() {
  yield takeLatest(FIND_USER_CHECK_SECRET_REQUEST, findUserCheckSecret);
}

function* watchCheckEmail() {
  yield takeLatest(EMAIL_CHECK_REQUEST, checkEmail);
}

function* watchLogout() {
  yield takeLatest(USER_LOGOUT_REQUEST, logout);
}

//////////////////////////////////////////////////////////////
export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchSignin),
    fork(watchSigninAdmin),
    fork(watchSignUp),
    fork(watchUserList),
    fork(watchUserListUpdate),
    fork(watchKakaoLogin),
    fork(watchFindUserIdByEmail),
    fork(watchFindUserPass),
    fork(watchFindUserPassUpdate),
    fork(watchUserInfoUpdate),
    fork(watchFindUserCheckSecret),
    fork(watchCheckEmail),
    fork(watchLogout),
    //
  ]);
}
