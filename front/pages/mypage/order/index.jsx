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
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Image,
  CommonButton,
} from "../../../components/commonComponents";
import { useCallback } from "react";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import { useRouter } from "next/dist/client/router";
import { Empty } from "antd";
import { RightOutlined } from "@ant-design/icons";
import styled from "styled-components";

const RightArrow = styled(RightOutlined)`
  width: auto;
  font-size: 18px;
`;

const Order = () => {
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
  const testData = [
    {
      id: 1,
      productName: "상품명1",
      orderNum: "123443122",
      payment: "1,568,000",
      productImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxza-raAsJHK8wZ03T55ti77CChtEvLRpCQ&usqp=CAU",
      createdAt: "2022-02-16-12:45:00",
    },
    {
      id: 2,
      productName: "상품명2",
      orderNum: "34532111",
      payment: "1,958,000",
      productImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxza-raAsJHK8wZ03T55ti77CChtEvLRpCQ&usqp=CAU",
      createdAt: "2022-02-17-15:23:00",
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
              HOME | 마이페이지 | 주문내역조회
            </Wrapper>
            <Wrapper
              fontSize={`20px`}
              fontWeight={`bold`}
              al={`flex-start`}
              padding={`0 0 10px`}
              borderBottom={`1px solid ${Theme.grey2_C}`}
              margin={`0 0 40px`}
            >
              주문내역조회
            </Wrapper>
            <Wrapper margin={`0 0 110px`}>
              {testData && testData.length === 0 ? (
                <Empty description="주문내역이 없습니다." />
              ) : (
                testData &&
                testData.map((data) => {
                  return (
                    <>
                      <Wrapper al={`flex-start`}>
                        {data.createdAt.substring(0, 10)} (
                        {data.createdAt.substring(11, 13)}시
                        {data.createdAt.substring(14, 16)}분)
                      </Wrapper>
                      <Wrapper
                        borderBottom={`1px solid ${Theme.grey2_C}`}
                        borderTop={`1px solid ${Theme.grey2_C}`}
                        bgColor={Theme.lightGrey2_C}
                        fontSize={`16px`}
                        fontWeight={`bold`}
                        margin={`10px 0`}
                        padding={`10px 20px`}
                        ju={`space-between`}
                        dr={`row`}
                        cursor={`pointer`}
                        onClick={() =>
                          moveLinkHandler(`./order/detail/${data.id}`)
                        }
                      >
                        <Wrapper al={`flex-start`} width={`auto`}>
                          {data.productName}
                        </Wrapper>
                        <RightArrow />
                      </Wrapper>
                      <Wrapper
                        dr={`row`}
                        borderBottom={`1px solid ${Theme.grey2_C}`}
                        padding={`0 20px 10px`}
                        margin={`0 0 45px`}
                        ju={`space-between`}
                      >
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          width={`clac(100% - 134px)`}
                        >
                          <Image
                            width={`100px`}
                            height={`100px`}
                            src={data.productImg}
                          />
                          <Wrapper
                            width={`calc(100% - 100px)`}
                            al={`flex-start`}
                            padding={`0 0 0 40px`}
                          >
                            <Wrapper width={`auto`}>
                              주문번호 : {data.orderNum}
                            </Wrapper>
                            <Wrapper width={`auto`}>
                              결제금액 : {data.payment}원
                            </Wrapper>
                          </Wrapper>
                        </Wrapper>
                        <Wrapper width={`134px`} height={`50px`}>
                          <CommonButton width={`100%`} height={`100%`}>
                            1:1 문의하기
                          </CommonButton>
                        </Wrapper>
                      </Wrapper>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Order;
