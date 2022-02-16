import React, { useCallback } from "react";
import ClientLayout from "../../components/ClientLayout";
import { SEO_LIST_REQUEST } from "../../reducers/seo";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Image,
} from "../../components/commonComponents";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import { useRouter } from "next/dist/client/router";

const MypageBtn = styled(Wrapper)`
  width: 242px;
  height: 242px;
  background-color: ${Theme.lightGrey2_C};
  border: 1px solid ${Theme.grey2_C};
  margin: ${(props) => props.margin || `0 35px 0 0`};
  cursor: pointer;
`;

const Mypage = () => {
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
              HOME | 마이페이지
            </Wrapper>
            <Wrapper
              fontSize={`20px`}
              fontWeight={`bold`}
              al={`flex-start`}
              margin={`0 0 10px`}
            >
              마이페이지
            </Wrapper>
            <Wrapper
              borderBottom={`1px solid ${Theme.grey2_C}`}
              margin={`0 0 30px`}
            ></Wrapper>

            <Wrapper dr={`row`}>
              <MypageBtn onClick={() => moveLinkHandler(`mypage/order`)}>
                <Wrapper fontSize={`20px`}>주문내역조회</Wrapper>
                <Wrapper
                  fontSize={`18px`}
                  lineHeight={`1`}
                  color={Theme.grey_C}
                  margin={`15px 0 19px`}
                >
                  ORDER
                </Wrapper>
                <Wrapper>
                  <Image width={`18px`} height={`18px`} src={``} />
                </Wrapper>
                <Wrapper
                  fontSize={`12px`}
                  color={Theme.grey_C}
                  margin={`25px 0 0`}
                  lineHeight={`1.2`}
                >
                  고객님께서 주문하신 상품의
                </Wrapper>
                <Wrapper fontSize={`12px`} color={Theme.grey_C}>
                  주문내역을 확인하실 수 있습니다.
                </Wrapper>
              </MypageBtn>
              <MypageBtn onClick={() => moveLinkHandler(`mypage/profile`)}>
                <Wrapper fontSize={`20px`}>회원정보</Wrapper>
                <Wrapper
                  fontSize={`18px`}
                  lineHeight={`1`}
                  color={Theme.grey_C}
                  margin={`15px 0 19px`}
                >
                  PROFILE
                </Wrapper>
                <Wrapper>
                  <Image width={`18px`} height={`18px`} src={``} />
                </Wrapper>
                <Wrapper
                  fontSize={`12px`}
                  color={Theme.grey_C}
                  margin={`25px 0 0`}
                  lineHeight={`1.2`}
                >
                  회원이신 고객님의 개인정보를
                </Wrapper>
                <Wrapper fontSize={`12px`} color={Theme.grey_C}>
                  관리하는 공간입니다.
                </Wrapper>
              </MypageBtn>
              <MypageBtn onClick={() => moveLinkHandler(`mypage/cart`)}>
                <Wrapper fontSize={`20px`}>장바구니</Wrapper>
                <Wrapper
                  fontSize={`18px`}
                  lineHeight={`1`}
                  color={Theme.grey_C}
                  margin={`15px 0 19px`}
                >
                  CART
                </Wrapper>
                <Wrapper>
                  <Image width={`18px`} height={`18px`} src={``} />
                </Wrapper>
                <Wrapper
                  fontSize={`12px`}
                  color={Theme.grey_C}
                  margin={`25px 0 0`}
                  lineHeight={`1.2`}
                >
                  장바구니에 담은
                </Wrapper>
                <Wrapper fontSize={`12px`} color={Theme.grey_C}>
                  상품의 목록을 보여드립니다.
                </Wrapper>
              </MypageBtn>
              <MypageBtn onClick={() => moveLinkHandler(`mypage/wishlist`)}>
                <Wrapper fontSize={`20px`}>관심 상품</Wrapper>
                <Wrapper
                  fontSize={`18px`}
                  lineHeight={`1`}
                  color={Theme.grey_C}
                  margin={`15px 0 19px`}
                >
                  WISHLIST
                </Wrapper>
                <Wrapper>
                  <Image width={`18px`} height={`18px`} src={``} />
                </Wrapper>
                <Wrapper
                  fontSize={`12px`}
                  color={Theme.grey_C}
                  margin={`25px 0 0`}
                  lineHeight={`1.2`}
                >
                  관심상품으로 등록하신
                </Wrapper>
                <Wrapper fontSize={`12px`} color={Theme.grey_C}>
                  상품의 목록을 보여드립니다.
                </Wrapper>
              </MypageBtn>
              <MypageBtn
                margin={`0`}
                onClick={() => moveLinkHandler(`mypage/board`)}
              >
                <Wrapper fontSize={`20px`}>1:1문의내역</Wrapper>
                <Wrapper
                  fontSize={`18px`}
                  lineHeight={`1`}
                  color={Theme.grey_C}
                  margin={`15px 0 19px`}
                >
                  BOARD
                </Wrapper>
                <Wrapper>
                  <Image width={`18px`} height={`18px`} src={``} />
                </Wrapper>
                <Wrapper
                  fontSize={`12px`}
                  color={Theme.grey_C}
                  margin={`25px 0 0`}
                  lineHeight={`1.2`}
                >
                  고객님께서 작성하신
                </Wrapper>
                <Wrapper fontSize={`12px`} color={Theme.grey_C}>
                  문의 내역을 보여드립니다.
                </Wrapper>
              </MypageBtn>
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

export default Mypage;
