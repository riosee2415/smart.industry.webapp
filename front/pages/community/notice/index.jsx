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
  Text,
} from "../../../components/commonComponents";
import { useCallback } from "react";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import { useRouter } from "next/dist/client/router";
import { NOTICE_LIST_REQUEST } from "../../../reducers/notice";
import { useEffect } from "react";
import { useState } from "react";
import { Empty, Pagination } from "antd";
import styled from "styled-components";

const CustomPagination = styled(Pagination)`
  & .ant-pagination-item-active {
    border: none;
  }
`;

const Notice = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const { notices, maxPage } = useSelector((state) => state.notice);

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
      type: NOTICE_LIST_REQUEST,
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
      type: NOTICE_LIST_REQUEST,
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
                onClick={() => moveLinkHandler(`/community/faq`)}
                cursor={`pointer`}
              >
                커뮤니티
              </Wrapper>
              |
              <Wrapper
                width={`auto`}
                margin={`0 8px`}
                onClick={() => moveLinkHandler(`/community/notice`)}
                cursor={`pointer`}
              >
                공지사항
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
              공지사항
            </Wrapper>

            <Wrapper margin={`0 0 60px`}>
              <Wrapper
                bgColor={Theme.lightGrey2_C}
                height={`40px`}
                borderTop={`1px solid ${Theme.grey2_C}`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                <Wrapper width={width < 500 ? `10%` : `5%`}>번호</Wrapper>
                <Wrapper width={width < 800 ? `60%` : `65%`}>제목</Wrapper>
                <Wrapper display={width < 500 ? `none` : `flex`} width={`10%`}>
                  작성자
                </Wrapper>
                <Wrapper
                  width={width < 500 ? `30%` : width < 800 ? `15%` : `10%`}
                >
                  작성일
                </Wrapper>
                <Wrapper display={width < 500 ? `none` : `flex`} width={`10%`}>
                  조회수
                </Wrapper>
              </Wrapper>
              <Wrapper ju={`flex-start`} margin={`0 0 180px`}>
                {notices && notices.length === 0 ? (
                  <Empty description="공지사항이 없습니다." />
                ) : (
                  notices &&
                  notices.map((data) => {
                    return (
                      <Wrapper
                        dr={`row`}
                        ju={`flex-start`}
                        padding={`14px 0px`}
                        cursor={`pointer`}
                        borderBottom={`1px solid ${Theme.grey2_C}`}
                        onClick={() =>
                          moveLinkHandler(`./notice/detail/${data.id}`)
                        }
                      >
                        <Wrapper width={width < 500 ? `10%` : `5%`}>
                          {data.id}
                        </Wrapper>
                        <Text
                          al={`flex-start`}
                          padding={`0 20px`}
                          width={width < 800 ? `60%` : `65%`}
                          isEllipsis={true}
                        >
                          {data.title}
                        </Text>
                        <Wrapper
                          display={width < 500 ? `none` : `flex`}
                          width={`10%`}
                        >
                          {data.author}
                        </Wrapper>
                        <Wrapper
                          width={
                            width < 500 ? `30%` : width < 800 ? `15%` : `10%`
                          }
                        >
                          {data.createdAt.substring(0, 10)}
                        </Wrapper>
                        <Wrapper
                          display={width < 500 ? `none` : `flex`}
                          width={`10%`}
                        >
                          {data.hit}
                        </Wrapper>
                      </Wrapper>
                    );
                  })
                )}
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
            </Wrapper>
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

export default Notice;
