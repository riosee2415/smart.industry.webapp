import produce from "../util/produce";

export const initailState = {
  boughtHistorys: null,
  delivery: null,
  boughtHistoryDetail: null,
  deliveryDetail: null,

  historyId: null,

  st_wishListLoading: false, // 구매 리스트
  st_wishListDone: false,
  st_wishListError: null,
  //
  st_wishListDetailLoading: false, // 구매 디테일 리스트
  st_wishListDetailDone: false,
  st_wishListDetailError: null,
  //
  st_boughtHistoryCreateLoading: false, // 구매 내역 만들기
  st_boughtHistoryCreateDone: false,
  st_boughtHistoryCreateError: null,
  //
  st_boughtHistoryNotUserCreateLoading: false, // 비회원 구매 내역 만들기
  st_boughtHistoryNotUserCreateDone: false,
  st_boughtHistoryNotUserCreateError: null,
  //
  st_boughtHistoryWishCreateLoading: false, // 비회원 구매 내역 만들기
  st_boughtHistoryWishCreateDone: false,
  st_boughtHistoryWishCreateError: null,

  //
};

export const WISH_CREATE_REQUEST = "WISH_CREATE_REQUEST";
export const WISH_CREATE_SUCCESS = "WISH_CREATE_SUCCESS";
export const WISH_CREATE_FAILURE = "WISH_CREATE_FAILURE";

export const WISH_CREATE_NOT_USER_REQUEST = "WISH_CREATE_NOT_USER_REQUEST";
export const WISH_CREATE_NOT_USER_SUCCESS = "WISH_CREATE_NOT_USER_SUCCESS";
export const WISH_CREATE_NOT_USER_FAILURE = "WISH_CREATE_NOT_USER_FAILURE";

export const WISH_WISH_CREATE_REQUEST = "WISH_WISH_CREATE_REQUEST";
export const WISH_WISH_CREATE_SUCCESS = "WISH_WISH_CREATE_SUCCESS";
export const WISH_WISH_CREATE_FAILURE = "WISH_WISH_CREATE_FAILURE";

export const WISH_LIST_REQUEST = "WISH_LIST_REQUEST";
export const WISH_LIST_SUCCESS = "WISH_LIST_SUCCESS";
export const WISH_LIST_FAILURE = "WISH_LIST_FAILURE";

export const WISH_LIST_DETAIL_REQUEST = "WISH_LIST_DETAIL_REQUEST";
export const WISH_LIST_DETAIL_SUCCESS = "WISH_LIST_DETAIL_SUCCESS";
export const WISH_LIST_DETAIL_FAILURE = "WISH_LIST_DETAIL_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      ///////////////////////////////////////////////////////
      case WISH_LIST_REQUEST: {
        draft.st_wishListLoading = true;
        draft.st_wishListDone = null;
        draft.st_wishListError = false;
        break;
      }
      case WISH_LIST_SUCCESS: {
        draft.st_wishListLoading = false;
        draft.st_wishListDone = true;
        draft.boughtHistorys = action.data.boughtHistorys;
        draft.delivery = action.data.delivery;
        break;
      }
      case WISH_LIST_FAILURE: {
        draft.st_wishListLoading = false;
        draft.st_wishListDone = false;
        draft.st_wishListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case WISH_LIST_DETAIL_REQUEST: {
        draft.st_boughtHistoryCreateLoading = true;
        draft.st_boughtHistoryCreateDone = null;
        draft.st_boughtHistoryCreateError = false;
        break;
      }
      case WISH_LIST_DETAIL_SUCCESS: {
        draft.st_boughtHistoryCreateLoading = false;
        draft.st_boughtHistoryCreateDone = true;
        draft.boughtHistoryDetail = action.data.boughtHistorys;
        draft.deliveryDetail = action.data.delivery;

        break;
      }
      case WISH_LIST_DETAIL_FAILURE: {
        draft.st_boughtHistoryCreateLoading = false;
        draft.st_boughtHistoryCreateDone = false;
        draft.st_boughtHistoryCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case WISH_CREATE_REQUEST: {
        draft.st_boughtHistoryCreateLoading = true;
        draft.st_boughtHistoryCreateDone = null;
        draft.st_boughtHistoryCreateError = false;
        break;
      }
      case WISH_CREATE_SUCCESS: {
        draft.st_boughtHistoryCreateLoading = false;
        draft.st_boughtHistoryCreateDone = true;
        draft.historyId = action.data.id;
        break;
      }
      case WISH_CREATE_FAILURE: {
        draft.st_boughtHistoryCreateLoading = false;
        draft.st_boughtHistoryCreateDone = false;
        draft.st_boughtHistoryCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case WISH_CREATE_NOT_USER_REQUEST: {
        draft.st_boughtHistoryNotUserCreateLoading = true;
        draft.st_boughtHistoryNotUserCreateDone = null;
        draft.st_boughtHistoryNotUserCreateError = false;
        break;
      }
      case WISH_CREATE_NOT_USER_SUCCESS: {
        draft.st_boughtHistoryNotUserCreateLoading = false;
        draft.st_boughtHistoryNotUserCreateDone = true;
        draft.historyId = action.data.id;
        break;
      }
      case WISH_CREATE_NOT_USER_FAILURE: {
        draft.st_boughtHistoryNotUserCreateLoading = false;
        draft.st_boughtHistoryNotUserCreateDone = false;
        draft.st_boughtHistoryNotUserCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case WISH_WISH_CREATE_REQUEST:
        draft.st_boughtHistoryWishFinishLoading = true;
        draft.st_boughtHistoryWishFinishDone = null;
        draft.st_boughtHistoryWishFinishError = false;
        break;

      case WISH_WISH_CREATE_SUCCESS:
        draft.st_boughtHistoryWishFinishLoading = false;
        draft.st_boughtHistoryWishFinishDone = true;
        break;

      case WISH_WISH_CREATE_FAILURE:
        draft.st_boughtHistoryWishFinishLoading = false;
        draft.st_boughtHistoryWishFinishDone = false;
        draft.st_boughtHistoryNotUserCreateError = action.error;
        break;

      ///////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
