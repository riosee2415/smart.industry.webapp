import React from "react";
import ClientLayout from "../../../../components/ClientLayout";
import { SEO_LIST_REQUEST } from "../../../../reducers/seo";
import Head from "next/head";
import wrapper from "../../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Image,
  CommonButton,
} from "../../../../components/commonComponents";
import useWidth from "../../../../hooks/useWidth";
import Theme from "../../../../components/Theme";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";

const DelTag = styled.del`
  color: ${Theme.grey_C};
  margin: 0 11px 0 14px;
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
  ////// DATAVIEW //////
  const testData = {
    orderNum: "123443122",
    payment: "1,568,000",
    productImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxza-raAsJHK8wZ03T55ti77CChtEvLRpCQ&usqp=CAU",
  };

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
            <Wrapper margin={`40px 0 25px`} al={`flex-start`}>
              HOME | 마이페이지 | 주문내역조회
            </Wrapper>
            <Wrapper
              fontSize={`20px`}
              fontWeight={`bold`}
              ju={`flex-start`}
              margin={`0 0 47px`}
              borderBottom={`1px solid ${Theme.grey2_C}`}
              padding={`0 0 10px`}
              dr={`row`}
            >
              <Wrapper width={`auto`}>주문내역조회</Wrapper>
              <Wrapper
                width={`auto`}
                fontSize={`12px`}
                color={Theme.grey_C}
                lineHeight={`1`}
                padding={`0 0 0 30px`}
              >
                지난 3년간의 주문 내역 조회가 가능합니다.
              </Wrapper>
            </Wrapper>
            <Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`0 0 11px`}
                fontSize={`18px`}
                fontWeight={`bold`}
                dr={`row`}
                ju={`flex-start`}
              >
                <Wrapper width={`auto`} margin={`0 14px 0 0`}>
                  주문번호
                </Wrapper>
                <Wrapper width={`auto`}>
                  {testData && testData.orderNum}
                </Wrapper>
              </Wrapper>
              <Wrapper
                dr={`row`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
                borderTop={`1px solid ${Theme.darkGrey_C}`}
                padding={`30px 20px`}
                margin={`0 0 65px`}
                ju={`space-between`}
              >
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  width={`clac(100% - 224px)`}
                >
                  <Image
                    width={`100px`}
                    height={`100px`}
                    src={testData && testData.productImg}
                  />
                  <Wrapper
                    width={`calc(100% - 100px)`}
                    al={`flex-start`}
                    padding={`0 0 0 40px`}
                    fontSize={`16px`}
                  >
                    <Wrapper dr={`row`} ju={`flex-start`}>
                      <Wrapper width={`auto`} padding={`0 14px 0 0`}>
                        주문번호
                      </Wrapper>
                      <Wrapper width={`auto`}>
                        {testData && testData.orderNum}
                      </Wrapper>
                    </Wrapper>
                    <Wrapper width={`auto`} dr={`row`} ju={`flex-start`}>
                      <Wrapper width={`auto`}>
                        {testData && testData.payment}원
                      </Wrapper>
                      <DelTag>1,200,000원</DelTag>
                      <Wrapper width={`auto`}>| 1개</Wrapper>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
                <Wrapper width={`auto`} dr={`row`}>
                  <Wrapper
                    width={`107px`}
                    height={`50px`}
                    margin={`0 10px 0 0`}
                  >
                    <CommonButton
                      width={`100%`}
                      height={`100%`}
                      kindOf={`white`}
                    >
                      배송완료
                    </CommonButton>
                  </Wrapper>
                  <Wrapper width={`107px`} height={`50px`}>
                    <CommonButton width={`100%`} height={`100%`}>
                      장바구니
                    </CommonButton>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`0 0 11px`}
                fontSize={`18px`}
                fontWeight={`bold`}
                ju={`flex-start`}
              >
                배송조회
              </Wrapper>
              <Wrapper
                dr={`row`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
                borderTop={`1px solid ${Theme.darkGrey_C}`}
                padding={`60px 20px`}
                margin={`0 0 65px`}
                fontSize={`16px`}
              >
                배송중 단계부터 배송상태 확인이 가능합니다.
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`0 0 11px`}
                fontSize={`18px`}
                fontWeight={`bold`}
                ju={`flex-start`}
              >
                결제정보
              </Wrapper>
              <Wrapper
                dr={`row`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
                borderTop={`1px solid ${Theme.darkGrey_C}`}
                padding={`32px 20px`}
                margin={`0 0 65px`}
              >
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  margin={`0 0 25px`}
                  fontSize={`16px`}
                >
                  <Wrapper width={`auto`}>상품금액</Wrapper>
                  <Wrapper width={`auto`}>1,200,000원</Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  margin={`0 0 25px`}
                  fontSize={`16px`}
                >
                  <Wrapper width={`auto`}>배송비</Wrapper>
                  <Wrapper width={`auto`}>0원</Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  margin={`0 0 25px`}
                  fontSize={`16px`}
                >
                  <Wrapper width={`auto`}>상품할인금액</Wrapper>
                  <Wrapper width={`auto`}>-83,000원</Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  margin={`0 0 25px`}
                  fontSize={`16px`}
                >
                  <Wrapper width={`auto`}>결제금액</Wrapper>
                  <Wrapper width={`auto`}>1,117,000원</Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`} fontSize={`16px`}>
                  <Wrapper width={`auto`}>결제방법</Wrapper>
                  <Wrapper width={`auto`}>무통장입금</Wrapper>
                </Wrapper>
              </Wrapper>
              <Wrapper
                al={`flex-start`}
                margin={`0 0 11px`}
                fontSize={`18px`}
                fontWeight={`bold`}
                ju={`flex-start`}
              >
                주문정보
              </Wrapper>
              <Wrapper
                dr={`row`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
                borderTop={`1px solid ${Theme.darkGrey_C}`}
                padding={`32px 20px`}
                margin={`0 0 110px`}
                fontSize={`16px`}
              >
                <Wrapper dr={`row`} margin={`0 0 25px`}>
                  <Wrapper width={`142px`} al={`flex-start`}>
                    주문번호
                  </Wrapper>
                  <Wrapper width={`calc(100% - 182px)`} al={`flex-start`}>
                    1564564948461
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} margin={`0 0 25px`}>
                  <Wrapper width={`142px`} al={`flex-start`}>
                    주문자명
                  </Wrapper>
                  <Wrapper width={`calc(100% - 182px)`} al={`flex-start`}>
                    이름아무개
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} margin={`0 0 25px`}>
                  <Wrapper width={`142px`} al={`flex-start`}>
                    보내는 분
                  </Wrapper>
                  <Wrapper width={`calc(100% - 182px)`} al={`flex-start`}>
                    대한기계공구
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`}>
                  <Wrapper width={`142px`} al={`flex-start`}>
                    결제일시
                  </Wrapper>
                  <Wrapper width={`calc(100% - 182px)`} al={`flex-start`}>
                    2022-02-17 14:24:23
                  </Wrapper>
                </Wrapper>
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

export default Order;
