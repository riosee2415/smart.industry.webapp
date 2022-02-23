import produce from "../util/produce";

export const initailState = {
  categoryList: null,

  createModal: false,

  //
  st_categoryListLoading: false, // 카테고리 가져오기
  st_categoryListDone: false,
  st_categoryListError: null,
  //
  st_categoryCreateLoading: false, // 카테고리 가져오기
  st_categoryCreateDone: false,
  st_categoryCreateError: null,
  //
  st_categoryUpdateLoading: false, // 카테고리 업데이트
  st_categoryUpdateDone: false,
  st_categoryUpdateError: null,
  //
  st_categoryDeleteLoading: false, // 카테고리 삭제
  st_categoryDeleteDone: false,
  st_categoryDeleteError: null,
  //
  st_categoryInMenuListLoading: false, // 메뉴 별 카테고리
  st_categoryInMenuListDone: false,
  st_categoryInMenuListError: null,
};

export const CATEGORY_LIST_REQUEST = "CATEGORY_LIST_REQUEST";
export const CATEGORY_LIST_SUCCESS = "CATEGORY_LIST_SUCCESS";
export const CATEGORY_LIST_FAILURE = "CATEGORY_LIST_FAILURE";
//
export const CATEGORY_CREATE_REQUEST = "CATEGORY_CREATE_REQUEST";
export const CATEGORY_CREATE_SUCCESS = "CATEGORY_CREATE_SUCCESS";
export const CATEGORY_CREATE_FAILURE = "CATEGORY_CREATE_FAILURE";
//
export const CATEGORY_UPDATE_REQUEST = "CATEGORY_UPDATE_REQUEST";
export const CATEGORY_UPDATE_SUCCESS = "CATEGORY_UPDATE_SUCCESS";
export const CATEGORY_UPDATE_FAILURE = "CATEGORY_UPDATE_FAILURE";
//
export const CATEGORY_DELETE_REQUEST = "CATEGORY_DELETE_REQUEST";
export const CATEGORY_DELETE_SUCCESS = "CATEGORY_DELETE_SUCCESS";
export const CATEGORY_DELETE_FAILURE = "CATEGORY_DELETE_FAILURE";
//
export const CATEGORY_INMENU_LIST_REQUEST = "CATEGORY_INMENU_LIST_REQUEST";
export const CATEGORY_INMENU_LIST_SUCCESS = "CATEGORY_INMENU_LIST_SUCCESS";
export const CATEGORY_INMENU_LIST_FAILURE = "CATEGORY_INMENU_LIST_FAILURE";
//
export const CREATE_MODAL_TOGGLE = "CREATE_MODAL_TOGGLE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CATEGORY_LIST_REQUEST: {
        draft.st_categoryListLoading = true;
        draft.st_categoryListDone = null;
        draft.st_categoryListError = false;
        break;
      }
      case CATEGORY_LIST_SUCCESS: {
        draft.st_categoryListLoading = false;
        draft.st_categoryListDone = true;
        draft.categoryList = action.data.lists;
        break;
      }
      case CATEGORY_LIST_FAILURE: {
        draft.st_categoryListLoading = false;
        draft.st_categoryListDone = false;
        draft.st_categoryListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case CATEGORY_CREATE_REQUEST: {
        draft.st_categoryCreateLoading = true;
        draft.st_categoryCreateDone = null;
        draft.st_categoryCreateError = false;
        break;
      }
      case CATEGORY_CREATE_SUCCESS: {
        draft.st_categoryCreateLoading = false;
        draft.st_categoryCreateDone = true;
        break;
      }
      case CATEGORY_CREATE_FAILURE: {
        draft.st_categoryCreateLoading = false;
        draft.st_categoryCreateDone = false;
        draft.st_categoryCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case CATEGORY_UPDATE_REQUEST: {
        draft.st_categoryUpdateLoading = true;
        draft.st_categoryUpdateDone = null;
        draft.st_categoryUpdateError = false;
        break;
      }
      case CATEGORY_UPDATE_SUCCESS: {
        draft.st_categoryUpdateLoading = false;
        draft.st_categoryUpdateDone = true;
        break;
      }
      case CATEGORY_UPDATE_FAILURE: {
        draft.st_categoryUpdateLoading = false;
        draft.st_categoryUpdateDone = false;
        draft.st_categoryUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case CATEGORY_DELETE_REQUEST: {
        draft.st_categoryDeleteLoading = true;
        draft.st_categoryDeleteDone = null;
        draft.st_categoryDeleteError = false;
        break;
      }
      case CATEGORY_DELETE_SUCCESS: {
        draft.st_categoryDeleteLoading = false;
        draft.st_categoryDeleteDone = true;
        break;
      }
      case CATEGORY_DELETE_FAILURE: {
        draft.st_categoryDeleteLoading = false;
        draft.st_categoryDeleteDone = false;
        draft.st_categoryDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case CATEGORY_INMENU_LIST_REQUEST: {
        draft.st_categoryInMenuListLoading = true;
        draft.st_categoryInMenuListDone = null;
        draft.st_categoryInMenuListError = false;
        break;
      }
      case CATEGORY_INMENU_LIST_SUCCESS: {
        draft.st_categoryInMenuListLoading = false;
        draft.st_categoryInMenuListDone = true;
        draft.categoryList = action.data.lists;
        break;
      }
      case CATEGORY_INMENU_LIST_FAILURE: {
        draft.st_categoryInMenuListLoading = false;
        draft.st_categoryInMenuListDone = false;
        draft.st_categoryInMenuListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case CREATE_MODAL_TOGGLE: {
        draft.createModal = !draft.createModal;
      }
    }
  });

export default reducer;
