import React, { useEffect, useState } from "react";
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
} from "../../components/commonComponents";
import { CaretDownOutlined, DownCircleTwoTone } from "@ant-design/icons";

const Index = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  ////// HOOKS //////
  const [combo, setCombo] = useState(false);
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
        <WholeWrapper margin={`194px 0 0`}>
          <RsWrapper>
            <Wrapper al={`flex-start`} margin={`100px 0 26px`}>
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
                height={`40px`}
                bgColor={Theme.lightGrey2_C}
                borderTop={`1px solid ${Theme.grey2_C}`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                <Wrapper fontSize={`14px`} width={`80px`} height={`100%`}>
                  번호
                </Wrapper>
                <Wrapper
                  fontSize={`14px`}
                  width={`calc(100% - 80px - 115px - 115px - 115px)`}
                  height={`100%`}
                >
                  제목
                </Wrapper>
                <Wrapper fontSize={`14px`} width={`115px`} height={`100%`}>
                  작성자
                </Wrapper>
                <Wrapper fontSize={`14px`} width={`115px`} height={`100%`}>
                  작성일
                </Wrapper>
                <Wrapper fontSize={`14px`} width={`115px`} height={`100%`}>
                  조회수
                </Wrapper>
              </Wrapper>
              <Wrapper
                dr={`row`}
                height={`60px`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                <Wrapper fontSize={`14px`} width={`80px`} height={`100%`}>
                  번호
                </Wrapper>
                <Wrapper
                  width={`calc(100% - 80px - 115px - 115px - 115px)`}
                  height={`100%`}
                  dr={`row`}
                  ju={`flex-start`}
                >
                  <Text fontSize={`14px`}>임대문의&nbsp;</Text>
                  <Text fontSize={`14px`}>답변완료</Text>
                  <Image
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/question/icon_lock.png`}
                    margin={`0 0 0 17px`}
                    width={`10px`}
                  />
                </Wrapper>
                <Wrapper fontSize={`14px`} width={`115px`} height={`100%`}>
                  작성자
                </Wrapper>
                <Wrapper fontSize={`14px`} width={`115px`} height={`100%`}>
                  작성일
                </Wrapper>
                <Wrapper fontSize={`14px`} width={`115px`} height={`100%`}>
                  조회수
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper al={`flex-end`} margin={`0 0 60px`}>
              <CommonButton width={`150px`} height={`50px`}>
                문의 작성하기
              </CommonButton>
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`}>
              <Text>검색어</Text>
              <Combo>
                <Text>전체</Text>
                <CaretDownOutlined />

                <ComboOptionWrapper>
                  <ComboOption>전체</ComboOption>
                  <ComboOption>한달</ComboOption>
                  <ComboOption>일주일</ComboOption>
                </ComboOptionWrapper>
              </Combo>
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
