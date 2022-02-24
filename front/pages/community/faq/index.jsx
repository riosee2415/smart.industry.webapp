import React from "react";
import ClientLayout from "../../../components/ClientLayout";
import { SEO_LIST_REQUEST } from "../../../reducers/seo";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
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
import { Empty } from "antd";
import { useRouter } from "next/dist/client/router";
import { FAQ_GET_REQUEST, FAQ_TYPE_GET_REQUEST } from "../../../reducers/faq";
import { useEffect } from "react";
import useInput from "../../../hooks/useInput";

const FaqTabBtn = styled(Wrapper)`
  width: 180px;
  height: 50px;
  font-size: 16px;
  cursor: pointer;

  @media (max-width: 800px) {
    width: 150px;
    height: 40px;
    font-size: 14px;
  }
`;

const SearchBtn = styled(CommonButton)`
  width: 80px;
  height: 40px;
  background-color: ${Theme.darkGrey_C};
  border: none;
  border-radius: 0;
  font-size: 14px;

  &:hover {
    background-color: ${Theme.white_C};
    border: 1px solid ${Theme.darkGrey_C};
    color: ${Theme.darkGrey_C};
  }
`;

const Faq = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const { faqs, types } = useSelector((state) => state.faq);

  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  ////// HOOKS //////
  const [typeTab, setTypeTab] = useState(0);

  const [datum, setDatum] = useState(null);

  const inputSearch = useInput("");

  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    dispatch({
      type: FAQ_GET_REQUEST,
      data: {
        typeId: "",
        search: "",
      },
    });
  }, []);
  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const onClickToggleHandler = useCallback(
    (data) => {
      setDatum(data);

      if (datum && datum.id === data.id) {
        setDatum("");
      }
    },
    [datum]
  );

  const onKeyDonwComboHandler = useCallback(() => {
    dispatch({
      type: FAQ_GET_REQUEST,
      data: {
        typeId: "",
        search: inputSearch.value,
      },
    });
  }, [inputSearch.value]);
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
                onClick={() => moveLinkHandler(`/community/faq`)}
                cursor={`pointer`}
              >
                커뮤니티
              </Wrapper>
              |
              <Wrapper
                width={`auto`}
                margin={`0 8px`}
                onClick={() => moveLinkHandler(`/community/faq`)}
                cursor={`pointer`}
              >
                이용안내 FAQ
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
              이용안내 FAQ
            </Wrapper>

            <Wrapper
              height={`238px`}
              border={`1px solid ${Theme.grey2_C}`}
              bgColor={Theme.lightGrey2_C}
              margin={`0 0 60px`}
            >
              <Wrapper color={Theme.grey_C} padding={`0 0 19px`}>
                FAQ 게시판 내에서 빠르게 검색이 가능합니다.
              </Wrapper>
              <Wrapper dr={`row`}>
                <TextInput
                  border={`1px solid ${Theme.grey2_C}`}
                  width={width < 500 ? `300px` : `400px`}
                  height={`40px`}
                  margin={width < 500 ? `0 0 5px` : `0 6px 0 0`}
                  bgColor={Theme.white_C}
                  onKeyDown={(e) => e.keyCode === 13 && onKeyDonwComboHandler()}
                  {...inputSearch}
                />
                <SearchBtn onClick={() => onKeyDonwComboHandler()}>
                  검색
                </SearchBtn>
              </Wrapper>
            </Wrapper>
            <Wrapper
              dr={`row`}
              ju={width < 1100 ? `center` : `space-around`}
              al={`flex-start`}
              margin={`0 0 40px`}
            >
              <FaqTabBtn
                border={`1px solid ${Theme.grey2_C}`}
                bgColor={
                  typeTab === 0
                    ? `${Theme.basicTheme_C}`
                    : `${Theme.lightGrey2_C}`
                }
                color={typeTab === 0 ? `${Theme.lightGrey2_C}` : ``}
                onClick={() => setTypeTab(0)}
              >
                전체
              </FaqTabBtn>
              {types && types.length === 0
                ? ``
                : types &&
                  types.map((data) => {
                    return (
                      <FaqTabBtn
                        border={`1px solid ${Theme.grey2_C}`}
                        bgColor={
                          typeTab === data.id
                            ? `${Theme.basicTheme_C}`
                            : `${Theme.lightGrey2_C}`
                        }
                        color={
                          typeTab === data.id ? `${Theme.lightGrey2_C}` : ``
                        }
                        onClick={() => setTypeTab(data.id)}
                      >
                        {data.value}
                      </FaqTabBtn>
                    );
                  })}
            </Wrapper>
            <Wrapper margin={`0 0 180px`}>
              <Wrapper
                bgColor={Theme.lightGrey2_C}
                height={`40px`}
                borderTop={`1px solid ${Theme.grey2_C}`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                <Wrapper width={width < 700 ? `15%` : `5%`}>번호</Wrapper>
                <Wrapper
                  width={width < 700 ? `35%` : width < 1100 ? `25%` : `15%`}
                >
                  분류
                </Wrapper>
                <Wrapper
                  width={width < 700 ? `50%` : width < 1100 ? `70%` : `80%`}
                >
                  제목
                </Wrapper>
              </Wrapper>
              {/* {faqs && faqs.length === 0 ? (
                <Empty description="조회된 FAQ가 없습니다." />
              ) : ( 
                faqs &&
                faqs.map((data, idx) => {
                  return (
                    <>
                      <Wrapper ju={`flex-start`}>
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          padding={`14px 0px`}
                          cursor={`pointer`}
                          borderBottom={`1px solid ${Theme.grey2_C}`}
                          onClick={() => onClickToggleHandler(data)}
                        >
                          <Wrapper width={width < 700 ? `15%` : `5%`}>
                            {data.id}
                          </Wrapper>
                          <Wrapper
                            width={
                              width < 700 ? `35%` : width < 1100 ? `25%` : `15%`
                            }
                          >
                            {data.FaqType.value}
                          </Wrapper>
                          <Wrapper
                            width={
                              width < 700 ? `50%` : width < 1100 ? `70%` : `80%`
                            }
                            al={`flex-start`}
                          >
                            {data.question}
                          </Wrapper>
                        </Wrapper>

                        {datum && datum.id === data.id && (
                          <Wrapper
                            dr={`row`}
                            borderBottom={`1px solid ${Theme.grey2_C}`}
                          >
                            <Wrapper
                              width={width < 700 ? `0%` : `6%`}
                            ></Wrapper>
                            <Wrapper
                              width={width < 700 ? `0%` : `14%`}
                            ></Wrapper>
                            <Wrapper
                              width={width < 700 ? `100%` : `80%`}
                              dr={`row`}
                              al={`flex-start`}
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
                                padding={`24px 0`}
                                al={`flex-start`}
                              >
                                {data.answer}
                              </Wrapper>
                            </Wrapper>
                          </Wrapper>
                        )}
                      </Wrapper>
                    </>
                  );
                })
              )} */}

              {faqs && faqs.length === 0 ? (
                <Empty description="조회된 FAQ가 없습니다." />
              ) : (
                faqs &&
                faqs.map((data) => {
                  return (
                    <>
                      {typeTab === 0 ? (
                        <Wrapper ju={`flex-start`}>
                          <Wrapper
                            dr={`row`}
                            ju={`flex-start`}
                            padding={`14px 0px`}
                            cursor={`pointer`}
                            borderBottom={`1px solid ${Theme.grey2_C}`}
                            onClick={() => onClickToggleHandler(data)}
                          >
                            <Wrapper width={width < 700 ? `15%` : `5%`}>
                              {data.id}
                            </Wrapper>
                            <Wrapper
                              width={
                                width < 700
                                  ? `35%`
                                  : width < 1100
                                  ? `25%`
                                  : `15%`
                              }
                            >
                              {data.FaqType.value}
                            </Wrapper>
                            <Wrapper
                              width={
                                width < 700
                                  ? `50%`
                                  : width < 1100
                                  ? `70%`
                                  : `80%`
                              }
                              al={`flex-start`}
                            >
                              {data.question}
                            </Wrapper>
                          </Wrapper>

                          {datum && datum.id === data.id && (
                            <Wrapper
                              dr={`row`}
                              borderBottom={`1px solid ${Theme.grey2_C}`}
                            >
                              <Wrapper
                                width={width < 700 ? `0%` : `6%`}
                              ></Wrapper>
                              <Wrapper
                                width={width < 700 ? `0%` : `14%`}
                              ></Wrapper>
                              <Wrapper
                                width={width < 700 ? `100%` : `80%`}
                                dr={`row`}
                                al={`flex-start`}
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
                                  padding={`24px 0`}
                                  al={`flex-start`}
                                >
                                  {data.answer}
                                </Wrapper>
                              </Wrapper>
                            </Wrapper>
                          )}
                        </Wrapper>
                      ) : (
                        data.FaqTypeId === typeTab && (
                          <Wrapper ju={`flex-start`}>
                            <Wrapper
                              dr={`row`}
                              ju={`flex-start`}
                              padding={`14px 0px`}
                              cursor={`pointer`}
                              borderBottom={`1px solid ${Theme.grey2_C}`}
                              onClick={() => onClickToggleHandler(data)}
                            >
                              <Wrapper width={width < 700 ? `15%` : `5%`}>
                                {data.id}
                              </Wrapper>
                              <Wrapper
                                width={
                                  width < 700
                                    ? `35%`
                                    : width < 1100
                                    ? `25%`
                                    : `15%`
                                }
                              >
                                {data.FaqType.value}
                              </Wrapper>
                              <Wrapper
                                width={
                                  width < 700
                                    ? `50%`
                                    : width < 1100
                                    ? `70%`
                                    : `80%`
                                }
                                al={`flex-start`}
                              >
                                {data.question}
                              </Wrapper>
                            </Wrapper>

                            {datum && datum.id === data.id && (
                              <Wrapper
                                dr={`row`}
                                borderBottom={`1px solid ${Theme.grey2_C}`}
                              >
                                <Wrapper
                                  width={width < 700 ? `0%` : `6%`}
                                ></Wrapper>
                                <Wrapper
                                  width={width < 700 ? `0%` : `14%`}
                                ></Wrapper>
                                <Wrapper
                                  width={width < 700 ? `100%` : `80%`}
                                  dr={`row`}
                                  al={`flex-start`}
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
                                    padding={`24px 0`}
                                    al={`flex-start`}
                                  >
                                    {data.answer}
                                  </Wrapper>
                                </Wrapper>
                              </Wrapper>
                            )}
                          </Wrapper>
                        )
                      )}
                    </>
                  );
                })
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

    context.store.dispatch({
      type: FAQ_TYPE_GET_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Faq;
