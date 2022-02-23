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
  Text,
} from "../../../components/commonComponents";
import { useCallback } from "react";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import { useRouter } from "next/dist/client/router";
import { Checkbox, Empty, message } from "antd";
import styled from "styled-components";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const CommonCheckBox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${Theme.basicTheme_C};
    border-color: ${Theme.basicTheme_C};
  }
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${Theme.basicTheme_C};
  }

  .ant-checkbox-checked::after {
    border: none;
  }
`;

const DarkgreyBtn = styled(CommonButton)`
  width: 112px;
  height: 30px;
  margin: 0 0 3px;
  padding: 0 0 2px;
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

const Cart = () => {
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

  const countHandler = useCallback((count) => {
    if (count >= 1) {
      // dispatch({
      //   type: WISH_UPDATE_REQUEST,
      //   data: {
      //     id,
      //     count,
      //   },
      // });
    } else {
      message.error({
        content: "현재 최소 수량입니다.",
        className: "custom-class",
        style: {
          marginTop: "100px",
        },
      });
    }
  }, []);
  ////// DATAVIEW //////
  const testData = [
    {
      id: 1,
      productImg: "",
      productName: "상품명",
      price: "1,000,000",
      total: "1,000,000",
      count: 1,
    },
    {
      id: 2,
      productImg: "",
      productName: "상품명",
      price: "1,000,000",
      total: "1,000,000",
      count: 1,
    },
  ];

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
                onClick={() => moveLinkHandler(`/mypage/cart`)}
                cursor={`pointer`}
              >
                장바구니
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
              장바구니
            </Wrapper>
            <Wrapper width={`479px`}>
              <Image
                width={`100%`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/order/first_step_title.png`}
              />
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`40px 0 20px`}>
              <CommonButton width={`209px`} height={`53px`} radius={`0`}>
                배송상품 (2)
              </CommonButton>
            </Wrapper>
            <Wrapper
              borderBottom={`1px solid ${Theme.grey2_C}`}
              borderTop={`1px solid ${Theme.grey2_C}`}
              padding={`15px 0 15px 10px`}
              al={`flex-start`}
              bgColor={Theme.lightGrey2_C}
            >
              일반상품 (2)
            </Wrapper>
            <Wrapper
              dr={`row`}
              bgColor={Theme.lightGrey2_C}
              borderBottom={`1px solid ${Theme.grey2_C}`}
              height={`62px`}
            >
              <Wrapper
                width={`calc((100% - 115px - 138px) * 0.03)`}
                borderRight={`1px solid ${Theme.grey2_C}`}
                height={`100%`}
              >
                <CommonCheckBox />
              </Wrapper>
              <Wrapper
                width={`115px`}
                borderRight={`1px solid ${Theme.grey2_C}`}
                height={`100%`}
              >
                이미지
              </Wrapper>
              <Wrapper
                width={`calc((100% - 115px - 138px) * 0.27)`}
                borderRight={`1px solid ${Theme.grey2_C}`}
                height={`100%`}
              >
                상품정보
              </Wrapper>
              <Wrapper
                width={`calc((100% - 115px - 138px) * 0.13)`}
                borderRight={`1px solid ${Theme.grey2_C}`}
                height={`100%`}
              >
                판매가
              </Wrapper>
              <Wrapper
                width={`calc((100% - 115px - 138px) * 0.1)`}
                borderRight={`1px solid ${Theme.grey2_C}`}
                height={`100%`}
              >
                수량
              </Wrapper>
              <Wrapper
                width={`calc((100% - 115px - 138px) * 0.12)`}
                borderRight={`1px solid ${Theme.grey2_C}`}
                height={`100%`}
              >
                적립금
              </Wrapper>
              <Wrapper
                width={`calc((100% - 115px - 138px) * 0.12)`}
                borderRight={`1px solid ${Theme.grey2_C}`}
                height={`100%`}
              >
                배송구분
              </Wrapper>
              <Wrapper
                width={`calc((100% - 115px - 138px) * 0.1)`}
                borderRight={`1px solid ${Theme.grey2_C}`}
                height={`100%`}
              >
                배송비
              </Wrapper>
              <Wrapper
                width={`calc((100% - 115px - 138px) * 0.13)`}
                borderRight={`1px solid ${Theme.grey2_C}`}
                height={`100%`}
              >
                합계
              </Wrapper>
              <Wrapper width={`138px`}>선택</Wrapper>
            </Wrapper>
            {testData && testData.length === 0 ? (
              <Empty description="조회된 상품이 없습니다." />
            ) : (
              testData &&
              testData.map((data) => {
                return (
                  <Wrapper
                    dr={`row`}
                    height={`145px`}
                    borderBottom={`1px solid ${Theme.grey2_C}`}
                  >
                    <Wrapper
                      width={`calc((100% - 115px - 138px) * 0.03)`}
                      borderRight={`1px solid ${Theme.grey2_C}`}
                      height={`100%`}
                    >
                      <CommonCheckBox />
                    </Wrapper>
                    <Wrapper
                      width={`115px`}
                      borderRight={`1px solid ${Theme.grey2_C}`}
                      height={`100%`}
                    >
                      <Image
                        width={`100px`}
                        height={`100px`}
                        src={data.productImg}
                      />
                    </Wrapper>
                    <Wrapper
                      width={`calc((100% - 115px - 138px) * 0.27)`}
                      borderRight={`1px solid ${Theme.grey2_C}`}
                      height={`100%`}
                      al={`flex-start`}
                      padding={`0 20px`}
                    >
                      {data.productName}
                    </Wrapper>
                    <Wrapper
                      width={`calc((100% - 115px - 138px) * 0.13)`}
                      borderRight={`1px solid ${Theme.grey2_C}`}
                      height={`100%`}
                    >
                      {data.price}원
                    </Wrapper>
                    <Wrapper
                      width={`calc((100% - 115px - 138px) * 0.1)`}
                      borderRight={`1px solid ${Theme.grey2_C}`}
                      height={`100%`}
                    >
                      <Wrapper
                        width={width < 700 ? `60px` : `72px`}
                        height={width < 700 ? `30px` : `25px`}
                        border={`1px solid ${Theme.grey2_C}`}
                        radius={`5px`}
                        dr={`row`}
                        padding={width < 700 ? `0 5px` : `0 10px`}
                        ju={`space-between`}
                        margin={`0 10px 0 0`}
                      >
                        <MinusOutlined
                          style={{
                            color: Theme.darkGrey_C,
                            fontSize: `10px`,
                          }}
                          onClick={() => countHandler(data.count - 1)}
                        />
                        <Text color={Theme.darkGrey_C} fontSize={`15px`}>
                          {data.count}
                        </Text>
                        <PlusOutlined
                          style={{
                            color: Theme.darkGrey_C,
                            fontSize: `10px`,
                          }}
                          onClick={() => countHandler(data.count + 1)}
                        />
                      </Wrapper>
                    </Wrapper>
                    <Wrapper
                      width={`calc((100% - 115px - 138px) * 0.12)`}
                      borderRight={`1px solid ${Theme.grey2_C}`}
                      height={`100%`}
                    >
                      -
                    </Wrapper>
                    <Wrapper
                      width={`calc((100% - 115px - 138px) * 0.12)`}
                      borderRight={`1px solid ${Theme.grey2_C}`}
                      height={`100%`}
                    >
                      기본배송
                    </Wrapper>
                    <Wrapper
                      width={`calc((100% - 115px - 138px) * 0.1)`}
                      borderRight={`1px solid ${Theme.grey2_C}`}
                      height={`100%`}
                    >
                      무료
                    </Wrapper>
                    <Wrapper
                      width={`calc((100% - 115px - 138px) * 0.13)`}
                      borderRight={`1px solid ${Theme.grey2_C}`}
                      height={`100%`}
                    >
                      {data.total}원
                    </Wrapper>
                    <Wrapper width={`138px`}>
                      <DarkgreyBtn>문의하기</DarkgreyBtn>
                      <CommonButton
                        width={`112px`}
                        height={`30px`}
                        margin={`0 0 3px`}
                        radius={`0`}
                        fontSize={`14px`}
                        padding={`0 0 2px`}
                        kindOf={`grey`}
                      >
                        관심상품등록
                      </CommonButton>
                      <CommonButton
                        width={`112px`}
                        height={`30px`}
                        radius={`0`}
                        fontSize={`14px`}
                        padding={`0 0 2px`}
                        kindOf={`grey`}
                      >
                        삭제
                      </CommonButton>
                    </Wrapper>
                  </Wrapper>
                );
              })
            )}
            <Wrapper
              height={`75px`}
              bgColor={Theme.lightGrey2_C}
              borderBottom={`1px solid ${Theme.grey2_C}`}
              dr={`row`}
              ju={`space-between`}
            >
              <Wrapper width={`5%`}>기본배송</Wrapper>
              <Wrapper width={`95%`} dr={`row`} ju={`flex-end`}>
                상품구매금액 2,000,000 + 부가세 200,000 배송비 0 (무료) = 합계:
                <Wrapper
                  width={`auto`}
                  color={Theme.red_C}
                  fontSize={`22px`}
                  fontWeight={`bold`}
                  margin={`0 13px 0 22px`}
                >
                  2,200,000원
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper
              height={`48px`}
              borderBottom={`1px solid ${Theme.grey2_C}`}
              ju={`flex-start`}
              dr={`row`}
              margin={`0 0 18px`}
            >
              <Wrapper
                width={`16px`}
                height={`17px`}
                bgColor={Theme.lightGrey_C}
                color={Theme.red_C}
                margin={`0 12px 0 10px`}
              >
                !
              </Wrapper>
              <Wrapper
                width={`calc(100% - 38px)`}
                color={Theme.grey_C}
                al={`flex-start`}
              >
                할인 적용 금액은 주문서작성의 결제예정금액에서 확인 가능합니다.
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

export default Cart;
