import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  //
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILURE,
  //
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAILURE,
  //
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  //
  PRODUCT_UPLOAD_REQUEST,
  PRODUCT_UPLOAD_SUCCESS,
  PRODUCT_UPLOAD_FAILURE,
  //
  PRODUCT_DETAIL_UPLOAD_REQUEST,
  PRODUCT_DETAIL_UPLOAD_SUCCESS,
  PRODUCT_DETAIL_UPLOAD_FAILURE,
  //
  PRODUCT_CREATE_IMAGE_REQUEST,
  PRODUCT_CREATE_IMAGE_SUCCESS,
  PRODUCT_CREATE_IMAGE_FAILURE,
  //
  PRODUCT_LIST_IMAGE_REQUEST,
  PRODUCT_LIST_IMAGE_SUCCESS,
  PRODUCT_LIST_IMAGE_FAILURE,
} from "../reducers/product";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function productListAPI(data) {
  return axios.post(`/api/product/list`, data);
}

function* productList(action) {
  try {
    const result = yield call(productListAPI, action.data);

    yield put({
      type: PRODUCT_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: PRODUCT_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function productCreateAPI(data) {
  return axios.post(`/api/product/create`, data);
}

function* productCreate(action) {
  try {
    const result = yield call(productCreateAPI, action.data);

    yield put({
      type: PRODUCT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: PRODUCT_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function productUpdateAPI(data) {
  return axios.patch(`/api/product/update`, data);
}

function* productUpdate(action) {
  try {
    const result = yield call(productUpdateAPI, action.data);

    yield put({
      type: PRODUCT_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: PRODUCT_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function productDeleteAPI(data) {
  return axios.delete(`/api/product/delete/${data.productId}`);
}

function* productDelete(action) {
  try {
    const result = yield call(productDeleteAPI, action.data);

    yield put({
      type: PRODUCT_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: PRODUCT_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function productUploadAPI(data) {
  return axios.post(`/api/product/image`, data);
}

function* productUpload(action) {
  try {
    const result = yield call(productUploadAPI, action.data);

    yield put({
      type: PRODUCT_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: PRODUCT_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function productDetailUploadAPI(data) {
  return axios.post(`/api/product/image`, data);
}

function* productDetailUpload(action) {
  try {
    const result = yield call(productDetailUploadAPI, action.data);

    yield put({
      type: PRODUCT_DETAIL_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: PRODUCT_DETAIL_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function productListImageAPI(data) {
  return axios.post(`/api/product/image/list`, data);
}

function* productListImage(action) {
  try {
    const result = yield call(productListImageAPI, action.data);

    yield put({
      type: PRODUCT_LIST_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: PRODUCT_LIST_IMAGE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function productCreateImageAPI(data) {
  return axios.post(`/api/product/image/create`, data);
}

function* productCreateImage(action) {
  try {
    const result = yield call(productCreateImageAPI, action.data);

    yield put({
      type: PRODUCT_CREATE_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: PRODUCT_CREATE_IMAGE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchProductList() {
  yield takeLatest(PRODUCT_LIST_REQUEST, productList);
}

function* watchProductCreate() {
  yield takeLatest(PRODUCT_CREATE_REQUEST, productCreate);
}

function* watchProductUpdate() {
  yield takeLatest(PRODUCT_UPDATE_REQUEST, productUpdate);
}

function* watchProductDelete() {
  yield takeLatest(PRODUCT_DELETE_REQUEST, productDelete);
}

function* watchProductImageUpload() {
  yield takeLatest(PRODUCT_UPLOAD_REQUEST, productUpload);
}

function* watchProductDetailImageUpload() {
  yield takeLatest(PRODUCT_DETAIL_UPLOAD_REQUEST, productDetailUpload);
}

function* watchProductCreateImage() {
  yield takeLatest(PRODUCT_CREATE_IMAGE_REQUEST, productCreateImage);
}

function* watchProductListImage() {
  yield takeLatest(PRODUCT_LIST_IMAGE_REQUEST, productListImage);
}

//////////////////////////////////////////////////////////////
export default function* menuSaga() {
  yield all([
    fork(watchProductList),
    fork(watchProductCreate),
    fork(watchProductUpdate),
    fork(watchProductDelete),
    fork(watchProductImageUpload),
    fork(watchProductDetailImageUpload),
    fork(watchProductCreateImage),
    fork(watchProductListImage),
    //
  ]);
}
