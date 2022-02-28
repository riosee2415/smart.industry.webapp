import { useRouter } from "next/router";
import React, { useCallback } from "react";
import styled from "styled-components";
import ClientLayout from "../../components/ClientLayout";
import {
  WholeWrapper,
  RsWrapper,
  Wrapper,
  Text,
} from "../../components/commonComponents";
import { SEO_LIST_REQUEST } from "../../reducers/seo";
import Head from "next/head";
import wrapper from "../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import Theme from "../../components/Theme";
import useWidth from "../../hooks/useWidth";

const Privacy = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );
  ////// HOKKS //////
  const router = useRouter();

  const width = useWidth();

  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);
  return (
    <>
      <Head>
        <title>{seo_title.length < 1 ? "SELAS" : seo_title[0].content}</title>

        <meta
          name="subject"
          content={seo_title.length < 1 ? "SELAS" : seo_title[0].content}
        />
        <meta
          name="title"
          content={seo_title.length < 1 ? "SELAS" : seo_title[0].content}
        />
        <meta name="keywords" content={seo_keywords} />
        <meta
          name="description"
          content={
            seo_desc.length < 1
              ? "셀렉해봐 너만의 라이프 스튜디오"
              : seo_desc[0].content
          }
        />
        {/* <!-- OG tag  --> */}
        <meta
          property="og:title"
          content={seo_title.length < 1 ? "SELAS" : seo_title[0].content}
        />
        <meta
          property="og:site_name"
          content={seo_title.length < 1 ? "SELAS" : seo_title[0].content}
        />
        <meta
          property="og:description"
          content={
            seo_desc.length < 1
              ? "셀렉해봐 너만의 라이프 스튜디오"
              : seo_desc[0].content
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
          <Wrapper
            margin={width < 700 ? `80px 0 0` : `180px 0 0`}
            bgColor={Theme.grey2_C}
            height={`200px`}
          >
            <Text
              fontSize={`35px`}
              fontWeight={`800`}
              color={Theme.basicTheme_C}
            >
              개인정보처리방침
            </Text>
          </Wrapper>
          <RsWrapper>
            <Wrapper
              al={`flex-start`}
              width={width < 800 ? `100%` : `70%`}
              color={Theme.grey_C}
              margin={`30px 0`}
            >
              <pre>
                {`
개인정보처리방침안내
개인정보취급방침
 
 
개인정보의 수집목적 및 이용목적
 
① 대한기계공구(주)는 회원님께 최대한으로 최적화되고 맞춤화된 서비스를 제공하기 위하여 다음과 같은 목적으로 개인정보를 수집하고 있습니다.
- 성명, 아이디, 비밀번호 : 회원제 서비스 이용에 따른 본인 식별 절차에 이용
- 이메일주소, 이메일 수신여부, 전화번호, 상호명 : 고지사항 전달, 본인 의사 확인, 불만 처리 등 원활한 의사소통 경로의 확보, 새로운 서비스/신상품이나 이벤트 정보의 안내
- 주소, 전화번호 : 경품과 쇼핑 물품 배송에 대한 정확한 배송지의 확보
- 비밀번호 힌트용 질문과 답변 : 비밀번호를 잊은 경우의 신속한 처리를 위한 내용
- 그 외 선택항목 : 개인맞춤 서비스를 제공하기 위한 자료 ② 단, 이용자의 기본적 인권 침해의 우려가 있는 민감한 개인정보(인종 및 민족, 사상 및 신조, 출신지 및 본적지, 정치적 성향 및 범죄기록, 건강상태 및 성생활 등)는 수집하지 않습니다.
 
 
개인정보의 수집범위
 
대한기계공구(주) 웹사이트는 별도의 회원가입 절차 없이 대부분의 컨텐츠에 자유롭게 접근할 수 있습니다. 사이트의 회원제 서비스를 이용하시고자 할 경우 다음의 정보를 입력해주셔야 하며 선택항목을 입력하시지 않았다 하여 서비스 이용에 제한은 없습니다.
1) 회원 가입시 수집하는 개인정보의 범위
- 필수항목 : 희망 ID, 비밀번호, 성명, 주소, 전화번호, 이메일주소, 상호명, 사업자번호
 
 
쿠키에 의한 개인정보 수집
 
① 쿠키(cookie)란?
대한기계공구(주) 웹사이트는 귀하에 대한 정보를 저장하고 수시로 찾아내는 쿠키(cookie)를 사용합니다. 쿠키는 웹사이트가 귀하의 컴퓨터 브라우저(넷스케이프, 인터넷 익스플로러 등)로 전송하는 소량의 정보입니다. 귀하께서 웹사이트에 접속을 하면 유라의 컴퓨터는 귀하의 브라우저에 있는 쿠키의 내용을 읽고, 귀하의 추가정보를 귀하의 컴퓨터에서 찾아 접속에 따른 성명 등의 추가 입력 없이 서비스를 제공할 수 있습니다. 쿠키는 귀하의 컴퓨터는 식별하지만 귀하를 개인적으로 식별하지는 않습니다. 또한 귀하는 쿠키에 대한 선택권이 있습니다. 웹브라우저 상단의 도구 > 인터넷옵션 탭(option tab)에서 모든 쿠키를 다 받아들이거나, 쿠키가 설치될 때 통지를 보내도록 하거나, 아니면 모든 쿠키를 거부할 수 있는 선택권을 가질 수 있습니다.
② 대한기계공구(주) 웹사이트의 쿠키(cookie) 운용
대한기계공구(주)는 이용자의 편의를 위하여 쿠키를 운영합니다. 대한기계공구(주)가 쿠키를 통해 수집하는 정보는 대한기계공구(주) 웹사이트의 회원 ID에 한하며, 그 외의 다른 정보는 수집하지 않습니다. 대한기계공구(주)가 쿠키(cookie)를 통해 수집한 회원 ID는 다음의 목적을 위해 사용됩니다.
- 개인의 관심 분야에 따라 차별화된 정보를 제공
- 회원과 비회원의 접속빈도 또는 머문시간 등을 분석하여 이용자의 취향과 관심분야를 파악하여 타겟(target) 마케팅에 활용
- 쇼핑한 품목들에 대한 정보와 관심있게 둘러본 품목들에 대한 자취를 추적하여 다음번 쇼핑 때 개인 맞춤 서비스를 제공
- 회원들의 습관을 분석하여 서비스 개편 등의 척도
- 게시판 글 등록
쿠키는 브라우저의 종료시나 로그아웃시 만료됩니다.
 
 
개인정보의 보유기간 및 이용기간
 
① 귀하의 개인정보는 다음과 같이 개인정보의 수집목적 또는 제공받은 목적이 달성되면 파기됩니다. 단, 상법 등 관련법령의 규정에 의하여 다음과 같이 거래 관련 권리 의무 관계의 확인 등을 이유로 일정기간 보유하여야 할 필요가 있을 경우에는 일정기간 보유합니다.
- 회원가입정보의 경우, 회원가입을 탈퇴하거나 회원에서 제명된 경우 등 일정한 사전에 보유목적, 기간 및 보유하는 개인정보 항목을 명시하여 동의를 구합니다.
- 계약 또는 청약철회 등에 관한 기록 : 5년
- 대금결제 및 재화등의 공급에 관한 기록 : 5년
- 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년
② 귀하의 동의를 받아 보유하고 있는 거래정보 등을 귀하께서 열람을 요구하는 경우 대한기계공구(주)는 지체없이 그 열람, 확인 할 수 있도록 조치합니다.
`}
              </pre>
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

export default Privacy;
