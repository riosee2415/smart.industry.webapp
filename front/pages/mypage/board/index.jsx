import React from "react";
import ClientLayout from "../../../components/ClientLayout";
import { SEO_LIST_REQUEST } from "../../../reducers/seo";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import { useCallback } from "react";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import { useRouter } from "next/dist/client/router";
import { QUESTION_MY_LIST_REQUEST } from "../../../reducers/question";
import { useEffect } from "react";
import { Empty, Pagination } from "antd";
import styled from "styled-components";
import { useState } from "react";

const CustomPagination = styled(Pagination)`
  margin: 0 0 110px;

  & .ant-pagination-item-active {
    border: none;
  }
`;

const Board = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const { myQuestions, maxPage } = useSelector((state) => state.question);

  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const getQs = () => {
    const qs = router.query;

    let value = "";

    if (!qs.page) {
      setCurrentPage(1);
      value = "?page=1";
    } else {
      setCurrentPage(qs.page);
      value = `?page=${qs.page}`;
    }

    if (qs.search) {
      value += `&search=${qs.search}`;
    }

    return value;
  };

  ////// HOOKS //////
  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    const qs = getQs();
    dispatch({
      type: QUESTION_MY_LIST_REQUEST,
      data: {
        qs,
      },
    });
  }, [router.query]);
  ////// TOGGLE //////
  const otherPageCall = useCallback((changePage) => {
    setCurrentPage(changePage);
    const queryString = `?page=${changePage}`;

    dispatch({
      type: QUESTION_MY_LIST_REQUEST,
      data: {
        qs: queryString || "",
      },
    });
  }, []);
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
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
                onClick={() => moveLinkHandler(`/mypage`)}
                cursor={`pointer`}
              >
                마이페이지
              </Wrapper>
              |
              <Wrapper
                width={`auto`}
                margin={`0 8px`}
                onClick={() => moveLinkHandler(`/mypage/board`)}
                cursor={`pointer`}
              >
                1:1 문의내역
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
              1:1문의내역
            </Wrapper>
            <Wrapper margin={`0 0 60px`}>
              <Wrapper
                bgColor={Theme.lightGrey2_C}
                height={`40px`}
                borderTop={`1px solid ${Theme.grey2_C}`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                <Wrapper width={`70%`}>제목</Wrapper>
                <Wrapper width={`15%`}>작성일</Wrapper>
                <Wrapper width={`15%`}>답변여부</Wrapper>
              </Wrapper>
              <Wrapper ju={`flex-start`}>
                {myQuestions && myQuestions.length === 0 ? (
                  <Empty description="문의내역이 없습니다." />
                ) : (
                  myQuestions &&
                  myQuestions.myList.map((data) => {
                    return (
                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        padding={`14px 0px`}
                        cursor={`pointer`}
                        borderBottom={`1px solid ${Theme.grey2_C}`}
                        onClick={() =>
                          moveLinkHandler(`./board/detail/${data.id}`)
                        }
                      >
                        <Wrapper
                          al={`flex-start`}
                          padding={`0 20px`}
                          width={`70%`}
                        >
                          {data.title}
                        </Wrapper>
                        <Wrapper width={`15%`}>
                          {data.createdAt.substring(0, 10)}
                        </Wrapper>
                        <Wrapper width={`15%`}>
                          {data.isCompleted ? "답변완료" : "답변대기"}
                        </Wrapper>
                      </Wrapper>
                    );
                  })
                )}
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Board;
