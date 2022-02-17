import React from "react";
import ClientLayout from "../../components/ClientLayout";
import {
  RsWrapper,
  WholeWrapper,
  Text,
  Wrapper,
  Image,
} from "../../components/commonComponents";
import styled from "styled-components";
import Theme from "../../components/Theme";
import { Empty } from "antd";
import useWidth from "../../hooks/useWidth";

const ProductTypeWrapper = styled(Wrapper)`
  width: calc(100% / 5 - (60px / 5));

  height: 50px;
  border: 1px solid ${Theme.grey2_C};
  margin: 0 6px 10px;

  position: relative;
  cursor: pointer;

  @media (max-width: 700px) {
    width: calc(100% / 2 - (24px / 2));
    margin: 0 6px 5px;
  }
`;

const ProductWrapper = styled(Wrapper)`
  width: calc(100% / 5 - (100px / 5));
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
      height: 130px;
    }
  }

  &:hover img {
    cursor: pointer;
    transform: scale(1.1); /*  default */
    -webkit-transform: scale(1.1); /*  크롬 */
    -moz-transform: scale(1.1); /* FireFox */
    -o-transform: scale(1.1);

    transition: transform 0.5s;
    -o-transition: transform 0.5s;
    -moz-transition: transform 0.5s;
    -webkit-transition: transform 0.5s;
  }
`;

const ProductList = () => {
  ////// HOOKS //////

  const width = useWidth();

  ////// DATAVIEW //////

  const testType = [
    {
      id: 1,
      name: "도로캇타기",
    },
    {
      id: 2,
      name: "브로워/분무기",
    },
    {
      id: 3,
      name: "엔진톱",
    },
    {
      id: 4,
      name: "엔진캇타기",
    },
    {
      id: 5,
      name: "발전기",
    },
    {
      id: 6,
      name: "진동로라",
    },
    {
      id: 7,
      name: "람아",
    },
    {
      id: 8,
      name: "콤팩타",
    },
    {
      id: 9,
      name: "엔진양수기",
    },
    {
      id: 10,
      name: "엔진송풍기",
    },
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

  return (
    <ClientLayout>
      <WholeWrapper>
        <RsWrapper>
          <Wrapper margin={`280px 0 0`}>
            <Wrapper al={`flex-start`}>
              <Text>도로캇타기</Text>
              <Wrapper dr={`row`}>
                {testType &&
                  testType.map((data) => {
                    return (
                      <ProductTypeWrapper key={data.id}>
                        {data.name}
                      </ProductTypeWrapper>
                    );
                  })}
              </Wrapper>
            </Wrapper>
            <Wrapper dr={`row`}>
              {testProductArr &&
                (testProductArr.length === 0 ? (
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
                          dr={width < 900 ? `column` : `row`}
                          fontSize={width < 900 ? `16px` : `18px`}
                        >
                          <Text
                            margin={width < 900 ? `0` : `0 5px 0 0`}
                            textDecoration={`line-through`}
                            color={Theme.grey_C}
                          >
                            {data.originPrice}
                          </Text>
                          <Text
                            margin={width < 900 ? `0` : `0 0 0 5px`}
                            fontWeight={`bold`}
                          >
                            {data.viewPrice}
                          </Text>
                        </Wrapper>
                      </ProductWrapper>
                    );
                  })
                ))}
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </WholeWrapper>
    </ClientLayout>
  );
};

export default ProductList;
