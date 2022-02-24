import React, { useEffect, useState } from "react";
import ClientLayout from "../../../components/ClientLayout";
import { SEO_LIST_REQUEST } from "../../../reducers/seo";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import {
  EMAIL_CHECK_REQUEST,
  INIT_EMAIL_CHECK,
  LOAD_MY_INFO_REQUEST,
  LOGIN_REQUEST,
  USER_INFO_UPDATE_REQUEST,
} from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, notification } from "antd";

import {
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
  TextInput,
  CommonButton,
  SpanText,
} from "../../../components/commonComponents";
import { useCallback } from "react";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";
import useInput from "../../../hooks/useInput";

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const CustomInput = styled(TextInput)`
  width: 410px;
  height: 50px;
  border: 1px solid ${Theme.grey2_C};
  background-color: ${Theme.lightGrey2_C};

  &:focus {
    outline: none;
    border: 1px solid ${Theme.lightGrey2_C};
    background-color: ${Theme.grey2_C};
  }

  @media (max-width: 900px) {
    width: 350px;
  }
`;

//
const ContentWrapper = styled(Wrapper)`
  height: ${(props) => props.height || `50px`};
  justify-content: flex-start;
  flex-direction: row;
`;

const TitleWrapper = styled(Wrapper)`
  width: 20%;
  font-size: 18px;
  font-weight: 700;

  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  flex-direction: row;
  color: ${Theme.darkGrey_C};

  @media (max-width: 900px) {
    width: 120px;
    font-size: 13px;
  } ;
`;

const CustomConInput = styled(TextInput)`
  height: 50px;
  border: 1px solid ${Theme.grey2_C};
  background-color: ${Theme.lightGrey2_C};

  &:focus {
    outline: none;
    border: 1px solid ${Theme.lightGrey2_C};
    background-color: ${Theme.grey2_C};
  }
`;
//

const Profile = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////

  const dispatch = useDispatch();

  const [isModifyForm, setIsModifyForm] = useState(false);

  const inputUserId = useInput(``);
  const inputOriginPassword = useInput(``);
  const inputPassword = useInput(``);
  const inputPasswordCheck = useInput(``);
  const inputUserName = useInput(``);
  const inputEmail = useInput(``);
  const inputMobile = useInput(``);
  const [gender, setGender] = useState(false);
  const inputBirth = useInput(``);

  const inputUserIdL = useInput(``);
  const inputPasswordL = useInput(``);

  const [isCheck1, setIsCheck1] = useState(false);
  const [isCheck2, setIsCheck2] = useState(false);
  const [isCheck3, setIsCheck3] = useState(false);
  const [isCheck4, setIsCheck4] = useState(false);

  const [isCheckBtn, setIsCheckBtn] = useState(false);

  ////// REDUX //////

  const {
    me,
    st_loginDone,
    st_loginError,
    st_emailCheckDone,
    st_emailCheckError,
    emailCheck,
    st_userInfoUpdateDone,
    st_userInfoUpdateError,
  } = useSelector((state) => state.user);

  ////// USEEFFECT //////

  useEffect(() => {
    setIsCheckBtn(true);

    if (me.email === inputEmail.value) {
      setIsCheckBtn(false);
    }
    if (emailCheck === true) {
      setIsCheckBtn(false);
    }
  }, [me, inputEmail, emailCheck]);

  useEffect(() => {
    if (me) {
      inputUserId.setValue(me.userId);
      inputMobile.setValue(me.mobile);
      inputUserName.setValue(me.username);
      inputEmail.setValue(me.email);
      inputBirth.setValue(me.birth);
      setGender(me.gender);
    }
  }, [me]);

  useEffect(() => {
    if (isCheck3 || isCheck4) {
      setIsCheck2(true);
    } else {
      setIsCheck2(false);
    }
  }, [isCheck3, isCheck4]);

  useEffect(() => {
    if (st_loginDone) {
      setIsModifyForm(true);
    }
  }, [st_loginDone]);

  useEffect(() => {
    if (st_loginError) {
      LoadNotification(st_loginError);
    }
  }, [st_loginError]);

  useEffect(() => {
    if (st_emailCheckDone) {
      LoadNotification("사용가능한 이메일입니다.");
    }
  }, [st_emailCheckDone]);

  useEffect(() => {
    if (st_emailCheckError) {
      LoadNotification(st_emailCheckError);
    }
  }, [st_emailCheckError]);

  useEffect(() => {
    if (st_userInfoUpdateDone) {
      dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      LoadNotification("개인정보가 수정되었습니다.");
    }
  }, [st_userInfoUpdateDone]);

  useEffect(() => {
    if (st_userInfoUpdateError) {
      LoadNotification(st_userInfoUpdateError);
    }
  }, [st_userInfoUpdateError]);
  ////// TOGGLE //////
  ////// HANDLER //////

  const loginHandler = useCallback(() => {
    if (!inputUserIdL.value || inputUserIdL.value.trim() === "") {
      return LoadNotification("아이디를 입력해주세요.");
    }
    if (!inputPasswordL.value || inputPasswordL.value.trim() === "") {
      return LoadNotification("비밀번호를 입력해주세요.");
    }
    if (inputUserIdL.value !== me.userId) {
      return LoadNotification("현재 로그인한 유저의 아이디가 아닙니다.");
    }

    dispatch({
      type: LOGIN_REQUEST,
      data: {
        userId: inputUserIdL.value,
        password: inputPasswordL.value,
      },
    });
  }, [inputUserIdL, inputPasswordL, me]);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const emailCheckHandler = useCallback(() => {
    if (!inputEmail.value || inputEmail.value.trim() === "") {
      return LoadNotification("이메일을 입력해주세요.");
    }
    dispatch({
      type: EMAIL_CHECK_REQUEST,
      data: {
        email: inputEmail.value,
      },
    });
  }, [inputEmail]);

  const updateHandler = useCallback(() => {
    if (inputOriginPassword.value !== "") {
      if (!inputPassword.value || inputPassword.value.trim() === "") {
        return LoadNotification(
          "비밀번호를 변경하려면 새 비밀번호를 입력해주세요. "
        );
      }
      if (!inputPasswordCheck.value || inputPasswordCheck.value.trim() === "") {
        return LoadNotification(
          "비밀번호를 변경하려면 새 비밀번호확인을 입력해주세요."
        );
      }
      if (inputPassword.value !== inputPasswordCheck.value) {
        return LoadNotification("비밀번호가 일치하지 않습니다.");
      }
    }

    if (!inputUserName.value || inputEmail.value.trim() === "") {
      return LoadNotification("유저네임 입력해주세요.");
    }
    if (!inputMobile.value || inputMobile.value.trim() === "") {
      return LoadNotification("연락처를 입력해주세요.");
    }
    if (!inputEmail.value || inputEmail.value.trim() === "") {
      return LoadNotification("이메일을 입력해주세요.");
    }

    if (inputEmail.value !== me.email && !emailCheck) {
      return LoadNotification("중복확인을 완료해주세요.");
    }

    if (!gender || gender.trim() === "") {
      return LoadNotification("성별을 선택해주세요.");
    }
    if (!inputBirth.value || inputBirth.value.trim() === "") {
      return LoadNotification("생년월일을 입력해주세요.");
    }
    if (!inputOriginPassword.value || inputOriginPassword.value.trim() === "") {
      dispatch({
        type: USER_INFO_UPDATE_REQUEST,
        data: {
          username: inputUserName.value,
          mobile: inputMobile.value,
          normalMobile: "-",
          email: inputEmail.value,
          gender,
          birth: inputBirth.value,
          isEmail: isCheck3.value,
          isSns: isCheck4.value,
        },
      });
    } else {
      dispatch({
        type: USER_INFO_UPDATE_REQUEST,
        data: {
          username: inputUserName.value,
          password: inputOriginPassword.value,
          newPassword: inputPassword.value,
          mobile: inputMobile.value,
          normalMobile: "-",
          email: inputEmail.value,
          gender,
          birth: inputBirth.value,
          isEmail: isCheck3.value,
          isSns: isCheck4.value,
        },
      });
    }
  }, [
    inputUserName,
    inputOriginPassword,
    inputPassword,
    inputMobile,
    inputEmail,
    gender,
    inputBirth,
    isCheck3,
    isCheck4,
    emailCheck,
  ]);

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
          {!isModifyForm ? (
            <RsWrapper
              margin={width < 700 ? `100px 0 80px 0` : `250px 0 80px 0`}
            >
              <Wrapper margin={`45px 0 25px`} ju={`flex-start`} dr={`row`}>
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
                  onClick={() => moveLinkHandler(`/mypage/profile`)}
                  cursor={`pointer`}
                >
                  개인 정보 수정
                </Wrapper>
              </Wrapper>
              <Wrapper
                fontSize={`20px`}
                fontWeight={`bold`}
                al={`flex-start`}
                padding={`0 0 10px`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
                margin={`0 0 80px`}
              >
                개인 정보 수정
              </Wrapper>
              <Wrapper width={width < 900 ? `370px` : `600px`}>
                <Text
                  fontSize={`18px`}
                  fontWeight={`400`}
                  margin={`0 0 15px 0`}
                  color={Theme.darkGrey_C}
                >
                  비밀번호 재확인
                </Text>
                <Wrapper
                  width={`85%`}
                  dr={width < 900 ? `column` : `row`}
                  margin={`0px 0 55px 0`}
                >
                  <Text
                    fontSize={width < 900 ? `14px` : `16px`}
                    color={Theme.grey_C}
                  >
                    회원님의 정보를 안전하게 보호하기 위해&nbsp;
                  </Text>
                  <Text
                    fontSize={width < 900 ? `14px` : `16px`}
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
                      display={width < 900 ? `none` : `flex`}
                    >
                      아이디
                    </Text>
                    <CustomInput
                      margin={`0 5%`}
                      placeholder={width < 900 ? `아이디` : ``}
                      {...inputUserIdL}
                    />
                  </Wrapper>
                  <Wrapper width={`100%`} dr={`row`} ju={`space-between`}>
                    <Text
                      fontSize={`18px`}
                      fontWeight={`700`}
                      color={`1px solid ${Theme.darkGrey_C}`}
                      margin={`0 5%`}
                      display={width < 900 ? `none` : `flex`}
                    >
                      비밀번호
                    </Text>
                    <CustomInput
                      margin={`0 5%`}
                      placeholder={width < 900 ? `비밀번호` : ``}
                      {...inputPasswordL}
                      type={`password`}
                    />
                  </Wrapper>
                </Wrapper>
                <CommonButton
                  fontSize={width < 900 ? `13px` : `18px`}
                  width={`150px`}
                  height={`50px`}
                  radius={`0`}
                  margin={`55px 0 0 15px`}
                  onClick={loginHandler}
                >
                  확인
                </CommonButton>
              </Wrapper>
            </RsWrapper>
          ) : (
            <RsWrapper
              margin={width < 700 ? `100px 0 80px 0` : `250px 0 80px 0`}
            >
              <Wrapper margin={`45px 0 25px`} ju={`flex-start`} dr={`row`}>
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
                  onClick={() => moveLinkHandler(`/mypage/profile`)}
                  cursor={`pointer`}
                >
                  개인 정보 수정
                </Wrapper>
              </Wrapper>
              <Wrapper
                fontSize={`20px`}
                fontWeight={`bold`}
                al={`flex-start`}
                padding={`0 0 10px`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                개인 정보 수정
              </Wrapper>
              <Wrapper
                width={width < 900 ? `100%` : `80%`}
                ju={`flex-start`}
                al={`space-between`}
                padding={`30px 0 110px 0`}
              >
                <Wrapper width={`100%`}>
                  <ContentWrapper
                    width={`100%`}
                    height={`auto`}
                    dr={`row`}
                    padding={`0 0 15px 0`}
                  >
                    <TitleWrapper>아이디</TitleWrapper>
                    <Wrapper
                      width={width < 900 ? `calc(100% - 120px)` : "80%"}
                      al={`flex-start`}
                    >
                      <CustomConInput
                        {...inputUserId}
                        readOnly
                        width={width < 900 ? `100%` : `70%`}
                      />
                    </Wrapper>
                  </ContentWrapper>
                  <ContentWrapper
                    width={`100%`}
                    height={`auto`}
                    dr={`row`}
                    padding={`15px 0`}
                  >
                    <TitleWrapper>현재 비밀번호</TitleWrapper>
                    <Wrapper
                      width={width < 900 ? `calc(100% - 120px)` : "80%"}
                      al={`flex-start`}
                    >
                      <CustomConInput
                        {...inputOriginPassword}
                        width={width < 900 ? `100%` : `70%`}
                      />
                    </Wrapper>
                  </ContentWrapper>
                  <ContentWrapper
                    width={`100%`}
                    height={`auto`}
                    dr={`row`}
                    padding={`15px 0`}
                  >
                    <TitleWrapper>새 비밀번호</TitleWrapper>
                    <Wrapper
                      width={width < 900 ? `calc(100% - 120px)` : "80%"}
                      al={`flex-start`}
                    >
                      <CustomConInput
                        {...inputPassword}
                        width={width < 900 ? `100%` : `70%`}
                      />
                    </Wrapper>
                  </ContentWrapper>
                  <ContentWrapper
                    width={`100%`}
                    height={`auto`}
                    dr={`row`}
                    padding={`15px 0`}
                  >
                    <TitleWrapper>새 비밀번호 확인</TitleWrapper>
                    <Wrapper
                      width={width < 900 ? `calc(100% - 120px)` : "80%"}
                      al={`flex-start`}
                    >
                      <CustomConInput
                        {...inputPasswordCheck}
                        width={width < 900 ? `100%` : `70%`}
                      />
                    </Wrapper>
                  </ContentWrapper>

                  <ContentWrapper
                    width={`100%`}
                    height={`auto`}
                    dr={`row`}
                    padding={`15px 0`}
                  >
                    <TitleWrapper>이름</TitleWrapper>
                    <Wrapper
                      width={width < 900 ? `calc(100% - 120px)` : "80%"}
                      al={`flex-start`}
                    >
                      <CustomConInput
                        {...inputUserName}
                        width={width < 900 ? `100%` : `70%`}
                      />
                    </Wrapper>
                  </ContentWrapper>
                  <ContentWrapper
                    width={`100%`}
                    height={`auto`}
                    dr={`row`}
                    padding={`15px 0`}
                  >
                    <TitleWrapper>이메일</TitleWrapper>
                    <Wrapper
                      width={width < 900 ? `calc(100% - 120px)` : "80%"}
                      ju={`flex-start`}
                      dr={`row`}
                    >
                      <CustomConInput
                        {...inputEmail}
                        readOnly={emailCheck ? true : false}
                        width={width < 900 ? `calc(100% - 90px - 10px)` : `70%`}
                      />
                      {isCheckBtn && (
                        <CommonButton
                          fontSize={width < 900 ? `13px` : `18px`}
                          width={width < 900 ? `90px` : `150px`}
                          padding={`0`}
                          height={`50px`}
                          radius={`0`}
                          margin={`0 0 0 10px`}
                          onClick={emailCheckHandler}
                        >
                          중복확인
                        </CommonButton>
                      )}
                    </Wrapper>
                  </ContentWrapper>
                  <ContentWrapper
                    width={`100%`}
                    height={`auto`}
                    dr={`row`}
                    padding={`15px 0`}
                  >
                    <TitleWrapper>휴대폰</TitleWrapper>
                    <Wrapper
                      width={width < 900 ? `calc(100% - 120px)` : "80%"}
                      ju={`flex-start`}
                      dr={`row`}
                    >
                      <CustomConInput
                        {...inputMobile}
                        width={width < 900 ? `calc(100% - 90px - 10px)` : `70%`}
                      />
                    </Wrapper>
                  </ContentWrapper>
                  <ContentWrapper
                    width={`100%`}
                    height={`auto`}
                    dr={`row`}
                    padding={`15px 0`}
                    al={width < 900 ? `flex-start` : `center`}
                  >
                    <TitleWrapper>성별</TitleWrapper>
                    <Wrapper
                      width={`55%`}
                      ju={`space-between`}
                      dr={width < 900 ? `column` : `row`}
                      al={width < 900 ? `flex-start` : `center`}
                    >
                      <Wrapper
                        width={width < 900 ? `100%` : `55%`}
                        ju={`space-between`}
                        dr={`row`}
                        margin={width < 900 ? `0 0 10px` : `0`}
                      >
                        <Checkbox
                          checked={gender === "남자"}
                          onClick={() =>
                            setGender((prev) =>
                              prev === "남자" ? null : "남자"
                            )
                          }
                        >
                          <Text
                            margin={`0 0 0 12px`}
                            fontSize={width < 900 ? `13px` : `18px`}
                            color={Theme.black_C}
                            cursor={`pointer`}
                            fontWeight={`700`}
                          >
                            남자
                          </Text>
                        </Checkbox>
                        <Checkbox
                          checked={gender === "여자"}
                          onClick={() =>
                            setGender((prev) =>
                              prev === "여자" ? null : "여자"
                            )
                          }
                        >
                          <Text
                            margin={`0 0 0 12px`}
                            fontSize={width < 900 ? `13px` : `18px`}
                            color={Theme.black_C}
                            cursor={`pointer`}
                            fontWeight={`700`}
                          >
                            여자
                          </Text>
                        </Checkbox>
                      </Wrapper>
                      <Checkbox
                        checked={gender === "선택안함"}
                        onClick={() =>
                          setGender((prev) =>
                            prev === "선택안함" ? null : "선택안함"
                          )
                        }
                      >
                        <Text
                          margin={`0 0 0 12px`}
                          fontSize={width < 900 ? `13px` : `18px`}
                          color={Theme.black_C}
                          cursor={`pointer`}
                          fontWeight={`700`}
                        >
                          선택안함
                        </Text>
                      </Checkbox>
                    </Wrapper>
                  </ContentWrapper>
                  <ContentWrapper
                    width={`100%`}
                    height={`auto`}
                    dr={`row`}
                    padding={`15px 0`}
                  >
                    <TitleWrapper>생년월일</TitleWrapper>
                    <Wrapper
                      width={width < 900 ? `calc(100% - 120px)` : "80%"}
                      al={`flex-start`}
                    >
                      <CustomConInput
                        {...inputBirth}
                        width={width < 900 ? `100%` : `70%`}
                      />
                    </Wrapper>
                  </ContentWrapper>
                  <ContentWrapper
                    width={`100%`}
                    height={`auto`}
                    dr={`row`}
                    padding={`15px 0`}
                    al={width < 900 ? `flex-start` : `center`}
                  >
                    <TitleWrapper>선택약관 동의</TitleWrapper>
                    <Wrapper
                      width={width < 900 ? `calc(100% - 120px)` : "80%"}
                      ju={width < 900 ? `center` : `flex-start`}
                      al={width < 900 ? `flex-start` : `center`}
                      dr={width < 900 ? `column` : `row`}
                    >
                      <Checkbox
                        checked={isCheck1}
                        onClick={() => setIsCheck1((prev) => !prev)}
                      >
                        <Text
                          margin={`0 0 0 12px`}
                          fontSize={width < 900 ? `13px` : `18px`}
                          color={Theme.black_C}
                          cursor={`pointer`}
                          fontWeight={`700`}
                        >
                          개인정보 수집 · 이용 동의
                          <SpanText color={Theme.grey_C}>
                            &nbsp;&nbsp;&nbsp;(선택)
                          </SpanText>
                        </Text>
                      </Checkbox>
                      <Text
                        margin={width < 900 ? `5px 0 0 36px` : `0 0 0 60px`}
                        color={Theme.basicTheme_C}
                        fontSize={width < 900 ? `14px` : `16px`}
                        cursor={`pointer`}
                      >
                        약관보기
                      </Text>
                    </Wrapper>
                  </ContentWrapper>
                  <ContentWrapper
                    width={`100%`}
                    height={`auto`}
                    dr={`row`}
                    padding={`15px 0`}
                  >
                    <TitleWrapper>이용약관 동의</TitleWrapper>
                    <Wrapper
                      width={width < 900 ? `calc(100% - 120px)` : "80%"}
                      ju={`flex-start`}
                      dr={`row`}
                    >
                      <Checkbox
                        checked={isCheck2}
                        onClick={() => {
                          setIsCheck3(!isCheck2);
                          setIsCheck4(!isCheck2);
                        }}
                      >
                        <Text
                          margin={`0 0 0 12px`}
                          fontSize={width < 900 ? `13px` : `18px`}
                          color={Theme.black_C}
                          fontWeight={`700`}
                        >
                          정보 수신 동의
                          <SpanText color={Theme.grey_C}>
                            &nbsp;&nbsp;&nbsp;(선택)
                          </SpanText>
                        </Text>
                      </Checkbox>
                    </Wrapper>
                  </ContentWrapper>
                  <ContentWrapper
                    width={`100%`}
                    height={`auto`}
                    dr={`row`}
                    padding={`15px 0`}
                  >
                    <Wrapper
                      width={width < 900 ? `calc(100% - 120px)` : "80%"}
                      ju={width < 900 ? `felx-start` : `center`}
                      dr={`row`}
                      margin={width < 900 ? `0 0 60px 120px` : `0 0 60px`}
                    >
                      <Checkbox
                        checked={isCheck3}
                        onClick={() => setIsCheck3((prev) => !prev)}
                      >
                        <Text
                          margin={`0 0 0 12px`}
                          fontSize={width < 900 ? `13px` : `18px`}
                          color={Theme.black_C}
                          fontWeight={`700`}
                        >
                          이메일
                        </Text>
                      </Checkbox>
                      <Checkbox
                        checked={isCheck4}
                        onClick={() => setIsCheck4((prev) => !prev)}
                        style={
                          width < 700
                            ? { margin: `0 0 0 20px` }
                            : { margin: `0 0 0 50px` }
                        }
                      >
                        <Text
                          fontSize={width < 900 ? `13px` : `18px`}
                          color={Theme.black_C}
                          fontWeight={`700`}
                        >
                          SNS
                        </Text>
                      </Checkbox>
                    </Wrapper>
                  </ContentWrapper>
                </Wrapper>
                <Wrapper dr={`row`}>
                  <CommonButton
                    fontSize={width < 900 ? `13px` : `18px`}
                    width={`150px`}
                    height={`50px`}
                    radius={`0`}
                    margin={`0 5px 0 0`}
                    kindOf={`grey`}
                  >
                    탈퇴하기
                  </CommonButton>
                  <CommonButton
                    onClick={updateHandler}
                    fontSize={width < 900 ? `13px` : `18px`}
                    width={`150px`}
                    height={`50px`}
                    radius={`0`}
                  >
                    회원정보 수정
                  </CommonButton>
                </Wrapper>
              </Wrapper>
            </RsWrapper>
          )}
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
