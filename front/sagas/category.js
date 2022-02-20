import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILURE,
  //
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAILURE,
  //
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAILURE,
  //
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAILURE,
} from "../reducers/category";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function categoryListAPI() {
  return axios.get(`/api/product/cat/list`);
}

function* categoryList(action) {
  try {
    const result = yield call(categoryListAPI, action.data);

    yield put({
      type: CATEGORY_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CATEGORY_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function categoryCreateAPI(data) {
  return axios.post(`/api/product/cat/create`, data);
}

function* categoryCreate(action) {
  try {
    const result = yield call(categoryCreateAPI, action.data);

    yield put({
      type: CATEGORY_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CATEGORY_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function categoryUpdateAPI(data) {
  return axios.patch(`/api/product/cat/update`, data);
}

function* categoryUpdate(action) {
  try {
    const result = yield call(categoryUpdateAPI, action.data);

    yield put({
      type: CATEGORY_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CATEGORY_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function categoryDeleteAPI(data) {
  return axios.delete(`/api/product/cat/${data.catId}`);
}

function* categoryDelete(action) {
  try {
    const result = yield call(categoryDeleteAPI, action.data);

    yield put({
      type: CATEGORY_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CATEGORY_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchCategoryList() {
  yield takeLatest(CATEGORY_LIST_REQUEST, categoryList);
}

function* watchCategoryCreate() {
  yield takeLatest(CATEGORY_CREATE_REQUEST, categoryCreate);
}

function* watchCategoryUpdate() {
  yield takeLatest(CATEGORY_UPDATE_REQUEST, categoryUpdate);
}

function* watchCategoryDelete() {
  yield takeLatest(CATEGORY_DELETE_REQUEST, categoryDelete);
}

//////////////////////////////////////////////////////////////
export default function* categorySaga() {
  yield all([
    fork(watchCategoryList),
    fork(watchCategoryCreate),
    fork(watchCategoryUpdate),
    fork(watchCategoryDelete),
    //
  ]);
}
