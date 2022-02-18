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
import { Checkbox, Empty } from "antd";
import styled from "styled-components";

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
  ////// DATAVIEW //////
  const testData = [
    {
      productImg: "",
      productName: "상품명",
      price: "1,000,000",
      total: "1,000,000",
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
                      수량
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
