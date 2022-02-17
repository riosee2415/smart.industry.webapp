import React from "react";
import ClientLayout from "../../../components/ClientLayout";
import { SEO_LIST_REQUEST } from "../../../reducers/seo";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import { useCallback } from "react";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import { useRouter } from "next/dist/client/router";

const Notice = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////
  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);
  ////// DATAVIEW //////
  const testNotice = [
    {
      id: 1,
      title: "공지사항 1번입니다.",
      createdAt: "2022-02-15-00:00",
      hit: "322",
    },
    {
      id: 2,
      title: "공지사항 2번입니다.",
      createdAt: "2022-02-15-00:00",
      hit: "123",
    },
    {
      id: 3,
      title: "공지사항 3번입니다.",
      createdAt: "2022-02-15-00:00",
      hit: "23",
    },
    {
      id: 4,
      title: "공지사항 4번입니다.",
      createdAt: "2022-02-15-00:00",
      hit: "341",
    },
  ];

  return (
    <>
      <Head>
        <title>{seo_title.length < 1 ? "ALAL" : seo_title[0].content}</title>

        <meta
          name="subject"
          content={seo_title.length < 1 ? "ALAL" : seo_title[0].content}
        />
        <meta
          name="title"
          content={seo_title.length < 1 ? "ALAL" : seo_title[0].content}
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
          content={seo_title.length < 1 ? "ALAL" : seo_title[0].content}
        />
        <meta
          property="og:site_name"
          content={seo_title.length < 1 ? "ALAL" : seo_title[0].content}
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
          <RsWrapper margin={`300px 0 0`}>
            <Wrapper margin={`40px 0 25px`} al={`flex-start`}>
              HOME | 커뮤니티 | 공지사항
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
              <Wrapper ju={`flex-start`}>
                {testNotice && testNotice.length === 0
                  ? ``
                  : testNotice &&
                    testNotice.reverse().map((data) => {
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
                          <Wrapper
                            al={`flex-start`}
                            padding={`0 20px`}
                            width={width < 800 ? `60%` : `65%`}
                          >
                            {data.title}
                          </Wrapper>
                          <Wrapper
                            display={width < 500 ? `none` : `flex`}
                            width={`10%`}
                          >
                            관리자
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
                    })}
              </Wrapper>
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
