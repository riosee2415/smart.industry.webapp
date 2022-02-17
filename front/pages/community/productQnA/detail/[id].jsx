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

const ProductQnA = () => {
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
    router.push(`/community/productQnA`);
  }, []);
  ////// DATAVIEW //////
  const testData = [
    {
      title: "상품문의[답변완료]",
      write: "user",
      createdAt: "2022-02-16-00:00",
      hit: "123",
      question: "문의내용 입니다.",
      answer: "문의내용에 대한 답변입니다.",
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
          <RsWrapper margin={`250px 0 0`}>
            <Wrapper margin={`40px 0 25px`} al={`flex-start`}>
              HOME | 커뮤니티 | 상품문의
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

            <Wrapper borderBottom={`1px solid ${Theme.grey2_C}`}>
              {testData && testData.length === 0 ? (
                <Wrapper>다시 시도해주세요.</Wrapper>
              ) : (
                testData &&
                testData.map((data) => {
                  return (
                    <>
                      <Wrapper
                        height={`50px`}
                        borderTop={`1px solid ${Theme.grey2_C}`}
                        borderBottom={`1px solid ${Theme.grey2_C}`}
                        dr={`row`}
                      >
                        <Wrapper
                          width={width < 500 ? `20%` : `10%`}
                          height={`100%`}
                          bgColor={Theme.lightGrey2_C}
                          padding={`0 0 0 20px`}
                          al={`flex-start`}
                        >
                          제목
                        </Wrapper>
                        <Wrapper
                          width={width < 500 ? `80%` : `90%`}
                          al={`flex-start`}
                          padding={`0 0 0 20px`}
                        >
                          {data.title}
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        height={`50px`}
                        borderBottom={`1px solid ${Theme.grey2_C}`}
                        dr={`row`}
                      >
                        <Wrapper
                          width={width < 500 ? `20%` : `10%`}
                          bgColor={Theme.lightGrey2_C}
                          height={`100%`}
                          padding={`0 0 0 20px`}
                          al={`flex-start`}
                        >
                          작성자
                        </Wrapper>
                        <Wrapper
                          width={width < 500 ? `80%` : `90%`}
                          al={`flex-start`}
                          padding={`0 0 0 20px`}
                        >
                          {data.write}
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        height={`50px`}
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.grey2_C}`}
                      >
                        <Wrapper
                          width={width < 500 ? `20%` : `10%`}
                          bgColor={Theme.lightGrey2_C}
                          height={`100%`}
                          padding={`0 0 0 20px`}
                          al={`flex-start`}
                        >
                          작성일
                        </Wrapper>
                        <Wrapper
                          width={width < 500 ? `30%` : `15%`}
                          al={`flex-start`}
                          padding={`0 0 0 20px`}
                        >
                          {data.createdAt.substring(0, 10)}
                        </Wrapper>
                        <Wrapper
                          width={width < 500 ? `25%` : `10%`}
                          bgColor={Theme.lightGrey2_C}
                          height={`100%`}
                          padding={`0 0 0 20px`}
                          al={`flex-start`}
                        >
                          조회수
                        </Wrapper>
                        <Wrapper
                          width={width < 500 ? `25%` : `65%`}
                          al={`flex-start`}
                          padding={`0 0 0 20px`}
                        >
                          {data.hit}
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        minHeight={`140px`}
                        al={`flex-start`}
                        ju={`flex-start`}
                        padding={`23px 0 0 20px`}
                      >
                        {data.question}
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        al={`flex-start`}
                        borderTop={`1px solid ${Theme.grey2_C}`}
                        display={data.answer ? `flex` : `none`}
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
                          {data.answer}
                        </Wrapper>
                      </Wrapper>
                    </>
                  );
                })
              )}
            </Wrapper>

            <Wrapper al={`flex-end`} margin={`20px 0 110px`}>
              <CommonButton
                width={`116px`}
                height={`50px`}
                onClick={moveHandler}
              >
                목록
              </CommonButton>
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

export default ProductQnA;
