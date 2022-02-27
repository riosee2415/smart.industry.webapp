import produce from "../util/produce";

export const initailState = {
  questions: null,
  myQuestions: null,
  listMaxPage: 1,
  maxPage: 1,
  myQuestionDetails: null,
  types: null,

  questionPrev: null,
  questionNext: null,

  createTypeModal: false, // 문의 유형 create 모달 실행

  updateModal: false, // 문의 update 모달 실행

  //
  st_questionLoading: false, // 문의 정보 가져오기
  st_questionDone: false,
  st_questionError: null,
  //
  st_questionMyListLoading: false, // 나의 문의정보 가져오기
  st_questionMyListDone: false,
  st_questionMyListError: null,
  //
  st_questionMyDetailLoading: false, // 나의 문의정보 디테일 가져오기
  st_questionMyDetailDone: false,
  st_questionMyDetailError: null,
  //
  st_questionCreateLoading: false, // 문의 정보 추가하기
  st_questionCreateDone: false,
  st_questionCreateError: null,
  //
  st_notUserCreateLoading: false, // 비회원 문의 정보 추가하기
  st_notUserCreateDone: false,
  st_notUserCreateError: null,
  //
  st_questionDeleteLoading: false, // 문의 정보 삭제하기
  st_questionDeleteDone: false,
  st_questionDeleteError: null,
  //
  st_questionUpdateLoading: false, // 문의 정보 수정하기
  st_questionUpdateDone: false,
  st_questionUpdateError: null,
  //
  st_questionPrevPageLoading: false, // 문의 이전글
  st_questionPrevPageDone: false,
  st_questionPrevPageError: null,
  //
  st_questionNextPageLoading: false, // 문의 다음글
  st_questionNextPageDone: false,
  st_questionNextPageError: null,
  ////////////////////////////////////////////////////////////////////////
  st_questionTypeLoading: false, // 문의 유형 정보 가져오기
  st_questionTypeDone: false,
  st_questionTypeError: null,
  //
  st_questionTypeCreateLoading: false, // 문의 유형 정보 추가하기
  st_questionTypeCreateDone: false,
  st_questionTypeCreateError: null,
  //
  st_questionTypeDeleteLoading: false, // 문의 유형 정보 삭제하기
  st_questionTypeDeleteDone: false,
  st_questionTypeDeleteError: null,
  //
  st_questionTypeUpdateLoading: false, // 문의 유형 정보 수정하기
  st_questionTypeUpdateDone: false,
  st_questionTypeUpdateError: null,
};

export const QUESTION_GET_REQUEST = "QUESTION_GET_REQUEST";
export const QUESTION_GET_SUCCESS = "QUESTION_GET_SUCCESS";
export const QUESTION_GET_FAILURE = "QUESTION_GET_FAILURE";

export const QUESTION_MY_LIST_REQUEST = "QUESTION_MY_LIST_REQUEST";
export const QUESTION_MY_LIST_SUCCESS = "QUESTION_MY_LIST_SUCCESS";
export const QUESTION_MY_LIST_FAILURE = "QUESTION_MY_LIST_FAILURE";

export const QUESTION_MY_DETAIL_REQUEST = "QUESTION_MY_DETAIL_REQUEST";
export const QUESTION_MY_DETAIL_SUCCESS = "QUESTION_MY_DETAIL_SUCCESS";
export const QUESTION_MY_DETAIL_FAILURE = "QUESTION_MY_DETAIL_FAILURE";

export const QUESTION_DELETE_REQUEST = "QUESTION_DELETE_REQUEST";
export const QUESTION_DELETE_SUCCESS = "QUESTION_DELETE_SUCCESS";
export const QUESTION_DELETE_FAILURE = "QUESTION_DELETE_FAILURE";

export const QUESTION_UPDATE_REQUEST = "QUESTION_UPDATE_REQUEST";
export const QUESTION_UPDATE_SUCCESS = "QUESTION_UPDATE_SUCCESS";
export const QUESTION_UPDATE_FAILURE = "QUESTION_UPDATE_FAILURE";

export const QUESTION_CREATE_REQUEST = "QUESTION_CREATE_REQUEST";
export const QUESTION_CREATE_SUCCESS = "QUESTION_CREATE_SUCCESS";
export const QUESTION_CREATE_FAILURE = "QUESTION_CREATE_FAILURE";

export const NOT_USER_CREATE_REQUEST = "NOT_USER_CREATE_REQUEST";
export const NOT_USER_CREATE_SUCCESS = "NOT_USER_CREATE_SUCCESS";
export const NOT_USER_CREATE_FAILURE = "NOT_USER_CREATE_FAILURE";

// ************************************************
export const QUESTION_TYPE_GET_REQUEST = "QUESTION_TYPE_GET_REQUEST";
export const QUESTION_TYPE_GET_SUCCESS = "QUESTION_TYPE_GET_SUCCESS";
export const QUESTION_TYPE_GET_FAILURE = "QUESTION_TYPE_GET_FAILURE";

export const QUESTION_TYPE_DELETE_REQUEST = "QUESTION_TYPE_DELETE_REQUEST";
export const QUESTION_TYPE_DELETE_SUCCESS = "QUESTION_TYPE_DELETE_SUCCESS";
export const QUESTION_TYPE_DELETE_FAILURE = "QUESTION_TYPE_DELETE_FAILURE";

export const QUESTION_TYPE_UPDATE_REQUEST = "QUESTION_TYPE_UPDATE_REQUEST";
export const QUESTION_TYPE_UPDATE_SUCCESS = "QUESTION_TYPE_UPDATE_SUCCESS";
export const QUESTION_TYPE_UPDATE_FAILURE = "QUESTION_TYPE_UPDATE_FAILURE";

export const QUESTION_TYPE_CREATE_REQUEST = "QUESTION_TYPE_CREATE_REQUEST";
export const QUESTION_TYPE_CREATE_SUCCESS = "QUESTION_TYPE_CREATE_SUCCESS";
export const QUESTION_TYPE_CREATE_FAILURE = "QUESTION_TYPE_CREATE_FAILURE";

export const QUESTION_PREVPAGE_REQUEST = "QUESTION_PREVPAGE_REQUEST";
export const QUESTION_PREVPAGE_SUCCESS = "QUESTION_PREVPAGE_SUCCESS";
export const QUESTION_PREVPAGE_FAILURE = "QUESTION_PREVPAGE_FAILURE";

export const QUESTION_NEXTPAGE_REQUEST = "QUESTION_NEXTPAGE_REQUEST";
export const QUESTION_NEXTPAGE_SUCCESS = "QUESTION_NEXTPAGE_SUCCESS";
export const QUESTION_NEXTPAGE_FAILURE = "QUESTION_NEXTPAGE_FAILURE";

export const CREATE_TYPE_MODAL_OPEN_REQUEST = "CREATE_TYPE_MODAL_OPEN_REQUEST";
export const CREATE_TYPE_MODAL_CLOSE_REQUEST =
  "CREATE_TYPE_MODAL_CLOSE_REQUEST";

export const UPDATE_MODAL_OPEN_REQUEST = "UPDATE_MODAL_OPEN_REQUEST";
export const UPDATE_MODAL_CLOSE_REQUEST = "UPDATE_MODAL_CLOSE_REQUEST";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case QUESTION_GET_REQUEST: {
        draft.st_questionLoading = true;
        draft.st_questionDone = null;
        draft.st_questionError = false;
        break;
      }
      case QUESTION_GET_SUCCESS: {
        draft.st_questionLoading = false;
        draft.st_questionDone = true;
        draft.questions = action.data;
        draft.listMaxPage = action.data.lastPage;
        break;
      }
      case QUESTION_GET_FAILURE: {
        draft.st_questionLoading = false;
        draft.st_questionDone = false;
        draft.st_questionError = action.error;
        break;
      }
      case QUESTION_MY_LIST_REQUEST: {
        draft.st_questionMyListLoading = true;
        draft.st_questionMyListDone = null;
        draft.st_questionMyListError = false;
        break;
      }
      case QUESTION_MY_LIST_SUCCESS: {
        draft.st_questionMyListLoading = false;
        draft.st_questionMyListDone = true;
        draft.myQuestions = action.data;
        draft.maxPage = action.data.lastPage;
        break;
      }
      case QUESTION_MY_LIST_FAILURE: {
        draft.st_questionMyListLoading = false;
        draft.st_questionMyListDone = false;
        draft.st_questionMyListError = action.error;
        break;
      }
      case QUESTION_MY_DETAIL_REQUEST: {
        draft.st_questionMyDetailLoading = true;
        draft.st_questionMyDetailDone = null;
        draft.st_questionMyDetailError = false;
        break;
      }
      case QUESTION_MY_DETAIL_SUCCESS: {
        draft.st_questionMyDetailLoading = false;
        draft.st_questionMyDetailDone = true;
        draft.myQuestionDetails = action.data;
        break;
      }
      case QUESTION_MY_DETAIL_FAILURE: {
        draft.st_questionMyDetailLoading = false;
        draft.st_questionMyDetailDone = false;
        draft.st_questionMyDetailError = action.error;
        break;
      }
      case QUESTION_DELETE_REQUEST: {
        draft.st_questionDeleteLoading = true;
        draft.st_questionDeleteDone = null;
        draft.st_questionDeleteError = false;
        break;
      }
      case QUESTION_DELETE_SUCCESS: {
        draft.st_questionDeleteLoading = false;
        draft.st_questionDeleteDone = true;
        break;
      }
      case QUESTION_DELETE_FAILURE: {
        draft.st_questionDeleteLoading = false;
        draft.st_questionDeleteDone = false;
        draft.st_questionDeleteError = action.error;
        break;
      }
      case QUESTION_UPDATE_REQUEST: {
        draft.st_questionUpdateLoading = true;
        draft.st_questionUpdateDone = null;
        draft.st_questionUpdateError = false;
        break;
      }
      case QUESTION_UPDATE_SUCCESS: {
        draft.st_questionUpdateLoading = false;
        draft.st_questionUpdateDone = true;
        break;
      }
      case QUESTION_UPDATE_FAILURE: {
        draft.st_questionUpdateLoading = false;
        draft.st_questionUpdateDone = false;
        draft.st_questionUpdateError = action.error;
        break;
      }
      case QUESTION_CREATE_REQUEST: {
        draft.st_questionCreateLoading = true;
        draft.st_questionCreateDone = null;
        draft.st_questionCreateError = false;
        break;
      }
      case QUESTION_CREATE_SUCCESS: {
        draft.st_questionCreateLoading = false;
        draft.st_questionCreateDone = true;
        draft.questions = action.data;
        break;
      }
      case QUESTION_CREATE_FAILURE: {
        draft.st_questionCreateLoading = false;
        draft.st_questionCreateDone = false;
        draft.st_questionCreateError = action.error;
        break;
      }
      case NOT_USER_CREATE_REQUEST: {
        draft.st_notUserCreateLoading = true;
        draft.st_notUserCreateDone = null;
        draft.st_notUserCreateError = false;
        break;
      }
      case NOT_USER_CREATE_SUCCESS: {
        draft.st_notUserCreateLoading = false;
        draft.st_notUserCreateDone = true;
        draft.questions = action.data;
        break;
      }
      case NOT_USER_CREATE_FAILURE: {
        draft.st_notUserCreateLoading = false;
        draft.st_notUserCreateDone = false;
        draft.st_notUserCreateError = action.error;
        break;
      }
      // ************************************************
      case QUESTION_TYPE_GET_REQUEST: {
        draft.st_questionTypeLoading = true;
        draft.st_questionTypeDone = null;
        draft.st_questionTypeError = false;
        break;
      }
      case QUESTION_TYPE_GET_SUCCESS: {
        draft.st_questionTypeLoading = false;
        draft.st_questionTypeDone = true;
        draft.types = action.data;
        break;
      }
      case QUESTION_TYPE_GET_FAILURE: {
        draft.st_questionTypeLoading = false;
        draft.st_questionTypeDone = false;
        draft.st_questionTypeError = action.error;
        break;
      }
      case QUESTION_TYPE_DELETE_REQUEST: {
        draft.st_questionTypeDeleteLoading = true;
        draft.st_questionTypeDeleteDone = null;
        draft.st_questionTypeDeleteError = false;
        break;
      }
      case QUESTION_TYPE_DELETE_SUCCESS: {
        draft.st_questionTypeDeleteLoading = false;
        draft.st_questionTypeDeleteDone = true;
        break;
      }
      case QUESTION_TYPE_DELETE_FAILURE: {
        draft.st_questionTypeDeleteLoading = false;
        draft.st_questionTypeDeleteDone = false;
        draft.st_questionTypeDeleteError = action.error;
        break;
      }
      case QUESTION_TYPE_UPDATE_REQUEST: {
        draft.st_questionTypeUpdateLoading = true;
        draft.st_questionTypeUpdateDone = null;
        draft.st_questionTypeUpdateError = false;
        break;
      }
      case QUESTION_TYPE_UPDATE_SUCCESS: {
        draft.st_questionTypeUpdateLoading = false;
        draft.st_questionTypeUpdateDone = true;
        break;
      }
      case QUESTION_TYPE_UPDATE_FAILURE: {
        draft.st_questionTypeUpdateLoading = false;
        draft.st_questionTypeUpdateDone = false;
        draft.st_questionTypeUpdateError = action.error;
        break;
      }
      case QUESTION_TYPE_CREATE_REQUEST: {
        draft.st_questionTypeCreateLoading = true;
        draft.st_questionTypeCreateDone = null;
        draft.st_questionTypeCreateError = false;
        break;
      }
      case QUESTION_TYPE_CREATE_SUCCESS: {
        draft.st_questionTypeCreateLoading = false;
        draft.st_questionTypeCreateDone = true;
        break;
      }
      case QUESTION_TYPE_CREATE_FAILURE: {
        draft.st_questionTypeCreateLoading = false;
        draft.st_questionTypeCreateDone = false;
        draft.st_questionTypeCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case QUESTION_PREVPAGE_REQUEST: {
        draft.st_questionPrevPageLoading = true;
        draft.st_questionPrevPageDone = null;
        draft.st_questionPrevPageError = false;
        break;
      }
      case QUESTION_PREVPAGE_SUCCESS: {
        draft.st_questionPrevPageLoading = false;
        draft.st_questionPrevPageDone = true;
        draft.questionPrev = action.data;
        break;
      }
      case QUESTION_PREVPAGE_FAILURE: {
        draft.st_questionPrevPageLoading = false;
        draft.st_questionPrevPageDone = false;
        draft.st_questionPrevPageError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case QUESTION_NEXTPAGE_REQUEST: {
        draft.st_questionNextPageLoading = true;
        draft.st_questionNextPageDone = null;
        draft.st_questionNextPageError = false;
        break;
      }
      case QUESTION_NEXTPAGE_SUCCESS: {
        draft.st_questionNextPageLoading = false;
        draft.st_questionNextPageDone = true;
        draft.questionNext = action.data;
        break;
      }
      case QUESTION_NEXTPAGE_FAILURE: {
        draft.st_questionNextPageLoading = false;
        draft.st_questionNextPageDone = false;
        draft.st_questionNextPageError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
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

      ///////////////////////////////////////////////////////
      default:
        break;
    }
  });

export default reducer;
