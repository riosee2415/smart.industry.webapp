import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  WISH_LIST_REQUEST,
  WISH_LIST_SUCCESS,
  WISH_LIST_FAILURE,
  //
  WISH_LIST_NOT_USER_REQUEST,
  WISH_LIST_NOT_USER_SUCCESS,
  WISH_LIST_NOT_USER_FAILURE,
  //
  WISH_LIST_DETAIL_REQUEST,
  WISH_LIST_DETAIL_SUCCESS,
  WISH_LIST_DETAIL_FAILURE,
  //
  WISH_LIST_DETAIL_NOT_USER_REQUEST,
  WISH_LIST_DETAIL_NOT_USER_SUCCESS,
  WISH_LIST_DETAIL_NOT_USER_FAILURE,
  //
  WISH_CREATE_REQUEST,
  WISH_CREATE_SUCCESS,
  WISH_CREATE_FAILURE,
  //
  WISH_CREATE_NOT_USER_REQUEST,
  WISH_CREATE_NOT_USER_SUCCESS,
  WISH_CREATE_NOT_USER_FAILURE,
  //
  WISH_WISH_CREATE_REQUEST,
  WISH_WISH_CREATE_SUCCESS,
  WISH_WISH_CREATE_FAILURE,
  //
  WISH_WISH_NOT_USER_CREATE_REQUEST,
  WISH_WISH_NOT_USER_CREATE_SUCCESS,
  WISH_WISH_NOT_USER_CREATE_FAILURE,
  //
  WISH_ADMIN_LIST_REQUEST,
  WISH_ADMIN_LIST_SUCCESS,
  WISH_ADMIN_LIST_FAILURE,
  //
  WISH_COMPLETED_REQUEST,
  WISH_COMPLETED_SUCCESS,
  WISH_COMPLETED_FAILURE,
} from "../reducers/wish";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function wishListAPI(data) {
  return axios.get(`/api/wish/list`, data);
}

function* wishList(action) {
  try {
    const result = yield call(wishListAPI, action.data);

    yield put({
      type: WISH_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function wishNotUserListAPI(data) {
  return axios.post(`/api/wish/notUser/list`, data);
}

function* wishNotUserList(action) {
  try {
    const result = yield call(wishNotUserListAPI, action.data);

    yield put({
      type: WISH_LIST_NOT_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_LIST_NOT_USER_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function wishAdminListAPI(data) {
  return axios.get(`/api/wish/admin/list/${data.listType}`);
}

function* wishAdminList(action) {
  try {
    const result = yield call(wishAdminListAPI, action.data);

    yield put({
      type: WISH_ADMIN_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_ADMIN_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function wishCompletedAPI(data) {
  return axios.patch(`/api/wish/update`, data);
}

function* wishCompleted(action) {
  try {
    const result = yield call(wishCompletedAPI, action.data);

    yield put({
      type: WISH_COMPLETED_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_COMPLETED_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function wishDetailListAPI(data) {
  return axios.get(`/api/wish/detail/${data.boughtId}`, data);
}

function* wishDetailList(action) {
  try {
    const result = yield call(wishDetailListAPI, action.data);

    yield put({
      type: WISH_LIST_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_LIST_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function wishDetailNotUserListAPI(data) {
  return axios.post(`/api/wish/notUser/detail`, data);
}

function* wishDetailNotUserList(action) {
  try {
    const result = yield call(wishDetailNotUserListAPI, action.data);

    yield put({
      type: WISH_LIST_DETAIL_NOT_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_LIST_DETAIL_NOT_USER_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function wishCreateAPI(data) {
  return axios.post(`/api/wish/user/create`, data);
}

function* wishCreate(action) {
  try {
    const result = yield call(wishCreateAPI, action.data);

    yield put({
      type: WISH_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function wishNotUserCreateAPI(data) {
  return axios.post(`/api/wish/notUser/create`, data);
}

function* wishNotUserCreate(action) {
  try {
    const result = yield call(wishNotUserCreateAPI, action.data);

    yield put({
      type: WISH_CREATE_NOT_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_CREATE_NOT_USER_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function wishWishCreateAPI(data) {
  return axios.post(`/api/wish/user/wishcreate`, data);
}

function* wishWishCreate(action) {
  try {
    const result = yield call(wishWishCreateAPI, action.data);

    yield put({
      type: WISH_WISH_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_WISH_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function wishWishNotUserCreateAPI(data) {
  return axios.post(`/api/wish/notUser/wishcreate`, data);
}

function* wishWishNotUserCreate(action) {
  try {
    const result = yield call(wishWishNotUserCreateAPI, action.data);

    yield put({
      type: WISH_WISH_NOT_USER_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: WISH_WISH_NOT_USER_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchWishList() {
  yield takeLatest(WISH_LIST_REQUEST, wishList);
}

function* watchWishNotUserList() {
  yield takeLatest(WISH_LIST_NOT_USER_REQUEST, wishNotUserList);
}

function* watchWishAdminList() {
  yield takeLatest(WISH_ADMIN_LIST_REQUEST, wishAdminList);
}

function* watchWishCompleted() {
  yield takeLatest(WISH_COMPLETED_REQUEST, wishCompleted);
}

function* watchWishDetailList() {
  yield takeLatest(WISH_LIST_DETAIL_REQUEST, wishDetailList);
}

function* watchWishNotUserDetailList() {
  yield takeLatest(WISH_LIST_DETAIL_NOT_USER_REQUEST, wishDetailNotUserList);
}

function* watchWishCreate() {
  yield takeLatest(WISH_CREATE_REQUEST, wishCreate);
}

function* watchWishCreateNotUser() {
  yield takeLatest(WISH_CREATE_NOT_USER_REQUEST, wishNotUserCreate);
}

function* watchWishCreateWish() {
  yield takeLatest(WISH_WISH_CREATE_REQUEST, wishWishCreate);
}

function* watchWishNotUserCreateWish() {
  yield takeLatest(WISH_WISH_NOT_USER_CREATE_REQUEST, wishWishNotUserCreate);
}

//////////////////////////////////////////////////////////////
export default function* wishSaga() {
  yield all([
    fork(watchWishList),
    fork(watchWishNotUserList),
    fork(watchWishAdminList),
    fork(watchWishCompleted),
    fork(watchWishDetailList),
    fork(watchWishCreate),
    fork(watchWishCreateNotUser),
    fork(watchWishCreateWish),
    fork(watchWishNotUserCreateWish),
    fork(watchWishNotUserDetailList),
  ]);
}
