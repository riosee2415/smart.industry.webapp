import { Input, Button } from "antd";
import React, { useState, useCallback } from "react";
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
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

const DetailButton = styled.button`
  width: calc(100% / 3);
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

const DetailProduct = () => {
  ////// HOOKS //////
  const width = useWidth();

  const [tab, setTab] = useState(1);

  ////// HANDLER //////
  const tabChangeHandler = useCallback(
    (value) => {
      setTab(value);
    },
    [tab]
  );

  ////// DATAIVEW //////
  const testImageArr = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJYdH7O9XWCoItn5fJHx6_ZDjnXKZ4gB4chw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJYdH7O9XWCoItn5fJHx6_ZDjnXKZ4gB4chw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJYdH7O9XWCoItn5fJHx6_ZDjnXKZ4gB4chw&usqp=CAU",
  ];
  return (
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
                  margin={`0 0 56px`}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJYdH7O9XWCoItn5fJHx6_ZDjnXKZ4gB4chw&usqp=CAU"
                />
                <Wrapper dr={`row`}>
                  {testImageArr &&
                    testImageArr.map((data, idx) => {
                      return (
                        <Wrapper
                          width={
                            width < 1100
                              ? width < 900
                                ? `75px`
                                : `85px`
                              : `105px`
                          }
                          height={
                            width < 1100
                              ? width < 900
                                ? `75px`
                                : `85px`
                              : `105px`
                          }
                          padding={`10px`}
                          border={`1px solid ${Theme.grey2_C}`}
                          margin={idx === 0 ? `0` : `0 0 0 54px`}
                          cursor={`pointer`}
                        >
                          <Image
                            width={`100%`}
                            height={`100%`}
                            src={data}
                            alt="product_thumbnail"
                          />
                        </Wrapper>
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
                  상품 카테고리
                </Text>
                <Text
                  fontSize={`26px`}
                  fontWeight={`medium`}
                  margin={`28px 0 10px`}
                  lineHeight={`1.31`}
                >
                  상품명
                </Text>
                <Wrapper
                  dr={`row`}
                  ju={`flex-start`}
                  fontSize={`26px`}
                  fontWeight={`bold`}
                  lineHeight={`1.31`}
                >
                  <Text color={Theme.red_C}>4%</Text>
                  <Text
                    fontSize={`22px`}
                    fontWeight={`500`}
                    margin={`0 12px 0 22px`}
                    color={Theme.grey_C}
                    textDecoration={`line-through`}
                    lineHeight={`1.22`}
                  >
                    1,200,000원
                  </Text>
                  <Text>1,100,000원</Text>
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
                      2,500원 (50,000원 이상 구매 시 무료)
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
                          <MinusOutlined style={{ cursor: `pointer` }} />
                          <Text fontWeight={`bold`}>1</Text>
                          <PlusOutlined style={{ cursor: `pointer` }} />
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                    <Wrapper width={`auto`} dr={`row`}>
                      <Text fontSize={`18px`} fontWeight={`bold`}>
                        1,170,000원
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
                    1,170,000원
                    <SpanText
                      fontSize={`14px`}
                      fontWeight={`500`}
                      color={Theme.darkGrey_C}
                      margin={`0 0 0 22px`}
                    >
                      (1개)
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
                    width={width < 700 ? `calc(50% - 3px)` : `calc(20% - 6px)`}
                    height={`50px`}
                    radius={`0`}
                    color={Theme.black_C}
                    kindOf={`color`}
                  >
                    장바구니
                  </CommonButton>
                  <CommonButton
                    width={width < 700 ? `calc(50% - 3px)` : `calc(20% - 6px)`}
                    height={`50px`}
                    radius={`0`}
                    color={Theme.black_C}
                    kindOf={`color`}
                  >
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
            margin={`80px 0 60px`}
            borderBottom={`1px solid ${Theme.basicTheme_C}`}
          >
            <DetailButton isTab={tab === 1} onClick={() => tabChangeHandler(1)}>
              상품상세정보
            </DetailButton>
            <DetailButton isTab={tab === 2} onClick={() => tabChangeHandler(2)}>
              상품구매안내
            </DetailButton>
            <DetailButton isTab={tab === 3} onClick={() => tabChangeHandler(3)}>
              상품문의
            </DetailButton>
          </Wrapper>

          {tab === 1 && <Wrapper>상품상세정보</Wrapper>}
          {tab === 2 && <Wrapper>상품구매안내</Wrapper>}
          {tab === 3 && <Wrapper>상품문의</Wrapper>}
        </RsWrapper>
      </WholeWrapper>
    </ClientLayout>
  );
};

export default DetailProduct;
