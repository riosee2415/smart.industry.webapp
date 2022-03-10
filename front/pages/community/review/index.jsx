import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Head from "next/head";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import { Empty, message, Pagination, Select } from "antd";
import { useRouter } from "next/dist/client/router";
import ClientLayout from "../../../components/ClientLayout";
import { SEO_LIST_REQUEST } from "../../../reducers/seo";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Image,
  TextInput,
  CommonButton,
} from "../../../components/commonComponents";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import {
  REVIEW_HIT_REQUEST,
  REVIEW_LIST_REQUEST,
} from "../../../reducers/review";
import useInput from "../../../hooks/useInput";

const CustomPagination = styled(Pagination)`
  margin: 40px 0 60px;
  & .ant-pagination-item-active {
    border: none;
  }
`;

const Review = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const { reviewList, maxPage, st_reviewHitDone } = useSelector(
    (state) => state.review
  );

  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////

  const dispatch = useDispatch();

  const [datum, setDatum] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchType, setSearchType] = useState(null);

  const searchInput = useInput(``);

  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (st_reviewHitDone) {
      dispatch({
        type: REVIEW_LIST_REQUEST,
        data: {
          page: currentPage ? currentPage : 1,
          searchTitle: "",
          searchAuthor: "",
        },
      });
    }
  }, [st_reviewHitDone]);

  useEffect(() => {
    if (datum) {
      dispatch({
        type: REVIEW_HIT_REQUEST,
        data: {
          id: datum.id,
        },
      });
    }
  }, [datum]);

  useEffect(() => {
    dispatch({
      type: REVIEW_LIST_REQUEST,
      data: {
        page: currentPage ? currentPage : 1,
        searchTitle: searchType === "제목" ? searchInput.value : "",
        searchAuthor: searchType === "작성자" ? searchInput.value : "",
      },
    });
  }, [searchType]);

  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const onClickToggleHandler = useCallback(
    (data) => {
      setDatum(data);

      if (datum && datum.id === data.id) {
        setDatum(null);
      }
    },
    [datum]
  );

  const otherPageCall = useCallback((changePage) => {
    setCurrentPage(changePage);

    dispatch({
      type: REVIEW_LIST_REQUEST,
      data: {
        page: parseInt(changePage),
        searchTitle: "",
        searchAuthor: "",
      },
    });
  }, []);

  const selectValueHandler = useCallback(
    (type) => {
      setSearchType(type);
    },
    [searchType]
  );

  const searchButtonHanlder = useCallback(() => {
    if (datum) {
      setDatum(null);
    }
    dispatch({
      type: REVIEW_LIST_REQUEST,
      data: {
        page: 1,
        searchTitle: searchType === "제목" ? searchInput.value : "",
        searchAuthor: searchType === "작성자" ? searchInput.value : "",
      },
    });
  }, [searchType, searchInput.value, datum]);

  ////// DATAVIEW //////

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
            seo_desc.length < 1
              ? "대한민국 No.1 친환경 건설장비 전문기업 건설기계 제조/판매/임대/수리"
              : seo_desc[0].content
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
            seo_desc.length < 1
              ? "대한민국 No.1 친환경 건설장비 전문기업 건설기계 제조/판매/임대/수리"
              : seo_desc[0].content
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
          <RsWrapper margin={width < 700 ? `80px 0 0` : `250px 0 0`}>
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
                onClick={() => moveLinkHandler(`/community/review`)}
                cursor={`pointer`}
              >
                상품후기
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
              상품후기
            </Wrapper>

            <Wrapper margin={`0 0 40px`}>
              <Wrapper
                dr={`row`}
                bgColor={Theme.lightGrey2_C}
                height={`40px`}
                borderTop={`1px solid ${Theme.grey2_C}`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                <Wrapper
                  fontSize={width < 700 && `12px`}
                  width={width < 700 ? `7%` : `5%`}
                >
                  번호
                </Wrapper>
                <Wrapper
                  fontSize={width < 700 && `12px`}
                  width={width < 700 ? `20%` : `15%`}
                >
                  상품명
                </Wrapper>
                <Wrapper
                  fontSize={width < 700 && `12px`}
                  width={width < 700 ? `25%` : `50%`}
                >
                  제목
                </Wrapper>
                <Wrapper
                  fontSize={width < 700 && `12px`}
                  width={width < 700 ? `15%` : `10%`}
                >
                  작성자
                </Wrapper>
                <Wrapper
                  fontSize={width < 700 && `12px`}
                  width={width < 700 ? `22%` : `10%`}
                >
                  작성일
                </Wrapper>
                <Wrapper
                  fontSize={width < 700 && `12px`}
                  width={width < 700 ? `10%` : `10%`}
                >
                  조회수
                </Wrapper>
              </Wrapper>
              {reviewList &&
                (reviewList.length === 0 ? (
                  <Wrapper margin={`100px 0`}>
                    <Empty description="후기가 없습니다." />
                  </Wrapper>
                ) : (
                  reviewList.map((data, idx) => {
                    return (
                      <Wrapper ju={`flex-start`}>
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          padding={`14px 0px`}
                          cursor={`pointer`}
                          borderBottom={`1px solid ${Theme.grey2_C}`}
                          onClick={() => onClickToggleHandler(data)}
                        >
                          <Wrapper width={width < 700 ? `7%` : `5%`}>
                            {data.id}
                          </Wrapper>
                          <Wrapper
                            fontSize={width < 700 && `12px`}
                            width={width < 700 ? `20%` : `15%`}
                            dr={width < 900 ? `column` : `row`}
                          >
                            <Image
                              width={`50px`}
                              height={`50px`}
                              src={data.Product.thumbnail}
                            />
                            <Wrapper
                              width={width < 900 ? `100%` : `calc(100% - 50px)`}
                              al={`flex-start`}
                              padding={`0 0 0 10px`}
                            >
                              {data.Product.title}
                            </Wrapper>
                          </Wrapper>
                          <Wrapper
                            fontSize={width < 700 && `12px`}
                            width={width < 700 ? `25%` : `50%`}
                            al={`flex-start`}
                          >
                            {data.title}
                          </Wrapper>
                          <Wrapper
                            fontSize={width < 700 && `12px`}
                            width={width < 700 ? `15%` : `10%`}
                          >
                            {data.author}
                          </Wrapper>
                          <Wrapper
                            fontSize={width < 700 && `12px`}
                            width={width < 700 ? `22%` : `10%`}
                          >
                            {data.createdAt.substring(0, 10)}
                          </Wrapper>
                          <Wrapper
                            fontSize={width < 700 && `12px`}
                            width={width < 700 ? `10%` : `10%`}
                          >
                            {data.hit}
                          </Wrapper>
                        </Wrapper>

                        {datum && datum.id === data.id && (
                          <Wrapper borderBottom={`1px solid ${Theme.grey2_C}`}>
                            <Wrapper width={`90%`}>
                              <Image
                                width={width < 700 ? `100%` : `600px`}
                                height={width < 700 ? `100%` : `600px`}
                                src={data.imagePath}
                              />
                            </Wrapper>
                            <Wrapper
                              width={`90%`}
                              al={`flex-start`}
                              padding={`60px 0 40px`}
                            >
                              {data.content}
                            </Wrapper>
                          </Wrapper>
                        )}
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
              <Wrapper width={`74px`} display={width < 700 ? `none` : `flex`}>
                검색어
              </Wrapper>

              <Wrapper
                dr={`row`}
                width={width < 700 ? `20%` : `100px`}
                ju={width < 700 ? `center` : `flex-start`}
              >
                <Select
                  style={{
                    width: `100px`,
                  }}
                  defaultValue={searchType}
                  onChange={selectValueHandler}
                >
                  <Select.Option value={"제목"}>제목</Select.Option>
                  <Select.Option value={"작성자"}>작성자</Select.Option>
                </Select>
              </Wrapper>

              <Wrapper
                dr={`row`}
                width={width < 700 ? `80%` : `calc(100% - 180px)`}
                ju={`flex-start`}
              >
                <TextInput
                  width={width < 700 ? `calc(80% - 50px)` : `261px`}
                  height={`100%`}
                  margin={`0 10px 0 26px`}
                  border={`1px solid ${Theme.grey2_C}`}
                  {...searchInput}
                />
                <CommonButton
                  width={width < 700 ? `20%` : `74px`}
                  height={`42px`}
                  radius={`0`}
                  onClick={searchButtonHanlder}
                >
                  찾기
                </CommonButton>
              </Wrapper>
            </Wrapper>
            <CustomPagination
              size="small"
              defaultCurrent={1}
              current={parseInt(currentPage)}
              total={maxPage * 10}
              onChange={(page) => otherPageCall(page)}
              showQuickJumper={false}
              showSizeChanger={false}
            />
          </RsWrapper>
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

    context.store.dispatch({
      type: REVIEW_LIST_REQUEST,
      data: {
        page: 1,
        searchTitle: "",
        searchAuthor: "",
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Review;
