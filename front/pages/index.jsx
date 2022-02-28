import React, { useEffect, useState, useCallback } from "react";
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
  SubTitle,
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
import { Empty, Button, message } from "antd";
import { HeartFilled, PlusOutlined } from "@ant-design/icons";
import { CATEGORY_LIST_REQUEST } from "../reducers/category";
import {
  PRODUCT_BEST_LIST_REQUEST,
  PRODUCT_LIST_REQUEST,
} from "../reducers/product";
import { useRouter } from "next/router";
import { MENU_LIST_REQUEST } from "../reducers/menu";
import {
  INTEREST_LIST_REQUEST,
  INTEREST_CREATE_REQUEST,
  INTEREST_DELETE_REQUEST,
} from "../reducers/interest";

const ProductWrapper = styled(Wrapper)`
  width: calc(100% / 4 - (100px / 4));
  margin: 0 25px 37px 0;
  position: relative;
  cursor: pointer;

  img {
    height: 290px;
    transition: 0.5s;
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
      height: 130px;
    }
  }

  &:hover .whiteBack {
    opacity: 1;
  }

  & .whiteBack div div:nth-child(1):hover p,
  & .whiteBack div div:nth-child(2):hover p {
    display: flex;
  }
`;

const MainProductButton = styled(Button)`
  border: 1px solid ${Theme.grey_C};
  font-size: 16px;
  width: 135px;
  height: 50px;
  border-radius: 0;

  &:hover {
    background-color: ${Theme.basicTheme_C};
    border: 1px solid ${Theme.basicTheme_C};
    color: ${Theme.white_C};
  }

  @media (max-width: 900px) {
    width: 115px;
    height: 40px;
  }
`;

const MainBottomButton = styled(Button)`
  border: 1px solid ${Theme.white_C};
  font-size: 16px;
  width: 135px;
  height: 50px;
  border-radius: 0;
  background-color: transparent;
  color: ${Theme.white_C};

  &:hover {
    color: ${Theme.black_C};
  }

  @media (max-width: 900px) {
    width: 115px;
    height: 40px;
  }
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

  @media (max-width: 700px) {
    padding: 25px 15px 20px;
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

const MainProductTypeBtn = styled(Text)`
  font-size: 20px;
  position: relative;
  cursor: pointer;
  ${(props) =>
    props.isCheck &&
    `
    font-weight: bold;
    &::after {
      content: "";
      position: absolute;
      z-index: -1;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 14px;
      background-color: ${Theme.subTheme2_C};
    }
  `}
  @media (max-width: 900px) {
    font-size: 16px;
  }
`;

const Home = ({}) => {
  const width = useWidth();
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const { me } = useSelector((state) => state.user);
  const {
    interestList,
    //
    st_interestCreateDone,
    st_interestCreateError,
    //
    st_interestDeleteDone,
    st_interestDeleteError,
  } = useSelector((state) => state.interest);
  const { categoryList } = useSelector((state) => state.category);
  const { productList, productBestList } = useSelector(
    (state) => state.product
  );
  const { menuList } = useSelector((state) => state.menu);

  const [isHeart, setIsHeart] = useState(false);
  const [selectCat, setSelectCat] = useState(
    categoryList && categoryList[0].id
  );

  const router = useRouter();

  ////// HOOKS //////

  const dispatch = useDispatch();

  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
      data: {
        categoryId: selectCat,
        page: 1,
      },
    });
  }, [selectCat]);

  useEffect(() => {
    if (st_interestCreateError) {
      return message.error(st_interestCreateError);
    }
  }, [st_interestCreateError]);

  useEffect(() => {
    if (st_interestDeleteError) {
      return message.error(st_interestDeleteError);
    }
  }, [st_interestDeleteError]);

  useEffect(() => {
    if (st_interestCreateDone) {
      dispatch({
        type: INTEREST_LIST_REQUEST,
      });
    }
  }, [st_interestCreateDone]);

  useEffect(() => {
    if (st_interestDeleteDone) {
      dispatch({
        type: INTEREST_LIST_REQUEST,
      });
    }
  }, [st_interestDeleteDone]);

  useEffect(() => {
    if (me) {
      dispatch({
        type: INTEREST_LIST_REQUEST,
      });
    }
  }, [me]);

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

  const isHeartToggle = useCallback(() => {
    setIsHeart(!isHeart);
  }, [isHeart]);

  ////// HANDLER //////

  const interestChangeHandler = useCallback(
    (id) => {
      let checkData =
        interestList && interestList.find((value) => value.ProductId === id);

      if (me) {
        if (checkData) {
          dispatch({
            type: INTEREST_DELETE_REQUEST,
            data: {
              interId: checkData.id,
            },
          });
        } else {
          dispatch({
            type: INTEREST_CREATE_REQUEST,
            data: {
              ProductId: id,
            },
          });
        }
      } else {
        router.push("/login");
        return message.error("로그인 후 이용해주세요.");
      }
    },
    [interestList]
  );

  const changeSelectCatHandler = useCallback(
    (data) => {
      setSelectCat(data);
    },
    [selectCat]
  );

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  ////// DATAVIEW //////

  const getEditContent = (contentValue) => {
    console.log(contentValue);
  };

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
          <Mainslider />

          {/* <ToastEditorComponent
            action={getEditContent}
            // placeholder="placeholder"
          /> */}

          {/* <Popup /> */}

          <RsWrapper>
            <Wrapper padding={width < 900 ? `56px 0 55px` : `112px 0 80px`}>
              <SubTitle>Product</SubTitle>
              <Text
                margin={`24px 0 41px`}
                color={Theme.grey_C}
                lineHeight={`1.19`}
              >
                최고의 상품을 제공하는 대한기계공구를 만나보세요.
              </Text>
              <Wrapper dr={`row`} ju={width < 900 && `space-between`}>
                {categoryList &&
                  categoryList.slice(0, 5).map((data) => {
                    return (
                      <MainProductTypeBtn
                        isCheck={selectCat === data.id}
                        onClick={() => changeSelectCatHandler(data.id)}
                        lineHeight={`1.24`}
                        margin={width < 900 ? `0` : `0 39px`}
                      >
                        {data.value}
                      </MainProductTypeBtn>
                    );
                  })}
              </Wrapper>
              <Wrapper
                dr={`row`}
                ju={`flex-start`}
                margin={width < 900 ? `30px 0 0` : `80px 0 0`}
              >
                {productList &&
                  (productList.length === 0 ? (
                    <Wrapper>
                      <Empty description="상품이 없습니다." />
                    </Wrapper>
                  ) : (
                    productList.slice(0, 8).map((data) => {
                      return (
                        <ProductWrapper key={data.id}>
                          <Wrapper
                            border={`1px solid ${Theme.lightGrey_C}`}
                            position={`relative`}
                          >
                            <Image
                              src={data.thumbnail}
                              alt="main_product_thumbnail"
                            />
                            <Wrapper
                              className="whiteBack"
                              opacity={`0`}
                              position={`absolute`}
                              top={`0`}
                              left={`0`}
                              width={`100%`}
                              height={`100%`}
                              bgColor={`rgba(255, 255, 255, 0.6)`}
                            >
                              <Wrapper
                                height={`100%`}
                                ju={`flex-end`}
                                al={`flex-end`}
                              >
                                <Wrapper width={`auto`} dr={`row`}>
                                  <Text
                                    fontSize={`12px`}
                                    color={Theme.white_C}
                                    bgColor={`rgba(0, 0, 0, 0.5)`}
                                    width={`62px`}
                                    height={`20px`}
                                    lineHeight={`1.14`}
                                    display={`none`}
                                    ju={`center`}
                                    al={`center`}
                                  >
                                    장바구니
                                  </Text>
                                  <Image
                                    width={`34px`}
                                    height={`auto !important`}
                                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/product/icon_cart.png"
                                    alt="cart_icon"
                                  />
                                </Wrapper>
                                <Wrapper
                                  width={`auto`}
                                  dr={`row`}
                                  margin={`8px 0 0`}
                                >
                                  <Text
                                    fontSize={`12px`}
                                    color={Theme.white_C}
                                    bgColor={`rgba(0, 0, 0, 0.5)`}
                                    width={`62px`}
                                    height={`20px`}
                                    lineHeight={`1.14`}
                                    display={`none`}
                                    ju={`center`}
                                    al={`center`}
                                  >
                                    관심상품
                                  </Text>
                                  <Image
                                    onClick={() =>
                                      interestChangeHandler(data.id)
                                    }
                                    width={`34px`}
                                    height={`auto !important`}
                                    src={
                                      interestList &&
                                      interestList.find(
                                        (value) => value.ProductId === data.id
                                      )
                                        ? "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/product/icon_heart_red.png"
                                        : "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/product/icon_heart.png"
                                    }
                                    alt="heart_icon"
                                  />
                                </Wrapper>
                              </Wrapper>
                            </Wrapper>
                          </Wrapper>
                          <Text margin={`25px 0 13px`}>{data.title}</Text>
                          <Wrapper
                            dr={width < 900 ? `column` : `row`}
                            fontSize={width < 900 ? `16px` : `18px`}
                          >
                            {data.discount > 0 && (
                              <Text
                                margin={width < 900 ? `0` : `0 5px 0 0`}
                                textDecoration={`line-through`}
                                color={Theme.grey_C}
                              >
                                {String(
                                  parseInt(data.price * (data.discount / 100))
                                ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                원
                              </Text>
                            )}
                            <Text
                              margin={width < 900 ? `0` : `0 0 0 5px`}
                              fontWeight={`bold`}
                            >
                              {String(
                                data.price -
                                  parseInt(data.price * (data.discount / 100))
                              ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              원
                            </Text>
                          </Wrapper>
                        </ProductWrapper>
                      );
                    })
                  ))}
              </Wrapper>
            </Wrapper>
            <Wrapper margin={`0 0 110px`}>
              <MainProductButton
                onClick={() =>
                  moveLinkHandler(
                    `/product?menu=${
                      categoryList &&
                      categoryList.find((data) => data.id === selectCat).MenuId
                    }`
                  )
                }
              >
                보러가기
              </MainProductButton>
            </Wrapper>

            <Wrapper padding={width < 900 ? `56px 0 55px` : `112px 0 110px`}>
              <Wrapper>
                <SubTitle>BEST Item</SubTitle>
                <Text
                  margin={width < 900 ? `24px 0 30px` : `24px 0 80px`}
                  color={Theme.grey_C}
                  lineHeight={`1.19`}
                >
                  대한기계공구의 최고의 상품을 만나보세요.
                </Text>
              </Wrapper>

              <Wrapper dr={`row`}>
                {productBestList &&
                  (productBestList.lenght === 0 ? (
                    <Wrapper>
                      <Empty description="베스트상품이 없습니다." />
                    </Wrapper>
                  ) : (
                    productBestList.map((data) => {
                      return (
                        <ProductWrapper>
                          <Wrapper
                            border={`1px solid ${Theme.lightGrey_C}`}
                            position={`relative`}
                          >
                            <Image
                              src={data.thumbnail}
                              alt="main_product_thumbnail"
                            />
                            <Wrapper
                              className="whiteBack"
                              opacity={`0`}
                              position={`absolute`}
                              top={`0`}
                              left={`0`}
                              width={`100%`}
                              height={`100%`}
                              bgColor={`rgba(255, 255, 255, 0.6)`}
                            >
                              <Wrapper
                                height={`100%`}
                                ju={`flex-end`}
                                al={`flex-end`}
                              >
                                <Wrapper width={`auto`} dr={`row`}>
                                  <Text
                                    fontSize={`12px`}
                                    color={Theme.white_C}
                                    bgColor={`rgba(0, 0, 0, 0.5)`}
                                    width={`62px`}
                                    height={`20px`}
                                    lineHeight={`1.14`}
                                    display={`none`}
                                    ju={`center`}
                                    al={`center`}
                                  >
                                    장바구니
                                  </Text>
                                  <Image
                                    width={`34px`}
                                    height={`auto !important`}
                                    src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/product/icon_cart.png"
                                    alt="cart_icon"
                                  />
                                </Wrapper>
                                <Wrapper
                                  width={`auto`}
                                  dr={`row`}
                                  margin={`8px 0 0`}
                                >
                                  <Text
                                    fontSize={`12px`}
                                    color={Theme.white_C}
                                    bgColor={`rgba(0, 0, 0, 0.5)`}
                                    width={`62px`}
                                    height={`20px`}
                                    lineHeight={`1.14`}
                                    display={`none`}
                                    ju={`center`}
                                    al={`center`}
                                  >
                                    관심상품
                                  </Text>
                                  <Image
                                    onClick={() =>
                                      interestChangeHandler(data.id)
                                    }
                                    width={`34px`}
                                    height={`auto !important`}
                                    src={
                                      interestList &&
                                      interestList.find(
                                        (value) => value.ProductId === data.id
                                      )
                                        ? "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/product/icon_heart_red.png"
                                        : "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/product/icon_heart.png"
                                    }
                                    alt="heart_icon"
                                  />
                                </Wrapper>
                              </Wrapper>
                            </Wrapper>
                          </Wrapper>
                          <Text margin={`25px 0 13px`}>{data.title}</Text>

                          <Text
                            fontSize={width < 900 ? `16px` : `18px`}
                            fontWeight={`bold`}
                          >
                            {String(
                              data.price -
                                parseInt(data.price * (data.discount / 100))
                            ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            원
                          </Text>
                        </ProductWrapper>
                      );
                    })
                  ))}
              </Wrapper>
            </Wrapper>
          </RsWrapper>
          <Wrapper
            position={`relative`}
            padding={width < 900 ? `55px 0 ` : `110px 0`}
            ju={`flex-start`}
          >
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
                {width < 900 ? (
                  <>
                    <Text fontSize={`18px`} margin={`28px 0 0`}>
                      최고의 품질과 정직을 우선으로
                    </Text>
                    <Text fontSize={`18px`} margin={`0 0 80px`}>
                      생각하는 선두기업입니다.
                    </Text>
                  </>
                ) : (
                  <Text fontSize={`18px`} margin={`28px 0 80px`}>
                    최고의 품질과 정직을 우선으로 생각하는 선두 기업입니다.
                  </Text>
                )}
              </Wrapper>
              <Wrapper dr={width < 900 ? `column-reverse` : `row`}>
                <Wrapper
                  width={width < 900 ? `100%` : `calc(25% - 15px)`}
                  height={width < 900 ? `300px` : `576px`}
                  id={`map`}
                  margin={width < 900 ? `28px 0 0` : `0 15px 0 0`}
                  border={`1px solid ${Theme.white_C}`}
                ></Wrapper>
                <Wrapper
                  width={width < 900 ? `100%` : `calc(75% - 15px)`}
                  margin={width < 900 ? `0` : `0 0 0 15px`}
                >
                  <MainBlackBackWrapper
                    margin={`0 0 28px`}
                    bgImg={`url(https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/main/notice_bg.png)`}
                  >
                    <Wrapper zIndex={`1`}>
                      <Wrapper
                        margin={width < 900 ? `0 0 42px` : `0 0 84px`}
                        al={`flex-start`}
                      >
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
                      <Wrapper
                        margin={width < 900 ? `0 0 42px` : `0 0 84px`}
                        al={`flex-start`}
                      >
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

    context.store.dispatch({
      type: CATEGORY_LIST_REQUEST,
    });

    context.store.dispatch({
      type: MENU_LIST_REQUEST,
    });

    context.store.dispatch({
      type: PRODUCT_BEST_LIST_REQUEST,
      data: {
        isBest: true,
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);
export default Home;
