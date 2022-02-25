import React from "react";
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
  SpanText,
  TextArea,
  TextInput,
  WholeWrapper,
  Wrapper,
} from "../../../components/commonComponents";
import styled from "styled-components";
import { useState } from "react";
import { useCallback } from "react";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import { useRouter } from "next/dist/client/router";
import { Checkbox, notification, message } from "antd";
import useInput from "../../../hooks/useInput";
import {
  QUESTION_CREATE_REQUEST,
  NOT_USER_CREATE_REQUEST,
} from "../../../reducers/question";
import { useEffect } from "react";

const ContentArea = styled(TextArea)`
  width: 100%;
  min-height: 415px;
  border-radius: 0;
  background-color: ${Theme.lightGrey2_C};
  border: 1px solid ${Theme.grey2_C};
  padding: 15px 20px;
`;

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

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const Question = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );
  const { me } = useSelector((state) => state.user);
  const { st_questionCreateDone } = useSelector((state) => state.question);

  const width = useWidth();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isTerms, setIsTerms] = useState(false);

  const inputTitle = useInput("");
  const inputContent = useInput("");
  const inputPassword = useInput("");
  const inputName = useInput("");
  const inputMobile = useInput("");
  const inputEmail = useInput("");

  ////// HOOKS //////
  ////// REDUX //////
  ////// USEEFFECT //////
  useEffect(() => {
    if (st_questionCreateDone) {
      LoadNotification("문의하기가 접수되었습니다.");

      setIsTerms(false);
      inputContent.setValue("");
    }
  }, [st_questionCreateDone, inputContent.value, isTerms]);
  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const TermsHandler = useCallback(
    (data) => {
      setIsTerms(data.target.checked);
    },
    [isTerms]
  );

  const QuestionHandler = useCallback(() => {
    if (me) {
      if (!inputContent.value || inputContent.value.trim() === "") {
        return LoadNotification("문의내용을 입력해주세요.");
      }
      if (!isTerms) {
        return LoadNotification("개인정보 제공에 동의해주세요.");
      }

      dispatch({
        type: QUESTION_CREATE_REQUEST,
        data: {
          author: me.username,
          mobile: me.mobile,
          email: me.email,
          title: me.username,
          content: inputContent.value,
          term: isTerms,
          password: parseInt("0000"),
        },
      });
    } else {
      if (!inputName.value || inputName.value.trim() === "") {
        return LoadNotification("이름을 입력해주세요.");
      }
      if (!inputMobile.value || inputMobile.value.trim() === "") {
        return LoadNotification("연락처를 입력해주세요.");
      }
      if (!inputEmail.value || inputEmail.value.trim() === "") {
        return LoadNotification("이메일을 입력해주세요.");
      }
      if (!inputTitle.value || inputTitle.value.trim() === "") {
        return LoadNotification("제목을 입력해주세요.");
      }
      if (!inputContent.value || inputContent.value.trim() === "") {
        return LoadNotification("문의내용을 입력해주세요.");
      }
      if (!isTerms) {
        return LoadNotification("개인정보 제공에 동의해주세요.");
      }

      dispatch({
        type: NOT_USER_CREATE_REQUEST,
        data: {
          author: inputName.value,
          mobile: inputMobile.value,
          email: inputEmail.value,
          title: inputTitle.value,
          content: inputContent.value,
          term: isTerms,
          password: parseInt("1111"),
        },
      });
    }
  }, [
    me,
    isTerms,
    inputContent.value,
    inputName.value,
    inputMobile.value,
    inputEmail.value,
    inputTitle.value,
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
          <RsWrapper margin={`280px 0 0`}>
            <Wrapper
              fontSize={`20px`}
              fontWeight={`bold`}
              al={`flex-start`}
              padding={`0 0 10px`}
              borderBottom={`1px solid ${Theme.grey2_C}`}
              margin={`0 0 40px`}
            >
              1:1 문의
            </Wrapper>

            <Wrapper margin={`0 0 110px`}>
              <Wrapper dr={`row`}>
                <Wrapper width={`50%`} al={`flex-start`}>
                  <Wrapper
                    ju={`flex-start`}
                    fontSize={`18px`}
                    fontWeight={`bold`}
                    margin={width < 500 ? `0 0 10px` : `0 0 20px`}
                    dr={`row`}
                  >
                    이름<SpanText color={Theme.red_C}>*</SpanText>
                  </Wrapper>
                  <Wrapper width={`calc(100% - 10px)`} margin={`0 10px 0 0`}>
                    <TextInput
                      placeholder={me ? me.username : `이름을 입력해주세요.`}
                      width={`100%`}
                      readOnly={me ? true : false}
                      {...inputName}
                    />
                  </Wrapper>
                </Wrapper>
                <Wrapper width={`50%`} al={`flex-start`}>
                  <Wrapper
                    ju={`flex-start`}
                    fontSize={`18px`}
                    fontWeight={`bold`}
                    margin={width < 500 ? `0 0 10px` : `0 0 20px 10px`}
                    dr={`row`}
                  >
                    연락처<SpanText color={Theme.red_C}>*</SpanText>
                  </Wrapper>
                  <Wrapper
                    width={width < 500 ? `100%` : `calc(100% - 10px)`}
                    margin={width < 500 ? `0` : `0 0 0 10px`}
                  >
                    <TextInput
                      placeholder={me ? me.mobile : `연락처를 입력해주세요.`}
                      width={`100%`}
                      readOnly={me ? true : false}
                      {...inputMobile}
                    />
                  </Wrapper>
                </Wrapper>
                <Wrapper al={`flex-start`} margin={`35px 0 0`}>
                  <Wrapper
                    ju={`flex-start`}
                    fontSize={`18px`}
                    fontWeight={`bold`}
                    margin={width < 500 ? `0 0 10px` : `0 0 20px`}
                    dr={`row`}
                  >
                    이메일<SpanText color={Theme.red_C}>*</SpanText>
                  </Wrapper>
                  <TextInput
                    placeholder={me ? me.email : `이메일을 입력해주세요.`}
                    width={`100%`}
                    readOnly={me ? true : false}
                    {...inputEmail}
                  />
                </Wrapper>
              </Wrapper>
              <Wrapper al={`flex-start`} margin={`35px 0 0`}>
                <Wrapper
                  ju={`flex-start`}
                  fontSize={`18px`}
                  fontWeight={`bold`}
                  margin={width < 500 ? `0 0 10px` : `0 0 20px`}
                  dr={`row`}
                >
                  제목<SpanText color={Theme.red_C}>*</SpanText>
                </Wrapper>
                <TextInput
                  width={`100%`}
                  placeholder={`제목을 입력해주세요.`}
                  border={`1px solid ${Theme.grey2_C}`}
                  {...inputTitle}
                />
              </Wrapper>
              <Wrapper al={`flex-start`}>
                <Wrapper
                  al={`flex-start`}
                  fontSize={`18px`}
                  fontWeight={`bold`}
                  margin={width < 500 ? `35px 0 10px` : `35px 0 20px`}
                  width={`auto`}
                  dr={`row`}
                >
                  문의 내용
                  <SpanText color={Theme.red_C}>*</SpanText>
                </Wrapper>
                <ContentArea
                  placeholder={`문의 내용을 작성해주세요.`}
                  {...inputContent}
                />
              </Wrapper>
              {/* <Wrapper al={`flex-start`} margin={`35px 0 0`}>
                <Wrapper
                  al={`flex-start`}
                  fontSize={`18px`}
                  fontWeight={`bold`}
                  margin={width < 500 ? `0 0 10px` : `0 0 20px`}
                >
                  비밀번호
                </Wrapper>
                <TextInput
                  width={`100%`}
                  placeholder={`게시글 확인을 위한 비밀번호 4글자를 입력해주세요.`}
                  type="password"
                  maxLength={4}
                  {...inputPassword}
                />
              </Wrapper> */}
              <Wrapper dr={`row`} ju={`flex-start`} margin={`25px 0 60px`}>
                <Wrapper width={`auto`} padding={`0 12px 0 0`}>
                  <CommonCheckBox
                    checked={isTerms}
                    onChange={TermsHandler}
                    id="check"
                  >
                    개인정보 제공에 동의합니다
                  </CommonCheckBox>
                </Wrapper>
              </Wrapper>
              <CommonButton
                width={`117px`}
                height={`50px`}
                radius={`0`}
                onClick={QuestionHandler}
              >
                작성하기
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

export default Question;
