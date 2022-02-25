import produce from "../util/produce";

export const initailState = {
  historyId: null,

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

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
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
