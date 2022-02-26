import { Input, Button, Modal, message, Empty } from "antd";
import React, { useState, useCallback, useEffect } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { END } from "redux-saga";
import Head from "next/head";
import ClientLayout from "../../../components/ClientLayout";
import {
  RsWrapper,
  WholeWrapper,
  Text,
  Wrapper,
  Image,
  SpanText,
  CommonButton,
} from "../../../components/commonComponents";
import Theme from "../../../components/Theme";
import useWidth from "../../../hooks/useWidth";
import Inquiry from "../../../components/product/inquiry";
import wrapper from "../../../store/configureStore";
import { PRODUCT_DETAIL_REQUEST } from "../../../reducers/product";
import {
  INTEREST_LIST_REQUEST,
  INTEREST_CREATE_REQUEST,
  INTEREST_DELETE_REQUEST,
} from "../../../reducers/interest";
import { SEO_LIST_REQUEST } from "../../../reducers/seo";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Review from "../../../components/product/review";

const Video = styled.video`
  width: 100%;
  height: 760px;
`;

const DetailButton = styled.button`
  width: calc(100% / 4);
  height: 60px;
  cursor: pointer;
  background: none;
  outline: none;
  border: none;
  transition: 0.2s;

  ${(props) =>
    props.isTab &&
    `background-color: ${Theme.subTheme_C}; color: ${Theme.white_C};`};

  @media (max-width: 700px) {
    height: 50px;
  }
`;

const ProductImageWrapper = styled(Wrapper)`
  width: calc(100% / 3 - (108px / 3));
  margin: 0 54px 10px 0;
  padding: 10px;
  border: 1px solid ${Theme.grey2_C};

  position: relative;
  cursor: pointer;

  &:nth-child(3n) {
    margin-right: 0;
  }

  img {
    width: 85px;
    height: 85px;
  }

  @media (max-width: 700px) {
    width: calc(100% / 2 - (24px / 2));
    margin: 0 6px 5px;
  }
`;

const EmphasisText = styled(Text)`
  line-height: 1.19;
  margin: 55px 0 10px;
`;

const BelongText = styled(Text)`
  font-size: 14px;
  line-height: 1.17;
  color: ${Theme.grey_C};
  margin: 0 0 12px;
`;

const DetailProduct = () => {
  const { productDetailData, productDetailImages } = useSelector(
    (state) => state.product
  );

  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const { me } = useSelector((state) => state.user);

  const {
    interestList,
    //
    st_interestCreateDone,
    st_interestDeleteDone,
    //
    st_interestCreateError,
    st_interestDeleteError,
  } = useSelector((state) => state.interest);

  ////// HOOKS //////
  const width = useWidth();
  const dispatch = useDispatch();
  const router = useRouter();

  const [tab, setTab] = useState(1);

  const [productCount, setProductCount] = useState(1);
  const [choiceImage, setChioceImage] = useState({});
  const [restImages, setRestImages] = useState([]);

  //cart
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [prevStorge, setPrevStorge] = useState([]);

  const [youtubeLink, setYoutubeLink] = useState(null);

  ////// USEEFFECT //////

  useEffect(() => {
    dispatch({
      type: PRODUCT_DETAIL_REQUEST,
      data: {
        productId: router.query.id,
      },
    });
    dispatch({
      type: INTEREST_LIST_REQUEST,
    });
  }, [router.query]);

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
  }, [st_interestCreateDone, router.query]);

  useEffect(() => {
    if (st_interestDeleteDone) {
      dispatch({
        type: INTEREST_LIST_REQUEST,
      });
    }
  }, [st_interestDeleteDone, router.query]);

  useEffect(() => {
    if (productDetailData && productDetailImages) {
      setRestImages(
        productDetailImages.map((data, idx) => ({
          id: idx,
          image: data.imagePath,
        }))
      );

      setChioceImage({
        id: productDetailImages.length + 1,
        image: productDetailData[0].thumbnail,
      });

      const youtubeUrl =
        /(http:|https:)?(\/\/)?(www\.)?(youtube.com|youtu.be)\/(watch|embed)?(\?v=|\/)?(\S+)?/g;

      if (!youtubeUrl.test(productDetailData[0].youtubeLink)) {
        setYoutubeLink(null);
      } else {
        setYoutubeLink(productDetailData[0].youtubeLink);
      }
    }
  }, [productDetailData, productDetailImages]);

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

  const tabChangeHandler = useCallback(
    (value) => {
      setTab(value);
    },
    [tab]
  );

  const productCountHandler = useCallback((count) => {
    if (count > 0) {
      setProductCount(count);
    }
  }, []);

  const changeRestImagesHandler = useCallback(
    (data) => {
      let imageArr = restImages.filter((value) => value.id !== data.id);

      imageArr.push({
        id: choiceImage.id,
        image: choiceImage.image,
      });

      setRestImages(imageArr);

      setChioceImage({
        id: data.id,
        image: data.image,
      });
    },
    [restImages, choiceImage]
  );

  //cart
  const ModalHandleOk = useCallback(
    // 중복 상품 기능
    () => {
      const resultDatum = prevStorge.map((data, idx) => {
        if (data.id === productDetailData[0].id) {
          return {
            ...data,
            productNum: data.productNum + productCount,
          };
        } else {
          return data;
        }
      });

      // dispatch({
      //   type: UPDATE_WISHLIST,
      //   data: {
      //     list: true,
      //   },
      // });

      localStorage.setItem("WKDQKRNSL", JSON.stringify(resultDatum));
      ModalToggle();
    },
    [productCount, prevStorge, productDetailData]
  );

  const basketHandler = useCallback(() => {
    const datum = localStorage.getItem("WKDQKRNSL")
      ? JSON.parse(localStorage.getItem("WKDQKRNSL"))
      : [];

    let checkWish = false;

    const resultData = datum.map((data) => {
      if (data.id === productDetailData[0].id) {
        ModalToggle();
        setPrevStorge(datum);
        checkWish = true;

        return {
          ...data,
        };
      } else {
        return data;
      }
    });

    if (!checkWish) {
      resultData.push({
        id: productDetailData[0].id,
        thumbnail: productDetailData[0].thumbnail,
        title: productDetailData[0].title,
        productNum: productCount,
        price: productDetailData[0].price,
        discount: productDetailData[0].discount,
        deliveryPay: productDetailData[0].deliveryPay,
      });

      message.success("상품이 장바구니에 담겼습니다.");
    }

    localStorage.setItem("WKDQKRNSL", JSON.stringify(resultData));

    // dispatch({
    //   type: UPDATE_WISHLIST,
    //   data: {
    //     list: true,
    //   },
    // });
  }, [prevStorge, productDetailData, productCount]);
  ////// TOGGLE //////
  const ModalToggle = useCallback(() => {
    setIsModalVisible((prev) => !prev);
  }, []);

  ////// DATAIVEW //////

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
          <RsWrapper>
            <Wrapper margin={`280px 0 0`}>
              <Wrapper
                dr={width < 900 ? `column` : `row`}
                ju={`space-between`}
                al={`flex-start`}
              >
                <Wrapper
                  width={width < 900 ? `100%` : `calc(50% - 30px)`}
                  padding={
                    width < 1280
                      ? width < 900
                        ? `30px 5px 20px`
                        : `30px 20px 40px`
                      : `30px 110px 40px`
                  }
                  border={`1px solid ${Theme.grey2_C}`}
                >
                  <Image
                    width={width < 1100 ? `324px` : `424px`}
                    height={width < 1100 ? `324px` : `424px`}
                    margin={`0 0 56px`}
                    src={choiceImage && choiceImage.image}
                  />
                  <Wrapper dr={`row`} ju={`flex-start`}>
                    {restImages &&
                      restImages.map((data) => {
                        return (
                          <ProductImageWrapper
                            onClick={() => changeRestImagesHandler(data)}
                          >
                            <Image
                              width={`100%`}
                              height={`100%`}
                              src={data.image}
                              alt="product_thumbnail"
                            />
                          </ProductImageWrapper>
                        );
                      })}
                  </Wrapper>
                </Wrapper>
                <Wrapper
                  width={width < 900 ? `100%` : `calc(50% - 30px)`}
                  ju={`flex-start`}
                  al={`flex-start`}
                  margin={width < 700 && `20px 0 0`}
                >
                  <Text fontSize={`20px`} lineHeight={`1.24`}>
                    {productDetailData && productDetailData[0].categoryId}
                  </Text>
                  <Text
                    fontSize={`26px`}
                    fontWeight={`medium`}
                    margin={`28px 0 10px`}
                    lineHeight={`1.31`}
                  >
                    {productDetailData && productDetailData[0].title}
                  </Text>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    fontSize={`26px`}
                    fontWeight={`bold`}
                    lineHeight={`1.31`}
                  >
                    {productDetailData && productDetailData[0].discount > 0 && (
                      <>
                        <Text color={Theme.red_C} margin={`0 22px 0 0`}>
                          {productDetailData[0].discount}%
                        </Text>
                        <Text
                          fontSize={`22px`}
                          fontWeight={`500`}
                          margin={`0 12px 0 0`}
                          color={Theme.grey_C}
                          textDecoration={`line-through`}
                          lineHeight={`1.22`}
                        >
                          {String(
                            parseInt(
                              (productDetailData[0].price *
                                productDetailData[0].discount) /
                                100
                            )
                          ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          원
                        </Text>
                      </>
                    )}
                    <Text>
                      {productDetailData &&
                        String(
                          productDetailData[0].price -
                            parseInt(
                              (productDetailData[0].price *
                                productDetailData[0].discount) /
                                100
                            )
                        ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      원
                    </Text>
                  </Wrapper>

                  <Wrapper
                    height={`1px`}
                    border={`1px solid ${Theme.grey2_C}`}
                    margin={`41px 0 35px`}
                  />

                  <Wrapper color={Theme.grey_C} lineHeight={`1.19`}>
                    <Wrapper dr={`row`}>
                      <Text width={width < 700 ? `25%` : `20%`}>
                        국내·해외배송
                      </Text>
                      <Text width={width < 700 ? `75%` : `80%`}>국내배송</Text>
                    </Wrapper>
                    <Wrapper dr={`row`} margin={`30px 0`}>
                      <Text width={width < 700 ? `25%` : `20%`}>배송방법</Text>
                      <Text width={width < 700 ? `75%` : `80%`}>택배</Text>
                    </Wrapper>
                    <Wrapper dr={`row`}>
                      <Text width={width < 700 ? `25%` : `20%`}>배송비</Text>
                      <Text width={width < 700 ? `75%` : `80%`}>
                        {productDetailData &&
                          String(productDetailData[0].deliveryPay).replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}
                        원 (50,000원 이상 구매 시 무료)
                      </Text>
                    </Wrapper>
                  </Wrapper>

                  <Wrapper
                    height={`1px`}
                    border={`1px solid ${Theme.grey2_C}`}
                    margin={`30px 0 32px`}
                  />

                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    margin={`0 0 10px`}
                    lineHeight={`1.17`}
                  >
                    <Image
                      width={`18px`}
                      src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/product/icon_attention.png"
                      alt="attention"
                    />
                    수량을 선택해주세요.
                  </Wrapper>

                  <Wrapper padding={`18px 14px`} al={`flex-start`}>
                    <Text margin={`0 0 15px`} lineHeight={`1.17`}>
                      상품명
                    </Text>
                    <Wrapper dr={`row`} ju={`space-between`}>
                      <Wrapper width={`auto`}>
                        <Wrapper dr={`row`}>
                          <Wrapper
                            width={`90px`}
                            height={`30px`}
                            border={`1px solid ${Theme.grey2_C}`}
                            radius={`5px`}
                            dr={`row`}
                            padding={width < 700 ? `0 5px` : `0 10px`}
                            ju={`space-between`}
                            margin={`0 10px 0 0`}
                          >
                            <MinusOutlined
                              style={{ cursor: `pointer` }}
                              onClick={() =>
                                productCountHandler(productCount - 1)
                              }
                            />
                            <Text fontWeight={`bold`}>{productCount}</Text>
                            <PlusOutlined
                              style={{ cursor: `pointer` }}
                              onClick={() =>
                                productCountHandler(productCount + 1)
                              }
                            />
                          </Wrapper>
                        </Wrapper>
                      </Wrapper>
                      <Wrapper width={`auto`} dr={`row`}>
                        <Text fontSize={`18px`} fontWeight={`bold`}>
                          {productDetailData &&
                            String(
                              (productDetailData[0].price -
                                parseInt(
                                  (productDetailData[0].price *
                                    productDetailData[0].discount) /
                                    100
                                )) *
                                productCount
                            ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Text>
                        <Image
                          margin={`0 0 0 16px`}
                          width={`11px`}
                          src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/product/icon_delet_gray.png"
                          alt="delete_btn"
                        />
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                  <Wrapper
                    dr={`row`}
                    ju={`space-between`}
                    margin={`20px 0 10px`}
                    padding={`6px 0 0`}
                  >
                    <Text
                      fontSize={`14px`}
                      fontWeight={`bold`}
                      lineHeight={`1.17`}
                    >
                      총 상품금액
                      <SpanText fontWeight={`500`} color={Theme.darkGrey_C}>
                        (수량)
                      </SpanText>
                    </Text>

                    <Text fontSize={`18px`} fontWeight={`bold`}>
                      {productDetailData &&
                        String(
                          (productDetailData[0].price -
                            parseInt(
                              (productDetailData[0].price *
                                productDetailData[0].discount) /
                                100
                            ) +
                            productDetailData[0].deliveryPay) *
                            productCount
                        ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      <SpanText
                        fontSize={`14px`}
                        fontWeight={`500`}
                        color={Theme.darkGrey_C}
                        margin={`0 0 0 22px`}
                      >
                        ({productCount}개)
                      </SpanText>
                    </Text>
                  </Wrapper>

                  <Wrapper
                    height={`1px`}
                    border={`1px solid ${Theme.grey2_C}`}
                    margin={`0 0 30px`}
                  />

                  <Wrapper dr={`row`} ju={`space-between`}>
                    <CommonButton
                      width={
                        width < 700 ? `calc(50% - 3px)` : `calc(20% - 6px)`
                      }
                      height={`50px`}
                      radius={`0`}
                      color={Theme.black_C}
                      kindOf={`color`}
                      onClick={basketHandler}
                    >
                      장바구니
                    </CommonButton>
                    <CommonButton
                      width={
                        width < 700 ? `calc(50% - 3px)` : `calc(20% - 6px)`
                      }
                      height={`50px`}
                      radius={`0`}
                      color={Theme.black_C}
                      kindOf={`color`}
                      onClick={() =>
                        interestChangeHandler(productDetailData[0].id)
                      }
                    >
                      <Image
                        width={`22px`}
                        height={`auto !important`}
                        src={
                          productDetailData &&
                          interestList &&
                          interestList.find(
                            (value) =>
                              value.ProductId === productDetailData[0].id
                          )
                            ? "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/product/icon_heart_red.png"
                            : "https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/product/icon_heart.png"
                        }
                      />
                      관심상품
                    </CommonButton>
                    <CommonButton
                      margin={width < 700 && `6px 0 0`}
                      width={width < 700 ? `100%` : `60%`}
                      height={`50px`}
                      radius={`0`}
                    >
                      주문하기
                    </CommonButton>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Wrapper
              dr={`row`}
              margin={`80px 0 0`}
              borderBottom={`1px solid ${Theme.basicTheme_C}`}
            >
              <DetailButton
                isTab={tab === 1}
                onClick={() => tabChangeHandler(1)}
              >
                상품상세정보
              </DetailButton>
              <DetailButton
                isTab={tab === 2}
                onClick={() => tabChangeHandler(2)}
              >
                상품구매안내
              </DetailButton>
              <DetailButton
                isTab={tab === 3}
                onClick={() => tabChangeHandler(3)}
              >
                상품사용후기
              </DetailButton>
              <DetailButton
                isTab={tab === 4}
                onClick={() => tabChangeHandler(4)}
              >
                상품문의
              </DetailButton>
            </Wrapper>

            {tab === 1 && (
              <Wrapper margin={`60px 0 80px`}>
                {youtubeLink ? (
                  <iframe
                    width="100%"
                    height="760px"
                    src={youtubeLink}
                    frameborder="0"
                    allowfullscreen
                  />
                ) : (
                  <Wrapper>
                    <Empty description="상세정보가 없습니다." />
                  </Wrapper>
                )}
              </Wrapper>
            )}
            {tab === 2 && (
              <Wrapper margin={`10px 0 80px`}>
                <Wrapper al={`flex-start`}>
                  <EmphasisText>• 주문안내</EmphasisText>
                  <BelongText>- 구매 안내 상세 내용</BelongText>
                  <BelongText>- 구매 안내 상세 내용</BelongText>
                </Wrapper>
                <Wrapper al={`flex-start`}>
                  <EmphasisText>• 배송정보</EmphasisText>
                  <BelongText>- 구매 안내 상세 내용</BelongText>
                  <BelongText>- 구매 안내 상세 내용</BelongText>
                  <BelongText>- 구매 안내 상세 내용</BelongText>
                  <BelongText>- 구매 안내 상세 내용</BelongText>
                  <BelongText>- 구매 안내 상세 내용</BelongText>
                </Wrapper>
                <Wrapper al={`flex-start`}>
                  <EmphasisText>• 교환 및 반품정보</EmphasisText>
                  <BelongText>- 구매 안내 상세 내용</BelongText>
                </Wrapper>
                <Wrapper al={`flex-start`}>
                  <EmphasisText>• 교환 및 반품이 가능한 경우</EmphasisText>
                  <BelongText>- 구매 안내 상세 내용</BelongText>
                  <BelongText>- 구매 안내 상세 내용</BelongText>
                </Wrapper>
                <Wrapper al={`flex-start`}>
                  <EmphasisText>• 교환 및 반품이 불가능한 경우</EmphasisText>
                  <BelongText>- 구매 안내 상세 내용</BelongText>
                  <BelongText>- 구매 안내 상세 내용</BelongText>
                  <BelongText>- 구매 안내 상세 내용</BelongText>
                  <BelongText>- 구매 안내 상세 내용</BelongText>
                  <BelongText>- 구매 안내 상세 내용</BelongText>
                  <BelongText>- 구매 안내 상세 내용</BelongText>
                  <BelongText>- 구매 안내 상세 내용</BelongText>
                </Wrapper>
              </Wrapper>
            )}
            {tab === 3 && <Review />}
            {tab === 4 && <Inquiry />}
          </RsWrapper>
          <Modal
            centered={true}
            title="알림"
            visible={isModalVisible}
            onOk={() => ModalHandleOk(productDetailData, productCount)}
            onCancel={ModalToggle}
          >
            <Wrapper>
              <Text>장바구니에 동일한 상품이 있습니다.</Text>
              <Text>장바구니에 추가하시겠습니까?</Text>
            </Wrapper>
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
      type: SEO_LIST_REQUEST,
    });

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default DetailProduct;
