import produce from "../util/produce";

export const initailState = {
  faqs: [],
  types: null,
  createModal: false,

  createTypeModal: false,

  createViewModal: false,

  updateModal: false,
  //
  st_faqLoading: false,
  st_faqDone: false,
  st_faqError: null,
  //
  st_faqCreateLoading: false,
  st_faqCreateDone: false,
  st_faqCreateError: null,
  //
  st_faqDeleteLoading: false,
  st_faqDeleteDone: false,
  st_faqDeleteError: null,
  //
  st_faqUpdateLoading: false,
  st_faqUpdateDone: false,
  st_faqUpdateError: null,
  ////////////////////////////////////////////////////////////////////////
  st_faqTypeLoading: false,
  st_faqTypeDone: false,
  st_faqTypeError: null,
  //
  st_faqTypeCreateLoading: false,
  st_faqTypeCreateDone: false,
  st_faqTypeCreateError: null,
  //
  st_faqTypeDeleteLoading: false,
  st_faqTypeDeleteDone: false,
  st_faqTypeDeleteError: null,
  //
  st_faqTypeUpdateLoading: false,
  st_faqTypeUpdateDone: false,
  st_faqTypeUpdateError: null,
};

export const FAQ_GET_REQUEST = "FAQ_GET_REQUEST";
export const FAQ_GET_SUCCESS = "FAQ_GET_SUCCESS";
export const FAQ_GET_FAILURE = "FAQ_GET_FAILURE";

export const FAQ_DELETE_REQUEST = "FAQ_DELETE_REQUEST";
export const FAQ_DELETE_SUCCESS = "FAQ_DELETE_SUCCESS";
export const FAQ_DELETE_FAILURE = "FAQ_DELETE_FAILURE";

export const FAQ_UPDATE_REQUEST = "FAQ_UPDATE_REQUEST";
export const FAQ_UPDATE_SUCCESS = "FAQ_UPDATE_SUCCESS";
export const FAQ_UPDATE_FAILURE = "FAQ_UPDATE_FAILURE";

export const FAQ_CREATE_REQUEST = "FAQ_CREATE_REQUEST";
export const FAQ_CREATE_SUCCESS = "FAQ_CREATE_SUCCESS";
export const FAQ_CREATE_FAILURE = "FAQ_CREATE_FAILURE";

// ************************************************
export const FAQ_TYPE_GET_REQUEST = "FAQ_TYPE_GET_REQUEST";
export const FAQ_TYPE_GET_SUCCESS = "FAQ_TYPE_GET_SUCCESS";
export const FAQ_TYPE_GET_FAILURE = "FAQ_TYPE_GET_FAILURE";

export const FAQ_TYPE_DELETE_REQUEST = "FAQ_TYPE_DELETE_REQUEST";
export const FAQ_TYPE_DELETE_SUCCESS = "FAQ_TYPE_DELETE_SUCCESS";
export const FAQ_TYPE_DELETE_FAILURE = "FAQ_TYPE_DELETE_FAILURE";

export const FAQ_TYPE_UPDATE_REQUEST = "FAQ_TYPE_UPDATE_REQUEST";
export const FAQ_TYPE_UPDATE_SUCCESS = "FAQ_TYPE_UPDATE_SUCCESS";
export const FAQ_TYPE_UPDATE_FAILURE = "FAQ_TYPE_UPDATE_FAILURE";

export const FAQ_TYPE_CREATE_REQUEST = "FAQ_TYPE_CREATE_REQUEST";
export const FAQ_TYPE_CREATE_SUCCESS = "FAQ_TYPE_CREATE_SUCCESS";
export const FAQ_TYPE_CREATE_FAILURE = "FAQ_TYPE_CREATE_FAILURE";

export const CREATE_TYPE_MODAL_OPEN_REQUEST = "CREATE_TYPE_MODAL_OPEN_REQUEST";
export const CREATE_TYPE_MODAL_CLOSE_REQUEST =
  "CREATE_TYPE_MODAL_CLOSE_REQUEST";

export const CREATE_MODAL_OPEN_REQUEST = "CREATE_MODAL_OPEN_REQUEST";
export const CREATE_MODAL_CLOSE_REQUEST = "CREATE_MODAL_CLOSE_REQUEST";

export const FAQ_CREATE_VIEW_TOGGLE = "FAQ_CREATE_VIEW_TOGGLE";

export const UPDATE_MODAL_OPEN_REQUEST = "UPDATE_MODAL_OPEN_REQUEST";
export const UPDATE_MODAL_CLOSE_REQUEST = "UPDATE_MODAL_CLOSE_REQUEST";

export const FAQ_GUIDE_MODAL = "FAQ_GUIDE_MODAL";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FAQ_GET_REQUEST: {
        draft.st_faqLoading = true;
        draft.st_faqDone = null;
        draft.st_faqError = false;
        break;
      }
      case FAQ_GET_SUCCESS: {
        draft.st_faqLoading = false;
        draft.st_faqDone = true;
        draft.faqs = action.data;
        break;
      }
      case FAQ_GET_FAILURE: {
        draft.st_faqLoading = false;
        draft.st_faqDone = false;
        draft.st_faqError = action.error;
        break;
      }

      case FAQ_DELETE_REQUEST: {
        draft.st_faqDeleteLoading = true;
        draft.st_faqDeleteDone = null;
        draft.st_faqDeleteError = false;
        break;
      }
      case FAQ_DELETE_SUCCESS: {
        draft.st_faqDeleteLoading = false;
        draft.st_faqDeleteDone = true;
        break;
      }
      case FAQ_DELETE_FAILURE: {
        draft.st_faqDeleteLoading = false;
        draft.st_faqDeleteDone = false;
        draft.st_faqDeleteError = action.error;
        break;
      }

      case FAQ_UPDATE_REQUEST: {
        draft.st_faqUpdateLoading = true;
        draft.st_faqUpdateDone = null;
        draft.st_faqUpdateError = false;
        break;
      }
      case FAQ_UPDATE_SUCCESS: {
        draft.st_faqUpdateLoading = false;
        draft.st_faqUpdateDone = true;
        break;
      }
      case FAQ_UPDATE_FAILURE: {
        draft.st_faqUpdateLoading = false;
        draft.st_faqUpdateDone = false;
        draft.st_faqUpdateError = action.error;
        break;
      }
      case FAQ_CREATE_REQUEST: {
        draft.st_faqCreateLoading = true;
        draft.st_faqCreateDone = null;
        draft.st_faqCreateError = false;
        break;
      }
      case FAQ_CREATE_SUCCESS: {
        draft.st_faqCreateLoading = false;
        draft.st_faqCreateDone = true;
        break;
      }
      case FAQ_CREATE_FAILURE: {
        draft.st_faqCreateLoading = false;
        draft.st_faqCreateDone = false;
        draft.st_faqCreateError = action.error;
        break;
      }
      // ************************************************
      case FAQ_TYPE_GET_REQUEST: {
        draft.st_faqTypeLoading = true;
        draft.st_faqTypeDone = null;
        draft.st_faqTypeError = false;
        break;
      }
      case FAQ_TYPE_GET_SUCCESS: {
        draft.st_faqTypeLoading = false;
        draft.st_faqTypeDone = true;
        draft.types = action.data;
        break;
      }
      case FAQ_TYPE_GET_FAILURE: {
        draft.st_faqTypeLoading = false;
        draft.st_faqTypeDone = false;
        draft.st_faqTypeError = action.error;
        break;
      }
      case FAQ_TYPE_DELETE_REQUEST: {
        draft.st_faqTypeDeleteLoading = true;
        draft.st_faqTypeDeleteDone = null;
        draft.st_faqTypeDeleteError = false;
        break;
      }
      case FAQ_TYPE_DELETE_SUCCESS: {
        draft.st_faqTypeDeleteLoading = false;
        draft.st_faqTypeDeleteDone = true;
        break;
      }
      case FAQ_TYPE_DELETE_FAILURE: {
        draft.st_faqTypeDeleteLoading = false;
        draft.st_faqTypeDeleteDone = false;
        draft.st_faqTypeDeleteError = action.error;
        break;
      }
      case FAQ_TYPE_UPDATE_REQUEST: {
        draft.st_faqTypeUpdateLoading = true;
        draft.st_faqTypeUpdateDone = null;
        draft.st_faqTypeUpdateError = false;
        break;
      }
      case FAQ_TYPE_UPDATE_SUCCESS: {
        draft.st_faqTypeUpdateLoading = false;
        draft.st_faqTypeUpdateDone = true;
        break;
      }
      case FAQ_TYPE_UPDATE_FAILURE: {
        draft.st_faqTypeUpdateLoading = false;
        draft.st_faqTypeUpdateDone = false;
        draft.st_faqTypeUpdateError = action.error;
        break;
      }
      case FAQ_TYPE_CREATE_REQUEST: {
        draft.st_faqTypeCreateLoading = true;
        draft.st_faqTypeCreateDone = null;
        draft.st_faqTypeCreateError = false;
        break;
      }
      case FAQ_TYPE_CREATE_SUCCESS: {
        draft.st_faqTypeCreateLoading = false;
        draft.st_faqTypeCreateDone = true;
        break;
      }
      case FAQ_TYPE_CREATE_FAILURE: {
        draft.st_faqTypeCreateLoading = false;
        draft.st_faqTypeCreateDone = false;
        draft.st_faqTypeCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case CREATE_MODAL_OPEN_REQUEST:
        draft.createModal = true;
        break;

      case CREATE_MODAL_CLOSE_REQUEST:
        draft.createModal = false;
        break;
      ///////////////////////////////////////////////////////

      case FAQ_CREATE_VIEW_TOGGLE:
        draft.createViewModal = !draft.createViewModal;
        break;

      case CREATE_TYPE_MODAL_OPEN_REQUEST:
        draft.createTypeModal = true;
        break;

      case CREATE_TYPE_MODAL_CLOSE_REQUEST:
        draft.createTypeModal = false;
        break;

      case UPDATE_MODAL_OPEN_REQUEST:
        draft.updateModal = true;
        break;

      case UPDATE_MODAL_CLOSE_REQUEST:
        draft.updateModal = false;
        break;

      case FAQ_GUIDE_MODAL:
        draft.faqGuideModal = !draft.faqGuideModal;
        break;

      ///////////////////////////////////////////////////////
      default:
        break;
    }
  });

export default reducer;
