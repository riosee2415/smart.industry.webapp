import produce from "../util/produce";

export const initailState = {
  contacts: null,
  contactTotal: 0,
  detailContact: null,

  questionPrev: null,
  questionNext: null,

  listMaxPage: 1,
  //
  st_contactLoading: false, // 문의 정보 가져오기
  st_contactDone: false,
  st_contactError: null,
  //
  st_contactDetailLoading: false, // 문의 상세 가져오기
  st_contactDetailDone: false,
  st_contactDetailError: null,
  //
};

export const CONTACT_GET_REQUEST = "CONTACT_GET_REQUEST";
export const CONTACT_GET_SUCCESS = "CONTACT_GET_SUCCESS";
export const CONTACT_GET_FAILURE = "CONTACT_GET_FAILURE";

export const CONTACT_DETAIL_REQUEST = "CONTACT_DETAIL_REQUEST";
export const CONTACT_DETAIL_SUCCESS = "CONTACT_DETAIL_SUCCESS";
export const CONTACT_DETAIL_FAILURE = "CONTACT_DETAIL_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CONTACT_GET_REQUEST: {
        draft.st_contactLoading = true;
        draft.st_contactDone = null;
        draft.st_contactError = false;
        break;
      }
      case CONTACT_GET_SUCCESS: {
        draft.st_contactLoading = false;
        draft.st_contactDone = true;
        draft.contacts = action.data.lists;
        draft.listMaxPage = action.data.lastPage;
        draft.contactTotal = action.data.leaseLen;
        break;
      }
      case CONTACT_GET_FAILURE: {
        draft.st_contactLoading = false;
        draft.st_contactDone = false;
        draft.st_contactError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case CONTACT_DETAIL_REQUEST: {
        draft.st_contactDetailLoading = true;
        draft.st_contactDetailDone = null;
        draft.st_contactDetailError = false;
        break;
      }
      case CONTACT_DETAIL_SUCCESS: {
        draft.st_contactDetailLoading = false;
        draft.st_contactDetailDone = true;
        draft.detailContact = action.data;
        break;
      }
      case CONTACT_DETAIL_FAILURE: {
        draft.st_contactDetailLoading = false;
        draft.st_contactDetailDone = false;
        draft.st_contactDetailError = action.error;
        break;
      }
      default:
        break;
    }
  });

export default reducer;
