import produce from "../util/produce";

export const initailState = {
  menuList: null,
  menuImagePath: null,

  headerMenuList: null,

  createModal: false,

  //
  st_menuHeaderListLoading: false, // 메뉴 가져오기
  st_menuHeaderListDone: false,
  st_menuHeaderListError: null,
  //
  st_menuListLoading: false, // 메뉴 가져오기
  st_menuListDone: false,
  st_menuListError: null,
  //
  st_menuCreateLoading: false, // 메뉴 가져오기
  st_menuCreateDone: false,
  st_menuCreateError: null,
  //
  st_menuUpdateLoading: false, // 메뉴 업데이트
  st_menuUpdateDone: false,
  st_menuUpdateError: null,
  //
  st_menuDeleteLoading: false, // 메뉴 삭제
  st_menuDeleteDone: false,
  st_menuDeleteError: null,
  //
  st_menuUploadLoading: false,
  st_menuUploadDone: false,
  st_menuUploadError: null,
};

export const MENU_HEADER_LIST_REQUEST = "MENU_HEADER_LIST_REQUEST";
export const MENU_HEADER_LIST_SUCCESS = "MENU_HEADER_LIST_SUCCESS";
export const MENU_HEADER_LIST_FAILURE = "MENU_HEADER_LIST_FAILURE";
//
export const MENU_LIST_REQUEST = "MENU_LIST_REQUEST";
export const MENU_LIST_SUCCESS = "MENU_LIST_SUCCESS";
export const MENU_LIST_FAILURE = "MENU_LIST_FAILURE";
//
export const MENU_CREATE_REQUEST = "MENU_CREATE_REQUEST";
export const MENU_CREATE_SUCCESS = "MENU_CREATE_SUCCESS";
export const MENU_CREATE_FAILURE = "MENU_CREATE_FAILURE";
//
export const MENU_UPDATE_REQUEST = "MENU_UPDATE_REQUEST";
export const MENU_UPDATE_SUCCESS = "MENU_UPDATE_SUCCESS";
export const MENU_UPDATE_FAILURE = "MENU_UPDATE_FAILURE";
//
export const MENU_DELETE_REQUEST = "MENU_DELETE_REQUEST";
export const MENU_DELETE_SUCCESS = "MENU_DELETE_SUCCESS";
export const MENU_DELETE_FAILURE = "MENU_DELETE_FAILURE";
//
export const MENU_UPLOAD_REQUEST = "MENU_UPLOAD_REQUEST";
export const MENU_UPLOAD_SUCCESS = "MENU_UPLOAD_SUCCESS";
export const MENU_UPLOAD_FAILURE = "MENU_UPLOAD_FAILURE";
//
export const CREATE_MODAL_TOGGLE = "CREATE_MODAL_TOGGLE";

export const MENU_IMAGE_PATH = "MENU_IMAGE_PATH";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case MENU_HEADER_LIST_REQUEST: {
        draft.st_menuHeaderListLoading = true;
        draft.st_menuHeaderListDone = null;
        draft.st_menuHeaderListError = false;
        break;
      }
      case MENU_HEADER_LIST_SUCCESS: {
        draft.st_menuHeaderListLoading = false;
        draft.st_menuHeaderListDone = true;
        draft.headerMenuList = action.data;
        break;
      }
      case MENU_HEADER_LIST_FAILURE: {
        draft.st_menuHeaderListLoading = false;
        draft.st_menuHeaderListDone = false;
        draft.st_menuHeaderListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case MENU_LIST_REQUEST: {
        draft.st_menuListLoading = true;
        draft.st_menuListDone = null;
        draft.st_menuListError = false;
        break;
      }
      case MENU_LIST_SUCCESS: {
        draft.st_menuListLoading = false;
        draft.st_menuListDone = true;
        draft.menuList = action.data.lists;
        break;
      }
      case MENU_LIST_FAILURE: {
        draft.st_menuListLoading = false;
        draft.st_menuListDone = false;
        draft.st_menuListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case MENU_CREATE_REQUEST: {
        draft.st_menuCreateLoading = true;
        draft.st_menuCreateDone = null;
        draft.st_menuCreateError = false;
        break;
      }
      case MENU_CREATE_SUCCESS: {
        draft.st_menuCreateLoading = false;
        draft.st_menuCreateDone = true;
        break;
      }
      case MENU_CREATE_FAILURE: {
        draft.st_menuCreateLoading = false;
        draft.st_menuCreateDone = false;
        draft.st_menuCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case MENU_UPDATE_REQUEST: {
        draft.st_menuUpdateLoading = true;
        draft.st_menuUpdateDone = null;
        draft.st_menuUpdateError = false;
        break;
      }
      case MENU_UPDATE_SUCCESS: {
        draft.st_menuUpdateLoading = false;
        draft.st_menuUpdateDone = true;
        break;
      }
      case MENU_UPDATE_FAILURE: {
        draft.st_menuUpdateLoading = false;
        draft.st_menuUpdateDone = false;
        draft.st_menuUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case MENU_DELETE_REQUEST: {
        draft.st_menuDeleteLoading = true;
        draft.st_menuDeleteDone = null;
        draft.st_menuDeleteError = false;
        break;
      }
      case MENU_DELETE_SUCCESS: {
        draft.st_menuDeleteLoading = false;
        draft.st_menuDeleteDone = true;
        break;
      }
      case MENU_DELETE_FAILURE: {
        draft.st_menuDeleteLoading = false;
        draft.st_menuDeleteDone = false;
        draft.st_menuDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case MENU_UPLOAD_REQUEST: {
        draft.st_menuUploadLoading = true;
        draft.st_menuUploadDone = null;
        draft.st_menuUploadError = false;
        break;
      }
      case MENU_UPLOAD_SUCCESS: {
        draft.st_menuUploadLoading = false;
        draft.st_menuUploadDone = true;
        draft.menuImagePath = action.data.path;
        break;
      }
      case MENU_UPLOAD_FAILURE: {
        draft.st_menuUploadLoading = false;
        draft.st_menuUploadDone = false;
        draft.st_menuUploadError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case CREATE_MODAL_TOGGLE: {
        draft.createModal = !draft.createModal;
      }

      case MENU_IMAGE_PATH: {
        draft.menuImagePath = action.data;
      }

      default:
        break;
    }
  });

export default reducer;
