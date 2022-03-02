import produce from "../util/produce";

export const initailState = {
  productList: null,
  productImages: null,
  productId: null,
  maxPage: 1,
  totalProduct: 0,

  productBestList: null,
  bestMaxPage: 1,
  bestTotalProduct: 0,

  prodCompanyList: null,

  productDetailData: null,
  productDetailImages: null,

  productImagePath: null,

  productDetailImagePath: null,

  productQuestionList: null,
  productQuestionListLastPage: 1,
  productQuestionListLen: 1,

  productQuestionDetail: null,
  productAdminQuestionList: null,
  productQuestionListProd: null,
  productQuestionListProdLastPage: 1,
  productQuestionListProdLen: 1,

  productQuestionMyList: null,

  createModal: false,
  prodCompanyModal: false,
  prodCompanyCreateModal: false,
  unitModal: false,

  //
  st_productListLoading: false, // 상품 가져오기
  st_productListDone: false,
  st_productListError: null,
  //
  st_productDetailLoading: false, // 상품 상세데이터 가져오기
  st_productDetailDone: false,
  st_productDetailError: null,
  //
  st_productBestListLoading: false, // 베스트 상품 가져오기
  st_productBestListDone: false,
  st_productBestListError: null,
  //
  st_productCreateLoading: false, // 상품 생성
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
  //
  st_productDetailUploadLoading: false,
  st_productDetailUploadDone: false,
  st_productDetailUploadError: null,
  //
  st_productListImageLoading: false, // 상품 상세 이미지 가져오기
  st_productListImageDone: false,
  st_productListImageError: null,
  //
  st_productCreateImageLoading: false, // 상품 상세 이미지 생성
  st_productCreateImageDone: false,
  st_productCreateImageError: null,
  //
  st_productDeleteImageLoading: false, // 상품 상세 이미지 삭제
  st_productDeleteImageDone: false,
  st_productDeleteImageError: null,
  //
  st_productUsedUpdateLoading: false, // 상품 중고 변경
  st_productUsedUpdateDone: false,
  st_productUsedUpdateError: null,
  //
  st_productSaleUpdateLoading: false, // 상품 특가 변경
  st_productSaleUpdateDone: false,
  st_productSaleUpdateError: null,
  //
  st_productBestUpdateLoading: false, // 상품 베스트상품 변경
  st_productBestUpdateDone: false,
  st_productBestUpdateError: null,
  //
  st_productCompanyListLoading: false, // 상품 제조사 가져오기
  st_productCompanyListDone: false,
  st_productCompanyListError: null,
  //
  st_productCompanyCreateLoading: false, // 상품 제조사 생성
  st_productCompanyCreateDone: false,
  st_productCompanyCreateError: null,
  //
  st_productCompanyUpdateLoading: false, // 상품 제조사 수정
  st_productCompanyUpdateDone: false,
  st_productCompanyUpdateError: null,
  //
  st_productCompanyDeleteLoading: false, // 상품 제조사 삭제
  st_productCompanyDeleteDone: false,
  st_productCompanyDeleteError: null,
  //
  st_productQuestionListLoading: false,
  st_productQuestionListDone: false,
  st_productQuestionListError: null,
  //
  st_productQuestionDetailLoading: false,
  st_productQuestionDetailDone: false,
  st_productQuestionDetailError: null,
  //
  st_productQuestionCreateLoading: false,
  st_productQuestionCreateDone: false,
  st_productQuestionCreateError: null,
  //
  st_productQuestionUpdateLoading: false,
  st_productQuestionUpdateDone: false,
  st_productQuestionUpdateError: null,
  //
  st_productAdminQuestionListLoading: false,
  st_productAdminQuestionListDone: false,
  st_productAdminQuestionListError: null,
  //
  st_productQuestionNotUserCreateLoading: false,
  st_productQuestionNotUserCreateDone: false,
  st_productQuestionNotUserCreateError: null,
  //
  st_productQuestionListProdLoading: false,
  st_productQuestionListProdDone: false,
  st_productQuestionListProdError: null,
  //
  st_productQuestionMyListLoading: false,
  st_productQuestionMyListDone: false,
  st_productQuestionMyListError: null,
};

export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAILURE = "PRODUCT_LIST_FAILURE";
//
export const PRODUCT_DETAIL_REQUEST = "PRODUCT_DETAIL_REQUEST";
export const PRODUCT_DETAIL_SUCCESS = "PRODUCT_DETAIL_SUCCESS";
export const PRODUCT_DETAIL_FAILURE = "PRODUCT_DETAIL_FAILURE";
//
export const PRODUCT_BEST_LIST_REQUEST = "PRODUCT_BEST_LIST_REQUEST";
export const PRODUCT_BEST_LIST_SUCCESS = "PRODUCT_BEST_LIST_SUCCESS";
export const PRODUCT_BEST_LIST_FAILURE = "PRODUCT_BEST_LIST_FAILURE";
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
export const PRODUCT_DETAIL_UPLOAD_REQUEST = "PRODUCT_DETAIL_UPLOAD_REQUEST";
export const PRODUCT_DETAIL_UPLOAD_SUCCESS = "PRODUCT_DETAIL_UPLOAD_SUCCESS";
export const PRODUCT_DETAIL_UPLOAD_FAILURE = "PRODUCT_DETAIL_UPLOAD_FAILURE";
//
export const PRODUCT_LIST_IMAGE_REQUEST = "PRODUCT_LIST_IMAGE_REQUEST";
export const PRODUCT_LIST_IMAGE_SUCCESS = "PRODUCT_LIST_IMAGE_SUCCESS";
export const PRODUCT_LIST_IMAGE_FAILURE = "PRODUCT_LIST_IMAGE_FAILURE";
//
export const PRODUCT_CREATE_IMAGE_REQUEST = "PRODUCT_CREATE_IMAGE_REQUEST";
export const PRODUCT_CREATE_IMAGE_SUCCESS = "PRODUCT_CREATE_IMAGE_SUCCESS";
export const PRODUCT_CREATE_IMAGE_FAILURE = "PRODUCT_CREATE_IMAGE_FAILURE";
//
export const PRODUCT_DELETE_IMAGE_REQUEST = "PRODUCT_DELETE_IMAGE_REQUEST";
export const PRODUCT_DELETE_IMAGE_SUCCESS = "PRODUCT_DELETE_IMAGE_SUCCESS";
export const PRODUCT_DELETE_IMAGE_FAILURE = "PRODUCT_DELETE_IMAGE_FAILURE";
//
export const PRODUCT_USED_UPDATE_REQUEST = "PRODUCT_USED_UPDATE_REQUEST";
export const PRODUCT_USED_UPDATE_SUCCESS = "PRODUCT_USED_UPDATE_SUCCESS";
export const PRODUCT_USED_UPDATE_FAILURE = "PRODUCT_USED_UPDATE_FAILURE";
//
export const PRODUCT_SALE_UPDATE_REQUEST = "PRODUCT_SALE_UPDATE_REQUEST";
export const PRODUCT_SALE_UPDATE_SUCCESS = "PRODUCT_SALE_UPDATE_SUCCESS";
export const PRODUCT_SALE_UPDATE_FAILURE = "PRODUCT_SALE_UPDATE_FAILURE";
//
export const PRODUCT_BEST_UPDATE_REQUEST = "PRODUCT_BEST_UPDATE_REQUEST";
export const PRODUCT_BEST_UPDATE_SUCCESS = "PRODUCT_BEST_UPDATE_SUCCESS";
export const PRODUCT_BEST_UPDATE_FAILURE = "PRODUCT_BEST_UPDATE_FAILURE";
//
export const PRODUCT_COMPANY_LIST_REQUEST = "PRODUCT_COMPANY_LIST_REQUEST";
export const PRODUCT_COMPANY_LIST_SUCCESS = "PRODUCT_COMPANY_LIST_SUCCESS";
export const PRODUCT_COMPANY_LIST_FAILURE = "PRODUCT_COMPANY_LIST_FAILURE";
//
export const PRODUCT_COMPANY_CREATE_REQUEST = "PRODUCT_COMPANY_CREATE_REQUEST";
export const PRODUCT_COMPANY_CREATE_SUCCESS = "PRODUCT_COMPANY_CREATE_SUCCESS";
export const PRODUCT_COMPANY_CREATE_FAILURE = "PRODUCT_COMPANY_CREATE_FAILURE";
//
export const PRODUCT_COMPANY_UPDATE_REQUEST = "PRODUCT_COMPANY_UPDATE_REQUEST";
export const PRODUCT_COMPANY_UPDATE_SUCCESS = "PRODUCT_COMPANY_UPDATE_SUCCESS";
export const PRODUCT_COMPANY_UPDATE_FAILURE = "PRODUCT_COMPANY_UPDATE_FAILURE";
//
export const PRODUCT_COMPANY_DELETE_REQUEST = "PRODUCT_COMPANY_DELETE_REQUEST";
export const PRODUCT_COMPANY_DELETE_SUCCESS = "PRODUCT_COMPANY_DELETE_SUCCESS";
export const PRODUCT_COMPANY_DELETE_FAILURE = "PRODUCT_COMPANY_DELETE_FAILURE";
//
export const PRODUCT_QUESTION_LIST_REQUEST = "PRODUCT_QUESTION_LIST_REQUEST";
export const PRODUCT_QUESTION_LIST_SUCCESS = "PRODUCT_QUESTION_LIST_SUCCESS";
export const PRODUCT_QUESTION_LIST_FAILURE = "PRODUCT_QUESTION_LIST_FAILURE";
//
export const PRODUCT_QUESTION_DETAIL_REQUEST =
  "PRODUCT_QUESTION_DETAIL_REQUEST";
export const PRODUCT_QUESTION_DETAIL_SUCCESS =
  "PRODUCT_QUESTION_DETAIL_SUCCESS";
export const PRODUCT_QUESTION_DETAIL_FAILURE =
  "PRODUCT_QUESTION_DETAIL_FAILURE";
//
export const PRODUCT_QUESTION_CREATE_REQUEST =
  "PRODUCT_QUESTION_CREATE_REQUEST";
export const PRODUCT_QUESTION_CREATE_SUCCESS =
  "PRODUCT_QUESTION_CREATE_SUCCESS";
export const PRODUCT_QUESTION_CREATE_FAILURE =
  "PRODUCT_QUESTION_CREATE_FAILURE";
//
export const PRODUCT_QUESTION_UPDATE_REQUEST =
  "PRODUCT_QUESTION_UPDATE_REQUEST";
export const PRODUCT_QUESTION_UPDATE_SUCCESS =
  "PRODUCT_QUESTION_UPDATE_SUCCESS";
export const PRODUCT_QUESTION_UPDATE_FAILURE =
  "PRODUCT_QUESTION_UPDATE_FAILURE";
//

export const PRODUCT_ADMIN_QUESTION_LIST_REQUEST =
  "PRODUCT_ADMIN_QUESTION_LIST_REQUEST";
export const PRODUCT_ADMIN_QUESTION_LIST_SUCCESS =
  "PRODUCT_ADMIN_QUESTION_LIST_SUCCESS";
export const PRODUCT_ADMIN_QUESTION_LIST_FAILURE =
  "PRODUCT_ADMIN_QUESTION_LIST_FAILURE";
//
export const PRODUCT_QUESTION_NOT_USER_CREATE_REQUEST =
  "PRODUCT_QUESTION_NOT_USER_CREATE_REQUEST";
export const PRODUCT_QUESTION_NOT_USER_CREATE_SUCCESS =
  "PRODUCT_QUESTION_NOT_USER_CREATE_SUCCESS";
export const PRODUCT_QUESTION_NOT_USER_CREATE_FAILURE =
  "PRODUCT_QUESTION_NOT_USER_CREATE_FAILURE";
//
export const PRODUCT_QUESTION_LIST_PROD_REQUEST =
  "PRODUCT_QUESTION_LIST_PROD_REQUEST";
export const PRODUCT_QUESTION_LIST_PROD_SUCCESS =
  "PRODUCT_QUESTION_LIST_PROD_SUCCESS";
export const PRODUCT_QUESTION_LIST_PROD_FAILURE =
  "PRODUCT_QUESTION_LIST_PROD_FAILURE";
//
export const PRODUCT_QUESTION_MY_LIST_REQUEST =
  "PRODUCT_QUESTION_MY_LIST_REQUEST";
export const PRODUCT_QUESTION_MY_LIST_SUCCESS =
  "PRODUCT_QUESTION_MY_LIST_SUCCESS";
export const PRODUCT_QUESTION_MY_LIST_FAILURE =
  "PRODUCT_QUESTION_MY_LIST_FAILURE";
//
export const CREATE_MODAL_TOGGLE = "CREATE_MODAL_TOGGLE";
export const PROD_COMPANY_MODAL_TOGGLE = "PROD_COMPANY_MODAL_TOGGLE";
export const PROD_COMPANY_CREATE_MODAL_TOGGLE =
  "PROD_COMPANY_CREATE_MODAL_TOGGLE";
export const UNIT_MODAL_TOGGLE = "UNIT_MODAL_TOGGLE";

export const PRODUCT_IMAGE_PATH = "PRODUCT_IMAGE_PATH";
export const PRODUCT_DETAIL_IMAGE_PATH = "PRODUCT_DETAIL_IMAGE_PATH";
export const RESET_PRODUCT_REQUEST = "RESET_PRODUCT_REQUEST";

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
        draft.totalProduct = action.data.productLen;

        break;
      }
      case PRODUCT_LIST_FAILURE: {
        draft.st_productListLoading = false;
        draft.st_productListDone = false;
        draft.st_productListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case PRODUCT_DETAIL_REQUEST: {
        draft.st_productDetailLoading = true;
        draft.st_productDetailDone = null;
        draft.st_productDetailError = false;
        break;
      }
      case PRODUCT_DETAIL_SUCCESS: {
        draft.st_productDetailLoading = false;
        draft.st_productDetailDone = true;
        draft.productDetailData = action.data.lists;
        draft.productDetailImages = action.data.images;
        break;
      }
      case PRODUCT_DETAIL_FAILURE: {
        draft.st_productDetailLoading = false;
        draft.st_productDetailDone = false;
        draft.st_productDetailError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case PRODUCT_BEST_LIST_REQUEST: {
        draft.st_productBestListLoading = true;
        draft.st_productBestListDone = null;
        draft.st_productBestListError = false;
        break;
      }
      case PRODUCT_BEST_LIST_SUCCESS: {
        draft.st_productBestListLoading = false;
        draft.st_productBestListDone = true;
        draft.productBestList = action.data.lists;
        draft.bestMaxPage = action.data.lastPage;
        draft.bestTotalProduct = action.data.productLen;
        break;
      }
      case PRODUCT_BEST_LIST_FAILURE: {
        draft.st_productBestListLoading = false;
        draft.st_productBestListDone = false;
        draft.st_productBestListError = action.error;
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
        draft.productId = action.data.id;
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
      case PRODUCT_DETAIL_UPLOAD_REQUEST: {
        draft.st_productDetailUploadLoading = true;
        draft.st_productDetailUploadDone = null;
        draft.st_productDetailUploadError = false;
        break;
      }
      case PRODUCT_DETAIL_UPLOAD_SUCCESS: {
        draft.st_productDetailUploadLoading = false;
        draft.st_productDetailUploadDone = true;
        draft.productDetailImagePath = action.data.path;
        break;
      }
      case PRODUCT_DETAIL_UPLOAD_FAILURE: {
        draft.st_productDetailUploadLoading = false;
        draft.st_productDetailUploadDone = false;
        draft.st_productDetailUploadError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case PRODUCT_LIST_IMAGE_REQUEST: {
        draft.st_productListImageLoading = true;
        draft.st_productListImageDone = null;
        draft.st_productListImageError = false;
        break;
      }
      case PRODUCT_LIST_IMAGE_SUCCESS: {
        draft.st_productListImageLoading = false;
        draft.st_productListImageDone = true;
        draft.productImages = action.data;
        break;
      }
      case PRODUCT_LIST_IMAGE_FAILURE: {
        draft.st_productListImageLoading = false;
        draft.st_productListImageDone = false;
        draft.st_productListImageError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case PRODUCT_CREATE_IMAGE_REQUEST: {
        draft.st_productCreateImageLoading = true;
        draft.st_productCreateImageDone = null;
        draft.st_productCreateImageError = false;
        break;
      }
      case PRODUCT_CREATE_IMAGE_SUCCESS: {
        draft.st_productCreateImageLoading = false;
        draft.st_productCreateImageDone = true;
        break;
      }
      case PRODUCT_CREATE_IMAGE_FAILURE: {
        draft.st_productCreateImageLoading = false;
        draft.st_productCreateImageDone = false;
        draft.st_productCreateImageError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case PRODUCT_DELETE_IMAGE_REQUEST: {
        draft.st_productDeleteImageLoading = true;
        draft.st_productDeleteImageDone = null;
        draft.st_productDeleteImageError = false;
        break;
      }
      case PRODUCT_DELETE_IMAGE_SUCCESS: {
        draft.st_productDeleteImageLoading = false;
        draft.st_productDeleteImageDone = true;
        break;
      }
      case PRODUCT_DELETE_IMAGE_FAILURE: {
        draft.st_productDeleteImageLoading = false;
        draft.st_productDeleteImageDone = false;
        draft.st_productDeleteImageError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case PRODUCT_USED_UPDATE_REQUEST: {
        draft.st_productUsedUpdateLoading = true;
        draft.st_productUsedUpdateDone = null;
        draft.st_productUsedUpdateError = false;
        break;
      }
      case PRODUCT_USED_UPDATE_SUCCESS: {
        draft.st_productUsedUpdateLoading = false;
        draft.st_productUsedUpdateDone = true;
        break;
      }
      case PRODUCT_USED_UPDATE_FAILURE: {
        draft.st_productUsedUpdateLoading = false;
        draft.st_productUsedUpdateDone = false;
        draft.st_productUsedUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case PRODUCT_SALE_UPDATE_REQUEST: {
        draft.st_productSaleUpdateLoading = true;
        draft.st_productSaleUpdateDone = null;
        draft.st_productSaleUpdateError = false;
        break;
      }
      case PRODUCT_SALE_UPDATE_SUCCESS: {
        draft.st_productSaleUpdateLoading = false;
        draft.st_productSaleUpdateDone = true;
        break;
      }
      case PRODUCT_SALE_UPDATE_FAILURE: {
        draft.st_productSaleUpdateLoading = false;
        draft.st_productSaleUpdateDone = false;
        draft.st_productSaleUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case PRODUCT_BEST_UPDATE_REQUEST: {
        draft.st_productBestUpdateLoading = true;
        draft.st_productBestUpdateDone = null;
        draft.st_productBestUpdateError = false;
        break;
      }
      case PRODUCT_BEST_UPDATE_SUCCESS: {
        draft.st_productBestUpdateLoading = false;
        draft.st_productBestUpdateDone = true;
        break;
      }
      case PRODUCT_BEST_UPDATE_FAILURE: {
        draft.st_productBestUpdateLoading = false;
        draft.st_productBestUpdateDone = false;
        draft.st_productBestUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case PRODUCT_COMPANY_LIST_REQUEST: {
        draft.st_productCompanyListLoading = true;
        draft.st_productCompanyListDone = null;
        draft.st_productCompanyListError = false;
        break;
      }
      case PRODUCT_COMPANY_LIST_SUCCESS: {
        draft.st_productCompanyListLoading = false;
        draft.st_productCompanyListDone = true;
        draft.prodCompanyList = action.data;
        break;
      }
      case PRODUCT_COMPANY_LIST_FAILURE: {
        draft.st_productCompanyListLoading = false;
        draft.st_productCompanyListDone = false;
        draft.st_productCompanyListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case PRODUCT_COMPANY_CREATE_REQUEST: {
        draft.st_productCompanyCreateLoading = true;
        draft.st_productCompanyCreateDone = null;
        draft.st_productCompanyCreateError = false;
        break;
      }
      case PRODUCT_COMPANY_CREATE_SUCCESS: {
        draft.st_productCompanyCreateLoading = false;
        draft.st_productCompanyCreateDone = true;
        break;
      }
      case PRODUCT_COMPANY_CREATE_FAILURE: {
        draft.st_productCompanyCreateLoading = false;
        draft.st_productCompanyCreateDone = false;
        draft.st_productCompanyCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case PRODUCT_COMPANY_UPDATE_REQUEST: {
        draft.st_productCompanyUpdateLoading = true;
        draft.st_productCompanyUpdateDone = null;
        draft.st_productCompanyUpdateError = false;
        break;
      }
      case PRODUCT_COMPANY_UPDATE_SUCCESS: {
        draft.st_productCompanyUpdateLoading = false;
        draft.st_productCompanyUpdateDone = true;
        break;
      }
      case PRODUCT_COMPANY_UPDATE_FAILURE: {
        draft.st_productCompanyUpdateLoading = false;
        draft.st_productCompanyUpdateDone = false;
        draft.st_productCompanyUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case PRODUCT_COMPANY_DELETE_REQUEST: {
        draft.st_productCompanyDeleteLoading = true;
        draft.st_productCompanyDeleteDone = null;
        draft.st_productCompanyDeleteError = false;
        break;
      }
      case PRODUCT_COMPANY_DELETE_SUCCESS: {
        draft.st_productCompanyDeleteLoading = false;
        draft.st_productCompanyDeleteDone = true;
        break;
      }
      case PRODUCT_COMPANY_DELETE_FAILURE: {
        draft.st_productCompanyDeleteLoading = false;
        draft.st_productCompanyDeleteDone = false;
        draft.st_productCompanyDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case PRODUCT_QUESTION_LIST_REQUEST: {
        draft.st_productQuestionListLoading = true;
        draft.st_productQuestionListDone = null;
        draft.st_productQuestionListError = false;
        break;
      }
      case PRODUCT_QUESTION_LIST_SUCCESS: {
        draft.st_productQuestionListLoading = false;
        draft.st_productQuestionListDone = true;
        draft.productQuestionList = action.data.questions;
        draft.productQuestionListLastPage = action.data.lastPage;
        draft.productQuestionListLen = action.data.questionLen;
        break;
      }
      case PRODUCT_QUESTION_LIST_FAILURE: {
        draft.st_productQuestionListLoading = false;
        draft.st_productQuestionListDone = false;
        draft.st_productQuestionListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      case PRODUCT_QUESTION_DETAIL_REQUEST: {
        draft.st_productQuestionDetailLoading = true;
        draft.st_productQuestionDetailDone = null;
        draft.st_productQuestionDetailError = false;
        break;
      }
      case PRODUCT_QUESTION_DETAIL_SUCCESS: {
        draft.st_productQuestionDetailLoading = false;
        draft.st_productQuestionDetailDone = true;
        draft.productQuestionDetail = action.data;
        break;
      }
      case PRODUCT_QUESTION_DETAIL_SUCCESS: {
        draft.st_productQuestionDetailLoading = false;
        draft.st_productQuestionDetailDone = false;
        draft.st_productQuestionDetailError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case PRODUCT_QUESTION_CREATE_REQUEST: {
        draft.st_productQuestionCreateLoading = true;
        draft.st_productQuestionCreateDone = null;
        draft.st_productQuestionCreateError = false;
        break;
      }
      case PRODUCT_QUESTION_CREATE_SUCCESS: {
        draft.st_productQuestionCreateLoading = false;
        draft.st_productQuestionCreateDone = true;
        break;
      }
      case PRODUCT_QUESTION_CREATE_FAILURE: {
        draft.st_productQuestionCreateLoading = false;
        draft.st_productQuestionCreateDone = false;
        draft.st_productQuestionCreateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case PRODUCT_QUESTION_UPDATE_REQUEST: {
        draft.st_productQuestionUpdateLoading = true;
        draft.st_productQuestionUpdateDone = null;
        draft.st_productQuestionUpdateError = false;
        break;
      }
      case PRODUCT_QUESTION_UPDATE_SUCCESS: {
        draft.st_productQuestionUpdateLoading = false;
        draft.st_productQuestionUpdateDone = true;
        break;
      }
      case PRODUCT_QUESTION_UPDATE_FAILURE: {
        draft.st_productQuestionUpdateLoading = false;
        draft.st_productQuestionUpdateDone = false;
        draft.st_productQuestionUpdateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case PRODUCT_ADMIN_QUESTION_LIST_REQUEST: {
        draft.st_productAdminQuestionListLoading = true;
        draft.st_productAdminQuestionListDone = null;
        draft.st_productAdminQuestionListError = false;
        break;
      }
      case PRODUCT_ADMIN_QUESTION_LIST_SUCCESS: {
        draft.st_productAdminQuestionListLoading = false;
        draft.st_productAdminQuestionListDone = true;
        draft.productAdminQuestionList = action.data;
        break;
      }
      case PRODUCT_ADMIN_QUESTION_LIST_FAILURE: {
        draft.st_productAdminQuestionListLoading = false;
        draft.st_productAdminQuestionListDone = false;
        draft.st_productAdminQuestionListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case PRODUCT_QUESTION_NOT_USER_CREATE_REQUEST: {
        draft.st_productQuestionNotUserCreateLoading = true;
        draft.st_productQuestionNotUserCreateDone = null;
        draft.st_productQuestionNotUserCreateError = false;
        break;
      }
      case PRODUCT_QUESTION_NOT_USER_CREATE_SUCCESS: {
        draft.st_productQuestionNotUserCreateLoading = false;
        draft.st_productQuestionNotUserCreateDone = true;
        break;
      }
      case PRODUCT_QUESTION_NOT_USER_CREATE_FAILURE: {
        draft.st_productQuestionNotUserCreateLoading = false;
        draft.st_productQuestionNotUserCreateDone = false;
        draft.st_productQuestionNotUserCreateError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case PRODUCT_QUESTION_LIST_PROD_REQUEST: {
        draft.st_productQuestionListProdLoading = true;
        draft.st_productQuestionListProdDone = null;
        draft.st_productQuestionListProdError = false;
        break;
      }
      case PRODUCT_QUESTION_LIST_PROD_SUCCESS: {
        draft.st_productQuestionListProdLoading = false;
        draft.st_productQuestionListProdDone = true;
        draft.productQuestionListProd = action.data.questions;
        draft.productQuestionListProdLastPage = action.data.lastPage;
        draft.productQuestionListProdLen = action.data.questionLen;

        break;
      }
      case PRODUCT_QUESTION_LIST_PROD_FAILURE: {
        draft.st_productQuestionListProdLoading = false;
        draft.st_productQuestionListProdDone = false;
        draft.st_productQuestionListProdError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////

      case PRODUCT_QUESTION_MY_LIST_REQUEST: {
        draft.st_productQuestionMyListLoading = true;
        draft.st_productQuestionMyListDone = null;
        draft.st_productQuestionMyListError = false;
        break;
      }
      case PRODUCT_QUESTION_MY_LIST_SUCCESS: {
        draft.st_productQuestionMyListLoading = false;
        draft.st_productQuestionMyListDone = true;
        draft.productQuestionMyList = action.data;
        break;
      }
      case PRODUCT_QUESTION_MY_LIST_FAILURE: {
        draft.st_productQuestionMyListLoading = false;
        draft.st_productQuestionMyListDone = false;
        draft.st_productQuestionMyListError = action.error;
        break;
      }

      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case CREATE_MODAL_TOGGLE: {
        draft.createModal = !draft.createModal;
        break;
      }

      case UNIT_MODAL_TOGGLE: {
        draft.unitModal = !draft.unitModal;
        break;
      }

      case PROD_COMPANY_MODAL_TOGGLE: {
        draft.prodCompanyModal = !draft.prodCompanyModal;
        break;
      }

      case PROD_COMPANY_CREATE_MODAL_TOGGLE: {
        draft.prodCompanyCreateModal = !draft.prodCompanyCreateModal;
        break;
      }

      case PRODUCT_IMAGE_PATH: {
        draft.productImagePath = action.data;
        break;
      }

      case PRODUCT_DETAIL_IMAGE_PATH: {
        draft.productDetailImagePath = action.data;
        break;
      }

      case RESET_PRODUCT_REQUEST: {
        draft.st_productQuestionNotUserCreateDone = false;
        draft.st_productQuestionCreateDone = false;
        break;
      }
    }
  });

export default reducer;
