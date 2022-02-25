import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  INTEREST_LIST_REQUEST,
  INTEREST_LIST_SUCCESS,
  INTEREST_LIST_FAILURE,
  //
  INTEREST_CREATE_REQUEST,
  INTEREST_CREATE_SUCCESS,
  INTEREST_CREATE_FAILURE,
  //
  INTEREST_DELETE_REQUEST,
  INTEREST_DELETE_SUCCESS,
  INTEREST_DELETE_FAILURE,
} from "../reducers/interest";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function interestListAPI() {
  return axios.get(`/api/interest/list`);
}

function* interestList(action) {
  try {
    const result = yield call(interestListAPI, action.data);

    yield put({
      type: INTEREST_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INTEREST_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function interestCreateAPI(data) {
  return axios.post(`/api/interest/create`, data);
}

function* interestCreate(action) {
  try {
    const result = yield call(interestCreateAPI, action.data);

    yield put({
      type: INTEREST_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INTEREST_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function interestDeleteAPI(data) {
  return axios.delete(`/api/interest/delete/${data.interId}`);
}

function* interestDelete(action) {
  try {
    const result = yield call(interestDeleteAPI, action.data);

    yield put({
      type: INTEREST_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: INTEREST_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchInterestList() {
  yield takeLatest(INTEREST_LIST_REQUEST, interestList);
}

function* watchInterestCreate() {
  yield takeLatest(INTEREST_CREATE_REQUEST, interestCreate);
}

function* watchInterestDelete() {
  yield takeLatest(INTEREST_DELETE_REQUEST, interestDelete);
}

//////////////////////////////////////////////////////////////
export default function* interestSaga() {
  yield all([
    fork(watchInterestList),
    fork(watchInterestCreate),
    fork(watchInterestDelete),
    //
  ]);
}
