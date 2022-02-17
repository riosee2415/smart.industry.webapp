import React from "react";
import ClientLayout from "../../../../components/ClientLayout";
import { SEO_LIST_REQUEST } from "../../../../reducers/seo";
import Head from "next/head";
import wrapper from "../../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import {
  CommonButton,
  RsWrapper,
  WholeWrapper,
  Wrapper,
} from "../../../../components/commonComponents";
import { useCallback } from "react";
import useWidth from "../../../../hooks/useWidth";
import Theme from "../../../../components/Theme";
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
  const moveHandler = useCallback(() => {
    router.push(`/community/notice`);
  }, []);
  ////// DATAVIEW //////

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
          <RsWrapper margin={`250px 0 0`}>
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

            <Wrapper borderBottom={`1px solid ${Theme.grey2_C}`}>
              <Wrapper
                padding={`16px 0`}
                dr={`row`}
                borderTop={`1px solid ${Theme.grey2_C}`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                <Wrapper
                  width={width < 500 ? `30%` : `10%`}
                  bgColor={Theme.lightGrey2_C}
                  padding={`16px 0`}
                  padding={`0 0 0 20px`}
                  al={`flex-start`}
                >
                  제목
                </Wrapper>
                <Wrapper
                  width={width < 500 ? `70%` : `90%`}
                  al={`flex-start`}
                  padding={`0 0 0 20px`}
                >
                  공지사항입니다.
                </Wrapper>
              </Wrapper>
              <Wrapper
                padding={`16px 0`}
                dr={`row`}
                borderTop={`1px solid ${Theme.grey2_C}`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                <Wrapper
                  width={width < 500 ? `30%` : `10%`}
                  bgColor={Theme.lightGrey2_C}
                  padding={`16px 0`}
                  padding={`0 0 0 20px`}
                  al={`flex-start`}
                >
                  작성자
                </Wrapper>
                <Wrapper
                  width={width < 500 ? `70%` : `90%`}
                  al={`flex-start`}
                  padding={`0 0 0 20px`}
                >
                  대한기계공구
                </Wrapper>
              </Wrapper>
              <Wrapper
                padding={`16px 0`}
                borderTop={`1px solid ${Theme.grey2_C}`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
                dr={`row`}
              >
                <Wrapper
                  width={width < 500 ? `25%` : `10%`}
                  bgColor={Theme.lightGrey2_C}
                  padding={`0 0 0 20px`}
                  al={`flex-start`}
                >
                  작성일
                </Wrapper>
                <Wrapper
                  width={width < 500 ? `30%` : `25%`}
                  al={`flex-start`}
                  padding={`0 0 0 20px`}
                >
                  2022-02-13
                </Wrapper>
                <Wrapper
                  width={width < 500 ? `25%` : `10%`}
                  bgColor={Theme.lightGrey2_C}
                  padding={`0 0 0 20px`}
                  al={`flex-start`}
                >
                  조회수
                </Wrapper>
                <Wrapper
                  width={width < 500 ? `20%` : `55%`}
                  al={`flex-start`}
                  padding={`0 0 0 20px`}
                >
                  123
                </Wrapper>
              </Wrapper>
              <Wrapper
                minHeight={`140px`}
                al={`flex-start`}
                ju={`flex-start`}
                padding={`23px 0 0 20px`}
              >
                내용
              </Wrapper>
            </Wrapper>

            <Wrapper al={`flex-end`} margin={`20px 0`}>
              <CommonButton
                width={`116px`}
                height={`50px`}
                onClick={moveHandler}
              >
                목록
              </CommonButton>
            </Wrapper>

            <Wrapper
              borderTop={`1px solid ${Theme.darkGrey_C}`}
              borderBottom={`1px solid ${Theme.darkGrey_C}`}
              margin={`0 0 110px`}
            >
              <Wrapper
                dr={`row`}
                padding={`8px 0`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                <Wrapper
                  width={width < 500 ? `20%` : `10%`}
                  height={`100%`}
                  borderRight={`1px solid ${Theme.grey2_C}`}
                >
                  ▲ 이전글
                </Wrapper>
                <Wrapper
                  width={width < 500 ? `80%` : `90%`}
                  al={`flex-start`}
                  padding={`0 0 0 25px`}
                >
                  안녕하세요 이전글입니다.
                </Wrapper>
              </Wrapper>
              <Wrapper dr={`row`} padding={`8px 0`}>
                <Wrapper
                  width={width < 500 ? `20%` : `10%`}
                  height={`100%`}
                  borderRight={`1px solid ${Theme.grey2_C}`}
                >
                  ▼ 다음글
                </Wrapper>
                <Wrapper
                  width={width < 500 ? `80%` : `90%`}
                  al={`flex-start`}
                  padding={`0 0 0 25px`}
                >
                  다음글 입니다.
                </Wrapper>
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
