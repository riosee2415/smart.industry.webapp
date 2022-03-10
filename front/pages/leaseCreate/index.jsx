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
  TextArea,
} from "../../components/commonComponents";
import Checkbox from "antd/lib/checkbox/Checkbox";

const Index = () => {
  const width = useWidth();
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  ////// HOOKS //////
  ////// REDUX //////
  ////// USEEFFECT //////
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
            seo_desc.length < 1
              ? "대한민국 No.1 친환경 건설장비 전문기업 건설기계 제조/판매/임대/수리"
              : seo_desc[0].content
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
            seo_desc.length < 1
              ? "대한민국 No.1 친환경 건설장비 전문기업 건설기계 제조/판매/임대/수리"
              : seo_desc[0].content
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
              <Text fontSize={`14px`}>HOME | 임대문의 | 문의 작성하기</Text>
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

            <Wrapper dr={`row`} ju={`space-between`} margin={`35px 0`}>
              <Wrapper width={`49%`} al={`flex-start`}>
                <Text fontSize={`18px`} fontWeight={`700`} margin={`0 0 20px`}>
                  이름 <SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <TextInput
                  border={`1px solid ${Theme.basicTheme_C}`}
                  width={`100%`}
                  height={`50px`}
                  readOnly={true}
                />
              </Wrapper>
              <Wrapper width={`49%`} al={`flex-start`}>
                <Text fontSize={`18px`} fontWeight={`700`} margin={`0 0 20px`}>
                  연락처 <SpanText color={Theme.red_C}>*</SpanText>
                </Text>
                <TextInput
                  border={`1px solid ${Theme.grey2_C}`}
                  width={`100%`}
                  height={`50px`}
                  placeholder="연락처를 입력해주세요."
                />
              </Wrapper>
            </Wrapper>

            <Wrapper al={`flex-start`} margin={`0 0 35px`}>
              <Text fontSize={`18px`} fontWeight={`700`} margin={`0 0 20px`}>
                이메일 <SpanText color={Theme.red_C}>*</SpanText>
              </Text>
              <TextInput
                border={`1px solid ${Theme.grey2_C}`}
                width={`100%`}
                height={`50px`}
                placeholder="이메일를 입력해주세요."
              />
            </Wrapper>

            <Wrapper al={`flex-start`} margin={`0 0 35px`}>
              <Text fontSize={`18px`} fontWeight={`700`} margin={`0 0 20px`}>
                제목 <SpanText color={Theme.red_C}>*</SpanText>
              </Text>
              <TextInput
                border={`1px solid ${Theme.grey2_C}`}
                width={`100%`}
                height={`50px`}
                placeholder="제목를 입력해주세요."
              />
            </Wrapper>

            <Wrapper al={`flex-start`} margin={`0 0 35px`}>
              <Text fontSize={`18px`} fontWeight={`700`} margin={`0 0 20px`}>
                문의 내용 <SpanText color={Theme.red_C}>*</SpanText>
              </Text>
              <TextArea
                radius={`0`}
                height={`400px`}
                border={`1px solid ${Theme.grey2_C}`}
                width={`100%`}
                placeholder="문의 내용을 작성해주세요."
              />
            </Wrapper>

            <Wrapper al={`flex-start`} margin={`0 0 35px`}>
              <Text fontSize={`18px`} fontWeight={`700`} margin={`0 0 20px`}>
                비밀번호 <SpanText color={Theme.red_C}>*</SpanText>
              </Text>
              <TextInput
                border={`1px solid ${Theme.grey2_C}`}
                width={`100%`}
                height={`50px`}
                placeholder="게시글 확인을 위한 비밀번호 4글자를 입력해주세요."
              />
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 60px`}>
              <Checkbox>개인정보 제공에 동의합니다.</Checkbox>
            </Wrapper>

            <CommonButton
              width={`120px`}
              height={`50px`}
              fontSize={`18px`}
              margin={`0 0 110px`}
            >
              작성하기
            </CommonButton>
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
