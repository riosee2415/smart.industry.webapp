import { React, useCallback, useEffect, useState } from "react";
import { Checkbox, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ClientLayout from "../../components/ClientLayout";
import { SEO_LIST_REQUEST } from "../../reducers/seo";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import {
  FIND_USER_CHECK_SECRET_REQUEST,
  FIND_USER_ID_REQUEST,
  FIND_USER_PASS_REQUEST,
  FIND_USER_PASS_UPDATE_REQUEST,
  LOAD_MY_INFO_REQUEST,
  LOGIN_REQUEST,
} from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import {
  RsWrapper,
  TextInput,
  WholeWrapper,
  Wrapper,
  Text,
  CommonButton,
} from "../../components/commonComponents";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import Theme from "../../components/Theme";
import useInput from "../../hooks/useInput";
import { useRouter } from "next/router";

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const CustomInput = styled(TextInput)`
  border: none;
  border-bottom: 1px solid ${Theme.grey2_C};

  width: 100%;
  height: 40px;

  &::placeholder {
    color: ${Theme.grey_C};
    font-size: 14px;
  }

  &:focus {
    outline: none;
    border: none;
    border-bottom: 1px solid ${Theme.grey3_C};
  }
`;

const FindPass = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );
  ////// HOOKS //////
  const width = useWidth();
  const router = useRouter();

  const inputUserId = useInput("");
  const inputEmail = useInput("");
  const inputSecret = useInput("");

  const inputPass = useInput("");
  const inputPassCheck = useInput("");

  ////// REDUX //////
  const dispatch = useDispatch();
  const {
    st_findUserPassDone,
    st_findUserPassError,
    foundID,
    st_findUserCheckSecretDone,
    st_findUserCheckSecretError,

    st_findUserPassUpdateDone,
    st_findUserPassUpdateError,
  } = useSelector((state) => state.user);
  ////// USEEFFECT //////

  useEffect(() => {
    if (st_findUserPassDone) {
      LoadNotification("이메일에 체크코드를 전송했습니다.");
    }
  }, [st_findUserPassDone]);

  useEffect(() => {
    if (st_findUserPassUpdateDone) {
      router.replace("/login");
      return LoadNotification("비밀번호가 수정되었습니다.");
    }
  }, [st_findUserPassUpdateDone]);

  useEffect(() => {
    if (st_findUserPassError) {
      return LoadNotification(st_findUserPassError);
    }
  }, [st_findUserPassError]);

  useEffect(() => {
    if (st_findUserCheckSecretError) {
      return LoadNotification(st_findUserCheckSecretError);
    }
  }, [st_findUserCheckSecretError]);

  useEffect(() => {
    if (st_findUserPassUpdateError) {
      return LoadNotification(st_findUserPassUpdateError);
    }
  }, [st_findUserPassUpdateError]);

  ////// TOGGLE //////

  ////// HANDLER //////
  const passwordHandler = useCallback(() => {
    if (!inputUserId.value || inputUserId.value.trim() === "") {
      return LoadNotification("이름을 입력해주세요.");
    }
    if (!inputEmail.value || inputEmail.value.trim() === "") {
      return LoadNotification("이메일을 입력해주세요.");
    }

    dispatch({
      type: FIND_USER_PASS_REQUEST,
      data: {
        userId: inputUserId.value,
        email: inputEmail.value,
      },
    });
  }, [inputUserId, inputEmail]);

  const secretPasswordHandler = useCallback(() => {
    dispatch({
      type: FIND_USER_CHECK_SECRET_REQUEST,
      data: {
        secret: inputSecret.value,
      },
    });
  }, [inputSecret]);

  const changePasswordHandler = useCallback(() => {
    let reg = /^[a-z0-9]{4,16}$/;

    if (!reg.test(inputPass.value)) {
      return LoadNotification("비밀번호를 영문소문자, 숫자로 입력해주세요.");
    }

    if (inputPass.value !== inputPassCheck.value) {
      return LoadNotification("비밀번호가 일치하지 않습니다.");
    }

    dispatch({
      type: FIND_USER_PASS_UPDATE_REQUEST,
      data: {
        userId: inputUserId.value,
        password: inputPass.value,
      },
    });
  }, [inputUserId, inputPass]);

  const moveLinkHandler = (link) => {
    router.push(link);
  };

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
          <RsWrapper height={`100vh`}>
            <Wrapper width={width < 700 ? `100%` : `380px`}>
              <Text fontSize={`22px`} fontWeight={`700`} margin={`0 0 10px`}>
                FIND YOUR PASSWORD
              </Text>
              <Text fontSize={`18px`} margin={`0 0 40px`} color={Theme.grey_C}>
                비밀번호 찾기
              </Text>
              {!st_findUserPassDone ? (
                <>
                  <CustomInput
                    {...inputUserId}
                    placeholder="아이디를 입력해주세요."
                    margin={`0 0 5px`}
                  />
                  <CustomInput
                    {...inputEmail}
                    placeholder="이메일을 입력해주세요."
                    margin={`0 0 20px`}
                  />

                  <CommonButton
                    width={`100%`}
                    height={`50px`}
                    radius={`0`}
                    margin={`0 0 15px`}
                    onClick={passwordHandler}
                  >
                    비밀번호 찾기
                  </CommonButton>
                </>
              ) : st_findUserCheckSecretDone ? (
                <>
                  <CustomInput
                    {...inputPass}
                    placeholder="변경할 비밀번호"
                    margin={`0 0 20px`}
                  />
                  <CustomInput
                    {...inputPassCheck}
                    placeholder="변경할 비밀번호 확인"
                    margin={`0 0 20px`}
                  />

                  <CommonButton
                    width={`100%`}
                    height={`50px`}
                    radius={`0`}
                    margin={`0 0 15px`}
                    onClick={changePasswordHandler}
                  >
                    비밀번호 변경
                  </CommonButton>
                </>
              ) : (
                <>
                  <CustomInput
                    {...inputSecret}
                    placeholder="인증코드를 입력해주세요."
                    margin={`0 0 20px`}
                  />

                  <CommonButton
                    width={`100%`}
                    height={`50px`}
                    radius={`0`}
                    margin={`0 0 15px`}
                    onClick={secretPasswordHandler}
                  >
                    인증하기
                  </CommonButton>
                </>
              )}
              <Wrapper
                height={`40px`}
                borderTop={`1px solid ${Theme.grey2_C}`}
                dr={`row`}
                ju={`space-between`}
                al={`flex-end`}
              >
                <Wrapper
                  width={`auto`}
                  fontSize={width < 700 ? `12px` : `14px`}
                  color={Theme.grey_C}
                  cursor={`pointer`}
                >
                  로그인
                </Wrapper>
                <Text
                  fontSize={width < 700 ? `12px` : `14px`}
                  color={Theme.grey3_C}
                >
                  |
                </Text>
                <Wrapper
                  width={`auto`}
                  fontSize={width < 700 ? `12px` : `14px`}
                  color={Theme.grey_C}
                  cursor={`pointer`}
                >
                  아이디찾기
                </Wrapper>
                <Text
                  fontSize={width < 700 ? `12px` : `14px`}
                  color={Theme.grey3_C}
                >
                  |
                </Text>
                <Wrapper
                  width={`auto`}
                  fontSize={width < 700 ? `12px` : `14px`}
                  color={Theme.grey_C}
                  cursor={`pointer`}
                  onClick={() => moveLinkHandler("/user/signup")}
                >
                  회원가입
                </Wrapper>
                <Text
                  fontSize={width < 700 ? `12px` : `14px`}
                  color={Theme.grey3_C}
                >
                  |
                </Text>
                <Wrapper
                  width={`auto`}
                  fontSize={width < 700 ? `12px` : `14px`}
                  color={Theme.grey_C}
                  cursor={`pointer`}
                >
                  비회원 주문조회
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

export default FindPass;
