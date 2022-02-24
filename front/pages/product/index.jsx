import React, { useState, useCallback, useEffect } from "react";
import ClientLayout from "../../components/ClientLayout";
import {
  RsWrapper,
  WholeWrapper,
  Text,
  Wrapper,
  Image,
  SpanText,
} from "../../components/commonComponents";
import styled from "styled-components";
import Theme from "../../components/Theme";
import { Empty, Select } from "antd";
import useWidth from "../../hooks/useWidth";
import Head from "next/head";
import axios from "axios";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import { SEO_LIST_REQUEST } from "../../reducers/seo";
import {
  CATEGORY_INMENU_LIST_REQUEST,
  CATEGORY_LIST_REQUEST,
} from "../../reducers/category";
import {
  PRODUCT_COMPANY_LIST_REQUEST,
  PRODUCT_LIST_REQUEST,
} from "../../reducers/product";
import { useRouter } from "next/router";
import { Pagination } from "antd";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

const CustomSelect = styled(Select)`
  width: 138px;

  & .ant-select-selector {
    height: 32px;
    border: none !important;
    border-bottom: 1px solid ${Theme.basicTheme_C} !important;

    padding: 0 0 0 10px;
  }
  & .ant-select {
    font-size: 13px;
  }
  & .ant-select-arrow {
    color: ${Theme.basicTheme_C};
  }
`;

const CustomPagination = styled(Pagination)`
  & .ant-pagination-item-active {
    border: none;
    border-bottom: 1px solid ${Theme.basicTheme_C} !important;
  }
`;

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
  width: calc(100% / 5 - (125px / 5));
  margin: 0 25px 37px 0;
  position: relative;
  cursor: pointer;

  img {
    height: 216px;
    transition: 0.5s;
  }

  @media (max-width: 1280px) {
    width: calc(100% / 4 - (100px / 4));

    &:nth-child(5n) {
      margin: 0 25px 30px 0;
    }

    &:nth-child(4n) {
      margin-right: 0;
    }

    img {
      height: 216px;
    }
  }

  @media (max-width: 1100px) {
    width: calc(100% / 3 - (75px / 3));

    &:nth-child(4n) {
      margin: 0 25px 30px 0;
    }

    &:nth-child(3n) {
      margin-right: 0;
    }

    img {
      height: 216px;
    }
  }

  @media (max-width: 700px) {
    width: calc(100% / 2 - (100px / 2));

    &:nth-child(2n + 1) {
      margin-right: 25px;
    }

    &:nth-child(2n) {
      margin-right: 0;
    }

    img {
      height: 216px;
    }
  }

  @media (max-width: 500px) {
    width: calc(100% / 2 - (15px / 2));

    &:nth-child(2n + 1) {
      margin-right: 15px;
    }

    img {
      height: 216px;
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
  ////// GLOBAL STATE //////
  const { seo_keywords, seo_desc, seo_ogImage, seo_title } = useSelector(
    (state) => state.seo
  );
  const { categoryList, st_categoryInMenuListDone } = useSelector(
    (state) => state.category
  );
  const { productList, maxPage, totalProduct, prodCompanyList } = useSelector(
    (state) => state.product
  );

  console.log("productList", productList);

  ////// HOOKS //////

  const dispatch = useDispatch();

  const width = useWidth();

  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [productType, setProductType] = useState(null);
  const [selectType, setSelectType] = useState(null);
  const [selectCompany, setSelectCompany] = useState(null);

  ////// USEEFFECT //////
  useEffect(() => {
    if (router.query.category) {
      setProductType(parseInt(router.query.category));
    }
    if (router.query.menu) {
      dispatch({
        type: CATEGORY_INMENU_LIST_REQUEST,
        data: {
          menuId: router.query.menu,
        },
      });
    }
  }, [router.query]);

  useEffect(() => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
      data: {
        page: currentPage,
        categoryId: productType,
        isPrice:
          selectType === "낮은가격" ? 1 : selectType === "높은가격" ? 2 : null,
        isName: selectType === "상품명",
        companyId: selectCompany,
      },
    });
  }, [currentPage, productType, selectType, selectCompany]);

  useEffect(() => {
    if (productType) {
      dispatch({
        type: PRODUCT_LIST_REQUEST,
        data: {
          categoryId: productType,
        },
      });
    }
  }, [productType]);

  useEffect(() => {
    if (st_categoryInMenuListDone) {
      setProductType(categoryList && categoryList[0].id);
    }
  }, [st_categoryInMenuListDone]);

  ////// HANDLER //////

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const productTypeChangeHandler = useCallback(
    (type) => {
      setProductType(type);
    },
    [productType]
  );

  const chagneSelectHandler = useCallback(
    (data) => {
      if (selectType === "제조사") {
        setSelectCompany(null);
      }
      setSelectType(data);
    },
    [selectType, selectCompany]
  );

  const chagneSelectCompanyHandler = useCallback(
    (data) => {
      setSelectCompany(data);
    },
    [selectCompany]
  );

  const otherPageCall = useCallback((changePage) => {
    setCurrentPage(changePage);
  }, []);

  const nextFastPageHandler = useCallback(() => {
    if (currentPage + 4 >= maxPage) {
      setCurrentPage(maxPage);
    } else {
      setCurrentPage(currentPage + 4);
    }
  }, [currentPage]);

  const prevFastPageHandler = useCallback(() => {
    if (currentPage - 4 <= 0) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage - 4);
    }
  }, [currentPage]);

  ////// DATAVIEW //////

  const selectArr = ["상품명", "신상품", "낮은가격", "높은가격", "제조사"];

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
              <Wrapper al={`flex-start`}>
                <Text fontSize={`22px`} fontWeight={`bold`} margin={`0 0 9px`}>
                  {console.log("categoryList", categoryList)}
                  {console.log("productType", productType)}
                  {categoryList &&
                    categoryList.length > 0 &&
                    productType &&
                    categoryList.find((data) => data.id === productType).value}
                </Text>
                <Wrapper dr={`row`}>
                  {categoryList &&
                    categoryList.map((data) => {
                      return (
                        <ProductTypeWrapper
                          key={data.id}
                          bgColor={productType === data.id && Theme.subTheme_C}
                          color={productType === data.id && Theme.white_C}
                          onClick={() => productTypeChangeHandler(data.id)}
                        >
                          {data.value}
                        </ProductTypeWrapper>
                      );
                    })}
                </Wrapper>
              </Wrapper>
              <Wrapper dr={`row`} ju={`space-between`} margin={`54px 0 0`}>
                <Text fontSize={`14px`}>
                  총&nbsp;
                  <SpanText color={Theme.red_C}>{totalProduct}</SpanText>
                  개의 제품
                </Text>
                <Wrapper width={`auto`}>
                  <CustomSelect
                    defaultValue="신상품"
                    onChange={chagneSelectHandler}
                  >
                    {selectArr.map((data) => {
                      return <Select.Option value={data}>{data}</Select.Option>;
                    })}
                  </CustomSelect>
                  {selectType === "제조사" && prodCompanyList && (
                    <CustomSelect
                      placeholder="제조사를 선택해주세요."
                      onChange={chagneSelectCompanyHandler}
                    >
                      {prodCompanyList.map((data) => {
                        return (
                          <Select.Option value={data.id}>
                            {data.value}
                          </Select.Option>
                        );
                      })}
                    </CustomSelect>
                  )}
                </Wrapper>
              </Wrapper>
              <Wrapper dr={`row`} ju={`flex-start`}>
                {productList &&
                  (productList.length === 0 ? (
                    <Wrapper>
                      <Empty description="상품이 없습니다." />
                    </Wrapper>
                  ) : (
                    productList.map((data) => {
                      return (
                        <ProductWrapper
                          onClick={() => moveLinkHandler(`/product/${data.id}`)}
                        >
                          <Wrapper
                            padding={`20px`}
                            border={`1px solid ${Theme.lightGrey_C}`}
                          >
                            <Image
                              src={data.thumbnail}
                              alt="main_product_thumbnail"
                            />
                          </Wrapper>
                          <Text margin={`25px 0 13px`}>{data.title}</Text>
                          <Wrapper
                            dr={width < 900 ? `column` : `row`}
                            fontSize={width < 900 ? `16px` : `18px`}
                          >
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

                <Wrapper dr={`row`} margin={`30px 0 80px`}>
                  <DoubleLeftOutlined
                    onClick={prevFastPageHandler}
                    style={{
                      color: currentPage === 1 && Theme.grey_C,
                      margin: `4px 0 0`,
                    }}
                  />
                  <CustomPagination
                    size="small"
                    defaultCurrent={1}
                    current={parseInt(currentPage)}
                    total={maxPage * 10}
                    pageSize={20}
                    onChange={(page) => otherPageCall(page)}
                    showQuickJumper={false}
                    showSizeChanger={false}
                  />
                  <DoubleRightOutlined
                    onClick={nextFastPageHandler}
                    style={{
                      color: currentPage === maxPage && Theme.grey_C,
                      margin: `4px 0 0`,
                    }}
                  />
                </Wrapper>
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
      type: SEO_LIST_REQUEST,
    });

    context.store.dispatch({
      type: PRODUCT_COMPANY_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default ProductList;
