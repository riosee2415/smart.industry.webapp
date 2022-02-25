import React, { useState } from "react";
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
  CommonButton,
  Text,
  TextInput,
  SpanText,
  TextArea,
} from "../../../components/commonComponents";
import { useCallback } from "react";
import useWidth from "../../../hooks/useWidth";
import Theme from "../../../components/Theme";
import { useRouter } from "next/dist/client/router";
import { Checkbox, Empty, message } from "antd";
import styled from "styled-components";
import { MinusOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { INTEREST_CREATE_REQUEST } from "../../../reducers/interest";
import { numberWithCommas } from "../../../components/commonUtils";
import useInput from "../../../hooks/useInput";

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

const DarkgreyBtn = styled(CommonButton)`
  width: ${(props) => props.width || `112px`};
  height: 30px;
  margin: 0 0 3px;
  background-color: ${Theme.darkGrey_C};
  border: none;
  border-radius: 0;
  font-size: 14px;

  &:hover {
    background-color: ${Theme.white_C};
    border: 1px solid ${Theme.darkGrey_C};
    color: ${Theme.darkGrey_C};
  }
`;

const GreyBtn = styled(CommonButton)`
  width: 98px;
  height: 30px;
  padding: 0 0 2px;
  background-color: ${Theme.grey_C};
  border: none;
  border-radius: 0;
  font-size: 14px;

  &:hover {
    background-color: ${Theme.white_C};
    border: 1px solid ${Theme.grey_C};
    color: ${Theme.grey_C};
  }

  @media (max-width: 500px) {
    width: 80px;
    height: 25px;
    font-size: 12px;
  }
`;

const Lightgrey1Btn = styled(CommonButton)`
  width: 145px;
  height: 50px;
  padding: 0 0 2px;
  background-color: ${Theme.lightGrey_C};
  border: 1px solid ${Theme.grey2_C};
  border-radius: 0;
  font-size: 18px;
  color: ${Theme.black_C};

  &:hover {
    background-color: ${Theme.darkGrey_C};
    border: 1px solid ${Theme.lightGrey_C};
    color: ${Theme.white_C};
  }

  @media (max-width: 500px) {
    width: 100px;
    height: 35px;
    font-size: 14px;
  }
`;

const Lightgrey2Btn = styled(CommonButton)`
  width: ${(props) => props.width || `112px`};
  height: 30px;
  padding: 0 0 2px;
  margin: ${(props) => props.margin || `0 0 3px`};
  background-color: ${Theme.lightGrey2_C};
  border: 1px solid ${Theme.grey2_C};
  border-radius: 0;
  font-size: 14px;
  color: ${Theme.black_C};

  &:hover {
    background-color: ${Theme.darkGrey_C};
    border: 1px solid ${Theme.lightGrey2_C};
    color: ${Theme.white_C};
  }
`;

const Cart = () => {
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );

  const width = useWidth();
  const router = useRouter();

  ////// HOOKS //////
  const [datum, setDatum] = useState([]);
  const [isCheck, setIsCheck] = useState([]);
  const [isOrderForm, setIsOrderForm] = useState(false);
  const [orderDatum, setOrderDatum] = useState(null);
  const [showDatum, setShowDatum] = useState(null);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [localDataum, setLocalDataum] = useState([]);
  const [allPrice, setAllPrice] = useState(0);

  // 문의
  const inputName = useInput(``);
  const inputMobile = useInput(``);
  const inputContent = useInput(``);
  ////// REDUX //////

  const { st_interestCreateDone, st_interestCreateError } = useSelector(
    (state) => state.interest
  );
  const { me } = useSelector((state) => state.user);

  ////// USEEFFECT //////

  useEffect(() => {
    if (me) {
      inputName.setValue(me.username);
      inputMobile.setValue(me.mobile);
    }
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("WKDQKRNSL")
      ? JSON.parse(localStorage.getItem("WKDQKRNSL"))
      : [];

    let toggleArr = [];

    for (let i = 0; i < data.length; i++) {
      toggleArr.push(false);
    }

    setIsCheck(toggleArr);

    setDatum(data);
    setLocalDataum(data);
    // console.log(toggleArr, "<<<");
    // console.log(isCheck, "<<<");
  }, [router.query]);

  useEffect(() => {
    let toggleArr = [];
    if (isOrderForm) {
      for (let i = 0; i < orderDatum.length; i++) {
        toggleArr.push(false);
      }
    } else {
      for (let j = 0; j < datum.length; j++) {
        toggleArr.push(false);
      }
    }

    setIsCheck(toggleArr);

    // console.log(toggleArr, "<<<");
    // console.log(isCheck, "<<<");
  }, [isOrderForm, datum]);

  // useEffect(() => {
  //   // if (width < 900) {
  //   //   const tempArr = [];
  //   //   for (let i = 0; i < isCheck.length; i++) {
  //   //     tempArr.push(false);
  //   //   }
  //   //   setIsCheck(tempArr);
  //   //   setIsCheckAll(false);
  //   // }
  //   // checkBoxAllHandler();
  //   if (width < 900) checkBoxInit();
  // }, [width]);

  useEffect(() => {
    if (st_interestCreateDone) {
      return message.success("관심상품으로 등록되었습니다.");
    }
  }, [st_interestCreateDone]);

  useEffect(() => {
    if (st_interestCreateError) {
      return message.error(st_interestCreateError);
    }
  }, [st_interestCreateError]);

  useEffect(() => {
    let tempData = 0;
    for (let i = 0; i < datum.length; i++) {
      tempData += datum[i].price * datum[i].productNum + datum[i].deliveryPay;
    }
    console.log(tempData);
    setAllPrice(tempData);
  }, [datum]);

  useEffect(() => {
    if (isOrderForm) {
      orderDatum && setShowDatum(orderDatum);
    } else {
      datum && setShowDatum(datum);
    }
  }, [datum, orderDatum, isOrderForm]);

  ////// TOGGLE //////

  ////// HANDLER //////

  const interestHandler = useCallback((ProductId) => {
    dispatch({
      type: INTEREST_CREATE_REQUEST,
      data: {
        ProductId,
      },
    });
  }, []);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const countHandler = useCallback((count) => {
    if (count >= 1) {
      // dispatch({
      //   type: WISH_UPDATE_REQUEST,
      //   data: {
      //     id,
      //     count,
      //   },
      // });
    } else {
      message.error({
        content: "현재 최소 수량입니다.",
        className: "custom-class",
        style: {
          marginTop: "100px",
        },
      });
    }
  }, []);

  const PrdouctNumHandler = useCallback(
    (PrdocutNum, idx2, prevData) => {
      let result = datum.map((data, idx) => {
        if (idx === idx2) {
          if (Number(data.productNum) + Number(PrdocutNum) === 0) {
            return {
              ...data,
              productNum: 1,
            };
          } else {
            return {
              ...data,
              productNum: Number(data.productNum) + Number(PrdocutNum),
              total: Number(data.price) * Number(PrdocutNum + data.productNum),
            };
          }
        } else {
          return {
            ...data,
          };
        }
      });
      setDatum(result);
      localStorage.setItem("WKDQKRNSL", JSON.stringify(result));
    },
    [datum]
  );

  const checkEachHandler = useCallback(
    (e, data, idx2) => {
      let result = isCheck.map((data1, idx) => {
        return idx2 === idx ? !data1 : data1;
      });

      setIsCheck(result);
      console.log(result);
    },
    [isCheck]
  );

  const checkBoxAllHandler = useCallback(
    (e) => {
      let result = isCheck.map(() => {
        return e.target.checked ? true : false;
      });

      setIsCheck(result);
      setIsCheckAll(e.target.checked);
    },

    [isCheck, isCheckAll]
  );

  const checkBoxInit = useCallback(() => {
    let result = isCheck.map(() => {
      return false;
    });

    setIsCheck(result);
    setIsCheckAll(false);
  }, [isCheck, isCheckAll, width]);

  const deleteHandler = useCallback(
    (localStorgeDatum) => {
      let result = localStorgeDatum.filter((data, idx) => {
        return !isCheck[idx];
      });
      console.log(isCheck);
      localStorage.setItem("WKDQKRNSL", JSON.stringify(result));

      setDatum(result);
    },
    [isCheck, datum]
  );

  const deleteOneHandler = useCallback(
    (localStorgeDatum, index) => {
      let result = localStorgeDatum.filter((data, idx) => {
        return idx !== index;
      });

      localStorage.setItem("WKDQKRNSL", JSON.stringify(result));

      setDatum(result);
    },
    [datum]
  );

  const deleteAllHandler = useCallback((localStorgeDatum) => {
    localStorage.setItem("WKDQKRNSL", JSON.stringify([]));

    setDatum([]);
  }, []);

  const orderAllHandler = useCallback(() => {
    let checkHandle = isCheck.map(() => {
      return false;
    });
    setIsCheck(checkHandle);
    setIsCheckAll(false);

    setIsOrderForm(true);
    setOrderDatum(datum);
  }, [datum, isCheck]);

  const orderOneHandler = useCallback(
    (orderData) => {
      let checkHandle = isCheck.map(() => {
        return false;
      });
      setIsCheck(checkHandle);
      setIsCheckAll(false);
      console.log("<<<");
      setIsOrderForm(true);
      setOrderDatum(orderData);
    },
    [isCheck]
  );

  const orderHandler = useCallback(() => {
    let checkHandle = isCheck.map(() => {
      return false;
    });
    setIsCheck(checkHandle);
    setIsCheckAll(false);

    let result = datum.filter((data, idx) => {
      return isCheck[idx];
    });
    console.log(result);
    setOrderDatum(result);
    setIsOrderForm(true);
  }, [datum, isCheck]);

  const goBackHandler = useCallback(() => {
    setOrderDatum(null);
    setIsOrderForm(false);
  }, []);

  const deleteOrderHandler = useCallback(() => {
    let result = orderDatum.filter((data, idx) => {
      return !isCheck[idx];
    });
    console.log(isCheck);

    setOrderDatum(result);
  }, [isCheck, orderDatum]);

  ////// DATAVIEW //////
  const testData = [
    {
      id: 1,
      productImg: "",
      title: "상품명상품명상품명상품명상품명상품명상품명상품명",
      price: "1,000,000",
      total: "1,000,000",
      count: 1,
    },
    {
      id: 2,
      productImg: "",
      title: "상품명",
      price: "1,000,000",
      total: "1,000,000",
      count: 1,
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
                onClick={() => moveLinkHandler(`/mypage`)}
                cursor={`pointer`}
              >
                마이페이지
              </Wrapper>
              |
              <Wrapper
                width={`auto`}
                margin={`0 8px`}
                onClick={() => moveLinkHandler(`/mypage/cart`)}
                cursor={`pointer`}
              >
                장바구니
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
              장바구니
            </Wrapper>
            <Wrapper width={width < 500 ? `300px` : `479px`}>
              <Image
                width={`100%`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/order/first_step_title.png`}
              />
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`40px 0 20px`}>
              <CommonButton
                width={width < 500 ? `150px` : `209px`}
                height={width < 500 ? `35px` : `53px`}
                radius={`0`}
              >
                배송상품 (2)
              </CommonButton>
            </Wrapper>
            <Wrapper
              borderBottom={`1px solid ${Theme.grey2_C}`}
              borderTop={`1px solid ${Theme.grey2_C}`}
              padding={`15px 0 15px 10px`}
              al={`flex-start`}
              bgColor={Theme.lightGrey2_C}
            >
              일반상품 (2)
            </Wrapper>

            {width < 900 ? (
              <Wrapper width={width < 500 ? `100%` : `60%`}>
                <Wrapper dr={`row`}>
                  {showDatum && showDatum.length === 0 ? (
                    <Empty />
                  ) : (
                    showDatum &&
                    showDatum.map((data, idx) => {
                      return (
                        <Wrapper
                          dr={`row`}
                          border={`1px solid ${Theme.grey2_C}`}
                          margin={`10px 0`}
                        >
                          <Wrapper
                            dr={`row`}
                            ju={`space-between`}
                            padding={`0 50px 0 20px`}
                          >
                            <Wrapper width={`auto`}>
                              <CommonCheckBox
                                checked={isCheck[idx]}
                                onChange={(e) => checkEachHandler(e, data, idx)}
                              />
                            </Wrapper>
                            <Wrapper
                              width={`auto`}
                              dr={`row`}
                              cursor={`pointer`}
                              onClick={() => deleteOneHandler(datum, idx)}
                            >
                              <CloseOutlined />
                              삭제
                            </Wrapper>
                          </Wrapper>
                          <Wrapper width={`40%`}>
                            <Image
                              width={`100px`}
                              height={`100px`}
                              src={data.thumbnail}
                            />
                          </Wrapper>
                          <Wrapper
                            width={`60%`}
                            display={`block`}
                            al={`flex-start`}
                          >
                            <Text isEllipsis={true}>{data.title}</Text>
                            <Text>{data.price}원</Text>
                            <Wrapper
                              width={`62px`}
                              height={`25px`}
                              border={`1px solid ${Theme.grey2_C}`}
                              radius={`5px`}
                              dr={`row`}
                              padding={`0 10px`}
                              ju={`space-between`}
                              margin={`0 10px 0 0`}
                            >
                              {!isOrderForm && (
                                <MinusOutlined
                                  style={{
                                    color: Theme.darkGrey_C,
                                    fontSize: `10px`,
                                  }}
                                  onClick={() =>
                                    PrdouctNumHandler(-1, idx, localDataum)
                                  }
                                />
                              )}
                              <Text color={Theme.darkGrey_C} fontSize={`12px`}>
                                {data.productNum}
                              </Text>
                              {!isOrderForm && (
                                <PlusOutlined
                                  style={{
                                    color: Theme.darkGrey_C,
                                    fontSize: `10px`,
                                  }}
                                  onClick={() =>
                                    PrdouctNumHandler(1, idx, localDataum)
                                  }
                                />
                              )}
                            </Wrapper>
                            <Text width={`auto`}>
                              {data.price * data.productNum + data.deliveryPay}
                              원
                            </Text>
                            <Text width={`auto`}>기본배송</Text>
                            <DarkgreyBtn
                              width={`100px`}
                              onClick={() => orderOneHandler(data)}
                            >
                              문의하기
                            </DarkgreyBtn>
                            <Lightgrey2Btn
                              width={`100px`}
                              onClick={() => interestHandler(data.id)}
                            >
                              관심상품등록
                            </Lightgrey2Btn>
                          </Wrapper>
                        </Wrapper>
                      );
                    })
                  )}
                </Wrapper>
              </Wrapper>
            ) : (
              <>
                <Wrapper
                  dr={`row`}
                  bgColor={Theme.lightGrey2_C}
                  borderBottom={`1px solid ${Theme.grey2_C}`}
                  height={`62px`}
                >
                  <Wrapper
                    width={
                      isOrderForm
                        ? `calc((100% - 115px ) * 0.03)`
                        : `calc((100% - 115px - 138px) * 0.03)`
                    }
                    borderRight={`1px solid ${Theme.grey2_C}`}
                    height={`100%`}
                  >
                    <CommonCheckBox
                      checked={isCheckAll}
                      onChange={(e) => checkBoxAllHandler(e)}
                    />
                  </Wrapper>
                  <Wrapper
                    width={`115px`}
                    borderRight={`1px solid ${Theme.grey2_C}`}
                    height={`100%`}
                  >
                    이미지
                  </Wrapper>
                  <Wrapper
                    width={
                      isOrderForm
                        ? `calc((100% - 115px ) * 0.27)`
                        : `calc((100% - 115px - 138px) * 0.27)`
                    }
                    borderRight={`1px solid ${Theme.grey2_C}`}
                    height={`100%`}
                  >
                    상품정보
                  </Wrapper>
                  <Wrapper
                    width={
                      isOrderForm
                        ? `calc((100% - 115px ) * 0.13)`
                        : `calc((100% - 115px - 138px) * 0.13)`
                    }
                    borderRight={`1px solid ${Theme.grey2_C}`}
                    height={`100%`}
                  >
                    판매가
                  </Wrapper>
                  <Wrapper
                    width={
                      isOrderForm
                        ? `calc((100% - 115px ) * 0.1)`
                        : `calc((100% - 115px - 138px) * 0.1)`
                    }
                    borderRight={`1px solid ${Theme.grey2_C}`}
                    height={`100%`}
                  >
                    수량
                  </Wrapper>
                  <Wrapper
                    width={
                      isOrderForm
                        ? `calc((100% - 115px ) * 0.12)`
                        : `calc((100% - 115px - 138px) * 0.12)`
                    }
                    borderRight={`1px solid ${Theme.grey2_C}`}
                    height={`100%`}
                  >
                    적립금
                  </Wrapper>
                  <Wrapper
                    width={
                      isOrderForm
                        ? `calc((100% - 115px ) * 0.12)`
                        : `calc((100% - 115px - 138px) * 0.12)`
                    }
                    borderRight={`1px solid ${Theme.grey2_C}`}
                    height={`100%`}
                  >
                    배송구분
                  </Wrapper>
                  <Wrapper
                    width={
                      isOrderForm
                        ? `calc((100% - 115px ) * 0.1)`
                        : `calc((100% - 115px - 138px) * 0.1)`
                    }
                    borderRight={`1px solid ${Theme.grey2_C}`}
                    height={`100%`}
                  >
                    배송비
                  </Wrapper>
                  <Wrapper
                    width={
                      isOrderForm
                        ? `calc((100% - 115px ) * 0.13)`
                        : `calc((100% - 115px - 138px) * 0.13)`
                    }
                    borderRight={`1px solid ${Theme.grey2_C}`}
                    height={`100%`}
                  >
                    합계
                  </Wrapper>
                  <Wrapper
                    display={isOrderForm ? `none` : `flex`}
                    width={`138px`}
                  >
                    선택
                  </Wrapper>
                </Wrapper>
                {showDatum && showDatum.length === 0 ? (
                  <Empty description="조회된 상품이 없습니다." />
                ) : (
                  showDatum &&
                  showDatum.map((data, idx) => {
                    return (
                      <Wrapper
                        dr={`row`}
                        height={`145px`}
                        borderBottom={`1px solid ${Theme.grey2_C}`}
                      >
                        <Wrapper
                          width={
                            isOrderForm
                              ? `calc((100% - 115px) * 0.03)`
                              : `calc((100% - 115px - 138px) * 0.03)`
                          }
                          borderRight={`1px solid ${Theme.grey2_C}`}
                          height={`100%`}
                        >
                          <CommonCheckBox
                            checked={isCheck[idx]}
                            onChange={(e) => checkEachHandler(e, data, idx)}
                          />
                        </Wrapper>
                        <Wrapper
                          width={`115px`}
                          borderRight={`1px solid ${Theme.grey2_C}`}
                          height={`100%`}
                        >
                          <Image
                            width={`100px`}
                            height={`100px`}
                            src={data.thumbnail}
                          />
                        </Wrapper>
                        <Wrapper
                          width={
                            isOrderForm
                              ? `calc((100% - 115px) * 0.27)`
                              : `calc((100% - 115px - 138px) * 0.27)`
                          }
                          borderRight={`1px solid ${Theme.grey2_C}`}
                          height={`100%`}
                          al={`flex-start`}
                          padding={`0 20px`}
                        >
                          {data.title}
                          {/* {console.log(data)} */}
                        </Wrapper>
                        <Wrapper
                          width={
                            isOrderForm
                              ? `calc((100% - 115px) * 0.13)`
                              : `calc((100% - 115px - 138px) * 0.13)`
                          }
                          borderRight={`1px solid ${Theme.grey2_C}`}
                          height={`100%`}
                        >
                          {data.price}원
                        </Wrapper>
                        <Wrapper
                          width={
                            isOrderForm
                              ? `calc((100% - 115px) * 0.1)`
                              : `calc((100% - 115px - 138px) * 0.1)`
                          }
                          borderRight={`1px solid ${Theme.grey2_C}`}
                          height={`100%`}
                        >
                          <Wrapper
                            width={`62px`}
                            height={`25px`}
                            border={
                              isOrderForm
                                ? `none`
                                : `1px solid ${Theme.grey2_C}`
                            }
                            radius={`5px`}
                            dr={`row`}
                            padding={`0 10px`}
                            ju={isOrderForm ? `center` : `space-between`}
                            margin={isOrderForm ? `0` : `0 10px 0 0`}
                          >
                            {!isOrderForm && (
                              <MinusOutlined
                                style={{
                                  color: Theme.darkGrey_C,
                                  fontSize: `10px`,
                                }}
                                onClick={() =>
                                  PrdouctNumHandler(-1, idx, localDataum)
                                }
                              />
                            )}
                            <Text color={Theme.darkGrey_C} fontSize={`12px`}>
                              {data.productNum}
                            </Text>
                            {!isOrderForm && (
                              <PlusOutlined
                                style={{
                                  color: Theme.darkGrey_C,
                                  fontSize: `10px`,
                                }}
                                onClick={() =>
                                  PrdouctNumHandler(1, idx, localDataum)
                                }
                              />
                            )}
                          </Wrapper>
                        </Wrapper>
                        <Wrapper
                          width={
                            isOrderForm
                              ? `calc((100% - 115px) * 0.12)`
                              : `calc((100% - 115px - 138px) * 0.12)`
                          }
                          borderRight={`1px solid ${Theme.grey2_C}`}
                          height={`100%`}
                        >
                          -
                        </Wrapper>
                        <Wrapper
                          width={
                            isOrderForm
                              ? `calc((100% - 115px) * 0.12)`
                              : `calc((100% - 115px - 138px) * 0.12)`
                          }
                          borderRight={`1px solid ${Theme.grey2_C}`}
                          height={`100%`}
                        >
                          기본배송
                        </Wrapper>
                        <Wrapper
                          width={
                            isOrderForm
                              ? `calc((100% - 115px) * 0.1)`
                              : `calc((100% - 115px - 138px) * 0.1)`
                          }
                          borderRight={`1px solid ${Theme.grey2_C}`}
                          height={`100%`}
                        >
                          {data.deliveryPay}원
                        </Wrapper>
                        <Wrapper
                          width={
                            isOrderForm
                              ? `calc((100% - 115px) * 0.13)`
                              : `calc((100% - 115px - 138px) * 0.13)`
                          }
                          borderRight={`1px solid ${Theme.grey2_C}`}
                          height={`100%`}
                        >
                          {data.price * data.productNum + data.deliveryPay}원
                          {/* 보류 */}
                        </Wrapper>
                        <Wrapper
                          width={`138px`}
                          display={isOrderForm ? `none` : `flex`}
                        >
                          <DarkgreyBtn onClick={() => orderOneHandler(data)}>
                            문의하기
                          </DarkgreyBtn>
                          <Lightgrey2Btn
                            onClick={() => interestHandler(data.id)}
                          >
                            관심상품등록
                          </Lightgrey2Btn>
                          <Lightgrey2Btn
                            margin={`0`}
                            onClick={() => deleteOneHandler(datum, idx)}
                          >
                            <CloseOutlined />
                            삭제
                          </Lightgrey2Btn>
                        </Wrapper>
                      </Wrapper>
                    );
                  })
                )}
              </>
            )}
            <Wrapper
              height={width < 500 ? `auto` : `75px`}
              bgColor={Theme.lightGrey2_C}
              borderBottom={`1px solid ${Theme.grey2_C}`}
              dr={width < 500 ? `column` : `row`}
              ju={width < 500 ? `center` : `space-between`}
            >
              <Wrapper
                width={width < 500 ? `100%` : `10%`}
                al={width < 500 ? `flex-start` : `center`}
              >
                기본배송
              </Wrapper>
              <Wrapper
                width={width < 500 ? `100%` : `90%`}
                dr={`row`}
                ju={`flex-end`}
              >
                상품구매금액 {numberWithCommas(allPrice)} +
                {/* 부가세 200,000 배송비 */}0 (무료) = 합계:
                <Wrapper
                  width={`auto`}
                  color={Theme.red_C}
                  fontSize={width < 500 ? `18px` : `22px`}
                  fontWeight={`bold`}
                  margin={`0 13px 0 22px`}
                >
                  {numberWithCommas(allPrice)}원
                </Wrapper>
              </Wrapper>
            </Wrapper>
            <Wrapper
              height={`48px`}
              borderBottom={`1px solid ${Theme.grey2_C}`}
              ju={`flex-start`}
              dr={`row`}
              margin={`0 0 18px`}
            >
              <Wrapper
                width={`16px`}
                height={`17px`}
                bgColor={Theme.lightGrey_C}
                color={Theme.red_C}
                margin={`0 12px 0 10px`}
              >
                !
              </Wrapper>
              <Wrapper
                width={`calc(100% - 38px)`}
                color={Theme.grey_C}
                al={`flex-start`}
                fontSize={width < 500 ? `11px` : `14px`}
              >
                {isOrderForm
                  ? `상품의 옵션 및 수량은 상품상세 또는 장바구니에서 가능합니다.`
                  : `할인 적용 금액은 주문서작성의 결제예정금액에서 확인 가능합니다.`}
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 80px`}>
              <Wrapper width={`50%`} dr={`row`} ju={`flex-start`}>
                <Wrapper
                  width={`auto`}
                  margin={width < 500 ? `0` : `0 24px 0 10px`}
                >
                  선택상품을
                </Wrapper>
                <GreyBtn
                  onClick={() =>
                    isOrderForm
                      ? deleteOrderHandler(orderDatum)
                      : deleteHandler(datum)
                  }
                >
                  <CloseOutlined />
                  삭제하기
                </GreyBtn>
              </Wrapper>
              {isOrderForm ? (
                <Lightgrey2Btn
                  width={`122px`}
                  margin={`0`}
                  onClick={goBackHandler}
                >
                  이전페이지
                </Lightgrey2Btn>
              ) : (
                <Lightgrey2Btn
                  width={`122px`}
                  margin={`0`}
                  onClick={() => deleteAllHandler(datum)}
                >
                  장바구니 비우기
                </Lightgrey2Btn>
              )}
            </Wrapper>
            {isOrderForm && (
              <Wrapper>
                <Wrapper al={`flex-start`} margin={`0 0 35px`}>
                  <Text margin={`0 0 20px`}>
                    이름<SpanText color={Theme.red_C}>*</SpanText>
                  </Text>
                  <TextInput
                    border={`1px solid ${Theme.grey2_C}`}
                    width={`100%`}
                    placeholder={`이름을 입력해주세요.`}
                    {...inputName}
                    readOnly={me ? true : false}
                  />
                </Wrapper>
                <Wrapper al={`flex-start`} margin={`0 0 35px`}>
                  <Text margin={`0 0 20px`}>
                    연락처<SpanText color={Theme.red_C}>*</SpanText>
                  </Text>
                  <TextInput
                    border={`1px solid ${Theme.grey2_C}`}
                    width={`100%`}
                    placeholder={`연락처를 입력해주세요.`}
                    {...inputMobile}
                    readOnly={me ? true : false}
                  />
                </Wrapper>
                <Wrapper al={`flex-start`} margin={`0 0 35px`}>
                  <Text margin={`0 0 20px`}>
                    내용<SpanText color={Theme.red_C}>*</SpanText>
                  </Text>
                  <TextArea
                    border={`1px solid ${Theme.grey2_C}`}
                    width={`100%`}
                    height={`415px`}
                    radius={`0`}
                    placeholder={`문의 내용을 입력해주세요.`}
                    {...inputContent}
                  />
                </Wrapper>
              </Wrapper>
            )}
            <Wrapper dr={`row`} position={`relative`} margin={`0 0 120px`}>
              <Wrapper width={`auto`} dr={`row`}>
                <Lightgrey1Btn margin={`0 6px 0 0`} onClick={orderHandler}>
                  선택상품주문
                </Lightgrey1Btn>
                <CommonButton
                  width={width < 500 ? `100px` : `145px`}
                  height={width < 500 ? `35px` : `50px`}
                  fontSize={width < 500 ? `14px` : `18px`}
                  onClick={orderAllHandler}
                >
                  전체상품주문
                </CommonButton>
              </Wrapper>
              <Wrapper
                width={`auto`}
                position={width < 500 ? `` : `absolute`}
                right={`0`}
                margin={width < 500 ? `0 0 0 6px` : `0`}
              >
                <Lightgrey1Btn>쇼핑계속하기</Lightgrey1Btn>
              </Wrapper>
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

export default Cart;
