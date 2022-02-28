import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  CONTACT_GET_REQUEST,
  CONTACT_GET_SUCCESS,
  CONTACT_GET_FAILURE,
  //
  CONTACT_DETAIL_REQUEST,
  CONTACT_DETAIL_SUCCESS,
  CONTACT_DETAIL_FAILURE,
  //
  CONTACT_CREATE_REQUEST,
  CONTACT_CREATE_SUCCESS,
  CONTACT_CREATE_FAILURE,
} from "../reducers/contact";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function contactListAPI(data) {
  return axios.post(`/api/lease/list`, data);
}

function* contactList(action) {
  try {
    const result = yield call(contactListAPI, action.data);

    yield put({
      type: CONTACT_GET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CONTACT_GET_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function contactDetailAPI(data) {
  return axios.get(`/api/lease/detail/${data.leaseId}`);
}

function* contactDetail(action) {
  try {
    const result = yield call(contactDetailAPI, action.data);

    yield put({
      type: CONTACT_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CONTACT_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function contactCreateAPI(data) {
  return axios.post(`/api/lease/create`, data);
}

function* contactCreate(action) {
  try {
    const result = yield call(contactCreateAPI, action.data);

    yield put({
      type: CONTACT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CONTACT_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchContactList() {
  yield takeLatest(CONTACT_GET_REQUEST, contactList);
}

function* watchContactDetail() {
  yield takeLatest(CONTACT_DETAIL_REQUEST, contactDetail);
}

function* watchContactCreate() {
  yield takeLatest(CONTACT_CREATE_REQUEST, contactCreate);
}

//////////////////////////////////////////////////////////////
export default function* contactSaga() {
  yield all([
    fork(watchContactList),
    fork(watchContactDetail),
    fork(watchContactCreate),

    //
  ]);
}
