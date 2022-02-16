import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  KAKAO_LOGIN_REQUEST,
  LOAD_MY_INFO_REQUEST,
  LOGIN_REQUEST,
} from "../reducers/user";
import useInput from "../hooks/useInput";
import ClientLayout from "../components/ClientLayout";
import axios from "axios";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import {
  ColWrapper,
  RowWrapper,
  Image,
  WholeWrapper,
  Wrapper,
  Text,
  RsWrapper,
  CommonButton,
} from "../components/commonComponents";
import useWidth from "../hooks/useWidth";
import Theme from "../components/Theme";
import styled from "styled-components";
import { SEO_LIST_REQUEST } from "../reducers/seo";
import Head from "next/head";
import Popup from "../components/popup/popup";
import Mainslider from "../components/slide/MainSlider";
import ToastEditorComponent from "../components/editor/ToastEditorComponent";
import { useRef } from "react";
import { Empty, Button } from "antd";

const ProductWrapper = styled(Wrapper)`
  width: calc(100% / 4 - (100px / 4));
  margin: 0 25px 37px 0;
  position: relative;
  cursor: pointer;

  img {
    height: 270px;
  }

  @media (max-width: 1100px) {
    width: calc(100% / 3 - (54px / 3));

    &:nth-child(4n) {
      margin: 0 27px 30px 0;
    }

    &:nth-child(3n) {
      margin-right: 0;
    }

    img {
      height: 281px;
    }
  }

  @media (max-width: 700px) {
    width: calc(100% / 2 - (27px / 2));

    &:nth-child(2n + 1) {
      margin-right: 27px;
    }

    &:nth-child(2n) {
      margin-right: 0;
    }

    img {
      height: 322px;
    }
  }

  @media (max-width: 500px) {
    width: calc(100% / 2 - (15px / 2));

    &:nth-child(2n + 1) {
      margin-right: 15px;
    }

    img {
      height: 170px;
    }
  }
`;

const MainProductButton = styled(Button)`
  border: 1px solid ${Theme.grey_C};
  font-size: 16px;
  width: 135px;
  height: 50px;
  border-radius: 0;
`;

const MainBottomButton = styled(Button)`
  border: 1px solid ${Theme.white_C};
  font-size: 16px;
  width: 135px;
  height: 50px;
  border-radius: 0;
  background-color: transparent;
  color: ${Theme.white_C};
`;

const MainBottomBackWrapper = styled(Wrapper)`
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const MainBlackBackWrapper = styled(Wrapper)`
  position: relative;
  padding: 35px 30px 30px;
  align-items: flex-start;

  &::after {
    position: absolute;
    content: "";
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`;

const MainAfterText = styled(Text)`
  position: relative;
  font-size: 20px;
  padding: 0 0 6px;
  &::after {
    content: "";
    position: absolute;
    width: 18px;
    height: 2px;
    background-color: ${Theme.white_C};
    bottom: 0;
    left: 0;
  }
`;

const Home = ({}) => {
  const width = useWidth();
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  ////// HOOKS //////
  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    const mapScript = document.createElement("script");
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=2f9e8df5229744fc8a341bf9209e4f7d&autoload=false`;
    document.head.appendChild(mapScript);

    mapScript.onload = () => {
      kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new kakao.maps.LatLng(37.5198311, 126.9122), // 지도의 중심좌표
          level: 5, // 지도의 확대 레벨
        };
        const map = new kakao.maps.Map(mapContainer, mapOption);

        // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
        map.setZoomable(false);

        // 마커가 표시될 위치입니다
        let markerPosition = new kakao.maps.LatLng(37.5198311, 126.9122);

        // 마커를 생성합니다
        let marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        let content =
          '<div class="customoverlay">' +
          '  <a href="http://kko.to/RDeNLHq4j" target="_blank">' +
          '    <span class="title">국회대로 54길 73</span>' +
          "  </a>" +
          "</div>";

        // 커스텀 오버레이가 표시될 위치입니다
        let position = new kakao.maps.LatLng(37.5198311, 126.9122);

        // 커스텀 오버레이를 생성합니다
        let customOverlay = new kakao.maps.CustomOverlay({
          map: map,
          position: position,
          content: content,
          yAnchor: 1,
        });
      });
    };
  }, []);

  ////// TOGGLE //////
  ////// HANDLER //////
  ////// DATAVIEW //////

  const getEditContent = (contentValue) => {
    console.log(contentValue);
  };

  const testProductTypeArr = [
    "건설기계",
    "야마바시",
    "다이아몬드휠",
    "가스피팅",
    "안전 장비",
  ];

  const testProductArr = [
    {
      id: 1,
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJYdH7O9XWCoItn5fJHx6_ZDjnXKZ4gB4chw&usqp=CAU",
      name: "상품명",
      viewPrice: "1,100,000원",
      originPrice: "1,220,000원",
      isDiscount: true,
    },
    {
      id: 2,
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJYdH7O9XWCoItn5fJHx6_ZDjnXKZ4gB4chw&usqp=CAU",
      name: "상품명2",
      viewPrice: "1,100,000원",
      originPrice: "1,220,000원",
      isDiscount: false,
    },
    {
      id: 3,
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJYdH7O9XWCoItn5fJHx6_ZDjnXKZ4gB4chw&usqp=CAU",
      name: "상품명3",
      viewPrice: "1,100,000원",
      originPrice: "1,220,000원",
      isDiscount: false,
    },
    {
      id: 4,
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJYdH7O9XWCoItn5fJHx6_ZDjnXKZ4gB4chw&usqp=CAU",
      name: "상품명4",
      viewPrice: "1,100,000원",
      originPrice: "1,220,000원",
      isDiscount: false,
    },
    {
      id: 5,
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJYdH7O9XWCoItn5fJHx6_ZDjnXKZ4gB4chw&usqp=CAU",
      name: "상품명5",
      viewPrice: "1,100,000원",
      originPrice: "1,220,000원",
      isDiscount: false,
    },
    {
      id: 6,
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJYdH7O9XWCoItn5fJHx6_ZDjnXKZ4gB4chw&usqp=CAU",
      name: "상품명6",
      viewPrice: "1,100,000원",
      originPrice: "1,220,000원",
      isDiscount: false,
    },
    {
      id: 7,
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJYdH7O9XWCoItn5fJHx6_ZDjnXKZ4gB4chw&usqp=CAU",
      name: "상품명7",
      viewPrice: "1,100,000원",
      originPrice: "1,220,000원",
      isDiscount: false,
    },
    {
      id: 8,
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJYdH7O9XWCoItn5fJHx6_ZDjnXKZ4gB4chw&usqp=CAU",
      name: "상품명8",
      viewPrice: "1,100,000원",
      originPrice: "1,220,000원",
      isDiscount: false,
    },
  ];

  const testBestItem = [
    {
      id: 1,
      thumbnail:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSoG6WXw7w2G19nQlpKxrAzY-qcDwIix2Uc9hL2m31tGR20AQM_lxvAUKSq5L7dPj3zryYvjJj40s6lHmPrOjy3SYHAK0EdMZtjpTLV8k148vcXGR9IHKW4Pw&usqp=CAE",
      name: "상품명",
      viewPrice: "1,100,000원",
    },
    {
      id: 2,
      thumbnail:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSoG6WXw7w2G19nQlpKxrAzY-qcDwIix2Uc9hL2m31tGR20AQM_lxvAUKSq5L7dPj3zryYvjJj40s6lHmPrOjy3SYHAK0EdMZtjpTLV8k148vcXGR9IHKW4Pw&usqp=CAE",
      name: "상품명2",
      viewPrice: "1,100,000원",
    },
    {
      id: 3,
      thumbnail:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSoG6WXw7w2G19nQlpKxrAzY-qcDwIix2Uc9hL2m31tGR20AQM_lxvAUKSq5L7dPj3zryYvjJj40s6lHmPrOjy3SYHAK0EdMZtjpTLV8k148vcXGR9IHKW4Pw&usqp=CAE",
      name: "상품명3",
      viewPrice: "1,100,000원",
    },
    {
      id: 4,
      thumbnail:
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSoG6WXw7w2G19nQlpKxrAzY-qcDwIix2Uc9hL2m31tGR20AQM_lxvAUKSq5L7dPj3zryYvjJj40s6lHmPrOjy3SYHAK0EdMZtjpTLV8k148vcXGR9IHKW4Pw&usqp=CAE",
      name: "상품명4",
      viewPrice: "1,100,000원",
    },
  ];

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
          <Mainslider />

          {/* <ToastEditorComponent
            action={getEditContent}
            // placeholder="placeholder"
          /> */}

          {/* <Popup /> */}

          <RsWrapper>
            <Wrapper padding={`112px 0 110px`}>
              <Text fontSize={`36px`} fontWeight={`bold`} lineHeight={`1.43`}>
                Product
              </Text>
              <Text
                margin={`24px 0 41px`}
                color={Theme.grey_C}
                lineHeight={`1.19`}
              >
                최고의 상품을 제공하는 대한기계공구를 만나보세요.
              </Text>
              <Wrapper dr={`row`}>
                {testProductTypeArr &&
                  testProductTypeArr.map((data) => {
                    return (
                      <Text
                        fontSize={`20px`}
                        lineHeight={`1.24`}
                        margin={`0 39px`}
                      >
                        {data}
                      </Text>
                    );
                  })}
              </Wrapper>
              <Wrapper dr={`row`} margin={`80px 0 0`}>
                {testProductArr && testProductArr.length === 0 ? (
                  <Wrapper>
                    <Empty description="상품이 없습니다." />
                  </Wrapper>
                ) : (
                  testProductArr.map((data) => {
                    return (
                      <ProductWrapper>
                        <Wrapper
                          padding={`20px`}
                          border={`1px solid ${Theme.lightGrey_C}`}
                        >
                          <Image
                            src={data.thumbnail}
                            alt="main_product_thumbnail"
                          />
                        </Wrapper>
                        <Text margin={`25px 0 13px`}>{data.name}</Text>
                        <Wrapper
                          dr={`row`}
                          fontSize={`18px`}
                          fontWeight={`bold`}
                        >
                          <Text margin={`0 5px 0 0`}>{data.originPrice}</Text>
                          <Text margin={`0 0 0 5px`}>{data.viewPrice}</Text>
                        </Wrapper>
                      </ProductWrapper>
                    );
                  })
                )}
              </Wrapper>

              <Wrapper margin={`61px 0 0`}>
                <MainProductButton>보러가기</MainProductButton>
              </Wrapper>
            </Wrapper>

            <Wrapper padding={`112px 0 110px`}>
              <Wrapper>
                <Text fontSize={`36px`} fontWeight={`bold`} lineHeight={`1.43`}>
                  BEST Item
                </Text>
                <Text
                  margin={`24px 0 80px`}
                  color={Theme.grey_C}
                  lineHeight={`1.19`}
                >
                  대한기계공구의 최고의 상품을 만나보세요.
                </Text>
              </Wrapper>

              <Wrapper dr={`row`}>
                {testBestItem && testBestItem.lenght === 0 ? (
                  <Wrapper>
                    <Empty description="베스트상품이 없습니다." />
                  </Wrapper>
                ) : (
                  testBestItem.map((data) => {
                    return (
                      <ProductWrapper>
                        <Wrapper
                          padding={`20px`}
                          border={`1px solid ${Theme.lightGrey_C}`}
                        >
                          <Image
                            src={data.thumbnail}
                            alt="main_product_thumbnail"
                          />
                        </Wrapper>
                        <Text margin={`25px 0 13px`}>{data.name}</Text>

                        <Text
                          fontSize={`18px`}
                          fontWeight={`bold`}
                          margin={`0 0 0 5px`}
                        >
                          {data.viewPrice}
                        </Text>
                      </ProductWrapper>
                    );
                  })
                )}
              </Wrapper>
            </Wrapper>
          </RsWrapper>
          <Wrapper position={`relative`} padding={`110px 0`} ju={`flex-start`}>
            <MainBottomBackWrapper
              position={`absolute`}
              top={`0`}
              left={`0`}
              height={`460px`}
              zIndex={`-1`}
            >
              <Image
                width={`100%`}
                height={`100%`}
                src={
                  "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/main/company_bg.png"
                }
                alt="back_image"
              />
            </MainBottomBackWrapper>
            <RsWrapper zIndex={`1`} color={Theme.white_C}>
              <Wrapper>
                <Text fontSize={`26px`} fontWeight={`medium`}>
                  대한기계공구(주)
                </Text>
                <Text fontSize={`18px`} margin={`28px 0 80px`}>
                  최고의 품질과 정직을 우선으로 생각하는 선두 기업입니다.
                </Text>
              </Wrapper>
              <Wrapper dr={`row`}>
                <Wrapper
                  width={`calc(25% - 15px)`}
                  height={`576px`}
                  id={`map`}
                  margin={`0 15px 0 0`}
                  border={`1px solid ${Theme.white_C}`}
                ></Wrapper>
                <Wrapper width={`calc(75% - 15px)`} margin={`0 0 0 15px`}>
                  <MainBlackBackWrapper
                    margin={`0 0 28px`}
                    bgImg={`url(https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/main/notice_bg.png)`}
                  >
                    <Wrapper zIndex={`1`}>
                      <Wrapper margin={`0 0 84px`} al={`flex-start`}>
                        <MainAfterText lineHeight={`1.24`}>
                          공지사항
                        </MainAfterText>
                        <Text
                          margin={`22px 0 0`}
                          fontSize={`18px`}
                          lineHeight={`1.22`}
                        >
                          대한기계공구의 최신 소직을 만나보세요.
                        </Text>
                      </Wrapper>
                      <Wrapper al={`flex-end`}>
                        <MainBottomButton>보러가기</MainBottomButton>
                      </Wrapper>
                    </Wrapper>
                  </MainBlackBackWrapper>
                  <MainBlackBackWrapper
                    bgImg={`url(https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/main/question_bg.png)`}
                  >
                    <Wrapper zIndex={`1`}>
                      <Wrapper margin={`0 0 84px`} al={`flex-start`}>
                        <MainAfterText lineHeight={`1.24`}>
                          1:1 문의
                        </MainAfterText>
                        <Text
                          margin={`22px 0 0`}
                          fontSize={`18px`}
                          lineHeight={`1.22`}
                        >
                          1:1 문의로 원하시는 상품을 구매해보세요.
                        </Text>
                      </Wrapper>
                      <Wrapper al={`flex-end`}>
                        <MainBottomButton>보러가기</MainBottomButton>
                      </Wrapper>
                    </Wrapper>
                  </MainBlackBackWrapper>
                </Wrapper>
              </Wrapper>
            </RsWrapper>
          </Wrapper>
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
export default Home;
