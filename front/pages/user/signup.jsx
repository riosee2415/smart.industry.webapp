import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Select, Radio, Checkbox, Form, message, Modal } from "antd";
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
import { useRef } from "react";
import DaumPostCode from "react-daum-postcode";

const SignUpWrapper = styled(Wrapper)`
  height: ${(props) => props.height || `50px`};
  justify-content: flex-start;
  flex-direction: row;
`;

const TitleWrapper = styled(Wrapper)`
  width: 13%;

  padding: 0 0 0 10px;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  margin: 0 10px 0 0;
  flex-direction: row;
  color: ${Theme.darkGrey_C};

  @media (max-width: 700px) {
    width: 98px;
    font-size: 13px;
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

    align-items: center;
    justify-content: center;
  }
  &.ant-select-single.ant-select-show-arrow .ant-select-selection-item,
  .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
    padding: 0px;
  }
`;

const SelectStyle2 = styled(Select)`
  &.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    height: 35px;

    align-items: center;
    justify-content: center;
  }
  &.ant-select-single.ant-select-show-arrow .ant-select-selection-item,
  .ant-select-single.ant-select-show-arrow .ant-select-selection-placeholder {
    padding: 0 8px;

    @media (max-width: 700px) {
      padding: 0px;
    }
  }
`;

const SignUpForm = styled(Form)`
  width: 100%;

  & .ant-form-item {
    margin: 0;
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

  const router = useRouter();

  const password = useInput(``);

  const [isAllCheck, setIsAllCheck] = useState(false);
  const [isCheck1, setIsCheck1] = useState(false);
  const [isCheck2, setIsCheck2] = useState(false);
  const [isCheck3, setIsCheck3] = useState(false);

  const [userType, setUserType] = useState(false);

  const formRef = useRef();

  ////// REDUX //////
  const { st_signUpLoading, st_signUpDone, st_signUpError } = useSelector(
    (state) => state.user
  );
  ////// USEEFFECT //////

  useEffect(() => {
    if (st_signUpError) {
      return message.error(st_signUpError);
    }
  }, [st_signUpError]);

  useEffect(() => {
    formRef.current.setFieldsValue({
      mobile_1: "010",
      normalMobile_1: "02",
    });
  }, []);

  useEffect(() => {
    if (st_signUpDone) {
      message.success({
        content: "회원가입되었습니다.",
        className: "custom-class",
        style: {
          marginTop: "170px",
        },
      });
      return router.replace("/login");
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

  const allCheckHandler = useCallback(() => {
    setIsCheck1((prev) => !prev);
    setIsCheck2((prev) => !prev);
    setIsCheck3((prev) => !prev);
  }, [isCheck1, isCheck2, isCheck3]);

  const changeUserTypeHandler = useCallback(
    (e) => {
      setUserType(e.target.checked);
    },
    [userType]
  );

  const signupHandler = useCallback(
    (data) => {
      if (!userType) {
        return message.error({
          content: "회원을 선택해주세요.",
          className: "custom-class",
          style: {
            marginTop: "170px",
          },
        });
      }

      let normalMobile;
      if (!data.mobile_1 || !data.mobile_2 || !data.mobile_3) {
        return message.error({
          content: "휴대전화를 입력해주세요.",
          className: "custom-class",
          style: {
            marginTop: "170px",
          },
        });
      }

      if (!data.email && !data.emailBack) {
        return message.error({
          content: "이메일을 입력해주세요..",
          className: "custom-class",
          style: {
            marginTop: "170px",
          },
        });
      }

      if (
        !data.normalMobile_1 ||
        !data.normalMobile_2 ||
        !data.normalMobile_3
      ) {
        normalMobile = null;
      } else {
        normalMobile = `${data.normalMobile_1}${data.normalMobile_2}${data.normalMobile_3}`;
      }

      if (!isCheck1 || !isCheck2 || !isCheck3) {
        return message.error({
          content: "약관에 동의해주세요.",
          className: "custom-class",
          style: {
            marginTop: "170px",
          },
        });
      }

      if (data.password !== data.checkPassword) {
        return message.error({
          content: "비밀번호가 틀립니다.",
          className: "custom-class",
          style: {
            marginTop: "170px",
          },
        });
      }

      dispatch({
        type: SIGNUP_REQUEST,
        data: {
          userId: data.userId,
          password: data.password,
          username: data.username,
          email: `${data.email}${data.emailBack}`,
          mobile: `${data.mobile_1}${data.mobile_2}${data.mobile_3}`,
          normalMobile: normalMobile,
          zoneCode: data.zoneCode,
          address: data.address,
          detailAddress: data.detailAddress,
          terms: isAllCheck,
        },
      });
    },
    [isAllCheck, isCheck1, isCheck2, isCheck3, userType]
  );

  ////// DATAVIEW //////

  const normalMobileArr = [
    "02",
    "031",
    "032",
    "033",
    "041",
    "042",
    "043",
    "044",
    "051",
    "052",
    "053",
    "054",
    "055",
    "061",
    "062",
    "063",
    "064",
  ];

  const mobileArr = ["010", "011", "016", "017", "018", "019"];

  const emailArr = ["@naver.com", "@hanmail.com", "@nate.com", "@gmail.com"];

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
          <RsWrapper margin={width < 700 ? `50px 0 0` : `250px 0 0`}>
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
            <SignUpForm onFinish={signupHandler} ref={formRef}>
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
                  padding={`9px 0 9px 20px`}
                  al={`flex-start`}
                  width={
                    width < 700
                      ? `calc(100% - 98px - 10px)`
                      : `calc(100% - 13% - 10px)`
                  }
                >
                  <RadioBtn checked={userType} onChange={changeUserTypeHandler}>
                    개인회원
                  </RadioBtn>
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
                      ? `calc(100% - 98px - 10px)`
                      : `calc(100% - 13% - 10px)`
                  }
                  dr={width < 700 ? `column` : `row`}
                >
                  <Form.Item
                    name={`userId`}
                    rules={[
                      { required: true, message: "아이디를 입력해주세요." },
                    ]}
                  >
                    <SignupInput width={width < 700 ? `215px` : `206px`} />
                  </Form.Item>
                  <Wrapper
                    width={width < 700 ? `206px` : `calc(100% - 215px)`}
                    color={Theme.grey_C}
                    padding={`0 0 0 10px`}
                    al={`flex-start`}
                    fontSize={width < 700 ? `12px` : `14px`}
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
                      ? `calc(100% - 98px - 10px)`
                      : `calc(100% - 13% - 10px)`
                  }
                  dr={width < 700 ? `column` : `row`}
                >
                  <Form.Item
                    name={`password`}
                    rules={[
                      { required: true, message: "비밀번호를 입력해주세요." },
                    ]}
                  >
                    <SignupInput
                      width={width < 700 ? `215px` : `206px`}
                      type={"password"}
                    />
                  </Form.Item>
                  <Wrapper
                    width={width < 700 ? `206px` : `calc(100% - 215px)`}
                    color={Theme.grey_C}
                    padding={`0 0 0 10px`}
                    al={`flex-start`}
                    fontSize={width < 700 ? `12px` : `14px`}
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
                      ? `calc(100% - 98px - 10px)`
                      : `calc(100% - 13% - 10px)`
                  }
                  al={width < 700 ? `center` : `flex-start`}
                >
                  <Form.Item
                    name={"checkPassword"}
                    rules={[
                      { required: true, message: "비밀번호를 입력해주세요." },
                    ]}
                  >
                    <SignupInput
                      width={width < 700 ? `215px` : `206px`}
                      type="password"
                    />
                  </Form.Item>
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
                      ? `calc(100% - 98px - 10px)`
                      : `calc(100% - 13% - 10px)`
                  }
                  al={width < 700 ? `center` : `flex-start`}
                >
                  <Form.Item
                    name="username"
                    rules={[
                      { required: true, message: "이름을 입력해주세요." },
                    ]}
                  >
                    <SignupInput width={width < 700 ? `215px` : `206px`} />
                  </Form.Item>
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
                      ? `calc(100% - 98px - 10px)`
                      : `calc(100% - 13% - 10px)`
                  }
                  al={`flex-start`}
                >
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    <Form.Item
                      name="zoneCode"
                      rules={[
                        { required: true, message: "우편번호를 입력해주세요." },
                      ]}
                    >
                      <SignupInput
                        margin={width < 700 ? `0 0 0 6%` : `0 0 0 0`}
                        width={`65px`}
                        color={Theme.grey_C}
                      />
                    </Form.Item>
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
                  <Wrapper
                    width={width < 700 ? `100%` : `auto`}
                    dr={`row`}
                    margin={`10px 0`}
                  >
                    <Form.Item
                      name="address"
                      rules={[
                        { required: true, message: "기본주소를 입력해주세요." },
                      ]}
                    >
                      <SignupInput
                        width={width < 700 ? `215px` : `206px`}
                        placeholder={width < 700 ? `기본주소` : ``}
                      />
                    </Form.Item>
                    <Wrapper
                      width={width < 700 ? `100%` : `calc(100% - 206px)`}
                      color={Theme.grey_C}
                      padding={`0 0 0 10px`}
                      display={width < 700 ? `none` : `flex`}
                    >
                      기본주소
                    </Wrapper>
                  </Wrapper>
                  <Wrapper width={width < 700 ? `100%` : `auto`} dr={`row`}>
                    <Form.Item
                      name="detailAddress"
                      rules={[
                        {
                          required: true,
                          message: "나머지 주소를 입력해주세요.",
                        },
                      ]}
                    >
                      <SignupInput
                        width={width < 700 ? `215px` : `206px`}
                        placeholder={width < 700 ? `나머지주소` : ``}
                      />
                    </Form.Item>
                    <Wrapper
                      width={width < 700 ? `100%` : `calc(100% - 206px)`}
                      color={Theme.grey_C}
                      padding={`0 0 0 10px`}
                      display={width < 700 ? `none` : `flex`}
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
                      ? `calc(100% - 98px - 10px)`
                      : `calc(100% - 13% - 10px)`
                  }
                  dr={`row`}
                  ju={width < 700 ? `center` : `flex-start`}
                >
                  <Form.Item name="normalMobile_1">
                    <SelectStyle defaultValue={`02`} style={{ width: 65 }}>
                      {normalMobileArr.map((data) => {
                        return <Option value={data}>{data}</Option>;
                      })}
                    </SelectStyle>
                  </Form.Item>
                  <Wrapper
                    fontSize={`12px`}
                    width={`auto`}
                    padding={`0 2px 0 3px`}
                  >
                    -
                  </Wrapper>
                  <Form.Item name="normalMobile_2">
                    <SignupInput width={`67px`} />
                  </Form.Item>
                  <Wrapper fontSize={`12px`} width={`auto`} padding={`0 2px`}>
                    -
                  </Wrapper>
                  <Form.Item name="normalMobile_3">
                    <SignupInput width={`67px`} />
                  </Form.Item>
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
                      ? `calc(100% - 98px - 10px)`
                      : `calc(100% - 13% - 10px)`
                  }
                  dr={`row`}
                  ju={width < 700 ? `center` : `flex-start`}
                >
                  <Form.Item name="mobile_1">
                    <SelectStyle defaultValue={`010`} style={{ width: 65 }}>
                      {mobileArr.map((data) => {
                        return <Option value={data}>{data}</Option>;
                      })}
                    </SelectStyle>
                  </Form.Item>
                  <Wrapper
                    fontSize={`12px`}
                    width={`auto`}
                    padding={`0 2px 0 3px`}
                  >
                    -
                  </Wrapper>
                  <Form.Item name="mobile_2">
                    <SignupInput width={`67px`} />
                  </Form.Item>
                  <Wrapper fontSize={`12px`} width={`auto`} padding={`0 2px`}>
                    -
                  </Wrapper>
                  <Form.Item name="mobile_3">
                    <SignupInput width={`67px`} />
                  </Form.Item>
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
                      ? `calc(100% - 98px - 10px)`
                      : `calc(100% - 13% - 10px)`
                  }
                  dr={`row`}
                  ju={width < 700 ? `center` : `flex-start`}
                >
                  <Form.Item name="email">
                    <SignupInput
                      width={width < 700 ? `95px` : `206px`}
                      margin={`0 10px 0 0`}
                    />
                  </Form.Item>
                  <Form.Item name="emailBack">
                    <SelectStyle2
                      defaultValue={`@`}
                      style={width < 700 ? { width: 115 } : { width: 206 }}
                    >
                      {emailArr.map((data) => {
                        return <Option value={data}>{data}</Option>;
                      })}
                    </SelectStyle2>
                  </Form.Item>
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
                  htmlType="submit"
                  width={`150px`}
                  height={`50px`}
                  margin={`60px 0 110px 0`}
                  fontSize={`18px`}
                  padding={`0`}
                  radius={`0`}
                >
                  회원가입
                </CommonButton>
              </Wrapper>
            </SignUpForm>
          </RsWrapper>

          <Modal>
            <DaumPostCode
              onComplete={onCompleteHandler}
              width={width < 600 ? `100%` : `600px`}
              height={`450px`}
              autoClose
              animation
            />
          </Modal>
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
