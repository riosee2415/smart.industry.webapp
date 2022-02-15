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
} from "../../../components/commonComponents";
import styled from "styled-components";
import { useState } from "react";
import { useCallback } from "react";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";

const FaqTabBtn = styled(Wrapper)`
  width: 180px;
  height: 50px;
  font-size: 16px;
  cursor: pointer;
`;

const Faq = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const width = useWidth();

  ////// HOOKS //////
  const [typeTab, setTypeTab] = useState(1);

  const [datum, setDatum] = useState(null);

  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  const onClickToggleHandler = useCallback(
    (data) => {
      setDatum(data);

      if (datum && datum.id === data.id) {
        setDatum("");
      }
    },
    [datum]
  );
  ////// DATAVIEW //////
  const faqType = [
    {
      id: 1,
      typeId: 1,
      type: "전체",
    },
    {
      id: 2,
      typeId: 2,
      type: "상품문의",
    },
    {
      id: 3,
      typeId: 3,
      type: "배송문의",
    },
    {
      id: 4,
      typeId: 4,
      type: "취소/반품/교환",
    },
    {
      id: 5,
      typeId: 5,
      type: "주문조회",
    },
    {
      id: 6,
      typeId: 6,
      type: "기타문의",
    },
    {
      id: 7,
      typeId: 7,
      type: "회원/탈퇴",
    },
  ];
  const faqTypeQuestion = [
    // {
    //   type: "전체",
    // },
    {
      id: 1,
      typeId: 2,
      type: "상품문의",
      question: "상품문의",
      answer: "상품문의답변",
    },
    {
      id: 2,
      typeId: 3,
      type: "배송문의",
      question: "배송문의",
      answer: "배송문의답변",
    },
    {
      id: 3,
      typeId: 4,
      type: "취소/반품/교환",
      question: "취소/반품/교환",
      answer: "취소/반품/교환답변",
    },
    {
      id: 4,
      typeId: 5,
      type: "주문조회",
      question: "주문조회",
      answer: "주문조회답변",
    },
    {
      id: 5,
      typeId: 6,
      type: "기타문의",
      question: "기타문의",
      answer: "기타문의답변",
    },
    {
      id: 6,
      typeId: 7,
      type: "회원/탈퇴",
      question: "회원/탈퇴",
      answer: "회원/탈퇴답변",
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
            <Wrapper margin={`40px 0 25px`} al={`flex-start`}>
              HOME | 커뮤니티 | 이용안내 FAQ
            </Wrapper>
            <Wrapper
              fontSize={`20px`}
              fontWeight={`bold`}
              al={`flex-start`}
              margin={`0 0 10px`}
            >
              이용안내 FAQ
            </Wrapper>
            <Wrapper
              borderBottom={`1px solid #EBEBEB`}
              margin={`0 0 30px`}
            ></Wrapper>

            <Wrapper
              height={`238px`}
              border={`1px solid #EBEBEB`}
              bgColor={`#FCFCFC`}
              margin={`0 0 60px`}
            >
              <Wrapper color={`#999999`} padding={`0 0 19px`}>
                FAQ 게시판 내에서 빠르게 검색이 가능합니다.
              </Wrapper>
              <Wrapper dr={`row`}>
                <TextInput
                  border={`1px solid #EBEBEB`}
                  width={`400px`}
                  height={`40px`}
                  margin={`0 6px 0 0`}
                />
                <CommonButton width={`80px`} height={`40px`}>
                  검색
                </CommonButton>
              </Wrapper>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={`space-around`}
              al={`flex-start`}
              margin={`0 0 40px`}
            >
              {faqType && faqType.length === 0
                ? ``
                : faqType &&
                  faqType.map((data) => {
                    return (
                      <FaqTabBtn
                        border={`1px solid #EBEBEB`}
                        bgColor={
                          typeTab === data.typeId ? `#0075C5` : `#FCFCFC`
                        }
                        color={typeTab === data.typeId ? `#FCFCFC` : ``}
                        onClick={() => setTypeTab(data.typeId)}
                      >
                        {data.type}
                      </FaqTabBtn>
                    );
                  })}
            </Wrapper>
            <Wrapper margin={`0 0 60px`}>
              {faqTypeQuestion && faqTypeQuestion[0].typeId === typeTab ? (
                <Wrapper>빈칸</Wrapper>
              ) : (
                <>
                  <Wrapper
                    bgColor={`#FCFCFC`}
                    height={`40px`}
                    borderTop={`1px solid #EBEBEB`}
                    borderBottom={`1px solid #EBEBEB`}
                  >
                    <Wrapper width={`6%`}>번호</Wrapper>
                    <Wrapper width={`14%`}>분류</Wrapper>
                    <Wrapper width={`80%`}>제목</Wrapper>
                  </Wrapper>
                  {faqTypeQuestion && faqTypeQuestion.length === 0
                    ? ``
                    : faqTypeQuestion &&
                      faqTypeQuestion.reverse().map((data, idx) => {
                        return (
                          <Wrapper ju={`flex-start`}>
                            <Wrapper
                              dr={`row`}
                              ju={`flex-start`}
                              padding={`14px 0px`}
                              cursor={`pointer`}
                              borderBottom={`1px solid #EBEBEB`}
                              onClick={() => onClickToggleHandler(data)}
                            >
                              <Wrapper width={`6%`}>{data.id}</Wrapper>
                              <Wrapper width={`14%`}>{data.type}</Wrapper>
                              <Wrapper width={`80%`} al={`flex-start`}>
                                {data.question}
                              </Wrapper>
                            </Wrapper>

                            {datum && datum.id === data.id && (
                              <Wrapper
                                dr={`row`}
                                borderBottom={`1px solid #EBEBEB`}
                              >
                                <Wrapper width={`6%`}></Wrapper>
                                <Wrapper width={`14%`}></Wrapper>
                                <Wrapper
                                  width={`80%`}
                                  dr={`row`}
                                  ju={`flex-start`}
                                >
                                  <Wrapper width={`auto`} padding={`24px 0`}>
                                    {data.answer}
                                  </Wrapper>
                                </Wrapper>
                              </Wrapper>
                            )}
                          </Wrapper>
                        );
                      })}
                </>
              )}
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

export default Faq;
