import React, { useState } from "react";
import ClientLayout from "../../../components/ClientLayout";
import { SEO_LIST_REQUEST } from "../../../reducers/seo";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import {
  CommonButton,
  RsWrapper,
  TextInput,
  WholeWrapper,
  Wrapper,
  Image,
  Text,
} from "../../../components/commonComponents";

import { useCallback } from "react";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import {
  PRODUCT_QUESTION_LIST_REQUEST,
  PRODUCT_QUESTION_MY_LIST_REQUEST,
} from "../../../reducers/product";
import { message, Modal, Select, Pagination, Empty } from "antd";
import styled from "styled-components";
import useOnlyNumberInput from "../../../hooks/useOnlyNumberInput";
import useInput from "../../../hooks/useInput";

const CustomModal = styled(Modal)`
  & .ant-modal-content {
    top: 250px;
  }
`;

const CustomPagination = styled(Pagination)`
  & .ant-pagination-item {
    border: none;
  }

  & .ant-pagination-item-active {
    border-bottom: 1px solid ${Theme.basicTheme_C} !important;
  }

  & .ant-pagination-item-link {
    border: none;
  }
`;

const Notice = () => {
  const dispatch = useDispatch();
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const { me } = useSelector((state) => state.user);

  const {
    productQuestionList,
    productQuestionListLastPage,
    productQuestionListLen,

    productQuestionMyList,
    st_productQuestionMyListDone,
    st_productQuestionMyListError,

    st_productQuestionListDone,
    st_productQuestionListError,
    st_productQuestionDetailDone,
    st_productQuestionDetailError,
  } = useSelector((state) => state.product);

  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////

  const inputSecret = useOnlyNumberInput();

  const inputSearch = useInput("");
  const [selectValue, setSelectValue] = useState("제목");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [code, setCode] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [prodQnAList, setProdQnAList] = useState([]);

  const [toggle, setToggle] = useState(false);
  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    dispatch({
      type: PRODUCT_QUESTION_LIST_REQUEST,
      data: {
        listType: 3,
        searchTitle: "",
        searchAuthor: "",
        page: 1,
      },
    });
  }, []);

  useEffect(() => {
    if (st_productQuestionListDone) {
      setProdQnAList(productQuestionList);
    }
  }, [st_productQuestionListDone]);

  useEffect(() => {
    if (st_productQuestionMyListDone) {
      setProdQnAList(productQuestionMyList);
    }
  }, [st_productQuestionMyListDone]);

  useEffect(() => {
    if (st_productQuestionMyListError) {
      return message.error(st_productQuestionMyListError);
    }
  }, [st_productQuestionMyListError]);

  useEffect(() => {
    if (st_productQuestionDetailError) {
      return message.error(st_productQuestionDetailError);
    }
  }, [st_productQuestionDetailError]);

  useEffect(() => {
    if (st_productQuestionListError) {
      return message.error(st_productQuestionListError);
    }
  }, [st_productQuestionListError]);

  ////// TOGGLE //////
  ////// HANDLER //////
  const ModalToggle = useCallback(() => {
    setIsModalVisible(!isModalVisible);
  }, [isModalVisible]);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const onClickDetailHanlder = useCallback((data) => {
    if (data.isSecret) {
      ModalToggle();
    } else {
      moveLinkHandler(`/community/productQnA/detail/${data.id}`);
    }
    setCode(data.secret);
    setId(data.id);
  }, []);

  const ModalHandleOk = useCallback(() => {
    if (!inputSecret.value) {
      return message.error("비밀번호를 입력해주세요.");
    } else {
      if (code === inputSecret.value) {
        moveLinkHandler(
          `/community/productQnA/detail/${id}?Code=${code ? code : ""}`
        );

        ModalToggle();
        inputSecret.setValue("");
        return message.success("비밀번호를 확인했습니다.");
      } else {
        return message.error("비밀번호가 틀렸습니다.");
      }
    }
  }, [isModalVisible, inputSecret.value]);

  const searchButtonHanlder = useCallback(() => {
    dispatch({
      type: PRODUCT_QUESTION_LIST_REQUEST,
      data: {
        listType: 3,
        searchTitle: selectValue === "제목" ? inputSearch.value : "",
        searchAuthor: selectValue === "작성자" ? inputSearch.value : "",
        page: 1,
      },
    });
  }, [inputSearch.value, selectValue]);

  const selectValueHandler = useCallback((e) => {
    setSelectValue(e);
  }, []);

  const myListHandler = useCallback(() => {
    setToggle(true);
    dispatch({
      type: PRODUCT_QUESTION_MY_LIST_REQUEST,
    });
  }, []);

  const ListbackHanlder = useCallback(() => {
    setToggle(false);
    dispatch({
      type: PRODUCT_QUESTION_LIST_REQUEST,
      data: {
        listType: 3,
        searchTitle: "",
        searchAuthor: "",
        page: 1,
      },
    });
  }, [selectValue, inputSearch.value]);

  const ModalHandlerCancel = useCallback(() => {
    ModalToggle();

    inputSecret.setValue("");
  }, [isModalVisible]);

  const onChangePageHandler = useCallback((page) => {
    setCurrentPage(page);

    dispatch({
      type: PRODUCT_QUESTION_LIST_REQUEST,
      data: {
        listType: 3,
        searchTitle: "",
        page,
      },
    });
  }, []);

  ////// DATAVIEW //////
  // const testNotice = [
  //   {
  //     id: 1,
  //     title: "상품문의",
  //     createdAt: "2022-02-15-00:00",
  //     hit: "322",
  //     thumbnail:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxza-raAsJHK8wZ03T55ti77CChtEvLRpCQ&usqp=CAU",
  //     productName: "상품명",
  //   },
  //   {
  //     id: 2,
  //     title: "상품문의[답변완료]",
  //     createdAt: "2022-02-15-00:00",
  //     hit: "123",
  //     thumbnail:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxza-raAsJHK8wZ03T55ti77CChtEvLRpCQ&usqp=CAU",
  //     productName: "상품명",
  //   },
  // ];

  return (
    <>
      <Head>
        <title>
          {seo_title.length < 1 ? "대한기계공구(주)" : seo_title[0].content}
        </title>

        <meta
          name="subject"
          content={
            seo_title.length < 1 ? "대한기계공구(주)" : seo_title[0].content
          }
        />
        <meta
          name="title"
          content={
            seo_title.length < 1 ? "대한기계공구(주)" : seo_title[0].content
          }
        />
        <meta name="keywords" content={seo_keywords} />
        <meta
          name="description"
          content={
            seo_desc.length < 1 ? "undefined description" : seo_desc[0].content
          }
        />
        {/* <!-- OG tag  --> */}
        <meta
          property="og:title"
          content={
            seo_title.length < 1 ? "대한기계공구(주)" : seo_title[0].content
          }
        />
        <meta
          property="og:site_name"
          content={
            seo_title.length < 1 ? "대한기계공구(주)" : seo_title[0].content
          }
        />
        <meta
          property="og:description"
          content={
            seo_desc.length < 1 ? "undefined description" : seo_desc[0].content
          }
        />
        <meta property="og:keywords" content={seo_keywords} />
        <meta
          property="og:image"
          content={seo_ogImage.length < 1 ? "" : seo_ogImage[0].content}
        />
      </Head>

      <ClientLayout>
        <WholeWrapper>
          <RsWrapper margin={`250px 0 0`}>
            <Wrapper margin={`40px 0 25px`} ju={`flex-start`} dr={`row`}>
              <Wrapper
                width={`auto`}
                margin={`0 8px 0 0`}
                onClick={() => moveLinkHandler(`/`)}
                cursor={`pointer`}
              >
                HOME
              </Wrapper>
              |
              <Wrapper
                width={`auto`}
                margin={`0 8px`}
                onClick={() => moveLinkHandler(`/community/faq`)}
                cursor={`pointer`}
              >
                커뮤니티
              </Wrapper>
              |
              <Wrapper
                width={`auto`}
                margin={`0 8px`}
                onClick={() => moveLinkHandler(`/community/productQnA`)}
                cursor={`pointer`}
              >
                상품문의
              </Wrapper>
            </Wrapper>
            <Wrapper
              fontSize={`20px`}
              fontWeight={`bold`}
              al={`flex-start`}
              padding={`0 0 10px`}
              borderBottom={`1px solid ${Theme.grey2_C}`}
              margin={`0 0 40px`}
            >
              상품문의
            </Wrapper>

            <Wrapper margin={`0 0 180px`}>
              <Wrapper
                bgColor={Theme.lightGrey2_C}
                height={`40px`}
                borderTop={`1px solid ${Theme.grey2_C}`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                <Wrapper width={`5%`} display={width < 500 ? `none` : `flex`}>
                  번호
                </Wrapper>
                <Wrapper width={width < 500 ? `30%` : `20%`}>상품명</Wrapper>
                <Wrapper
                  width={width < 500 ? `45%` : width < 800 ? `40%` : `45%`}
                >
                  제목
                </Wrapper>
                <Wrapper width={`10%`} display={width < 500 ? `none` : `flex`}>
                  작성자
                </Wrapper>
                <Wrapper
                  width={width < 500 ? `25%` : width < 800 ? `15%` : `10%`}
                >
                  작성일
                </Wrapper>
                <Wrapper width={`10%`} display={width < 500 ? `none` : `flex`}>
                  조회수
                </Wrapper>
              </Wrapper>
              <Wrapper ju={`flex-start`}>
                {prodQnAList &&
                  (prodQnAList.length === 0 ? (
                    <Wrapper margin={`50px 0`}>
                      <Empty description="상품문의가 없습니다." />
                    </Wrapper>
                  ) : (
                    prodQnAList.map((data) => {
                      return (
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          padding={`14px 0px`}
                          cursor={`pointer`}
                          borderBottom={`1px solid ${Theme.grey2_C}`}
                          onClick={() => onClickDetailHanlder(data)}
                        >
                          <Wrapper
                            width={`5%`}
                            display={width < 500 ? `none` : `flex`}
                          >
                            {data.id}
                          </Wrapper>
                          <Wrapper
                            width={width < 500 ? `30%` : `20%`}
                            dr={`row`}
                          >
                            <Image
                              width={width < 500 ? `40px` : `50px`}
                              height={width < 500 ? `40px` : `50px`}
                              src={data.Product.thumbnail}
                            />
                            <Wrapper
                              width={`calc(100% - 50px)`}
                              al={`flex-start`}
                              padding={`0 0 0 10px`}
                            >
                              {data.Product.title}
                            </Wrapper>
                          </Wrapper>
                          <Wrapper
                            width={
                              width < 500 ? `45%` : width < 800 ? `40%` : `45%`
                            }
                            ju={`flex-start`}
                            dr={`row`}
                          >
                            <Wrapper width={`auto`} margin={`0 17px 0 0`}>
                              {data.title}
                            </Wrapper>
                            <Wrapper width={`10px`} height={`10px`}>
                              {data.isSecret && (
                                <Image
                                  height={`100%`}
                                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/question/icon_lock.png`}
                                />
                              )}
                            </Wrapper>
                          </Wrapper>
                          <Wrapper
                            width={`10%`}
                            display={width < 500 ? `none` : `flex`}
                          >
                            {data.author}
                          </Wrapper>
                          <Wrapper
                            width={
                              width < 500 ? `25%` : width < 800 ? `15%` : `10%`
                            }
                          >
                            {data.createdAt.substring(0, 10)}
                          </Wrapper>
                          <Wrapper
                            width={`10%`}
                            display={width < 500 ? `none` : `flex`}
                          >
                            {data.hit}
                          </Wrapper>
                        </Wrapper>
                      );
                    })
                  ))}
              </Wrapper>
              <Wrapper
                margin={`40px 0 0`}
                dr={`row`}
                height={`40px`}
                ju={`flex-start`}
              >
                <Wrapper width={`74px`} display={width < 500 ? `none` : `flex`}>
                  검색어
                </Wrapper>

                <Wrapper
                  dr={`row`}
                  width={`350px`}
                  ju={width < 500 ? `center` : `flex-start`}
                >
                  <Select
                    defaultValue="전체"
                    margin={`0 10px 0 0`}
                    width={`100px`}
                    style={{
                      margin: "0 10px 0 0",
                      width: `100px`,
                    }}
                  >
                    <Select.Option value={"전체"}>전체</Select.Option>;
                  </Select>
                  <Select
                    style={{
                      width: `100px`,
                    }}
                    defaultValue={selectValue}
                    onChange={(e) => selectValueHandler(e)}
                  >
                    <Select.Option value={"제목"}>제목</Select.Option>
                    <Select.Option value={"작성자"}>작성자</Select.Option>
                  </Select>
                </Wrapper>

                {width > 800 && (
                  <Wrapper
                    dr={`row`}
                    width={`calc(100% -  350px - 40px - 74px)`}
                    ju={`flex-start`}
                  >
                    <TextInput
                      width={`261px`}
                      height={`100%`}
                      margin={width < 500 ? `0 10px 0 0` : `0 10px 0 26px`}
                      border={`1px solid ${Theme.grey2_C}`}
                      onKeyDown={(e) =>
                        e.key === "Enter" && searchButtonHanlder()
                      }
                      {...inputSearch}
                    />
                    <CommonButton
                      width={`74px`}
                      height={`100%`}
                      radius={`0`}
                      onClick={() => searchButtonHanlder()}
                    >
                      찾기
                    </CommonButton>
                  </Wrapper>
                )}
              </Wrapper>

              {width < 800 && (
                <Wrapper
                  margin={`15px 0 0 0`}
                  al={width < 800 ? `flex-start` : `flex-end`}
                  dr={width < 800 ? `row` : `column`}
                >
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <TextInput
                      width={`calc(100% - 74px - 10px)`}
                      height={`100%`}
                      margin={width < 500 ? `0 10px 0 0` : `0 10px 0 0px`}
                      border={`1px solid ${Theme.grey2_C}`}
                    />
                    <CommonButton
                      width={`74px`}
                      height={`100%`}
                      radius={`0`}
                      onClick={() => searchButtonHanlder()}
                    >
                      찾기
                    </CommonButton>
                  </Wrapper>
                </Wrapper>
              )}

              {!st_productQuestionMyListDone && (
                <Wrapper margin={`50px 0 0 0`}>
                  <CustomPagination
                    total={productQuestionListLastPage * 10}
                    onChange={onChangePageHandler}
                    current={currentPage}
                  />
                </Wrapper>
              )}

              {me && (
                <>
                  {toggle ? (
                    <Wrapper al={`flex-end`} margin={`30px 0 0 0`}>
                      <CommonButton
                        width={`100px`}
                        height={`100%`}
                        onClick={() => ListbackHanlder()}
                      >
                        뒤로가기
                      </CommonButton>
                    </Wrapper>
                  ) : (
                    <Wrapper al={`flex-end`} margin={`30px 0 0 0`}>
                      <CommonButton
                        width={`100px`}
                        height={`100%`}
                        onClick={() => myListHandler()}
                      >
                        내가 쓴 글
                      </CommonButton>
                    </Wrapper>
                  )}
                </>
              )}
            </Wrapper>
          </RsWrapper>

          <CustomModal
            title="비밀글 입력"
            visible={isModalVisible}
            onOk={() => ModalHandleOk()}
            onCancel={() => ModalHandlerCancel()}
            okText="확인"
            cancelText="취소"
          >
            <Wrapper dr={`row`}>
              <Text width={`80px`}>비밀번호</Text>
              <TextInput
                placeholder="비밀글 비밀번호를 입력해주세요."
                width={`calc(100% - 80px)`}
                {...inputSecret}
              />
            </Wrapper>
          </CustomModal>
        </WholeWrapper>
      </ClientLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch({
      type: SEO_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Notice;
