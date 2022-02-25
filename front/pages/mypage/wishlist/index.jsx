import React, { useEffect } from "react";
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
  WholeWrapper,
  Wrapper,
  Image,
} from "../../../components/commonComponents";
import { useCallback } from "react";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import { useRouter } from "next/dist/client/router";
import { Empty } from "antd";
import styled from "styled-components";
import {
  INTEREST_LIST_REQUEST,
  INTEREST_DELETE_REQUEST,
} from "../../../reducers/interest";

const DelTag = styled.del`
  color: ${Theme.grey_C};
  margin: 0 11px 0 14px;
`;

const WishList = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const { interestList, st_interestDeleteDone, st_interestDeleteError } =
    useSelector((state) => state.interest);

  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////

  const dispatch = useDispatch();
  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (st_interestDeleteError) {
      return message.error(st_interestDeleteError);
    }
  }, [st_interestDeleteError]);

  useEffect(() => {
    dispatch({
      type: INTEREST_LIST_REQUEST,
    });
  }, [st_interestDeleteDone]);

  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const deleteInterest = useCallback((id) => {
    dispatch({
      type: INTEREST_DELETE_REQUEST,
      data: {
        interId: id,
      },
    });
  }, []);

  ////// DATAVIEW //////
  const testData = [
    {
      productName: "상품명",
      price: "1,200,000",
      dcPrice: "1,117,000",
      productImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxza-raAsJHK8wZ03T55ti77CChtEvLRpCQ&usqp=CAU",
    },
    {
      productName: "상품명2",
      price: "1,440,000",
      dcPrice: "1,007,000",
      productImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxza-raAsJHK8wZ03T55ti77CChtEvLRpCQ&usqp=CAU",
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
                onClick={() => moveLinkHandler(`/mypage/wishlist`)}
                cursor={`pointer`}
              >
                관심상품
              </Wrapper>
            </Wrapper>
            <Wrapper
              fontSize={`20px`}
              fontWeight={`bold`}
              al={`flex-start`}
              padding={`0 0 10px`}
              borderBottom={`1px solid ${Theme.grey2_C}`}
            >
              관심상품
            </Wrapper>
            <Wrapper margin={`0 0 110px`}>
              {interestList &&
                (interestList.length === 0 ? (
                  <Wrapper margin={`100px 0`}>
                    <Empty description="조회된 관심상품이 없습니다." />
                  </Wrapper>
                ) : (
                  interestList.map((data) => {
                    return (
                      <Wrapper
                        padding={`30px 20px`}
                        borderBottom={`1px solid ${Theme.grey2_C}`}
                        ju={`space-between`}
                        dr={`row`}
                      >
                        <Wrapper dr={`row`} width={`auto`}>
                          <Image
                            width={`100px`}
                            height={`100px`}
                            src={data.Product.thumbnail}
                          />
                          <Wrapper
                            width={`calc(100% - 100px)`}
                            padding={`0 0 0 50px`}
                            fontSize={`16px`}
                          >
                            <Wrapper al={`flex-start`}>
                              {data.Product.title}
                            </Wrapper>
                            <Wrapper al={`flex-start`} dr={`row`}>
                              <Wrapper width={`auto`}>
                                {String(
                                  parseInt(
                                    data.Product.price -
                                      data.Product.price *
                                        (data.Product.discount / 100)
                                  )
                                ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                원
                              </Wrapper>
                              <DelTag>
                                {String(
                                  parseInt(
                                    data.Product.price *
                                      (data.Product.discount / 100)
                                  )
                                ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                원
                              </DelTag>
                            </Wrapper>
                          </Wrapper>
                        </Wrapper>
                        <Wrapper width={`auto`}>
                          <CommonButton
                            width={`107px`}
                            height={`44px`}
                            margin={`0 0 12px`}
                            kindOf={`white`}
                            onClick={() => deleteInterest(data.id)}
                          >
                            삭제
                          </CommonButton>
                          <CommonButton width={`107px`} height={`44px`}>
                            장바구니
                          </CommonButton>
                        </Wrapper>
                      </Wrapper>
                    );
                  })
                ))}
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

export default WishList;
