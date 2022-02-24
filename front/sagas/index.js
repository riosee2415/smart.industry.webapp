import { all, fork } from "redux-saga/effects";
import bannerSaga from "./banner";
import userSaga from "./user";
import popupSaga from "./popup";
import companySaga from "./company";
import noticeSage from "./notice";
import gallerySage from "./gallery";
import questionSage from "./question";
import accept from "./accept";
import seoSaga from "./seo";
import editSaga from "./editor";
import menuSaga from "./menu";
import categorySaga from "./category";
import productSaga from "./product";
import faqSaga from "./faq";
import interestSaga from "./interest";
//
import axios from "axios";
import backURL from "../config/config";

axios.defaults.baseURL = backURL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(bannerSaga),
    fork(userSaga),
    fork(popupSaga),
    fork(companySaga),
    fork(noticeSage),
    fork(gallerySage),
    fork(questionSage),
    fork(accept),
    fork(seoSaga),
    fork(editSaga),
    fork(menuSaga),
    fork(categorySaga),
    fork(productSaga),
    fork(faqSaga),
    fork(interestSaga),
  ]);
}
