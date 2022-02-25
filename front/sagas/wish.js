import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
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
} from "../reducers/wish";

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
  return axios.post(`/api/wish/notUser/wishcreate`, data);
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

//////////////////////////////////////////////////////////////

function* watchWishCreate() {
  yield takeLatest(WISH_CREATE_REQUEST, wishCreate);
}

function* watchWishCreateNotUser() {
  yield takeLatest(WISH_CREATE_NOT_USER_REQUEST, wishNotUserCreate);
}

function* watchWishCreateWish() {
  yield takeLatest(WISH_WISH_CREATE_REQUEST, wishWishCreate);
}

//////////////////////////////////////////////////////////////
export default function* wishSaga() {
  yield all([
    fork(watchWishCreate),
    fork(watchWishCreateNotUser),
    fork(watchWishCreateWish),
  ]);
}
