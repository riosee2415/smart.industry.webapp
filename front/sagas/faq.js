import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FAQ_GET_REQUEST,
  FAQ_GET_SUCCESS,
  FAQ_GET_FAILURE,
  //
  FAQ_DELETE_REQUEST,
  FAQ_DELETE_SUCCESS,
  FAQ_DELETE_FAILURE,
  //
  FAQ_UPDATE_REQUEST,
  FAQ_UPDATE_SUCCESS,
  FAQ_UPDATE_FAILURE,
  //
  FAQ_CREATE_REQUEST,
  FAQ_CREATE_SUCCESS,
  FAQ_CREATE_FAILURE,
  // ************************************************
  FAQ_TYPE_GET_REQUEST,
  FAQ_TYPE_GET_SUCCESS,
  FAQ_TYPE_GET_FAILURE,
  //
  FAQ_TYPE_DELETE_REQUEST,
  FAQ_TYPE_DELETE_SUCCESS,
  FAQ_TYPE_DELETE_FAILURE,
  //
  FAQ_TYPE_UPDATE_REQUEST,
  FAQ_TYPE_UPDATE_SUCCESS,
  FAQ_TYPE_UPDATE_FAILURE,
  //
  FAQ_TYPE_CREATE_REQUEST,
  FAQ_TYPE_CREATE_SUCCESS,
  FAQ_TYPE_CREATE_FAILURE,
} from "../reducers/faq";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function faqGetAPI(data) {
  return axios.get(`/api/faq/list/${data.typeId}?search=${data.search}`, data);
}

function* faqGet(action) {
  try {
    const result = yield call(faqGetAPI, action.data);

    yield put({
      type: FAQ_GET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_GET_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function faqCreateAPI(data) {
  return axios.post(`/api/faq/create`, data);
}

function* faqCreate(action) {
  try {
    const result = yield call(faqCreateAPI, action.data);

    yield put({
      type: FAQ_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function faqDeleteAPI(data) {
  return axios.patch(`/api/faq/delete`, data);
}

function* faqDelete(action) {
  try {
    const result = yield call(faqDeleteAPI, action.data);

    yield put({
      type: FAQ_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function faqUpdateAPI(data) {
  return axios.patch(`/api/faq/update`, data);
}

function* faqUpdate(action) {
  try {
    const result = yield call(faqUpdateAPI, action.data);

    yield put({
      type: FAQ_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function faqTypeGetAPI() {
  return axios.get(`/api/faq/type/list`);
}

function* faqTypeGet() {
  try {
    const result = yield call(faqTypeGetAPI);

    yield put({
      type: FAQ_TYPE_GET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_TYPE_GET_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function faqTypeCreateAPI(data) {
  return axios.post(`/api/faq/type/create`, data);
}

function* faqTypeCreate(action) {
  try {
    const result = yield call(faqTypeCreateAPI, action.data);

    yield put({
      type: FAQ_TYPE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_TYPE_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function faqTypeDeleteAPI(data) {
  return axios.delete(`/api/faq/type/delete/`, data);
}

function* faqTypeDelete(action) {
  try {
    const result = yield call(faqTypeDeleteAPI, action.data);

    yield put({
      type: FAQ_TYPE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_TYPE_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function faqTypeUpdateAPI(data) {
  return axios.patch(`/api/faq/type/update`, data);
}

function* faqTypeUpdate(action) {
  try {
    const result = yield call(faqTypeUpdateAPI, action.data);

    yield put({
      type: FAQ_TYPE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FAQ_TYPE_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchFaqGet() {
  yield takeLatest(FAQ_GET_REQUEST, faqGet);
}

function* watchFaqCreate() {
  yield takeLatest(FAQ_CREATE_REQUEST, faqCreate);
}

function* watchFaqDelete() {
  yield takeLatest(FAQ_DELETE_REQUEST, faqDelete);
}

function* watchFaqUpdate() {
  yield takeLatest(FAQ_UPDATE_REQUEST, faqUpdate);
}

// ****************************************************************

function* watchFaqTypeGet() {
  yield takeLatest(FAQ_TYPE_GET_REQUEST, faqTypeGet);
}

function* watchFaqTypeCreate() {
  yield takeLatest(FAQ_TYPE_CREATE_REQUEST, faqTypeCreate);
}

function* watchFaqTypeDelete() {
  yield takeLatest(FAQ_TYPE_DELETE_REQUEST, faqTypeDelete);
}

function* watchFaqTypeUpdate() {
  yield takeLatest(FAQ_TYPE_UPDATE_REQUEST, faqTypeUpdate);
}

//////////////////////////////////////////////////////////////
export default function* faqSaga() {
  yield all([
    fork(watchFaqGet),
    fork(watchFaqCreate),
    fork(watchFaqDelete),
    fork(watchFaqUpdate),

    // ****************************************************************

    fork(watchFaqTypeGet),
    fork(watchFaqTypeCreate),
    fork(watchFaqTypeDelete),
    fork(watchFaqTypeUpdate),
    //
  ]);
}
