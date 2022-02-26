import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  REVIEW_PRODUCT_LIST_REQUEST,
  REVIEW_PRODUCT_LIST_SUCCESS,
  REVIEW_PRODUCT_LIST_FAILURE,
  //
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_LIST_FAILURE,
  //
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAILURE,
  //
  REVIEW_NOTUSER_CREATE_REQUEST,
  REVIEW_NOTUSER_CREATE_SUCCESS,
  REVIEW_NOTUSER_CREATE_FAILURE,
  //
  REVIEW_UPDATE_REQUEST,
  REVIEW_UPDATE_SUCCESS,
  REVIEW_UPDATE_FAILURE,
  //
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_SUCCESS,
  REVIEW_DELETE_FAILURE,
  //
  REVIEW_HIT_REQUEST,
  REVIEW_HIT_SUCCESS,
  REVIEW_HIT_FAILURE,
  //
  REVIEW_UPLOAD_REQUEST,
  REVIEW_UPLOAD_SUCCESS,
  REVIEW_UPLOAD_FAILURE,
} from "../reducers/review";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function reviewProductListAPI(data) {
  return axios.get(`/api/review/product/list?ProductId=${data.ProductId}`);
}

function* reviewProductList(action) {
  try {
    const result = yield call(reviewProductListAPI, action.data);

    yield put({
      type: REVIEW_PRODUCT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_PRODUCT_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function reviewListAPI() {
  return axios.get(`/api/review/list`);
}

function* reviewList(action) {
  try {
    const result = yield call(reviewListAPI, action.data);

    yield put({
      type: REVIEW_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function reviewCreateAPI(data) {
  return axios.post(`/api/review/create`, data);
}

function* reviewCreate(action) {
  try {
    const result = yield call(reviewCreateAPI, action.data);

    yield put({
      type: REVIEW_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function reviewNotUserCreateAPI(data) {
  return axios.post(`/api/review/notUser/Create`, data);
}

function* reviewNotUserCreate(action) {
  try {
    const result = yield call(reviewNotUserCreateAPI, action.data);

    yield put({
      type: REVIEW_NOTUSER_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_NOTUSER_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function reviewUpdateAPI(data) {
  return axios.patch(`/api/review/update`, data);
}

function* reviewUpdate(action) {
  try {
    const result = yield call(reviewUpdateAPI, action.data);

    yield put({
      type: REVIEW_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function reviewDeleteAPI(data) {
  return axios.delete(`/api/review/delete/${data.reviewId}`);
}

function* reviewDelete(action) {
  try {
    const result = yield call(reviewDeleteAPI, action.data);

    yield put({
      type: REVIEW_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function reviewHitAPI(data) {
  return axios.patch(`/api/review/hit/update`, data);
}

function* reviewHit(action) {
  try {
    const result = yield call(reviewHitAPI, action.data);

    yield put({
      type: REVIEW_HIT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_HIT_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function reviewImageAPI(data) {
  return axios.post(`/api/review/image`, data);
}

function* reviewImage(action) {
  try {
    const result = yield call(reviewImageAPI, action.data);

    yield put({
      type: REVIEW_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REVIEW_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchReviewProductList() {
  yield takeLatest(REVIEW_PRODUCT_LIST_REQUEST, reviewProductList);
}

function* watchReviewList() {
  yield takeLatest(REVIEW_LIST_REQUEST, reviewList);
}

function* watchReviewCreate() {
  yield takeLatest(REVIEW_CREATE_REQUEST, reviewCreate);
}

function* watchReviewNotUserCreate() {
  yield takeLatest(REVIEW_NOTUSER_CREATE_REQUEST, reviewNotUserCreate);
}

function* watchReviewUpdate() {
  yield takeLatest(REVIEW_UPDATE_REQUEST, reviewUpdate);
}

function* watchReviewDelete() {
  yield takeLatest(REVIEW_DELETE_REQUEST, reviewDelete);
}

function* watchReviewHit() {
  yield takeLatest(REVIEW_HIT_REQUEST, reviewHit);
}

function* watchReviewImage() {
  yield takeLatest(REVIEW_UPLOAD_REQUEST, reviewImage);
}

//////////////////////////////////////////////////////////////
export default function* menuSaga() {
  yield all([
    fork(watchReviewProductList),
    fork(watchReviewList),
    fork(watchReviewCreate),
    fork(watchReviewNotUserCreate),
    fork(watchReviewUpdate),
    fork(watchReviewDelete),
    fork(watchReviewHit),
    fork(watchReviewImage),
    //
  ]);
}
