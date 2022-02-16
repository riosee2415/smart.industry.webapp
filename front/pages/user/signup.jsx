import React, { useCallback, useEffect, useState } from "react";
import Router from "next/router";
import { Select, Radio, Checkbox } from "antd";
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
  Text,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../components/commonComponents";
import styled from "styled-components";
import Theme from "../../components/Theme";
import useWidth from "../../hooks/useWidth";

const SignUpWrapper = styled(Wrapper)`
  height: ${(props) => props.height || `50px`};
  justify-content: flex-start;
  flex-direction: row;
`;

const TitleWrapper = styled(Wrapper)`
  width: 13%;

  padding: 0 0 0 20px;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  margin: 0 10px 0 0;
  flex-direction: row;
  color: ${Theme.darkGrey_C};

  @media (max-width: 700px) {
    width: 110px;
  } ;
`;

const RadioBtn = styled(Radio)`
  &.ant-radio-wrapper {
    margin-right: 0;
  }
`;

const SignupInput = styled(TextInput)`
  height: 35px;
  background: none;
  border: none;
  border: 1px solid ${Theme.grey2_C};

  &:focus {
    outline: none;
    border: none;
    border: 1px solid ${Theme.grey_C};
  }
`;

const SelectStyle = styled(Select)`
  &.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: 35px;
  }
  &.ant-select-single.ant-select-show-arrow .ant-select-selection-item,
  .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
    padding: 5px;
  }
`;

const SelectStyle2 = styled(Select)`
  &.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: 35px;
  }
  &.ant-select-single.ant-select-show-arrow .ant-select-selection-item,
  .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
    padding: 3px;
  }
`;

const { Option } = Select;

const SignUp = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );
  ////// HOOKS //////

  const width = useWidth();

  const dispatch = useDispatch();

  const email = useInput(``);
  const nickname = useInput(``);

  const password = useInput(``);

  const [passwordCheck, setPasswordCheck] = useState(``);
  const [passwordError, setPasswordError] = useState(false);

  const [isAllCheck, setIsAllCheck] = useState(false);
  const [isCheck1, setIsCheck1] = useState(false);
  const [isCheck2, setIsCheck2] = useState(false);
  const [isCheck3, setIsCheck3] = useState(false);

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

  useEffect(() => {
    if (isCheck1 && isCheck2 && isCheck3) {
      setIsAllCheck(true);
    } else {
      setIsAllCheck(false);
    }
  }, [isCheck1, isCheck2, isCheck3]);
  ////// TOGGLE //////
  ////// HANDLER //////

  const checkPasswordChangeHandler = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password.value);
    },
    [password.value]
  );

  const allCheckHandler = useCallback(() => {
    setIsCheck1((prev) => !prev);
    setIsCheck2((prev) => !prev);
    setIsCheck3((prev) => !prev);
  }, [isCheck1, isCheck2, isCheck3]);

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
            <Wrapper
              margin={`40px 0 25px`}
              al={`flex-start`}
              color={Theme.darkGrey_C}
            >
              HOME | 회원가입
            </Wrapper>
            <Wrapper
              fontSize={`20px`}
              fontWeight={`bold`}
              al={`flex-start`}
              margin={`0 0 10px`}
              color={Theme.darkGrey_C}
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
              <TitleWrapper>
                회원구분
                <SpanText color={Theme.subTheme_C}>&nbsp;*</SpanText>
              </TitleWrapper>
              <Wrapper
                borderLeft={`1px solid ${Theme.grey2_C}`}
                padding={width < 700 ? `9px 0` : `9px 0 9px 20px`}
                al={`flex-start`}
                width={
                  width < 700
                    ? `calc(100% - 110px - 10px)`
                    : `calc(100% - 13% - 10px)`
                }
              >
                <RadioBtn>개인회원</RadioBtn>
              </Wrapper>
            </SignUpWrapper>
            <SignUpWrapper
              borderBottom={`1px solid ${Theme.grey2_C}`}
              borderTop={`1px solid ${Theme.grey2_C}`}
              height={`auto`}
            >
              <TitleWrapper>
                아이디
                <SpanText color={Theme.subTheme_C}>&nbsp;*</SpanText>
              </TitleWrapper>
              <Wrapper
                borderLeft={`1px solid ${Theme.grey2_C}`}
                padding={width < 700 ? `9px 0` : `9px 0 9px 20px`}
                width={
                  width < 700
                    ? `calc(100% - 110px - 10px)`
                    : `calc(100% - 13% - 10px)`
                }
                dr={width < 700 ? `column` : `row`}
              >
                <SignupInput width={`206px`} />
                <Wrapper
                  width={width < 700 ? `206px` : `calc(100% - 206px)`}
                  color={Theme.grey_C}
                  padding={`0 0 0 10px`}
                  al={`flex-start`}
                >
                  (영문소문자/숫자, 4~16자)
                </Wrapper>
              </Wrapper>
            </SignUpWrapper>
            <SignUpWrapper
              height={`auto`}
              borderBottom={`1px solid ${Theme.grey2_C}`}
            >
              <TitleWrapper>
                비밀번호
                <SpanText color={Theme.subTheme_C}>&nbsp;*</SpanText>
              </TitleWrapper>
              <Wrapper
                borderLeft={`1px solid ${Theme.grey2_C}`}
                padding={width < 700 ? `9px 0` : `9px 0 9px 20px`}
                width={
                  width < 700
                    ? `calc(100% - 110px - 10px)`
                    : `calc(100% - 13% - 10px)`
                }
                dr={width < 700 ? `column` : `row`}
              >
                <SignupInput width={`206px`} />
                <Wrapper
                  width={width < 700 ? `206px` : `calc(100% - 206px)`}
                  color={Theme.grey_C}
                  padding={`0 0 0 10px`}
                  al={`flex-start`}
                >
                  (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10~16자)
                </Wrapper>
              </Wrapper>
            </SignUpWrapper>
            <SignUpWrapper borderBottom={`1px solid ${Theme.grey2_C}`}>
              <TitleWrapper>
                비밀번호 확인
                <SpanText color={Theme.subTheme_C}>&nbsp;*</SpanText>
              </TitleWrapper>
              <Wrapper
                borderLeft={`1px solid ${Theme.grey2_C}`}
                padding={width < 700 ? `9px 0` : `9px 0 9px 20px`}
                width={
                  width < 700
                    ? `calc(100% - 110px - 10px)`
                    : `calc(100% - 13% - 10px)`
                }
                al={width < 700 ? `center` : `flex-start`}
              >
                <SignupInput width={`206px`} />
              </Wrapper>
            </SignUpWrapper>
            <SignUpWrapper borderBottom={`1px solid ${Theme.grey2_C}`}>
              <TitleWrapper>
                이름
                <SpanText color={Theme.subTheme_C}>&nbsp;*</SpanText>
              </TitleWrapper>
              <Wrapper
                borderLeft={`1px solid ${Theme.grey2_C}`}
                padding={width < 700 ? `9px 0` : `9px 0 9px 20px`}
                width={
                  width < 700
                    ? `calc(100% - 110px - 10px)`
                    : `calc(100% - 13% - 10px)`
                }
                al={width < 700 ? `center` : `flex-start`}
              >
                <SignupInput width={`206px`} />
              </Wrapper>
            </SignUpWrapper>
            <SignUpWrapper
              height={`auto`}
              borderBottom={`1px solid ${Theme.grey2_C}`}
            >
              <TitleWrapper>
                주소
                <SpanText color={Theme.subTheme_C}>&nbsp;*</SpanText>
              </TitleWrapper>
              <Wrapper
                borderLeft={`1px solid ${Theme.grey2_C}`}
                padding={width < 700 ? `9px 0` : `9px 0 9px 20px`}
                width={
                  width < 700
                    ? `calc(100% - 110px - 10px)`
                    : `calc(100% - 13% - 10px)`
                }
                al={`flex-start`}
              >
                <Wrapper dr={`row`} ju={`flex-start`}>
                  <SignupInput
                    margin={width < 700 ? `0 0 0 23px` : `0 0 0 0`}
                    width={`62px`}
                    color={Theme.grey_C}
                  />
                  <CommonButton
                    width={`56px`}
                    height={`25px`}
                    margin={`0 0 0 10px`}
                    fontSize={`12px`}
                    kindOf={`darkgrey`}
                    padding={`0`}
                    radius={`0`}
                  >
                    우편번호
                  </CommonButton>
                </Wrapper>
                <Wrapper width={`auto`} dr={`row`} margin={`10px 0`}>
                  <SignupInput width={`206px`} />
                  <Wrapper
                    width={width < 700 ? `100%` : `calc(100% - 206px)`}
                    color={Theme.grey_C}
                    padding={`0 0 0 10px`}
                  >
                    기본주소
                  </Wrapper>
                </Wrapper>
                <Wrapper width={`auto`} dr={`row`}>
                  <SignupInput width={`206px`} />
                  <Wrapper
                    width={width < 700 ? `100%` : `calc(100% - 206px)`}
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
              <Wrapper
                borderLeft={`1px solid ${Theme.grey2_C}`}
                padding={width < 700 ? `9px 0` : `9px 0 9px 20px`}
                width={
                  width < 700
                    ? `calc(100% - 110px - 10px)`
                    : `calc(100% - 13% - 10px)`
                }
                dr={`row`}
                ju={width < 700 ? `center` : `flex-start`}
              >
                <SelectStyle defaultValue={`02`} style={{ width: 61 }}>
                  <Option value={`02`}>02</Option>
                  <Option value={`031`}>031</Option>
                  <Option value={`032`}>032</Option>
                  <Option value={`033`}>033</Option>
                  <Option value={`041`}>041</Option>
                  <Option value={`042`}>042</Option>
                  <Option value={`043`}>043</Option>
                  <Option value={`044`}>044</Option>
                  <Option value={`051`}>051</Option>
                  <Option value={`052`}>052</Option>
                  <Option value={`053`}>053</Option>
                  <Option value={`054`}>054</Option>
                  <Option value={`055`}>055</Option>
                  <Option value={`061`}>061</Option>
                  <Option value={`062`}>062</Option>
                  <Option value={`063`}>063</Option>
                  <Option value={`064`}>064</Option>
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
              <TitleWrapper>
                휴대전화
                <SpanText color={Theme.subTheme_C}>&nbsp;*</SpanText>
              </TitleWrapper>
              <Wrapper
                borderLeft={`1px solid ${Theme.grey2_C}`}
                padding={width < 700 ? `9px 0` : `9px 0 9px 20px`}
                width={
                  width < 700
                    ? `calc(100% - 110px - 10px)`
                    : `calc(100% - 13% - 10px)`
                }
                dr={`row`}
                ju={width < 700 ? `center` : `flex-start`}
              >
                <SelectStyle2 defaultValue={`010`} style={{ width: 61 }}>
                  <Option value={`010`}>010</Option>
                  <Option value={`011`}>011</Option>
                  <Option value={`016`}>016</Option>
                  <Option value={`017`}>017</Option>
                  <Option value={`018`}>018</Option>
                  <Option value={`019`}>019</Option>
                </SelectStyle2>
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
              <TitleWrapper>
                이메일
                <SpanText color={Theme.subTheme_C}>&nbsp;*</SpanText>
              </TitleWrapper>
              <Wrapper
                borderLeft={`1px solid ${Theme.grey2_C}`}
                padding={width < 700 ? `9px 0` : `9px 0 9px 20px`}
                width={
                  width < 700
                    ? `calc(100% - 110px - 10px)`
                    : `calc(100% - 13% - 10px)`
                }
                dr={`row`}
                ju={width < 700 ? `center` : `flex-start`}
              >
                <SignupInput
                  width={width < 700 ? `100px` : `206px`}
                  margin={`0 10px 0 0`}
                />
                <SelectStyle
                  defaultValue={`@`}
                  style={width < 700 ? { width: 100 } : { width: 206 }}
                >
                  <Option value={`@naver.com`}>@naver.com</Option>
                  <Option value={`@hanmail.com`}>@hanmail.com</Option>
                  <Option value={`@nate.com`}>@nate.com</Option>
                  <Option value={`@gmail.com`}>@gmail.com</Option>
                </SelectStyle>
              </Wrapper>
            </SignUpWrapper>
            <Wrapper al={`flex-start`} margin={`40px 0 0 0`}>
              <Checkbox checked={isAllCheck} onClick={allCheckHandler}>
                <Text
                  fontSize={`14px`}
                  color={Theme.black_C}
                  cursor={`pointer`}
                  margin={`0 0 20px 0`}
                  fontWeight={`700`}
                >
                  필수 약관 모두 동의하기
                </Text>
              </Checkbox>
              <Checkbox
                checked={isCheck1}
                onClick={() => setIsCheck1(!isCheck1)}
              >
                <Text
                  fontSize={`14px`}
                  color={Theme.black_C}
                  cursor={`pointer`}
                  margin={`0 0 10px 0`}
                >
                  회원약관 (필수)
                </Text>
              </Checkbox>
              <Checkbox
                checked={isCheck2}
                onClick={() => setIsCheck2(!isCheck2)}
              >
                <Text
                  fontSize={`14px`}
                  color={Theme.black_C}
                  cursor={`pointer`}
                  margin={`0 0 10px 0`}
                >
                  개인정보처리방침 (필수)
                </Text>
              </Checkbox>
              <Checkbox
                checked={isCheck3}
                onClick={() => setIsCheck3(!isCheck3)}
              >
                <Text
                  fontSize={`14px`}
                  color={Theme.black_C}
                  cursor={`pointer`}
                >
                  개인정보의 제 3자의 이용 동의 (필수)
                </Text>
              </Checkbox>
            </Wrapper>
            <Wrapper>
              <CommonButton
                width={`150px`}
                height={`50px`}
                margin={`60px 0 0 0`}
                fontSize={`18px`}
                padding={`0`}
                radius={`0`}
              >
                회원가입
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

export default SignUp;
