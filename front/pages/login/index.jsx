import React, { useCallback, useEffect, useState } from "react";
import Router from "next/router";
import { Input, Button, Form, Radio, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { SIGNUP_REQUEST } from "../../reducers/user";
import ClientLayout from "../../components/ClientLayout";
import { SEO_LIST_REQUEST } from "../../reducers/seo";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import {
  RsWrapper,
  TextInput,
  WholeWrapper,
  Wrapper,
  Text,
  CommonButton,
} from "../../components/commonComponents";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";

const CustomInput = styled(TextInput)`
  border: none;
  border-bottom: 1px solid #ebebeb;

  width: 100%;
  height: 40px;

  &::placeholder {
    color: #999999;
    font-size: 14px;
  }

  &:focus {
    outline: none;
    border: none;
    border-bottom: 1px solid #ebebeb;
  }
`;

const Index = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );
  ////// HOOKS //////
  const width = useWidth();

  ////// REDUX //////

  ////// USEEFFECT //////

  ////// TOGGLE //////
  ////// HANDLER //////

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
          <RsWrapper height={`100vh`}>
            <Wrapper width={width < 700 ? `100%` : `380px`}>
              <Text fontSize={`22px`} fontWeight={`700`} margin={`0 0 11px`}>
                LOGIN
              </Text>
              <Text fontSize={`18px`} margin={`0 0 40px`} color={`#999999`}>
                회원 로그인
              </Text>
              <CustomInput placeholder="아이디" margin={`0 0 6px`} />
              <CustomInput placeholder="비밀번호" margin={`0 0 19px`} />
              <CommonButton
                width={`100%`}
                height={`50px`}
                kindOf={`basic`}
                radius={`0`}
                margin={`0 0 13px`}
              >
                로그인
              </CommonButton>

              <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 41px`}>
                <Checkbox />
                <Text fontSize={`14px`} color={`#999999`} margin={`0 0 0 8px`}>
                  아이디 저장
                </Text>
              </Wrapper>

              <Wrapper
                height={`40px`}
                borderTop={`1px solid #EBEBEB`}
                dr={`row`}
                al={`flex-end`}
              >
                <Text fontSize={`14px`} height={`10px`} color={`#999999`}>
                  아이디찾기
                </Text>
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

export default Index;
