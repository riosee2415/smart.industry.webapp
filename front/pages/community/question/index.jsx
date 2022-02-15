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
  TextArea,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import styled from "styled-components";
import { useState } from "react";
import { useCallback } from "react";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import { useRouter } from "next/dist/client/router";

const ContentArea = styled(TextArea)`
  width: 100%;
  min-height: 415px;
  border-radius: 0;
`;

const Question = () => {
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
  const testUserData = [
    {
      username: "포립이",
      mobile: "010-0000-0000",
      email: "4leaf.njs@gmail.com",
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
            <Wrapper
              fontSize={`20px`}
              fontWeight={`bold`}
              al={`flex-start`}
              margin={`0 0 10px`}
            >
              1:1 문의
            </Wrapper>
            <Wrapper
              borderBottom={`1px solid #EBEBEB`}
              margin={`0 0 30px`}
            ></Wrapper>

            <Wrapper margin={`0 0 60px`}>
              {testUserData && testUserData.length === 0
                ? ``
                : testUserData &&
                  testUserData.map((data) => {
                    return (
                      <Wrapper dr={`row`}>
                        <Wrapper width={`50%`} al={`flex-start`}>
                          <Wrapper
                            al={`flex-start`}
                            fontSize={`18px`}
                            fontWeight={`bold`}
                            margin={`0 0 20px`}
                          >
                            이름
                          </Wrapper>
                          <Wrapper
                            width={`calc(100% - 10px)`}
                            margin={`0 10px 0 0`}
                          >
                            <TextInput
                              placeholder={data.username}
                              width={`100%`}
                              readOnly
                            />
                          </Wrapper>
                        </Wrapper>
                        <Wrapper width={`50%`} al={`flex-start`}>
                          <Wrapper
                            al={`flex-start`}
                            fontSize={`18px`}
                            fontWeight={`bold`}
                            margin={`0 0 20px`}
                          >
                            연락처
                          </Wrapper>
                          <Wrapper
                            width={`calc(100% - 10px)`}
                            margin={`0 0 0 10px`}
                          >
                            <TextInput
                              placeholder={data.mobile}
                              width={`100%`}
                              readOnly
                            />
                          </Wrapper>
                        </Wrapper>
                        <Wrapper al={`flex-start`} margin={`35px 0 0`}>
                          <Wrapper
                            al={`flex-start`}
                            fontSize={`18px`}
                            fontWeight={`bold`}
                            margin={`0 0 20px`}
                          >
                            이메일
                          </Wrapper>
                          <TextInput
                            placeholder={data.email}
                            width={`100%`}
                            readOnly
                          />
                        </Wrapper>
                        <Wrapper al={`flex-start`} margin={`35px 0 0`}>
                          <Wrapper
                            al={`flex-start`}
                            fontSize={`18px`}
                            fontWeight={`bold`}
                            margin={`0 0 20px`}
                          >
                            제목
                          </Wrapper>
                          <TextInput
                            width={`100%`}
                            placeholder={`제목을 입력해주세요.`}
                          />
                        </Wrapper>
                        <Wrapper al={`flex-start`} margin={`35px 0 0`}>
                          <Wrapper
                            al={`flex-start`}
                            fontSize={`18px`}
                            fontWeight={`bold`}
                            margin={`0 0 20px`}
                          >
                            문의 내용
                          </Wrapper>
                          <ContentArea
                            placeholder={`문의 내용을 작성해주세요.`}
                          />
                        </Wrapper>
                        <Wrapper al={`flex-start`} margin={`35px 0 0`}>
                          <Wrapper
                            al={`flex-start`}
                            fontSize={`18px`}
                            fontWeight={`bold`}
                            margin={`0 0 20px`}
                          >
                            비밀번호
                          </Wrapper>
                          <TextInput
                            width={`100%`}
                            placeholder={`게시글 확인을 위한 비밀번호 4글자를 입력해주세요.`}
                          />
                        </Wrapper>
                      </Wrapper>
                    );
                  })}
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

export default Question;
