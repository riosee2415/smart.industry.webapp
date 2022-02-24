import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  MENU_HEADER_LIST_REQUEST,
  MENU_HEADER_LIST_SUCCESS,
  MENU_HEADER_LIST_FAILURE,
  //
  MENU_LIST_REQUEST,
  MENU_LIST_SUCCESS,
  MENU_LIST_FAILURE,
  //
  MENU_CREATE_REQUEST,
  MENU_CREATE_SUCCESS,
  MENU_CREATE_FAILURE,
  //
  MENU_UPDATE_REQUEST,
  MENU_UPDATE_SUCCESS,
  MENU_UPDATE_FAILURE,
  //
  MENU_DELETE_REQUEST,
  MENU_DELETE_SUCCESS,
  MENU_DELETE_FAILURE,
  //
  MENU_UPLOAD_REQUEST,
  MENU_UPLOAD_SUCCESS,
  MENU_UPLOAD_FAILURE,
} from "../reducers/menu";

// // SAGA AREA ********************************************************************************************************
// // ******************************************************************************************************************
// function menuHeaderListAPI() {
//   return axios.get(`/api/menu/list`);
// }

// function* menuHeaderList(action) {
//   try {
//     const result = yield call(menuHeaderListAPI, action.data);

//     yield put({
//       type: MENU_HEADER_LIST_SUCCESS,
//       data: result.data,
//     });
//   } catch (err) {
//     console.error(err);
//     yield put({
//       type: MENU_HEADER_LIST_FAILURE,
//       error: err.response.data,
//     });
//   }
// }

// // ******************************************************************************************************************
// // ******************************************************************************************************************
// // ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function menuListAPI() {
  return axios.get(`/api/menu/list`);
}

function* menuList(action) {
  try {
    const result = yield call(menuListAPI, action.data);

    yield put({
      type: MENU_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MENU_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function menuCreateAPI(data) {
  return axios.post(`/api/menu/create`, data);
}

function* menuCreate(action) {
  try {
    const result = yield call(menuCreateAPI, action.data);

    yield put({
      type: MENU_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MENU_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function menuUpdateAPI(data) {
  return axios.patch(`/api/menu/update`, data);
}

function* menuUpdate(action) {
  try {
    const result = yield call(menuUpdateAPI, action.data);

    yield put({
      type: MENU_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MENU_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function menuDeleteAPI(data) {
  return axios.delete(`/api/menu/delete/${data.menuId}`);
}

function* menuDelete(action) {
  try {
    const result = yield call(menuDeleteAPI, action.data);

    yield put({
      type: MENU_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MENU_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
function menuUploadAPI(data) {
  return axios.post(`/api/menu/image`, data);
}

function* menuUpload(action) {
  try {
    const result = yield call(menuUploadAPI, action.data);

    yield put({
      type: MENU_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MENU_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
// function* watchMenuHeaderList() {
//   yield takeLatest(MENU_HEADER_LIST_REQUEST, menuHeaderList);
// }

function* watchMenuList() {
  yield takeLatest(MENU_LIST_REQUEST, menuList);
}

function* watchMenuCreate() {
  yield takeLatest(MENU_CREATE_REQUEST, menuCreate);
}

function* watchMenuUpdate() {
  yield takeLatest(MENU_UPDATE_REQUEST, menuUpdate);
}

function* watchMenuDelete() {
  yield takeLatest(MENU_DELETE_REQUEST, menuDelete);
}

function* watchMenuImageUpload() {
  yield takeLatest(MENU_UPLOAD_REQUEST, menuUpload);
}

//////////////////////////////////////////////////////////////
export default function* menuSaga() {
  yield all([
    fork(watchMenuList),
    fork(watchMenuCreate),
    fork(watchMenuUpdate),
    fork(watchMenuDelete),
    fork(watchMenuImageUpload),
    //
  ]);
}
