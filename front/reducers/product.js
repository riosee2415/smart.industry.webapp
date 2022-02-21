import produce from "../util/produce";

export const initailState = {
  productList: null,
  maxPage: 1,
  totalProduct: 0,

  productImagePath: null,

  createModal: false,

  //
  st_productListLoading: false, // 상품 가져오기
  st_productListDone: false,
  st_productListError: null,
  //
  st_productCreateLoading: false, // 상품 가져오기
  st_productCreateDone: false,
  st_productCreateError: null,
  //
  st_productUpdateLoading: false, // 상품 업데이트
  st_productUpdateDone: false,
  st_productUpdateError: null,
  //
  st_productDeleteLoading: false, // 상품 삭제
  st_productDeleteDone: false,
  st_productDeleteError: null,
  //
  st_productUploadLoading: false,
  st_productUploadDone: false,
  st_productUploadError: null,
};

export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAILURE = "PRODUCT_LIST_FAILURE";
//
export const PRODUCT_CREATE_REQUEST = "PRODUCT_CREATE_REQUEST";
export const PRODUCT_CREATE_SUCCESS = "PRODUCT_CREATE_SUCCESS";
export const PRODUCT_CREATE_FAILURE = "PRODUCT_CREATE_FAILURE";
//
export const PRODUCT_UPDATE_REQUEST = "PRODUCT_UPDATE_REQUEST";
export const PRODUCT_UPDATE_SUCCESS = "PRODUCT_UPDATE_SUCCESS";
export const PRODUCT_UPDATE_FAILURE = "PRODUCT_UPDATE_FAILURE";
//
export const PRODUCT_DELETE_REQUEST = "PRODUCT_DELETE_REQUEST";
export const PRODUCT_DELETE_SUCCESS = "PRODUCT_DELETE_SUCCESS";
export const PRODUCT_DELETE_FAILURE = "PRODUCT_DELETE_FAILURE";
//
export const PRODUCT_UPLOAD_REQUEST = "PRODUCT_UPLOAD_REQUEST";
export const PRODUCT_UPLOAD_SUCCESS = "PRODUCT_UPLOAD_SUCCESS";
export const PRODUCT_UPLOAD_FAILURE = "PRODUCT_UPLOAD_FAILURE";
//
export const CREATE_MODAL_TOGGLE = "CREATE_MODAL_TOGGLE";

export const PRODUCT_IMAGE_PATH = "PRODUCT_IMAGE_PATH";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case PRODUCT_LIST_REQUEST: {
        draft.st_productListLoading = true;
        draft.st_productListDone = null;
        draft.st_productListError = false;
        break;
      }
      case PRODUCT_LIST_SUCCESS: {
        draft.st_productListLoading = false;
        draft.st_productListDone = true;
        draft.productList = action.data.lists;
        draft.maxPage = action.data.lastPage;
        draft.totalProduct = action.data.noticeLen;
        break;
      }
      case PRODUCT_LIST_FAILURE: {
        draft.st_productListLoading = false;
        draft.st_productListDone = false;
        draft.st_productListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case PRODUCT_CREATE_REQUEST: {
        draft.st_productCreateLoading = true;
        draft.st_productCreateDone = null;
        draft.st_productCreateError = false;
        break;
      }
      case PRODUCT_CREATE_SUCCESS: {
        draft.st_productCreateLoading = false;
        draft.st_productCreateDone = true;
        break;
      }
      case PRODUCT_CREATE_FAILURE: {
        draft.st_productCreateLoading = false;
        draft.st_productCreateDone = false;
        draft.st_productCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case PRODUCT_UPDATE_REQUEST: {
        draft.st_productUpdateLoading = true;
        draft.st_productUpdateDone = null;
        draft.st_productUpdateError = false;
        break;
      }
      case PRODUCT_UPDATE_SUCCESS: {
        draft.st_productUpdateLoading = false;
        draft.st_productUpdateDone = true;
        break;
      }
      case PRODUCT_UPDATE_FAILURE: {
        draft.st_productUpdateLoading = false;
        draft.st_productUpdateDone = false;
        draft.st_productUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case PRODUCT_DELETE_REQUEST: {
        draft.st_productDeleteLoading = true;
        draft.st_productDeleteDone = null;
        draft.st_productDeleteError = false;
        break;
      }
      case PRODUCT_DELETE_SUCCESS: {
        draft.st_productDeleteLoading = false;
        draft.st_productDeleteDone = true;
        break;
      }
      case PRODUCT_DELETE_FAILURE: {
        draft.st_productDeleteLoading = false;
        draft.st_productDeleteDone = false;
        draft.st_productDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case PRODUCT_UPLOAD_REQUEST: {
        draft.st_productUploadLoading = true;
        draft.st_productUploadDone = null;
        draft.st_productUploadError = false;
        break;
      }
      case PRODUCT_UPLOAD_SUCCESS: {
        draft.st_productUploadLoading = false;
        draft.st_productUploadDone = true;
        draft.productImagePath = action.data.path;
        break;
      }
      case PRODUCT_UPLOAD_FAILURE: {
        draft.st_productUploadLoading = false;
        draft.st_productUploadDone = false;
        draft.st_productUploadError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case CREATE_MODAL_TOGGLE: {
        draft.createModal = !draft.createModal;
      }

      case PRODUCT_IMAGE_PATH: {
        draft.productImagePath = action.data;
      }
    }
  });

export default reducer;
