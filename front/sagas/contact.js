import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  CONTACT_GET_REQUEST,
  CONTACT_GET_SUCCESS,
  CONTACT_GET_FAILURE,
  //
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

//////////////////////////////////////////////////////////////

function* watchContactList() {
  yield takeLatest(CONTACT_GET_REQUEST, contactList);
}

//////////////////////////////////////////////////////////////
export default function* contactSaga() {
  yield all([
    fork(watchContactList),

    //
  ]);
}
