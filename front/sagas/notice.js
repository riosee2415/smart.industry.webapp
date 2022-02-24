import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  NOTICE_LIST_REQUEST,
  NOTICE_LIST_SUCCESS,
  NOTICE_LIST_FAILURE,
  //
  NOTICE_DETAIL_REQUEST,
  NOTICE_DETAIL_SUCCESS,
  NOTICE_DETAIL_FAILURE,
  //
  NOTICE_CREATE_REQUEST,
  NOTICE_CREATE_SUCCESS,
  NOTICE_CREATE_FAILURE,
  //
  NOTICE_UPDATE_REQUEST,
  NOTICE_UPDATE_SUCCESS,
  NOTICE_UPDATE_FAILURE,
  //
  NOTICE_DELETE_REQUEST,
  NOTICE_DELETE_SUCCESS,
  NOTICE_DELETE_FAILURE,
  //
  NOTICE_PREVPAGE_REQUEST,
  NOTICE_PREVPAGE_SUCCESS,
  NOTICE_PREVPAGE_FAILURE,
  //
  NOTICE_NEXTPAGE_REQUEST,
  NOTICE_NEXTPAGE_SUCCESS,
  NOTICE_NEXTPAGE_FAILURE,
} from "../reducers/notice";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function noticeListAPI(data) {
  return axios.get(`/api/notice/list/${data.qs}`, data);
}

function* noticeList(action) {
  try {
    const result = yield call(noticeListAPI, action.data);

    yield put({
      type: NOTICE_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function noticeDetailAPI(data) {
  return axios.get(`/api/notice/list/${data.noticeId}`);
}

function* noticeDetail(action) {
  try {
    const result = yield call(noticeDetailAPI, action.data);

    yield put({
      type: NOTICE_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function noticeCreateAPI(data) {
  return axios.post(`/api/notice/create`, data);
}

function* noticeCreate(action) {
  try {
    const result = yield call(noticeCreateAPI, action.data);

    yield put({
      type: NOTICE_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function noticeUpdateAPI(data) {
  return axios.patch(`/api/notice/update`, data);
}

function* noticeUpdate(action) {
  try {
    const result = yield call(noticeUpdateAPI, action.data);

    yield put({
      type: NOTICE_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function noticeDeleteAPI(data) {
  return axios.delete(`/api/notice/delete/${data.noticeId}`);
}

function* noticeDelete(action) {
  try {
    const result = yield call(noticeDeleteAPI, action.data);

    yield put({
      type: NOTICE_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function noticePrevPageAPI(data) {
  return axios.get(`/api/notice/prev/${data.noticeId}`, data);
}

function* noticePrevPage(action) {
  try {
    const result = yield call(noticePrevPageAPI, action.data);

    yield put({
      type: NOTICE_PREVPAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_PREVPAGE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function noticeNextPageAPI(data) {
  return axios.get(`/api/notice/next/${data.noticeId}`, data);
}

function* noticeNextPage(action) {
  try {
    const result = yield call(noticeNextPageAPI, action.data);

    yield put({
      type: NOTICE_NEXTPAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOTICE_NEXTPAGE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchNoticeList() {
  yield takeLatest(NOTICE_LIST_REQUEST, noticeList);
}

function* watchNoticeDetail() {
  yield takeLatest(NOTICE_DETAIL_REQUEST, noticeDetail);
}

function* watchNoticeCreate() {
  yield takeLatest(NOTICE_CREATE_REQUEST, noticeCreate);
}

function* watchNoticeUpdate() {
  yield takeLatest(NOTICE_UPDATE_REQUEST, noticeUpdate);
}

function* watchNoticeDelete() {
  yield takeLatest(NOTICE_DELETE_REQUEST, noticeDelete);
}

function* watchNoticePrevPage() {
  yield takeLatest(NOTICE_PREVPAGE_REQUEST, noticePrevPage);
}

function* watchNoticeNextPage() {
  yield takeLatest(NOTICE_NEXTPAGE_REQUEST, noticeNextPage);
}

//////////////////////////////////////////////////////////////
export default function* noticeSaga() {
  yield all([
    fork(watchNoticeList),
    fork(watchNoticeDetail),
    fork(watchNoticeCreate),
    fork(watchNoticeUpdate),
    fork(watchNoticeDelete),
    fork(watchNoticePrevPage),
    fork(watchNoticeNextPage),
    //
  ]);
}
