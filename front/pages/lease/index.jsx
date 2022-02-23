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
  TextInput,
  SpanText,
} from "../../components/commonComponents";
import { CaretDownOutlined, DownCircleTwoTone } from "@ant-design/icons";
import { useCallback } from "react";

const Index = () => {
  const width = useWidth();
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  ////// HOOKS //////
  const [combo, setCombo] = useState(false);
  const [comboValue, setComboValue] = useState("전체");
  const [combo2, setCombo2] = useState(false);
  const [comboValue2, setComboValue2] = useState("제목");

  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  const comboToggle = useCallback(() => {
    setCombo(!combo);
  }, [combo]);
  const comboToggle2 = useCallback(() => {
    setCombo2(!combo2);
  }, [combo2]);
  ////// HANDLER //////
  const comboHandler = useCallback(
    (data) => {
      setComboValue(data);
      comboToggle();
    },
    [combo, comboValue]
  );

  const comboHandler2 = useCallback(
    (data) => {
      setComboValue2(data);
      comboToggle2();
    },
    [combo2, comboValue2]
  );
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
                height={`40px`}
                bgColor={Theme.lightGrey2_C}
                borderTop={`1px solid ${Theme.grey2_C}`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                <Wrapper
                  fontSize={width < 700 ? `11px` : `14px`}
                  width={width < 700 ? `40px` : `80px`}
                  height={`100%`}
                >
                  번호
                </Wrapper>
                <Wrapper
                  fontSize={width < 700 ? `11px` : `14px`}
                  width={
                    width < 700
                      ? `calc(100% - 40px - 80px - 80px)`
                      : `calc(100% - 80px - 115px - 115px - 115px)`
                  }
                  height={`100%`}
                >
                  제목
                </Wrapper>
                <Wrapper
                  fontSize={width < 700 ? `11px` : `14px`}
                  width={width < 700 ? `80px` : `115px`}
                  height={`100%`}
                >
                  작성자
                </Wrapper>
                <Wrapper
                  fontSize={width < 700 ? `11px` : `14px`}
                  width={`115px`}
                  height={`100%`}
                  display={width < 700 ? `none` : `flex`}
                >
                  작성일
                </Wrapper>
                <Wrapper
                  fontSize={width < 700 ? `11px` : `14px`}
                  width={width < 700 ? `80px` : `115px`}
                  height={`100%`}
                >
                  조회수
                </Wrapper>
              </Wrapper>
              <Wrapper
                dr={`row`}
                height={`60px`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                <Wrapper
                  fontSize={width < 700 ? `11px` : `14px`}
                  width={width < 700 ? `40px` : `80px`}
                  height={`100%`}
                >
                  번호
                </Wrapper>
                <Wrapper
                  width={
                    width < 700
                      ? `calc(100% - 40px - 80px - 80px)`
                      : `calc(100% - 80px - 115px - 115px - 115px)`
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
                    임대문의&nbsp;
                  </Text>
                  <Text fontSize={width < 700 ? `11px` : `14px`}>
                    [답변완료]
                  </Text>
                  <Image
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/question/icon_lock.png`}
                    margin={`0 0 0 17px`}
                    width={`10px`}
                  />
                </Wrapper>
                <Wrapper
                  fontSize={width < 700 ? `11px` : `14px`}
                  width={width < 700 ? `80px` : `115px`}
                  height={`100%`}
                >
                  대한기계공구
                </Wrapper>
                <Wrapper
                  fontSize={width < 700 ? `11px` : `14px`}
                  width={`115px`}
                  height={`100%`}
                  display={width < 700 ? `none` : `flex`}
                >
                  작성일
                </Wrapper>
                <Wrapper
                  fontSize={width < 700 ? `11px` : `14px`}
                  width={width < 700 ? `80px` : `115px`}
                  height={`100%`}
                >
                  조회수
                </Wrapper>
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                padding={`20px 0`}
                bgColor={Theme.lightGrey2_C}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                <Wrapper width={width < 700 ? `40px` : `80px`}></Wrapper>
                <Wrapper
                  width={
                    width < 700 ? `calc(100% - 40px)` : `calc(100% - 80px)`
                  }
                  al={`flex-start`}
                >
                  <Text
                    fontSize={width < 700 ? `11px` : `14px`}
                    margin={`0 0 10px`}
                  >
                    <SpanText color={Theme.red_C}>비공개 글 입니다.</SpanText>{" "}
                    글 작성시 입력한 비밀번호를 입력해주세요.
                  </Text>

                  <Wrapper dr={`row`} width={`auto`}>
                    <TextInput
                      width={width < 700 ? `100px` : `150px`}
                      height={`20px`}
                      border={`1px solid ${Theme.grey3_C}`}
                      margin={`0 10px 0 0`}
                    />
                    <CommonButton
                      kindOf={`darkgrey`}
                      width={width < 700 ? `30px` : `37px`}
                      height={`20px`}
                      fontSize={width < 700 ? `11px` : `14px`}
                      padding={`0`}
                    >
                      확인
                    </CommonButton>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper al={`flex-end`} margin={`0 0 60px`}>
              <CommonButton
                width={width < 700 ? `100px` : `150px`}
                height={width < 700 ? `40px` : `50px`}
                fontSize={width < 700 ? `14px` : `18px`}
                padding={`0`}
              >
                문의 작성하기
              </CommonButton>
            </Wrapper>

            <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 60px`}>
              <Wrapper
                dr={`row`}
                ju={width < 700 ? `space-between` : `flex-start`}
                width={width < 700 ? `100%` : `auto`}
              >
                <Text fontSize={`14px`} margin={`0 25px 0 0`}>
                  검색어
                </Text>

                <Combo margin={`0 10px 0 0`}>
                  <Text fontSize={`14px`}>{comboValue}</Text>
                  <CaretDownOutlined onClick={comboToggle} />

                  {combo && (
                    <ComboOptionWrapper>
                      <ComboOption
                        beforeWidth={comboValue === "전체" ? `100%` : `0`}
                        onClick={() => {
                          comboHandler("전체");
                        }}
                      >
                        전체
                      </ComboOption>
                      <ComboOption
                        beforeWidth={comboValue === "한달" ? `100%` : `0`}
                        onClick={() => {
                          comboHandler("한달");
                        }}
                      >
                        한달
                      </ComboOption>
                      <ComboOption
                        beforeWidth={comboValue === "일주일" ? `100%` : `0`}
                        onClick={() => {
                          comboHandler("일주일");
                        }}
                      >
                        일주일
                      </ComboOption>
                    </ComboOptionWrapper>
                  )}
                </Combo>

                <Combo>
                  <Text fontSize={`14px`}>{comboValue2}</Text>
                  <CaretDownOutlined onClick={comboToggle2} />

                  {combo2 && (
                    <ComboOptionWrapper>
                      <ComboOption
                        beforeWidth={comboValue2 === "제목" ? `100%` : `0`}
                        onClick={() => {
                          comboHandler2("제목");
                        }}
                      >
                        제목
                      </ComboOption>
                      <ComboOption
                        beforeWidth={comboValue2 === "작성자" ? `100%` : `0`}
                        onClick={() => {
                          comboHandler2("작성자");
                        }}
                      >
                        작성자
                      </ComboOption>
                      <ComboOption
                        beforeWidth={comboValue2 === "내용" ? `100%` : `0`}
                        onClick={() => {
                          comboHandler2("내용");
                        }}
                      >
                        내용
                      </ComboOption>
                    </ComboOptionWrapper>
                  )}
                </Combo>
              </Wrapper>

              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                width={width < 700 ? `100%` : `auto`}
                margin={width < 700 ? `10px 0 0` : `0`}
              >
                <TextInput
                  margin={width < 700 ? `0 10px 0 0` : `0 10px`}
                  border={`1px solid ${Theme.grey2_C}`}
                  width={width < 700 ? `calc(100% - 75px - 10px)` : `260px`}
                  height={`40px`}
                />

                <CommonButton
                  kindOf={`darkgrey2`}
                  width={`75px`}
                  height={`40px`}
                >
                  찾기
                </CommonButton>
              </Wrapper>
            </Wrapper>

            <Wrapper margin={`0 0 110px`}>페이지네이션</Wrapper>
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
