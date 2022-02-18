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
  CommonButton,
  RsWrapper,
  TextInput,
  WholeWrapper,
  Wrapper,
  Image,
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
      title: "상품문의",
      createdAt: "2022-02-15-00:00",
      hit: "322",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxza-raAsJHK8wZ03T55ti77CChtEvLRpCQ&usqp=CAU",
      productName: "상품명",
    },
    {
      id: 2,
      title: "상품문의[답변완료]",
      createdAt: "2022-02-15-00:00",
      hit: "123",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxza-raAsJHK8wZ03T55ti77CChtEvLRpCQ&usqp=CAU",
      productName: "상품명",
    },
  ];

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
                            moveLinkHandler(`./productQnA/detail/${data.id}`)
                          }
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
                              src={data.thumbnail}
                            />
                            <Wrapper
                              width={`calc(100% - 50px)`}
                              al={`flex-start`}
                              padding={`0 0 0 10px`}
                            >
                              {data.productName}
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
                              <Image
                                height={`100%`}
                                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/question/icon_lock.png`}
                              />
                            </Wrapper>
                          </Wrapper>
                          <Wrapper
                            width={`10%`}
                            display={width < 500 ? `none` : `flex`}
                          >
                            관리자
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
                    })}
              </Wrapper>
              <Wrapper
                margin={`40px 0 0`}
                dr={`row`}
                height={`40px`}
                ju={`flex-start`}
              >
                <Wrapper width={`auto`} display={width < 500 ? `none` : `flex`}>
                  검색어
                </Wrapper>
                <TextInput
                  width={`261px`}
                  height={`100%`}
                  margin={width < 500 ? `0 10px 0 0` : `0 10px 0 26px`}
                  border={`1px solid ${Theme.grey2_C}`}
                />
                <CommonButton width={`74px`} height={`100%`} radius={`0`}>
                  찾기
                </CommonButton>
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
