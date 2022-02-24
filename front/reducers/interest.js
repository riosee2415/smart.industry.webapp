import produce from "../util/produce";

export const initailState = {
  interestList: null,

  //
  st_interestListLoading: false, // 관심상품 가져오기
  st_interestListDone: false,
  st_interestListError: null,
  //
  st_interestCreateLoading: false, // 관심상품 가져오기
  st_interestCreateDone: false,
  st_interestCreateError: null,
  //
  st_interestUpdateLoading: false, // 관심상품 업데이트
  st_interestUpdateDone: false,
  st_interestUpdateError: null,
  //
  st_interestDeleteLoading: false, // 관심상품 삭제
  st_interestDeleteDone: false,
  st_interestDeleteError: null,
  //
};

//
export const INTEREST_LIST_REQUEST = "INTEREST_LIST_REQUEST";
export const INTEREST_LIST_SUCCESS = "INTEREST_LIST_SUCCESS";
export const INTEREST_LIST_FAILURE = "INTEREST_LIST_FAILURE";
//
export const INTEREST_CREATE_REQUEST = "INTEREST_CREATE_REQUEST";
export const INTEREST_CREATE_SUCCESS = "INTEREST_CREATE_SUCCESS";
export const INTEREST_CREATE_FAILURE = "INTEREST_CREATE_FAILURE";
//
export const INTEREST_UPDATE_REQUEST = "INTEREST_UPDATE_REQUEST";
export const INTEREST_UPDATE_SUCCESS = "INTEREST_UPDATE_SUCCESS";
export const INTEREST_UPDATE_FAILURE = "INTEREST_UPDATE_FAILURE";
//
export const INTEREST_DELETE_REQUEST = "INTEREST_DELETE_REQUEST";
export const INTEREST_DELETE_SUCCESS = "INTEREST_DELETE_SUCCESS";
export const INTEREST_DELETE_FAILURE = "INTEREST_DELETE_FAILURE";
//

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      ///////////////////////////////////////////////////////
      case INTEREST_LIST_REQUEST: {
        draft.st_interestListLoading = true;
        draft.st_interestListDone = null;
        draft.st_interestListError = false;
        break;
      }
      case INTEREST_LIST_SUCCESS: {
        draft.st_interestListLoading = false;
        draft.st_interestListDone = true;
        draft.interestList = action.data;
        break;
      }
      case INTEREST_LIST_FAILURE: {
        draft.st_interestListLoading = false;
        draft.st_interestListDone = false;
        draft.st_interestListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case INTEREST_CREATE_REQUEST: {
        draft.st_interestCreateLoading = true;
        draft.st_interestCreateDone = null;
        draft.st_interestCreateError = false;
        break;
      }
      case INTEREST_CREATE_SUCCESS: {
        draft.st_interestCreateLoading = false;
        draft.st_interestCreateDone = true;
        break;
      }
      case INTEREST_CREATE_FAILURE: {
        draft.st_interestCreateLoading = false;
        draft.st_interestCreateDone = false;
        draft.st_interestCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case INTEREST_UPDATE_REQUEST: {
        draft.st_interestUpdateLoading = true;
        draft.st_interestUpdateDone = null;
        draft.st_interestUpdateError = false;
        break;
      }
      case INTEREST_UPDATE_SUCCESS: {
        draft.st_interestUpdateLoading = false;
        draft.st_interestUpdateDone = true;
        break;
      }
      case INTEREST_UPDATE_FAILURE: {
        draft.st_interestUpdateLoading = false;
        draft.st_interestUpdateDone = false;
        draft.st_interestUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case INTEREST_DELETE_REQUEST: {
        draft.st_interestDeleteLoading = true;
        draft.st_interestDeleteDone = null;
        draft.st_interestDeleteError = false;
        break;
      }
      case INTEREST_DELETE_SUCCESS: {
        draft.st_interestDeleteLoading = false;
        draft.st_interestDeleteDone = true;
        break;
      }
      case INTEREST_DELETE_FAILURE: {
        draft.st_interestDeleteLoading = false;
        draft.st_interestDeleteDone = false;
        draft.st_interestDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      default:
        break;
    }
  });

export default reducer;
