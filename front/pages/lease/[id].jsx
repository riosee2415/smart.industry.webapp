import React, { useEffect } from "react";
import ClientLayout from "../../components/ClientLayout";
import { useDispatch, useSelector } from "react-redux";

import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import useWidth from "../../hooks/useWidth";
import useInput from "../../hooks/useInput";
import Theme from "../../components/Theme";
import styled from "styled-components";
import axios from "axios";

import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { SEO_LIST_REQUEST } from "../../reducers/seo";

import Head from "next/head";
import {
  CommonButton,
  Image,
  RsWrapper,
  Text,
  WholeWrapper,
  Wrapper,
  Combo,
  ComboOption,
  ComboOptionWrapper,
  TextInput,
  SpanText,
} from "../../components/commonComponents";
import { useRouter } from "next/dist/client/router";
import { CONTACT_DETAIL_REQUEST } from "../../reducers/contact";

const Index = () => {
  const width = useWidth();
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const { detailContact } = useSelector((state) => state.contact);

  console.log(detailContact);

  ////// HOOKS //////

  const dispatch = useDispatch();

  ////// REDUX //////
  const router = useRouter();
  ////// USEEFFECT //////

  useEffect(() => {
    dispatch({
      type: CONTACT_DETAIL_REQUEST,
      data: {
        leaseId: router.query.id,
      },
    });
  }, [router.query]);

  ////// TOGGLE //////
  ////// HANDLER //////
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
        <WholeWrapper margin={width < 700 ? `83px 0 0` : `194px 0 0`}>
          <RsWrapper>
            <Wrapper
              al={`flex-start`}
              margin={width < 700 ? `50px 0 20px` : `100px 0 26px`}
            >
              <Text fontSize={`14px`}>HOME | 임대문의</Text>
            </Wrapper>

            <Wrapper
              padding={`0 0 10px`}
              al={`flex-start`}
              borderBottom={`1px solid ${Theme.grey2_C}`}
            >
              <Text fontSize={`20px`} fontWeight={`700`}>
                임대문의
              </Text>
            </Wrapper>

            <Wrapper margin={`30px 0 20px`}>
              <Wrapper
                dr={`row`}
                height={`50px`}
                bgColor={Theme.lightGrey2_C}
                borderTop={`1px solid ${Theme.grey2_C}`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                <Wrapper
                  fontSize={width < 700 ? `11px` : `14px`}
                  width={width < 700 ? `80px` : `122px`}
                  height={`100%`}
                  padding={`0 0 0 20px`}
                  al={`flex-start`}
                >
                  제목
                </Wrapper>
                <Wrapper
                  fontSize={width < 700 ? `11px` : `14px`}
                  width={
                    width < 700 ? `calc(100% - 80px)` : `calc(100% - 122px)`
                  }
                  height={`100%`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <Text
                    fontSize={width < 700 ? `11px` : `14px`}
                    maxWidth={`calc(100% - 10px - 17px - 58px)`}
                    width={`auto`}
                    isEllipsis={true}
                  >
                    {detailContact && detailContact.title}&nbsp;
                  </Text>
                  {detailContact && detailContact.answerdAt && (
                    <Text fontSize={width < 700 ? `11px` : `14px`}>
                      [답변완료]
                    </Text>
                  )}
                  {detailContact && detailContact.secret && (
                    <Image
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/question/icon_lock.png`}
                      margin={`0 0 0 17px`}
                      width={`10px`}
                    />
                  )}
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={`row`}
                height={`50px`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                <Wrapper
                  fontSize={width < 700 ? `11px` : `14px`}
                  width={width < 700 ? `80px` : `122px`}
                  height={`100%`}
                  padding={`0 0 0 20px`}
                  al={`flex-start`}
                >
                  작성자
                </Wrapper>
                <Wrapper
                  fontSize={width < 700 ? `11px` : `14px`}
                  width={
                    width < 700 ? `calc(100% - 80px)` : `calc(100% - 122px)`
                  }
                  height={`100%`}
                  al={`flex-start`}
                >
                  {detailContact && detailContact.author}
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={`row`}
                height={`50px`}
                bgColor={Theme.lightGrey2_C}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                <Wrapper
                  fontSize={width < 700 ? `11px` : `14px`}
                  width={width < 700 ? `80px` : `122px`}
                  height={`100%`}
                  padding={`0 0 0 20px`}
                  al={`flex-start`}
                >
                  작성일
                </Wrapper>
                <Wrapper
                  fontSize={width < 700 ? `11px` : `14px`}
                  width={width < 700 ? `100px` : `211px`}
                  height={`100%`}
                  al={`flex-start`}
                >
                  {detailContact && detailContact.createdAt.substring(0, 10)}
                </Wrapper>
                <Wrapper
                  fontSize={width < 700 ? `11px` : `14px`}
                  width={width < 700 ? `80px` : `122px`}
                  height={`100%`}
                  padding={`0 0 0 20px`}
                  al={`flex-start`}
                >
                  조회수
                </Wrapper>
                <Wrapper
                  fontSize={width < 700 ? `11px` : `14px`}
                  width={
                    width < 700
                      ? `calc(100% - 80px - 100px - 80px)`
                      : `calc(100% - 122px - 211px - 122px)`
                  }
                  height={`100%`}
                  al={`flex-start`}
                >
                  {detailContact && detailContact.hit}
                </Wrapper>
              </Wrapper>

              <Wrapper
                dr={`row`}
                minHeight={`100px`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
                al={`flex-start`}
                ju={`flex-start`}
                padding={`20px`}
                fontSize={width < 700 ? `11px` : `14px`}
              >
                {detailContact && detailContact.content}
              </Wrapper>

              {detailContact && detailContact.answerdAt && (
                <Wrapper
                  dr={`row`}
                  minHeight={`100px`}
                  borderBottom={`1px solid ${Theme.grey2_C}`}
                  al={`flex-start`}
                  ju={`flex-start`}
                  padding={`20px`}
                  bgColor={Theme.lightGrey2_C}
                  dr={`row`}
                >
                  <Wrapper
                    width={`20px`}
                    height={`20px`}
                    bgColor={Theme.red_C}
                    radius={`50%`}
                    fontSize={width < 700 ? `11px` : `14px`}
                    color={Theme.white_C}
                    padding={`0 0 1px`}
                    margin={`0 25px 0 0`}
                  >
                    A
                  </Wrapper>
                  <Wrapper
                    width={`calc(100% - 20px - 25px)`}
                    fontSize={width < 700 ? `11px` : `14px`}
                    al={`flex-start`}
                  >
                    {detailContact && detailContact.answer}
                  </Wrapper>
                </Wrapper>
              )}
            </Wrapper>

            <Wrapper
              al={`flex-end`}
              margin={width < 700 ? `0 0 80px` : `0 0 110px`}
            >
              <CommonButton
                onClick={() => {
                  router.back();
                }}
                fontSize={width < 700 ? `14px` : `18px`}
                width={width < 700 ? `80px` : `115px`}
                height={width < 700 ? `40px` : `50px`}
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

export default Index;
