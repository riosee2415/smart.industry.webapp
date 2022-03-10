import React, { useState } from "react";
import ClientLayout from "../../../components/ClientLayout";
import { SEO_LIST_REQUEST } from "../../../reducers/seo";
import Head from "next/head";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
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
import { Checkbox, Empty, message, notification } from "antd";
import styled from "styled-components";
import { MinusOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { INTEREST_CREATE_REQUEST } from "../../../reducers/interest";
import { numberWithCommas } from "../../../components/commonUtils";
import useInput from "../../../hooks/useInput";
import {
  WISH_CREATE_REQUEST,
  WISH_LIST_REQUEST,
  WISH_WISH_CREATE_REQUEST,
} from "../../../reducers/wish";

const LoadNotification = (msg, content) => {
  notification.open({
    top: 50,
    placement: `topRight`,
    message: msg,
    description: content,
    onClick: () => {},
  });
};

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
  const [orderDatum, setOrderDatum] = useState([]);
  const [showDatum, setShowDatum] = useState([]);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [localDataum, setLocalDataum] = useState([]);
  const [allPrice, setAllPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [originPrice, setOriginPrice] = useState(0);
  const [delPrice, setDelPrice] = useState(0);
  const [len, setLen] = useState(0);

  const [deleteIndex, setDeleteIndex] = useState(0);

  // 문의
  const inputName = useInput(``);
  const inputMobile = useInput(``);
  const inputContent = useInput(``);
  ////// REDUX //////
  const dispatch = useDispatch();

  const { st_interestCreateDone, st_interestCreateError } = useSelector(
    (state) => state.interest
  );
  const { me } = useSelector((state) => state.user);

  const { historyId, st_boughtHistoryCreateDone, boughtHistorys } = useSelector(
    (state) => state.wish
  );

  ////// USEEFFECT //////

<<<<<<< HEAD
  // useEffect(() => {
  //   if (!me) {
  //     message.error("로그인 후 이용해주세요.");
  //     router.push(`/`);
  //   }
  // }, [me]);

=======
>>>>>>> refs/remotes/origin/master
  useEffect(() => {
    dispatch({
      type: WISH_LIST_REQUEST,
    });
  }, [router.query]);

  useEffect(() => {
    let len = 0;
    boughtHistorys &&
      boughtHistorys.map((data) => {
        len += data.WishItems.length;
      });
    setLen(len);
  }, [boughtHistorys]);

  useEffect(() => {
    if (router.query.from && router.query.from === "prod") {
      setIsOrderForm(true);

      const data = JSON.parse(localStorage.getItem("WNANSGKRL"));

      setOrderDatum(data);

      return;
    }
    if (router.query.isOrder) {
      return setIsOrderForm(true);
    } else {
      return setIsOrderForm(false);
    }
  }, [router.query]);

  useEffect(() => {
    if (me) {
      inputName.setValue(me.username);
      inputMobile.setValue(me.mobile);
<<<<<<< HEAD
=======
    } else {
      message.error(`로그인 후 이용 가능합니다.`);
      router.push(`/`);
>>>>>>> refs/remotes/origin/master
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

    let tempData2 = 0;
    let tempData3 = 0;
    let tempData4 = 0;
    for (let i = 0; i < showDatum.length; i++) {
      tempData +=
        showDatum[i].price * showDatum[i].productNum -
        (showDatum[i].price * showDatum[i].productNum * showDatum[i].discount) /
          100;
      tempData2 += showDatum[i].deliveryPay;
      tempData3 +=
        showDatum[i].price *
        showDatum[i].productNum *
        (showDatum[i].discount / 100);

      tempData4 += showDatum[i].price * showDatum[i].productNum;
    }

    setAllPrice(tempData);
    setDelPrice(tempData2);
    setDiscountPrice(tempData3);
    setOriginPrice(tempData4);
  }, [showDatum]);
  useEffect(() => {
    if (isOrderForm) {
      orderDatum && setShowDatum(orderDatum);
    } else {
      datum && setShowDatum(datum);
    }
  }, [datum, orderDatum, isOrderForm]);

  //order

  useEffect(() => {
    if (
      st_boughtHistoryCreateDone
      // || st_boughtHistoryNotUserCreateDone
    ) {
      const prodId = [];
      const count = [];
      orderDatum.map((data) => {
        prodId.push(data.id);
        count.push(data.productNum);
      });

      dispatch({
        type: WISH_WISH_CREATE_REQUEST,
        data: {
          BoughtHistoryId: historyId,
          prodId,
          count,
        },
      });

      inputContent.setValue(``);

      let tempArr = datum.map(JSON.stringify);
      let tempArr2 = orderDatum.map(JSON.stringify);

      const difference = tempArr.filter((x) => !tempArr2.includes(x));
      const result = difference.map(JSON.parse);

      localStorage.setItem("WKDQKRNSL", JSON.stringify(result));
      moveLinkHandler(`/mypage/cart`);
    }
  }, [
    st_boughtHistoryCreateDone,
    // st_boughtHistoryNotUserCreateDone,
    historyId,
    orderDatum,
    datum,
  ]);

  useEffect(() => {
    if (st_boughtHistoryCreateDone) {
      return message.success("주문이 완료되었습니다.");
    }
  }, [st_boughtHistoryCreateDone]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      setDatum(result);
      localStorage.setItem("WKDQKRNSL", JSON.stringify(result));
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

  // order

  const orderAllHandler = useCallback(() => {
    let checkHandle = isCheck.map(() => {
      return false;
    });
    setIsCheck(checkHandle);
    setIsCheckAll(false);

    moveLinkHandler(`/mypage/cart?isOrder=true`);
    setOrderDatum(datum);
  }, [datum, isCheck]);

  const orderOneHandler = useCallback(
    (orderData, idx) => {
      let checkHandle = isCheck.map(() => {
        return false;
      });
      setIsCheck(checkHandle);
      setIsCheckAll(false);
      let tempArr = [];
      tempArr.push(orderData);
      moveLinkHandler(`/mypage/cart?isOrder=true`);
      setOrderDatum(tempArr);

      let indexArr = [];
      indexArr.push(deleteIndex);
      setDeleteIndex(indexArr);
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

    setOrderDatum(result);
    moveLinkHandler(`/mypage/cart?isOrder=true`);
  }, [datum, isCheck]);

  const goBackHandler = useCallback(() => {
    moveLinkHandler(`/mypage/cart`);
  }, []);

  const deleteOrderHandler = useCallback(() => {
    let result = orderDatum.filter((data, idx) => {
      return !isCheck[idx];
    });

    setOrderDatum(result);
  }, [isCheck, orderDatum]);

  // orderMode

  const paymentOrderHandler = useCallback(() => {
    if (!inputName.value || inputName.value.trim() === "") {
      return LoadNotification("이름을 입력해주세요.");
    }
    if (!inputMobile.value || inputMobile.value.trim() === "") {
      return LoadNotification("연락처를 입력해주세요.");
    }
    if (!inputContent.value || inputContent.value.trim() === "") {
      return LoadNotification("문의내용을 입력해주세요.");
    }
    if (!orderDatum || orderDatum.length === 0) {
      return LoadNotification(
        "주문할 상품이 없습니다.",
        "상품 선택 후 주문해주세요."
      );
    }

    const d = new Date();

    let year = d.getFullYear() + "";
    let month = d.getMonth() + 1 + "";
    let date = d.getDate() + "";
    let hour = d.getHours() + "";
    let min = d.getMinutes() + "";
    let sec = d.getSeconds() + "";
    let mSec = d.getMilliseconds() + "";

    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    mSec = mSec < 10 ? "0" + mSec : mSec;

    let orderPK = "ORD" + year + month + date + hour + min + sec + mSec;

    dispatch({
      type: WISH_CREATE_REQUEST,
      data: {
        orderNum: orderPK,
        price: originPrice,
        discount: discountPrice,
        deliveryPrice: delPrice,
        name: inputName.value,
        content: inputContent.value,
        mobile: inputMobile.value,
      },
    });
  }, [
    allPrice,
    delPrice,
    originPrice,
    discountPrice,
    inputName,
    inputContent,
    orderDatum,
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
            seo_desc.length < 1
              ? "대한민국 No.1 친환경 건설장비 전문기업 건설기계 제조/판매/임대/수리"
              : seo_desc[0].content
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
            seo_desc.length < 1
              ? "대한민국 No.1 친환경 건설장비 전문기업 건설기계 제조/판매/임대/수리"
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
                src={
                  !isOrderForm
                    ? `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/order/first_step_title.png`
                    : `https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/order/second_step_title.png`
                }
              />
            </Wrapper>
            <Wrapper al={`flex-start`} margin={`40px 0 20px`}>
              <CommonButton
                width={width < 500 ? `150px` : `209px`}
                height={width < 500 ? `35px` : `53px`}
                radius={`0`}
                onClick={() => moveLinkHandler(`/mypage/order`)}
              >
                배송상품 ({len})
              </CommonButton>
            </Wrapper>
            <Wrapper
              borderBottom={`1px solid ${Theme.grey2_C}`}
              borderTop={`1px solid ${Theme.grey2_C}`}
              padding={`15px 0 15px 10px`}
              al={`flex-start`}
              bgColor={Theme.lightGrey2_C}
            >
              일반상품 ({showDatum && showDatum.length})
            </Wrapper>

            {width < 900 ? (
              <Wrapper width={width < 700 ? `100%` : `60%`}>
                <Wrapper dr={`row`}>
                  {showDatum && showDatum.length === 0 ? (
                    <Empty
                      description="조회된 상품이 없습니다."
                      style={{ margin: "20px 0" }}
                    />
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
                              {data.price * data.productNum +
                                data.deliveryPay * data.productNum}
                              원
                            </Text>
                            <Text width={`auto`}>기본배송</Text>
                            <DarkgreyBtn
                              width={`100px`}
                              onClick={() => orderOneHandler(data, idx)}
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
                  <Empty
                    description="조회된 상품이 없습니다."
                    style={{ margin: "20px 0" }}
                  />
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
                          {data.price * data.productNum -
                            (data.price * data.productNum * data.discount) /
                              100 +
                            data.deliveryPay}
                          원{/* 보류 */}
                        </Wrapper>
                        <Wrapper
                          width={`138px`}
                          display={isOrderForm ? `none` : `flex`}
                        >
                          <DarkgreyBtn
                            onClick={() => orderOneHandler(data, idx)}
                          >
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
                {/* 부가세 200,000 */}배송비 {delPrice} (무료) = 합계:
                <Wrapper
                  width={`auto`}
                  color={Theme.red_C}
                  fontSize={width < 500 ? `18px` : `22px`}
                  fontWeight={`bold`}
                  margin={`0 13px 0 22px`}
                >
                  {numberWithCommas(allPrice + delPrice)}원
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
              {isOrderForm ? (
                <CommonButton
                  width={width < 500 ? `100px` : `145px`}
                  height={width < 500 ? `35px` : `50px`}
                  fontSize={width < 500 ? `14px` : `18px`}
                  onClick={paymentOrderHandler}
                >
                  상품 주문하기
                </CommonButton>
              ) : (
                <Wrapper width={`auto`} dr={`row`}>
                  <Lightgrey1Btn margin={`0 6px 0 0`} onClick={orderHandler}>
                    선택상품주문
                  </Lightgrey1Btn>
                  <CommonButton
                    padding={`0`}
                    width={width < 500 ? `100px` : `145px`}
                    height={width < 500 ? `35px` : `50px`}
                    fontSize={width < 500 ? `14px` : `18px`}
                    onClick={orderAllHandler}
                  >
                    전체상품주문
                  </CommonButton>
                </Wrapper>
              )}
              {!isOrderForm && (
                <Wrapper
                  width={`auto`}
                  position={width < 500 ? `` : `absolute`}
                  right={`0`}
                  margin={width < 500 ? `0 0 0 6px` : `0`}
                >
                  <Lightgrey1Btn onClick={() => moveLinkHandler(`/product`)}>
                    쇼핑계속하기
                  </Lightgrey1Btn>
                </Wrapper>
              )}
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
