import React, { useEffect, useState } from "react";
import ClientLayout from "../../../../components/ClientLayout";
import { SEO_LIST_REQUEST } from "../../../../reducers/seo";
import Head from "next/head";
import wrapper from "../../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
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
import { useCallback } from "react";
import { WISH_LIST_DETAIL_REQUEST } from "../../../../reducers/wish";
import { numberWithCommas } from "../../../../components/commonUtils";

const DelTag = styled.del`
  color: ${Theme.grey_C};
  margin: ${(props) => props.margin || `0 11px 0 14px`};
`;

const Order = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////

  const [price, setPrice] = useState(null);
  const [dPrice, setDPrice] = useState(null);

  const [delPrice, setDelPrice] = useState(null);
  const [prodPrice, setProdPrice] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  ////// REDUX //////
  const dispatch = useDispatch();

  const { boughtHistoryDetail, deliveryDetail } = useSelector(
    (state) => state.wish
  );

  ////// USEEFFECT //////

  useEffect(() => {
    let tempData1 = 0; //상품가격
    let tempData2 = 0; //배송비
    let tempData3 = 0; //할인 가격

    if (boughtHistoryDetail && boughtHistoryDetail[0].WishItems) {
      for (let i = 0; i < boughtHistoryDetail[0].WishItems.length; i++) {
        tempData1 +=
          boughtHistoryDetail[0].WishItems[i].Product.price *
          boughtHistoryDetail[0].WishItems[i].count;

        tempData2 += boughtHistoryDetail[0].WishItems[i].Product.deliveryPay;

        tempData3 +=
          boughtHistoryDetail[0].WishItems[i].Product.price *
          boughtHistoryDetail[0].WishItems[i].count *
          (boughtHistoryDetail[0].WishItems[i].Product.discount / 100);
      }

      setDelPrice(tempData2);
      setProdPrice(tempData1);
      setDiscountPrice(tempData3);
    }
  }, [boughtHistoryDetail]);

  useEffect(() => {
    dispatch({
      type: WISH_LIST_DETAIL_REQUEST,
      data: {
        boughtId: router.query.id,
      },
    });
  }, [router.query]);

  useEffect(() => {
    let pay = 0;
    let dPay = 0;
    boughtHistoryDetail &&
      boughtHistoryDetail[0].WishItems &&
      boughtHistoryDetail[0].WishItems.map((data) => {
        pay += data.Product.price;
        dPay += data.Product.deliveryPay;
      });
    setPrice(pay);
    setDPrice(dPay);
  }, [boughtHistoryDetail]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);
  ////// DATAVIEW //////
  // const boughtHistoryDetail = {
  //   orderNum: "123443122",
  //   payment: "1,568,000",
  //   productImg:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxza-raAsJHK8wZ03T55ti77CChtEvLRpCQ&usqp=CAU",
  // };

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
                onClick={() => moveLinkHandler(`/mypage`)}
                cursor={`pointer`}
              >
                마이페이지
              </Wrapper>
              |
              <Wrapper
                width={`auto`}
                margin={`0 8px`}
                onClick={() => moveLinkHandler(`/mypage/order`)}
                cursor={`pointer`}
              >
                주문내역조회
              </Wrapper>
              |
              <Wrapper width={`auto`} margin={`0 0 0 8px`}>
                주문내역조회상세
              </Wrapper>
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
                borderBottom={`1px solid ${Theme.darkGrey_C}`}
              >
                <Wrapper margin={`0 14px 0 0`} width={`auto`}>
                  주문번호
                </Wrapper>
                <Wrapper width={`auto`}>
                  {boughtHistoryDetail && boughtHistoryDetail[0].orderNum}
                </Wrapper>
                <Wrapper width={`auto`}></Wrapper>
              </Wrapper>
              <Wrapper margin={`0 0 65px`}>
                {boughtHistoryDetail &&
                boughtHistoryDetail[0].WishItems &&
                boughtHistoryDetail[0].WishItems.length === 0
                  ? `asd`
                  : boughtHistoryDetail &&
                    boughtHistoryDetail[0].WishItems &&
                    boughtHistoryDetail[0].WishItems.map((data, idx) => {
                      return (
                        <Wrapper
                          dr={`row`}
                          borderBottom={`1px solid ${Theme.grey2_C}`}
                          padding={`30px 20px`}
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
                              src={data.Product.thumbnail}
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
                                  {boughtHistoryDetail &&
                                    boughtHistoryDetail[0].orderNum}
                                </Wrapper>
                              </Wrapper>
                              <Wrapper
                                width={`auto`}
                                dr={`row`}
                                ju={`flex-start`}
                              >
                                <DelTag margin={`0`}>
                                  {data.Product.discount !== 0 &&
                                    `${numberWithCommas(data.Product.price)}
                                  원`}
                                </DelTag>
                                <Wrapper
                                  width={`auto`}
                                  margin={
                                    data.Product.discount === 0
                                      ? `0`
                                      : `0 0 0 11px`
                                  }
                                >
                                  {numberWithCommas(
                                    data.Product.price -
                                      data.Product.price *
                                        (data.Product.discount / 100)
                                  )}
                                  원
                                </Wrapper>
                                <Wrapper width={`auto`}>
                                  &nbsp;| {data.count > 0 && `${data.count}개`}
                                </Wrapper>
                              </Wrapper>
                            </Wrapper>
                          </Wrapper>
                          <Wrapper width={`auto`} dr={`row`}>
                            {/* <Wrapper
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
                            </Wrapper> */}
                            <Wrapper width={`107px`} height={`50px`}>
                              <CommonButton
                                width={`100%`}
                                height={`100%`}
                                onClick={() => moveLinkHandler(`/mypage/cart`)}
                              >
                                장바구니
                              </CommonButton>
                            </Wrapper>
                          </Wrapper>
                        </Wrapper>
                      );
                    })}
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
              {deliveryDetail && deliveryDetail.length === 0 ? (
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
              ) : (
                deliveryDetail &&
                deliveryDetail.map((data, idx) => {
                  return (
                    <Wrapper
                      dr={`row`}
                      borderBottom={`1px solid ${Theme.grey2_C}`}
                      borderTop={`1px solid ${Theme.darkGrey_C}`}
                      padding={`60px 20px`}
                      margin={`0 0 65px`}
                      fontSize={`16px`}
                    >
                      {data.text}
                    </Wrapper>
                  );
                })
              )}
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
                  <Wrapper width={`auto`}>
                    {prodPrice && numberWithCommas(prodPrice)}원
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  margin={`0 0 25px`}
                  fontSize={`16px`}
                >
                  <Wrapper width={`auto`}>배송비</Wrapper>
                  <Wrapper width={`auto`}>
                    {delPrice && numberWithCommas(delPrice)}원
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  margin={`0 0 25px`}
                  fontSize={`16px`}
                >
                  <Wrapper width={`auto`}>상품할인금액</Wrapper>
                  <Wrapper width={`auto`}>
                    -{discountPrice && discountPrice}원
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  margin={`0 0 25px`}
                  fontSize={`16px`}
                >
                  <Wrapper width={`auto`}>결제금액</Wrapper>
                  <Wrapper width={`auto`}>
                    {numberWithCommas(prodPrice + delPrice - discountPrice)}원
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} ju={`space-between`} fontSize={`16px`}>
                  <Wrapper width={`auto`}>결제방법</Wrapper>
                  <Wrapper width={`auto`}>-</Wrapper>
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
                    {boughtHistoryDetail && boughtHistoryDetail[0].orderNum}
                  </Wrapper>
                </Wrapper>
                <Wrapper dr={`row`} margin={`0 0 25px`}>
                  <Wrapper width={`142px`} al={`flex-start`}>
                    주문자명
                  </Wrapper>
                  <Wrapper width={`calc(100% - 182px)`} al={`flex-start`}>
                    {boughtHistoryDetail && boughtHistoryDetail[0].name}
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
                    -
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
