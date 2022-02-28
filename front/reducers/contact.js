import produce from "../util/produce";

export const initailState = {
  contacts: null,
  contactTotal: 0,

  questionPrev: null,
  questionNext: null,

  listMaxPage: 1,
  //
  st_contactLoading: false, // 문의 정보 가져오기
  st_contactDone: false,
  st_contactError: null,
  //
};

export const CONTACT_GET_REQUEST = "CONTACT_GET_REQUEST";
export const CONTACT_GET_SUCCESS = "CONTACT_GET_SUCCESS";
export const CONTACT_GET_FAILURE = "CONTACT_GET_FAILURE";

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

      default:
        break;
    }
  });

export default reducer;
