import produce from "../util/produce";

export const initailState = {
  reviewList: null,
  maxPage: 1,

  productReivewList: null,

  reviewImagePath: null,

  createModal: false,

  //
  st_reviewProductListLoading: false, // 상품 후기 가져오기
  st_reviewProductListDone: false,
  st_reviewProductListError: null,
  //
  st_reviewListLoading: false, // 후기 가져오기
  st_reviewListDone: false,
  st_reviewListError: null,
  //
  st_reviewCreateLoading: false, // 후기 작성하기
  st_reviewCreateDone: false,
  st_reviewCreateError: null,
  //
  st_reviewNotUserCreateLoading: false, // 비회원 후기 작성하기
  st_reviewNotUserCreateDone: false,
  st_reviewNotUserCreateError: null,
  //
  st_reviewUpdateLoading: false, // 후기 업데이트
  st_reviewUpdateDone: false,
  st_reviewUpdateError: null,
  //
  st_reviewDeleteLoading: false, // 후기 삭제
  st_reviewDeleteDone: false,
  st_reviewDeleteError: null,
  //
  st_reviewHitLoading: false,
  st_reviewHitDone: false,
  st_reviewHitError: null,
  //
  st_reviewUploadLoading: false,
  st_reviewUploadDone: false,
  st_reviewUploadError: null,
};

export const REVIEW_PRODUCT_LIST_REQUEST = "REVIEW_PRODUCT_LIST_REQUEST";
export const REVIEW_PRODUCT_LIST_SUCCESS = "REVIEW_PRODUCT_LIST_SUCCESS";
export const REVIEW_PRODUCT_LIST_FAILURE = "REVIEW_PRODUCT_LIST_FAILURE";
//
export const REVIEW_LIST_REQUEST = "REVIEW_LIST_REQUEST";
export const REVIEW_LIST_SUCCESS = "REVIEW_LIST_SUCCESS";
export const REVIEW_LIST_FAILURE = "REVIEW_LIST_FAILURE";
//
export const REVIEW_CREATE_REQUEST = "REVIEW_CREATE_REQUEST";
export const REVIEW_CREATE_SUCCESS = "REVIEW_CREATE_SUCCESS";
export const REVIEW_CREATE_FAILURE = "REVIEW_CREATE_FAILURE";
//
export const REVIEW_NOTUSER_CREATE_REQUEST = "REVIEW_NOTUSER_CREATE_REQUEST";
export const REVIEW_NOTUSER_CREATE_SUCCESS = "REVIEW_NOTUSER_CREATE_SUCCESS";
export const REVIEW_NOTUSER_CREATE_FAILURE = "REVIEW_NOTUSER_CREATE_FAILURE";
//
export const REVIEW_UPDATE_REQUEST = "REVIEW_UPDATE_REQUEST";
export const REVIEW_UPDATE_SUCCESS = "REVIEW_UPDATE_SUCCESS";
export const REVIEW_UPDATE_FAILURE = "REVIEW_UPDATE_FAILURE";
//
export const REVIEW_DELETE_REQUEST = "REVIEW_DELETE_REQUEST";
export const REVIEW_DELETE_SUCCESS = "REVIEW_DELETE_SUCCESS";
export const REVIEW_DELETE_FAILURE = "REVIEW_DELETE_FAILURE";
//
export const REVIEW_HIT_REQUEST = "REVIEW_HIT_REQUEST";
export const REVIEW_HIT_SUCCESS = "REVIEW_HIT_SUCCESS";
export const REVIEW_HIT_FAILURE = "REVIEW_HIT_FAILURE";
//
export const REVIEW_UPLOAD_REQUEST = "REVIEW_UPLOAD_REQUEST";
export const REVIEW_UPLOAD_SUCCESS = "REVIEW_UPLOAD_SUCCESS";
export const REVIEW_UPLOAD_FAILURE = "REVIEW_UPLOAD_FAILURE";
//
export const CREATE_MODAL_TOGGLE = "CREATE_MODAL_TOGGLE";

export const RESET_REVIEW_REQUES = "RESET_REVIEW_REQUES";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REVIEW_PRODUCT_LIST_REQUEST: {
        draft.st_reviewProductListLoading = true;
        draft.st_reviewProductListDone = null;
        draft.st_reviewProductListError = false;
        break;
      }
      case REVIEW_PRODUCT_LIST_SUCCESS: {
        draft.st_reviewProductListLoading = false;
        draft.st_reviewProductListDone = true;
        draft.productReivewList = action.data;
        break;
      }
      case REVIEW_PRODUCT_LIST_FAILURE: {
        draft.st_reviewProductListLoading = false;
        draft.st_reviewProductListDone = false;
        draft.st_reviewProductListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case REVIEW_LIST_REQUEST: {
        draft.st_reviewListLoading = true;
        draft.st_reviewListDone = null;
        draft.st_reviewListError = false;
        break;
      }
      case REVIEW_LIST_SUCCESS: {
        draft.st_reviewListLoading = false;
        draft.st_reviewListDone = true;
        draft.reviewList = action.data.reviews;
        draft.maxPage = action.data.lastPage;
        break;
      }
      case REVIEW_LIST_FAILURE: {
        draft.st_reviewListLoading = false;
        draft.st_reviewListDone = false;
        draft.st_reviewListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case REVIEW_CREATE_REQUEST: {
        draft.st_reviewCreateLoading = true;
        draft.st_reviewCreateDone = null;
        draft.st_reviewCreateError = false;
        break;
      }
      case REVIEW_CREATE_SUCCESS: {
        draft.st_reviewCreateLoading = false;
        draft.st_reviewCreateDone = true;
        draft.reviewImagePath = null;
        break;
      }
      case REVIEW_CREATE_FAILURE: {
        draft.st_reviewCreateLoading = false;
        draft.st_reviewCreateDone = false;
        draft.st_reviewCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case REVIEW_NOTUSER_CREATE_REQUEST: {
        draft.st_reviewNotUserCreateLoading = true;
        draft.st_reviewNotUserCreateDone = null;
        draft.st_reviewNotUserCreateError = false;
        break;
      }
      case REVIEW_NOTUSER_CREATE_SUCCESS: {
        draft.st_reviewNotUserCreateLoading = false;
        draft.st_reviewNotUserCreateDone = true;
        draft.reviewImagePath = null;
        break;
      }
      case REVIEW_NOTUSER_CREATE_FAILURE: {
        draft.st_reviewNotUserCreateLoading = false;
        draft.st_reviewNotUserCreateDone = false;
        draft.st_reviewNotUserCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case REVIEW_UPDATE_REQUEST: {
        draft.st_reviewUpdateLoading = true;
        draft.st_reviewUpdateDone = null;
        draft.st_reviewUpdateError = false;
        break;
      }
      case REVIEW_UPDATE_SUCCESS: {
        draft.st_reviewUpdateLoading = false;
        draft.st_reviewUpdateDone = true;
        break;
      }
      case REVIEW_UPDATE_FAILURE: {
        draft.st_reviewUpdateLoading = false;
        draft.st_reviewUpdateDone = false;
        draft.st_reviewUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case REVIEW_DELETE_REQUEST: {
        draft.st_reviewDeleteLoading = true;
        draft.st_reviewDeleteDone = null;
        draft.st_reviewDeleteError = false;
        break;
      }
      case REVIEW_DELETE_SUCCESS: {
        draft.st_reviewDeleteLoading = false;
        draft.st_reviewDeleteDone = true;
        break;
      }
      case REVIEW_DELETE_FAILURE: {
        draft.st_reviewDeleteLoading = false;
        draft.st_reviewDeleteDone = false;
        draft.st_reviewDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case REVIEW_HIT_REQUEST: {
        draft.st_reviewHitLoading = true;
        draft.st_reviewHitDone = null;
        draft.st_reviewHitError = false;
        break;
      }
      case REVIEW_HIT_SUCCESS: {
        draft.st_reviewHitLoading = false;
        draft.st_reviewHitDone = true;
        break;
      }
      case REVIEW_HIT_FAILURE: {
        draft.st_reviewHitLoading = false;
        draft.st_reviewHitDone = false;
        draft.st_reviewHitError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case REVIEW_UPLOAD_REQUEST: {
        draft.st_reviewUploadLoading = true;
        draft.st_reviewUploadDone = null;
        draft.st_reviewUploadError = false;
        break;
      }
      case REVIEW_UPLOAD_SUCCESS: {
        draft.st_reviewUploadLoading = false;
        draft.st_reviewUploadDone = true;
        draft.reviewImagePath = action.data.path;
        break;
      }
      case REVIEW_UPLOAD_FAILURE: {
        draft.st_reviewUploadLoading = false;
        draft.st_reviewUploadDone = false;
        draft.st_reviewUploadError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case CREATE_MODAL_TOGGLE: {
        draft.createModal = !draft.createModal;
        break;
      }

      case RESET_REVIEW_REQUES: {
        draft.reviewImagePath = null;
        draft.st_reviewCreateDone = false;
        draft.st_reviewNotUserCreateDone = false;
        break;
      }

      default:
        break;
    }
  });

export default reducer;
