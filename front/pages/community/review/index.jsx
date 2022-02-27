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
  Image,
} from "../../../components/commonComponents";
import { useState } from "react";
import { useCallback } from "react";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import { useRouter } from "next/dist/client/router";
import { REVIEW_LIST_REQUEST } from "../../../reducers/review";
import { Empty } from "antd";

const Review = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const { reviewList } = useSelector((state) => state.review);

  console.log(reviewList);

  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////
  const [datum, setDatum] = useState(null);

  ////// REDUX //////
  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const onClickToggleHandler = useCallback(
    (data) => {
      setDatum(data);

      if (datum && datum.id === data.id) {
        setDatum("");
      }
    },
    [datum]
  );
  ////// DATAVIEW //////
  const testReview = [
    // {
    //   type: "전체",
    // },
    {
      id: 1,
      product: "상품1",
      title: "상품1에 대한 제목",
      content: "상품문의답변",
      user: "사용자",
      createdAt: "2022-02-13-00:00",
      hit: "234",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxza-raAsJHK8wZ03T55ti77CChtEvLRpCQ&usqp=CAU",
    },
    {
      id: 2,
      product: "상품2",
      title: "상품2에 대한 제목",
      content: "배송문의답변",
      user: "사용자2",
      createdAt: "2022-02-14-00:00",
      hit: "123",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxza-raAsJHK8wZ03T55ti77CChtEvLRpCQ&usqp=CAU",
    },
    {
      id: 3,
      product: "상품3",
      title: "상품3에 대한 제목",
      content: "취소/반품/교환답변",
      user: "사용자3",
      createdAt: "2022-02-15-00:00",
      hit: "45",
      thumbnail:
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
                onClick={() => moveLinkHandler(`/community/faq`)}
                cursor={`pointer`}
              >
                커뮤니티
              </Wrapper>
              |
              <Wrapper
                width={`auto`}
                margin={`0 8px`}
                onClick={() => moveLinkHandler(`/community/review`)}
                cursor={`pointer`}
              >
                상품후기
              </Wrapper>
            </Wrapper>
            <Wrapper
              fontSize={`20px`}
              fontWeight={`bold`}
              al={`flex-start`}
              padding={`0 0 10px`}
              borderBottom={`1px solid ${Theme.grey2_C}`}
              margin={`0 0 40px`}
            >
              상품후기
            </Wrapper>

            <Wrapper margin={`0 0 180px`}>
              <Wrapper
                bgColor={Theme.lightGrey2_C}
                height={`40px`}
                borderTop={`1px solid ${Theme.grey2_C}`}
                borderBottom={`1px solid ${Theme.grey2_C}`}
              >
                <Wrapper width={`5%`}>번호</Wrapper>
                <Wrapper width={`15%`}>상품명</Wrapper>
                <Wrapper width={`50%`}>제목</Wrapper>
                <Wrapper width={`10%`}>작성자</Wrapper>
                <Wrapper width={`10%`}>작성일</Wrapper>
                <Wrapper width={`10%`}>조회수</Wrapper>
              </Wrapper>
              {reviewList &&
                (reviewList.length === 0 ? (
                  <Wrapper>
                    <Empty description="후기가 없습니다." />
                  </Wrapper>
                ) : (
                  reviewList.map((data, idx) => {
                    return (
                      <Wrapper ju={`flex-start`}>
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          padding={`14px 0px`}
                          cursor={`pointer`}
                          borderBottom={`1px solid ${Theme.grey2_C}`}
                          onClick={() => onClickToggleHandler(data)}
                        >
                          <Wrapper width={`5%`}>{data.id}</Wrapper>
                          <Wrapper width={`15%`} dr={`row`}>
                            <Image
                              width={`50px`}
                              height={`50px`}
                              src={data.Product.thumbnail}
                            />
                            <Wrapper
                              width={`calc(100% - 50px)`}
                              al={`flex-start`}
                              padding={`0 0 0 10px`}
                            >
                              {data.Product.title}
                            </Wrapper>
                          </Wrapper>
                          <Wrapper width={`50%`} al={`flex-start`}>
                            {data.title}
                          </Wrapper>
                          <Wrapper width={`10%`}>{data.author}</Wrapper>
                          <Wrapper width={`10%`}>
                            {data.createdAt.substring(0, 10)}
                          </Wrapper>
                          <Wrapper width={`10%`}>{data.hit}</Wrapper>
                        </Wrapper>

                        {datum && datum.id === data.id && (
                          <Wrapper borderBottom={`1px solid ${Theme.grey2_C}`}>
                            <Wrapper width={`90%`}>
                              <Image
                                width={`600px`}
                                height={`600px`}
                                src={data.imagePath}
                              />
                            </Wrapper>
                            <Wrapper
                              width={`90%`}
                              al={`flex-start`}
                              padding={`60px 0 40px`}
                            >
                              {data.content}
                            </Wrapper>
                          </Wrapper>
                        )}
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

    context.store.dispatch({
      type: REVIEW_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default Review;
