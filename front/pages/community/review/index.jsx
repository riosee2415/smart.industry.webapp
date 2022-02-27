import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Head from "next/head";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import { Empty, message, Pagination } from "antd";
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
} from "../../../components/commonComponents";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import {
  REVIEW_HIT_REQUEST,
  REVIEW_LIST_REQUEST,
} from "../../../reducers/review";

const CustomPagination = styled(Pagination)`
  margin: 0 0 60px;
  & .ant-pagination-item-active {
    border: none;
  }
`;

const Review = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const { reviewList, maxPage, st_reviewHitDone, st_reviewHitError } =
    useSelector((state) => state.review);

  console.log(reviewList);

  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////

  const dispatch = useDispatch();

  const [datum, setDatum] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);

  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (st_reviewHitDone) {
      dispatch({
        type: REVIEW_LIST_REQUEST,
      });
    }
  }, [st_reviewHitDone]);

  useEffect(() => {
    if (st_reviewHitError) {
      dispatch({
        type: REVIEW_LIST_REQUEST,
      });
    }
  }, [st_reviewHitError]);

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
        qs: queryString || "",
      },
    });
  }, []);

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

            <Wrapper margin={width < 700 ? `0 0 40px` : `0 0 180px`}>
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
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Review;
