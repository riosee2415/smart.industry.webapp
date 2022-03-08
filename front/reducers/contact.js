import produce from "../util/produce";

export const initailState = {
  contacts: null,
  contactTotal: 0,
  listMaxPage: 1,
  detailContact: null,

  questionPrev: null,
  questionNext: null,

  createModal: false,
  //
  st_contactLoading: false, // 문의 정보 가져오기
  st_contactDone: false,
  st_contactError: null,
  //
  st_contactDetailLoading: false, // 문의 상세 가져오기
  st_contactDetailDone: false,
  st_contactDetailError: null,
  //
  st_contactCreateLoading: false, // 문의 생성하기
  st_contactCreateDone: false,
  st_contactCreateError: null,
  //
  st_contactCompletedLoading: false, // 문의 처리완료
  st_contactCompletedDone: false,
  st_contactCompletedError: null,
  //
  st_contactDeleteLoading: false, // 문의 삭제
  st_contactDeleteDone: false,
  st_contactDeleteError: null,
  //
};

export const CONTACT_GET_REQUEST = "CONTACT_GET_REQUEST";
export const CONTACT_GET_SUCCESS = "CONTACT_GET_SUCCESS";
export const CONTACT_GET_FAILURE = "CONTACT_GET_FAILURE";

export const CONTACT_DETAIL_REQUEST = "CONTACT_DETAIL_REQUEST";
export const CONTACT_DETAIL_SUCCESS = "CONTACT_DETAIL_SUCCESS";
export const CONTACT_DETAIL_FAILURE = "CONTACT_DETAIL_FAILURE";

export const CONTACT_CREATE_REQUEST = "CONTACT_CREATE_REQUEST";
export const CONTACT_CREATE_SUCCESS = "CONTACT_CREATE_SUCCESS";
export const CONTACT_CREATE_FAILURE = "CONTACT_CREATE_FAILURE";

export const CONTACT_COMPLETED_REQUEST = "CONTACT_COMPLETED_REQUEST";
export const CONTACT_COMPLETED_SUCCESS = "CONTACT_COMPLETED_SUCCESS";
export const CONTACT_COMPLETED_FAILURE = "CONTACT_COMPLETED_FAILURE";

export const CONTACT_DELETE_REQUEST = "CONTACT_DELETE_REQUEST";
export const CONTACT_DELETE_SUCCESS = "CONTACT_DELETE_SUCCESS";
export const CONTACT_DELETE_FAILURE = "CONTACT_DELETE_FAILURE";

export const CREATE_MODAL_TOGGLE = "CREATE_MODAL_TOGGLE";

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
      ///////////////////////////////////////////////////////

      case CONTACT_CREATE_REQUEST: {
        draft.st_contactCreateLoading = true;
        draft.st_contactCreateDone = null;
        draft.st_contactCreateError = false;
        break;
      }
      case CONTACT_CREATE_SUCCESS: {
        draft.st_contactCreateLoading = false;
        draft.st_contactCreateDone = true;
        break;
      }
      case CONTACT_CREATE_FAILURE: {
        draft.st_contactCreateLoading = false;
        draft.st_contactCreateDone = false;
        draft.st_contactCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////

      case CONTACT_COMPLETED_REQUEST: {
        draft.st_contactCompletedLoading = true;
        draft.st_contactCompletedDone = null;
        draft.st_contactCompletedError = false;
        break;
      }
      case CONTACT_COMPLETED_SUCCESS: {
        draft.st_contactCompletedLoading = false;
        draft.st_contactCompletedDone = true;
        break;
      }
      case CONTACT_COMPLETED_FAILURE: {
        draft.st_contactCompletedLoading = false;
        draft.st_contactCompletedDone = false;
        draft.st_contactCompletedError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case CONTACT_DELETE_REQUEST: {
        draft.st_contactDeleteLoading = true;
        draft.st_contactDeleteDone = null;
        draft.st_contactDeleteError = false;
        break;
      }
      case CONTACT_DELETE_SUCCESS: {
        draft.st_contactDeleteLoading = false;
        draft.st_contactDeleteDone = true;
        break;
      }
      case CONTACT_DELETE_FAILURE: {
        draft.st_contactDeleteLoading = false;
        draft.st_contactDeleteDone = false;
        draft.st_contactDeleteError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case CREATE_MODAL_TOGGLE: {
        draft.createModal = !draft.createModal;
        break;
      }
      default:
        break;
    }
  });

export default reducer;
