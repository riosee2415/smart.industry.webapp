import React from "react";
import ClientLayout from "../../../../components/ClientLayout";
import { SEO_LIST_REQUEST } from "../../../../reducers/seo";
import Head from "next/head";
import wrapper from "../../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
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
import {
  QUESTION_MY_DETAIL_REQUEST,
  QUESTION_PREVPAGE_REQUEST,
  QUESTION_NEXTPAGE_REQUEST,
} from "../../../../reducers/question";
import { useEffect } from "react";

const Notice = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const { myQuestionDetails, questionPrev, questionNext } = useSelector(
    (state) => state.question
  );

  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  ////// HOOKS //////
  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    dispatch({
      type: QUESTION_MY_DETAIL_REQUEST,
      data: {
        questionId: router.query.id,
        password: "0",
      },
    });
  }, [router.query]);

  useEffect(() => {
    dispatch({
      type: QUESTION_PREVPAGE_REQUEST,
      data: {
        questionId: router.query.id,
      },
    });
  }, [router.query]);

  useEffect(() => {
    dispatch({
      type: QUESTION_NEXTPAGE_REQUEST,
      data: {
        questionId: router.query.id,
      },
    });
  }, [router.query]);
  ////// TOGGLE //////
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
              |
              <Wrapper width={`auto`} margin={`0 0 0 8px`}>
                문의상세
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
              1:1 문의내역
            </Wrapper>

            <Wrapper borderBottom={`1px solid ${Theme.grey2_C}`}>
              <Wrapper
                dr={`row`}
                padding={`11px 0`}
                bgColor={Theme.lightGrey2_C}
                borderTop={`1px solid ${Theme.grey2_C}`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                <Wrapper width={`70%`}>제목</Wrapper>
                <Wrapper width={`15%`}>작성일</Wrapper>
                <Wrapper width={`15%`}>답변여부</Wrapper>
              </Wrapper>
              <Wrapper
                dr={`row`}
                padding={`21px 0 21px 20px`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                <Wrapper width={`70%`} al={`flex-start`}>
                  {myQuestionDetails && myQuestionDetails.title}
                </Wrapper>
                <Wrapper width={`15%`}>
                  {myQuestionDetails &&
                    myQuestionDetails.createdAt.substring(0, 10)}
                </Wrapper>
                <Wrapper width={`15%`}>
                  {myQuestionDetails && myQuestionDetails.isCompleted
                    ? `답변완료`
                    : `답변대기`}
                </Wrapper>
              </Wrapper>

              <Wrapper
                minHeight={`140px`}
                al={`flex-start`}
                ju={`flex-start`}
                padding={`23px 0 0 20px`}
              >
                {myQuestionDetails && myQuestionDetails.content}
              </Wrapper>
              <Wrapper
                dr={`row`}
                al={`flex-start`}
                borderTop={`1px solid ${Theme.grey2_C}`}
                display={
                  myQuestionDetails && myQuestionDetails.isCompleted
                    ? `flex`
                    : `none`
                }
                bgColor={Theme.lightGrey2_C}
              >
                <Wrapper
                  width={`20px`}
                  height={`20px`}
                  color={Theme.white_C}
                  radius={`100%`}
                  bgColor={Theme.red_C}
                  margin={`23px 26px 0 20px`}
                >
                  A
                </Wrapper>

                <Wrapper
                  width={`calc(100% - 66px)`}
                  minHeight={`140px`}
                  al={`flex-start`}
                  ju={`flex-start`}
                  padding={`23px 10px 0 0`}
                >
                  {myQuestionDetails && myQuestionDetails.answer}
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper al={`flex-end`} margin={`20px 0`}>
              <CommonButton
                width={`116px`}
                height={`50px`}
                onClick={() => moveLinkHandler(`/mypage/board`)}
                radius={`0`}
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
                borderBottom={`1px solid ${Theme.grey2_C}`}
                display={questionPrev === null ? `none` : `flex`}
                onClick={() =>
                  moveLinkHandler(`./${questionPrev && questionPrev.id}`)
                }
                cursor={`pointer`}
              >
                <Wrapper
                  width={width < 500 ? `20%` : `10%`}
                  padding={`10px 0`}
                  borderRight={`1px solid ${Theme.grey2_C}`}
                >
                  ▲ 이전글
                </Wrapper>
                <Wrapper
                  width={width < 500 ? `80%` : `90%`}
                  al={`flex-start`}
                  padding={`0 0 0 25px`}
                >
                  {questionPrev && questionPrev.title}
                </Wrapper>
              </Wrapper>
              <Wrapper
                dr={`row`}
                display={questionNext === null ? `none` : `flex`}
                onClick={() =>
                  moveLinkHandler(`./${questionNext && questionNext.id}`)
                }
                cursor={`pointer`}
              >
                <Wrapper
                  width={width < 500 ? `20%` : `10%`}
                  padding={`10px 0`}
                  borderRight={`1px solid ${Theme.grey2_C}`}
                >
                  ▼ 다음글
                </Wrapper>
                <Wrapper
                  width={width < 500 ? `80%` : `90%`}
                  al={`flex-start`}
                  padding={`0 0 0 25px`}
                >
                  {questionNext && questionNext.title}
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
