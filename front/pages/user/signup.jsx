import React, { useCallback, useEffect, useState } from "react";
import Router from "next/router";
import { Select, Radio } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { SIGNUP_REQUEST } from "../../reducers/user";
import ClientLayout from "../../components/ClientLayout";
import { SEO_LIST_REQUEST } from "../../reducers/seo";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import {
  CommonButton,
  RsWrapper,
  SpanText,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import styled from "styled-components";
import Theme from "../../components/Theme";

const SignUpWrapper = styled(Wrapper)`
  height: ${(props) => props.height || `50px`};
  justify-content: flex-start;
  flex-direction: row;
`;

const TitleWrapper = styled(Wrapper)`
  width: 13%;
  border-right: 1px solid ${Theme.grey2_C};
  padding: 0 0 0 20px;
  align-items: flex-start;
  height: 100%;
  margin: 0 10px 0 0;
`;

const RadioBtn = styled(Radio)`
  &.ant-radio-wrapper {
    margin-right: 0;
  }
`;

const SignupInput = styled(TextInput)`
  heigth: 33px;
`;

const SelectStyle = styled(Select)`
  &.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: 40px;
  }
  &.ant-select-single.ant-select-show-arrow .ant-select-selection-item,
  .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
    padding: 5px;
  }
`;

const { Option } = Select;

const SignUp = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );
  ////// HOOKS //////
  const dispatch = useDispatch();

  const email = useInput(``);
  const nickname = useInput(``);

  const password = useInput(``);

  const [passwordCheck, setPasswordCheck] = useState(``);
  const [passwordError, setPasswordError] = useState(false);

  ////// REDUX //////
  const { st_signUpLoading, st_signUpDone } = useSelector(
    (state) => state.user
  );
  ////// USEEFFECT //////
  useEffect(() => {
    if (st_signUpDone) {
      alert("회원가입 성공!");
      Router.replace("/");
    }
  }, [st_signUpDone]);
  ////// TOGGLE //////
  ////// HANDLER //////\

  const checkPasswordChangeHandler = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password.value);
    },
    [password.value]
  );

  const onSubmit = useCallback(() => {
    if (password.value !== passwordCheck) {
      alert("비밀번호 확인!");
      return setPasswordError(true);
    }

    dispatch({
      type: SIGNUP_REQUEST,
      data: {
        email: email.value,
        password: password.value,
        nickname: nickname.value,
      },
    });
  }, [email, nickname, password, passwordCheck]);

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
              HOME | 회원가입
            </Wrapper>
            <Wrapper
              fontSize={`20px`}
              fontWeight={`bold`}
              al={`flex-start`}
              margin={`0 0 10px`}
            >
              회원가입
            </Wrapper>
            <Wrapper
              borderBottom={`1px solid ${Theme.grey2_C}`}
              margin={`0 0 30px`}
            ></Wrapper>
            <SignUpWrapper
              borderBottom={`1px solid ${Theme.grey2_C}`}
              borderTop={`1px solid ${Theme.grey2_C}`}
              margin={`0 0 30px`}
              bgColor={Theme.lightGrey_C}
            >
              <TitleWrapper>회원구분</TitleWrapper>
              <Wrapper width={`auto`}>
                <RadioBtn>개인회원</RadioBtn>
              </Wrapper>
            </SignUpWrapper>
            <SignUpWrapper
              borderBottom={`1px solid ${Theme.grey2_C}`}
              borderTop={`1px solid ${Theme.grey2_C}`}
            >
              <TitleWrapper>아이디</TitleWrapper>
              <Wrapper width={`auto`} dr={`row`}>
                <SignupInput width={`206px`} />
                <Wrapper
                  width={`calc(100% - 206px)`}
                  color={Theme.grey_C}
                  padding={`0 0 0 10px`}
                >
                  (영문소문자/숫자, 4~16자)
                </Wrapper>
              </Wrapper>
            </SignUpWrapper>
            <SignUpWrapper borderBottom={`1px solid ${Theme.grey2_C}`}>
              <TitleWrapper>비밀번호</TitleWrapper>
              <Wrapper width={`auto`} dr={`row`}>
                <SignupInput width={`206px`} />
                <Wrapper
                  width={`calc(100% - 206px)`}
                  color={Theme.grey_C}
                  padding={`0 0 0 10px`}
                >
                  (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10~16자)
                </Wrapper>
              </Wrapper>
            </SignUpWrapper>
            <SignUpWrapper borderBottom={`1px solid ${Theme.grey2_C}`}>
              <TitleWrapper>비밀번호 확인</TitleWrapper>
              <Wrapper width={`auto`}>
                <SignupInput width={`206px`} />
              </Wrapper>
            </SignUpWrapper>
            <SignUpWrapper borderBottom={`1px solid ${Theme.grey2_C}`}>
              <TitleWrapper>이름</TitleWrapper>
              <Wrapper width={`auto`}>
                <SignupInput width={`206px`} />
              </Wrapper>
            </SignUpWrapper>
            <SignUpWrapper
              height={`auto`}
              borderBottom={`1px solid ${Theme.grey2_C}`}
            >
              <TitleWrapper>주소</TitleWrapper>
              <Wrapper width={`auto`} padding={`9px 0`} al={`flex-start`}>
                <Wrapper dr={`row`} ju={`flex-start`}>
                  <SignupInput width={`62px`} />
                  <CommonButton
                    width={`56px`}
                    height={`25px`}
                    margin={`0 0 0 7px`}
                    fontSize={`12px`}
                  >
                    우편번호
                  </CommonButton>
                </Wrapper>
                <Wrapper width={`auto`} dr={`row`} margin={`8px 0`}>
                  <SignupInput width={`206px`} />
                  <Wrapper
                    width={`calc(100% - 206px)`}
                    color={Theme.grey_C}
                    padding={`0 0 0 10px`}
                  >
                    기본주소
                  </Wrapper>
                </Wrapper>
                <Wrapper width={`auto`} dr={`row`}>
                  <SignupInput width={`206px`} />
                  <Wrapper
                    width={`calc(100% - 206px)`}
                    color={Theme.grey_C}
                    padding={`0 0 0 10px`}
                  >
                    나머지주소
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </SignUpWrapper>
            <SignUpWrapper borderBottom={`1px solid ${Theme.grey2_C}`}>
              <TitleWrapper>일반전화</TitleWrapper>
              <Wrapper width={`auto`} dr={`row`}>
                <SelectStyle defaultValue={`02`} style={{ width: 61 }}>
                  <Option value={`02`}>02</Option>
                  <Option value={`031`}>031</Option>
                  <Option value={`032`}>032</Option>
                </SelectStyle>
                <Wrapper
                  fontSize={`12px`}
                  width={`auto`}
                  padding={`0 2px 0 3px`}
                >
                  -
                </Wrapper>
                <SignupInput width={`61px`} />
                <Wrapper fontSize={`12px`} width={`auto`} padding={`0 2px`}>
                  -
                </Wrapper>
                <SignupInput width={`61px`} />
              </Wrapper>
            </SignUpWrapper>
            <SignUpWrapper borderBottom={`1px solid ${Theme.grey2_C}`}>
              <TitleWrapper>휴대전화</TitleWrapper>
              <Wrapper width={`auto`}>
                <SignupInput width={`206px`} />
              </Wrapper>
            </SignUpWrapper>
            <SignUpWrapper borderBottom={`1px solid ${Theme.grey2_C}`}>
              <TitleWrapper>이메일</TitleWrapper>
              <Wrapper width={`auto`}>
                <SignupInput width={`206px`} />
              </Wrapper>
            </SignUpWrapper>
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

export default SignUp;
