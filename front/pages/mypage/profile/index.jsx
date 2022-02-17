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
  Text,
  TextInput,
  CommonButton,
} from "../../../components/commonComponents";
import { useCallback } from "react";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";

const CustomInput = styled(TextInput)`
  width: 406px;
  height: 50px;
  border: 1px solid ${Theme.grey2_C};
  background-color: ${Theme.lightGrey2_C};

  &:focus {
    outline: none;
    border: 1px solid ${Theme.lightGrey2_C};
    background-color: ${Theme.grey2_C};
  }

  @media (max-width: 700px) {
    width: 350px;
  }
`;

const Profile = () => {
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
          <RsWrapper margin={`250px 0 500px 0`}>
            <Wrapper margin={`40px 0 25px`} al={`flex-start`}>
              HOME | 마이페이지 | 회원정보
            </Wrapper>
            <Wrapper
              fontSize={`20px`}
              fontWeight={`bold`}
              al={`flex-start`}
              padding={`0 0 10px`}
              borderBottom={`1px solid ${Theme.grey2_C}`}
              margin={`0 0 40px`}
            >
              회원정보
            </Wrapper>
            <Wrapper width={width < 700 ? `370px` : `600px`}>
              <Text
                fontSize={`18px`}
                fontWeight={`400`}
                margin={`80px 0 10px 0`}
                color={Theme.darkGrey_C}
              >
                비밀번호 재확인
              </Text>
              <Wrapper
                width={`85%`}
                dr={width < 700 ? `column` : `row`}
                margin={`15px 0 55px 0`}
              >
                <Text
                  fontSize={width < 700 ? `14px` : `16px`}
                  color={Theme.grey_C}
                >
                  회원님의 정보를 안전하게 보호하기 위해&nbsp;
                </Text>
                <Text
                  fontSize={width < 700 ? `14px` : `16px`}
                  color={Theme.grey_C}
                >
                  비밀번호를 다시 한번 확인해주세요
                </Text>
              </Wrapper>
              <Wrapper
                width={`100%`}
                height={`130px`}
                dr={`column`}
                al={`space-between`}
              >
                <Wrapper
                  width={`100%`}
                  dr={`row`}
                  ju={`space-between`}
                  margin={`0 0 30px 0`}
                >
                  <Text
                    fontSize={`18px`}
                    fontWeight={`700`}
                    color={`1px solid ${Theme.darkGrey_C}`}
                    margin={`0 5%`}
                    display={width < 700 ? `none` : `flex`}
                  >
                    아이디
                  </Text>
                  <CustomInput
                    margin={`0 5%`}
                    placeholder={width < 700 ? `아이디` : ``}
                  />
                </Wrapper>
                <Wrapper width={`100%`} dr={`row`} ju={`space-between`}>
                  <Text
                    fontSize={`18px`}
                    fontWeight={`700`}
                    color={`1px solid ${Theme.darkGrey_C}`}
                    margin={`0 5%`}
                    display={width < 700 ? `none` : `flex`}
                  >
                    비밀번호
                  </Text>
                  <CustomInput
                    margin={`0 5%`}
                    placeholder={width < 700 ? `비밀번호` : ``}
                  />
                </Wrapper>
              </Wrapper>
              <CommonButton
                width={`150px`}
                height={`50px`}
                radius={`0`}
                margin={`55px 0 0 15px`}
              >
                확인
              </CommonButton>
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

export default Profile;
