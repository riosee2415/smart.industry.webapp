import React, { useState, useEffect, useCallback } from "react";
import {
  RowWrapper,
  ColWrapper,
  RsWrapper,
  Wrapper,
  Image,
  ATag,
  WholeWrapper,
  Text,
  TextInput,
  CommonButton,
} from "./commonComponents";
import { withResizeDetector } from "react-resize-detector";
import styled from "styled-components";
import Theme from "./Theme";
import {
  AlignRightOutlined,
  MenuOutlined,
  DownloadOutlined,
  UserOutlined,
  DownOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Drawer, Empty, Form, Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { MENU_HEADER_LIST_REQUEST, MENU_LIST_REQUEST } from "../reducers/menu";
import { CATEGORY_HEADER_LIST_REQUEST } from "../reducers/category";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";

const WebRow = styled(RowWrapper)`
  z-index: 10000;
  transition: 0.5s;
  position: fixed;
  top: 0;
  left: 0;
  background: ${Theme.white_C};

  & .display {
    height: 0;
    opacity: 0;
    visibility: hidden;
    padding: 0;
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const MobileRow = styled(RowWrapper)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  transition: 0.5s;
  border-bottom: 1px solid ${Theme.lightGrey_C};
  background: ${Theme.white_C};

  @media (max-width: 700px) {
    display: flex;
  }
`;

const Title = styled(Text)`
  position: relative;
  margin: 0 0 20px;
  color: ${Theme.black_C};

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
`;

const AllMenu = styled(RsWrapper)`
  position: absolute;
  top: 80px;
  left: 0;
  height: auto;
  border: 1px solid ${Theme.lightGrey_C};
  background: ${Theme.white_C};
  padding: 30px 40px;
  box-shadow: 0px 3px 6px ${Theme.lightGrey_C};
  flex-direction: row;
  z-index: 20;
  align-items: flex-start;

  display: none;
`;

const MenuCol = styled(ColWrapper)`
  height: 80px;
  background: ${Theme.basicTheme_C};
  color: ${Theme.white_C};
  cursor: pointer;
  transition: 0.5s;
  position: relative;

  &:hover {
    & ${AllMenu} {
      display: flex;
    }
  }
`;

const SubMenuHover = styled(Wrapper)`
  position: absolute;
  top: 80px;
  left: 0;
  border: 1px solid ${Theme.lightGrey_C};
  background: ${Theme.white_C};

  opacity: 0;
  visibility: hidden;
`;

const SubMenuCol = styled(ColWrapper)`
  cursor: pointer;
  position: relative;
  height: 80px;

  &:hover {
    p {
      color: ${Theme.basicTheme_C};
    }
    ${SubMenuHover} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const SubMenuTextCol = styled(ColWrapper)`
  position: relative;
  font-size: ${(props) => props.fontSize || `14px`};
  font-weight: 300;
  cursor: pointer;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: ${(props) => props.bgColorBe || props.theme.grey_C};
    transition: 0.5s;
  }

  &:hover {
    &:before {
      width: 100%;
    }
  }
`;

const MenuWrapper = styled(Wrapper)`
  .submenu {
    display: none;
  }

  &:hover {
    .submenu {
      display: flex;
    }
  }
`;

const InMenu = styled(Wrapper)`
  width: 390px;
  padding: 30px;
  background: ${Theme.white_C};
  position: absolute;
  top: 0;
  left: 192px;
  z-index: 30;
  border: 1px solid ${Theme.subTheme2_C};
  align-items: flex-start;

  display: none;
`;

const SubMenuWrapper = styled(Wrapper)`
  position: relative;

  &:hover ${InMenu} {
    display: flex;
  }
`;

const CustomForm = styled(Form)`
  width: 100%;
  & .ant-row {
    width: 100%;
  }

  & .ant-form-item {
    width: 100%;
    margin: 0;
  }
`;

const AppHeader = () => {
  ////////////// - USE STATE- ///////////////
  const [headerScroll, setHeaderScroll] = useState(false);
  const [pageY, setPageY] = useState(0);

  const { headerCategoryList } = useSelector((state) => state.category);
  const { headerMenuList } = useSelector((state) => state.menu);

  const { me } = useSelector((state) => state.user);

  // const documentRef = useRef(document);

  const [drawar, setDrawar] = useState(false);
  const [subMenu, setSubMenu] = useState(``);

  const router = useRouter();

  const dispatch = useDispatch();

  ///////////// - EVENT HANDLER- ////////////

  const drawarToggle = useCallback(() => {
    setDrawar(!drawar);
  });

  const handleScroll = useCallback(() => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const headerScroll = pageY && pageYOffset !== 0 && pageYOffset !== pageY;
    setHeaderScroll(headerScroll);
    setPageY(pageYOffset);
  });

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const serarchHandler = useCallback(
    (data) => {
      if (router.pathname === "/product") {
        if (router.query) {
          if (router.asPath.indexOf("search") === -1) {
            router.replace(`${router.asPath}&search=${data.searchData}`);
          } else {
            router.replace(
              `${router.asPath.substring(
                0,
                router.asPath.indexOf("search") + 7
              )}${data.searchData}`
            );
          }
        } else {
          router.replace(`/product?search=${data.searchData}`);
        }
      } else {
        router.replace(`/product?search=${data.searchData}`);
      }
    },
    [router]
  );

  ////////////// - USE EFFECT- //////////////

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    dispatch({
      type: CATEGORY_HEADER_LIST_REQUEST,
    });
    dispatch({
      type: MENU_HEADER_LIST_REQUEST,
    });
  }, [router.query]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [pageY]);
  return (
    <WholeWrapper>
      <WebRow>
        <Wrapper
          borderBottom={`1px solid ${Theme.lightGrey_C}`}
          padding={`10px 0`}
        >
          <RsWrapper dr={`row`} ju={`flex-end`} fontSize={`14px`}>
            {me ? (
              <>
                <Link href={`/mypage/order`}>
                  <a>
                    <Text fontSize={`12px`}>주문조회</Text>
                  </a>
                </Link>
                <Link href={`/mypage`}>
                  <a>
                    <Text margin={`0 0 0 30px`}>마이페이지</Text>
                  </a>
                </Link>
              </>
            ) : (
              <>
                <Link href={`/login`}>
                  <a>
                    <Text margin={`0 0 0 30px`}>로그인</Text>
                  </a>
                </Link>
                <Link href={`/user/signup`}>
                  <a>
                    <Text margin={`0 0 0 30px`}>회원가입</Text>
                  </a>
                </Link>
              </>
            )}

            {headerScroll && (
              <Wrapper
                width={`290px`}
                position={`relative`}
                margin={`0 0 0 30px`}
              >
                <CustomForm onFinish={serarchHandler}>
                  <Form.Item name="searchData">
                    <TextInput
                      type={`text`}
                      width={`100%`}
                      height={`35px`}
                      placeholder={`검색어를 입력해주세요.`}
                      radius={`18px`}
                      padding={`0 40px 0 20px`}
                    />
                  </Form.Item>
                  <Wrapper
                    width={`auto`}
                    position={`absolute`}
                    top={`0`}
                    right={`15px`}
                    height={`100%`}
                  >
                    <Image
                      width={`14px`}
                      alt="icon"
                      src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/header/icon_search.png`}
                    />
                  </Wrapper>
                </CustomForm>
              </Wrapper>
            )}
          </RsWrapper>
        </Wrapper>

        <Wrapper
          borderBottom={`1px solid ${Theme.lightGrey_C}`}
          padding={`5px 0`}
          className={headerScroll && "display"}
        >
          <RsWrapper dr={`row`} ju={`space-between`}>
            <ATag width={`auto`} href="/">
              <Image
                width={`210px`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/logo/logo.png`}
              />
            </ATag>

            <Wrapper width={`290px`} position={`relative`}>
              <CustomForm onFinish={serarchHandler}>
                <Form.Item name="searchData">
                  <TextInput
                    type={`text`}
                    width={`100%`}
                    height={`35px`}
                    placeholder={`검색어를 입력해주세요.`}
                    radius={`18px`}
                    padding={`0 40px 0 20px`}
                  />
                </Form.Item>
                <Wrapper
                  width={`auto`}
                  position={`absolute`}
                  top={`0`}
                  right={`15px`}
                  height={`100%`}
                >
                  <Image
                    width={`14px`}
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/header/icon_search.png`}
                  />
                </Wrapper>
              </CustomForm>
            </Wrapper>
          </RsWrapper>
        </Wrapper>
        <Wrapper borderBottom={`1px solid ${Theme.lightGrey_C}`}>
          <RsWrapper>
            <Wrapper dr={`row`}>
              <Wrapper
                width={`calc(100% / 7)`}
                dr={`row`}
                position={`relative`}
              >
                <MenuCol width={`100%`} dr={`row`}>
                  <MenuOutlined style={{ margin: `0 10px 0 0` }} />
                  전체 카테고리
                  <AllMenu>
                    <Wrapper
                      width={`calc(100% / 5 * 3)`}
                      borderRight={`1px solid ${Theme.lightGrey_C}`}
                      dr={`row`}
                      ju={`flex-start`}
                      al={`flex-start`}
                    >
                      <Wrapper
                        width={`calc(100% / 3)`}
                        al={`flex-start`}
                        color={Theme.black_C}
                      >
                        <Title>건설기계</Title>
                        {headerCategoryList &&
                          headerCategoryList.map((data) => {
                            return (
                              <SubMenuTextCol
                                margin={`0 0 12px`}
                                fontSize={`12px`}
                                onClick={() =>
                                  moveLinkHandler(
                                    `/product?menu=${data.MenuId}&category=${data.id}`
                                  )
                                }
                              >
                                {data.value}
                              </SubMenuTextCol>
                            );
                          })}
                      </Wrapper>
                    </Wrapper>
                    <Wrapper
                      width={`calc(100% / 5 * 2)`}
                      dr={`row`}
                      ju={`flex-start`}
                      al={`flex-start`}
                    >
                      <Wrapper
                        width={`calc(100% / 2)`}
                        padding={`0 0 0 20px`}
                        al={`flex-start`}
                        color={Theme.black_C}
                      >
                        <Title>커뮤니티</Title>
                        <Link href={`/community/faq`}>
                          <a>
                            <SubMenuTextCol
                              margin={`0 0 12px`}
                              fontSize={`12px`}
                            >
                              이용안내 FAQ
                            </SubMenuTextCol>
                          </a>
                        </Link>
                        <Link href={`/community/notice`}>
                          <a>
                            <SubMenuTextCol
                              margin={`0 0 12px`}
                              fontSize={`12px`}
                            >
                              공지사항
                            </SubMenuTextCol>
                          </a>
                        </Link>
                        <Link href={`/community/question`}>
                          <a>
                            <SubMenuTextCol
                              margin={`0 0 12px`}
                              fontSize={`12px`}
                            >
                              1:1 맞춤문의
                            </SubMenuTextCol>
                          </a>
                        </Link>
                        <Link href={`/community/productQnA`}>
                          <a>
                            <SubMenuTextCol fontSize={`12px`}>
                              상품문의
                            </SubMenuTextCol>
                          </a>
                        </Link>
                      </Wrapper>
                      <Wrapper
                        width={`calc(100% / 2)`}
                        padding={`0 0 0 20px`}
                        color={Theme.black_C}
                        al={`flex-start`}
                      >
                        <Title>마이페이지</Title>
                        <Link href={`/mypage/order`}>
                          <a>
                            <SubMenuTextCol
                              margin={`0 0 12px`}
                              fontSize={`12px`}
                            >
                              주문내역 조회
                            </SubMenuTextCol>
                          </a>
                        </Link>
                        <Link href={`/mypage/profile`}>
                          <a>
                            <SubMenuTextCol
                              margin={`0 0 12px`}
                              fontSize={`12px`}
                            >
                              회원 정보
                            </SubMenuTextCol>
                          </a>
                        </Link>
                        <Link href={`/mypage/cart`}>
                          <a>
                            <SubMenuTextCol
                              margin={`0 0 12px`}
                              fontSize={`12px`}
                            >
                              장바구니
                            </SubMenuTextCol>
                          </a>
                        </Link>
                        <Link href={`/mypage/wishlist`}>
                          <a>
                            <SubMenuTextCol
                              margin={`0 0 12px`}
                              fontSize={`12px`}
                            >
                              관심상품
                            </SubMenuTextCol>
                          </a>
                        </Link>
                        <Link href={`/mypage/board`}>
                          <a>
                            <SubMenuTextCol
                              margin={`0 0 12px`}
                              fontSize={`12px`}
                            >
                              1:1 문의 내역
                            </SubMenuTextCol>
                          </a>
                        </Link>
                      </Wrapper>
                    </Wrapper>
                  </AllMenu>
                </MenuCol>
                <MenuWrapper
                  position={`absolute`}
                  height={`55px`}
                  top={`80px`}
                  left={`0`}
                  bgColor={Theme.basicTheme_C}
                  color={Theme.white_C}
                  dr={`row`}
                >
                  <DownloadOutlined style={{ margin: `0 10px 0 0` }} />
                  <Wrapper width={`auto`} al={`flex-start`} fontSize={`12px`}>
                    <Text>CATEGORY OPEN</Text>
                    <Text>마우스를 올려주세요.</Text>
                  </Wrapper>

                  <Wrapper
                    position={`absolute`}
                    top={`0`}
                    left={`0`}
                    bgColor={Theme.subTheme_C}
                    color={Theme.white_C}
                    zIndex={`10`}
                    className={`submenu`}
                  >
                    {headerMenuList &&
                      (headerMenuList.length === 0 ? (
                        <Empty description="카테고리가 없습니다." />
                      ) : (
                        headerMenuList.map((data) => {
                          return (
                            <SubMenuWrapper
                              height={`48px`}
                              borderBottom={`1px solid ${Theme.basicTheme_C}`}
                            >
                              <SubMenuTextCol bgColorBe={Theme.white_C}>
                                {data.value}
                              </SubMenuTextCol>
                              <InMenu dr={`row`}>
                                <Wrapper
                                  width={`calc(100% - 194px)`}
                                  al={`flex-start`}
                                  color={Theme.black_C}
                                >
                                  {data.Categories.map((value) => {
                                    return (
                                      <SubMenuTextCol
                                        margin={`0 0 10px`}
                                        onClick={() =>
                                          moveLinkHandler(
                                            `/product?menu=${data.id}&category=${value.id}`
                                          )
                                        }
                                      >
                                        {value.value}
                                      </SubMenuTextCol>
                                    );
                                  })}
                                </Wrapper>
                                <Wrapper width={`194px`}>
                                  <Image alt="image" src={data.imagePath} />
                                </Wrapper>
                              </InMenu>
                            </SubMenuWrapper>
                          );
                        })
                      ))}
                  </Wrapper>
                </MenuWrapper>
              </Wrapper>

              <SubMenuCol
                width={`calc(100% / 7)`}
                onClick={() => moveLinkHandler(`/product?isUsed=true`)}
              >
                <Text>중고장비</Text>
              </SubMenuCol>
              <SubMenuCol
                width={`calc(100% / 7)`}
                onClick={() => moveLinkHandler(`/product?isSale=true`)}
              >
                <Text>특가상품</Text>
              </SubMenuCol>
              <SubMenuCol
                width={`calc(100% / 7)`}
                onClick={() => moveLinkHandler(`/lease`)}
              >
                <Text>임대문의</Text>
              </SubMenuCol>
              <SubMenuCol width={`calc(100% / 7)`}>
                <Text>사업자문의</Text>
              </SubMenuCol>
              <SubMenuCol width={`calc(100% / 7)`}>
                <Text>장비판매의뢰</Text>
              </SubMenuCol>
              <SubMenuCol width={`calc(100% / 7)`}>
                <Text>커뮤니티</Text>
                <SubMenuHover>
                  <Link href={`/community/faq`}>
                    <a>
                      <Wrapper
                        height={`50px`}
                        borderBottom={`1px solid ${Theme.lightGrey_C}`}
                      >
                        <SubMenuTextCol>이용안내 FAQ</SubMenuTextCol>
                      </Wrapper>
                    </a>
                  </Link>
                  <Link href={`/community/notice`}>
                    <a>
                      <Wrapper
                        height={`50px`}
                        borderBottom={`1px solid ${Theme.lightGrey_C}`}
                      >
                        <SubMenuTextCol>공지사항</SubMenuTextCol>
                      </Wrapper>
                    </a>
                  </Link>
                  <Link href={`/community/question`}>
                    <a>
                      <Wrapper
                        height={`50px`}
                        borderBottom={`1px solid ${Theme.lightGrey_C}`}
                      >
                        <SubMenuTextCol>1:1 맞춤문의</SubMenuTextCol>
                      </Wrapper>
                    </a>
                  </Link>
                  <Link href={`/community/productQnA`}>
                    <a>
                      <Wrapper height={`50px`}>
                        <SubMenuTextCol>상품문의</SubMenuTextCol>
                      </Wrapper>
                    </a>
                  </Link>
                </SubMenuHover>
              </SubMenuCol>
            </Wrapper>
          </RsWrapper>
        </Wrapper>
      </WebRow>
      {/* mobile */}
      <MobileRow justify={`center`} className={headerScroll && "background"}>
        <ColWrapper
          span={4}
          al={`flex-start`}
          fontSize={`1.6rem`}
          padding={`0 10px`}
        >
          <Link href={`/login`}>
            <a>
              <UserOutlined />
            </a>
          </Link>
        </ColWrapper>
        <ColWrapper span={16}>
          <ATag width={`auto`} href="/">
            <Image
              width={`160px`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/logo/logo.png`}
            />
          </ATag>
        </ColWrapper>
        <ColWrapper
          span={4}
          al={`flex-end`}
          fontSize={`1.6rem`}
          padding={`0 10px`}
        >
          <AlignRightOutlined onClick={drawarToggle} />
        </ColWrapper>
        <Wrapper
          height={`40px`}
          bgColor={Theme.basicTheme_C}
          color={Theme.white_C}
          overflow={`auto`}
          wrap={`nowrap`}
          dr={`row`}
          ju={`flex-start`}
          padding={`0 10px`}
        >
          <Wrapper minWidth={`80px`} margin={`0 5px`}>
            건설기계
          </Wrapper>
          <Wrapper minWidth={`80px`} margin={`0 5px`}>
            중고장비
          </Wrapper>
          <Wrapper minWidth={`80px`} margin={`0 5px`}>
            특가상품
          </Wrapper>
          <Wrapper minWidth={`80px`} margin={`0 5px`}>
            임대문의
          </Wrapper>
          <Wrapper minWidth={`80px`} margin={`0 5px`}>
            사업자문의
          </Wrapper>
          <Wrapper minWidth={`80px`} margin={`0 5px`}>
            장비판매의뢰
          </Wrapper>
        </Wrapper>
        {drawar && (
          <Drawer
            placement="right"
            closable={true}
            onClose={drawarToggle}
            visible={drawarToggle}
            getContainer={false}
          >
            <Wrapper
              dr={`row`}
              ju={`flex-start`}
              borderBottom={`1px solid ${Theme.lightGrey_C}`}
              padding={`0 0 15px`}
            >
              {me ? (
                <>
                  <Link href={`/mypage/order`}>
                    <a>
                      <Text fontSize={`12px`}>주문조회</Text>
                    </a>
                  </Link>
                  <Link href={`/mypage`}>
                    <a>
                      <Text fontSize={`12px`} margin={`0 0 0 20px`}>
                        마이페이지
                      </Text>
                    </a>
                  </Link>
                </>
              ) : (
                <>
                  <Link href={`/login`}>
                    <a>
                      <Text fontSize={`12px`}>로그인</Text>
                    </a>
                  </Link>
                  <Link href={`/user/signup`}>
                    <a>
                      <Text fontSize={`12px`} margin={`0 0 0 20px`}>
                        회원가입
                      </Text>
                    </a>
                  </Link>
                </>
              )}
            </Wrapper>
            <Wrapper width={`100%`} position={`relative`} margin={`20px 0`}>
              <CustomForm onFinish={serarchHandler}>
                <Form.Item name="searchData">
                  <TextInput
                    type={`text`}
                    width={`100%`}
                    height={`35px`}
                    placeholder={`검색어를 입력해주세요.`}
                    radius={`18px`}
                    padding={`0 40px 0 20px`}
                  />
                </Form.Item>
                <Wrapper
                  width={`auto`}
                  position={`absolute`}
                  top={`0`}
                  right={`15px`}
                  height={`100%`}
                >
                  <Image
                    width={`14px`}
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/header/icon_search.png`}
                  />
                </Wrapper>
              </CustomForm>
            </Wrapper>
            <ColWrapper al={`flex-start`}>
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                borderBottom={`1px solid ${Theme.lightGrey_C}`}
                padding={`10px 0`}
                fontSize={`1.2rem`}
                onClick={() => {
                  setSubMenu(0);
                }}
              >
                카테고리
                <DownOutlined style={{ color: Theme.basicTheme_C }} />
              </Wrapper>
              {subMenu === 0 && (
                <Wrapper bgColor={Theme.lightGrey_C}>
                  <Wrapper al={`flex-start`} padding={`5px`}>
                    건설기계
                  </Wrapper>
                  <Wrapper al={`flex-start`} padding={`5px`}>
                    건설기계
                  </Wrapper>
                  <Wrapper al={`flex-start`} padding={`5px`}>
                    건설기계
                  </Wrapper>
                </Wrapper>
              )}
              <Wrapper
                dr={`row`}
                ju={`space-between`}
                borderBottom={`1px solid ${Theme.lightGrey_C}`}
                padding={`10px 0`}
                fontSize={`1.2rem`}
                onClick={() => {
                  setSubMenu(1);
                }}
              >
                커뮤니티
                <DownOutlined style={{ color: Theme.basicTheme_C }} />
              </Wrapper>
              {subMenu === 1 && (
                <Wrapper bgColor={Theme.lightGrey_C}>
                  <Link href={`/community/faq`}>
                    <a>
                      <Wrapper al={`flex-start`} padding={`5px`}>
                        이용안내 FAQ
                      </Wrapper>
                    </a>
                  </Link>
                  <Link href={`/community/notice`}>
                    <a>
                      <Wrapper al={`flex-start`} padding={`5px`}>
                        공지사항
                      </Wrapper>
                    </a>
                  </Link>
                  <Link href={`/community/question`}>
                    <a>
                      <Wrapper al={`flex-start`} padding={`5px`}>
                        1:1 맞춤문의
                      </Wrapper>
                    </a>
                  </Link>
                  <Link href={`/community/productQnA`}>
                    <a>
                      <Wrapper al={`flex-start`} padding={`5px`}>
                        상품문의
                      </Wrapper>
                    </a>
                  </Link>
                </Wrapper>
              )}
              <Wrapper al={`flex-start`}>
                <Wrapper al={`flex-start`} margin={`20px 0 5px`}>
                  고객센터
                </Wrapper>
                <Wrapper
                  width={`30px`}
                  height={`1px`}
                  bgColor={Theme.basicTheme_C}
                ></Wrapper>
                <Wrapper
                  dr={`row`}
                  margin={`10px 0`}
                  ju={`flex-start`}
                  fontSize={`20px`}
                >
                  <Wrapper
                    width={`35px`}
                    height={`35px`}
                    bgColor={Theme.basicTheme_C}
                    color={Theme.white_C}
                    radius={`100%`}
                    margin={`0 5px 0 0`}
                  >
                    <PhoneOutlined />
                  </Wrapper>
                  0000-0000
                </Wrapper>
                <Text color={Theme.grey_C} fontSize={`13px`}>
                  평일 오전 09:00 ~ 오후 6:00
                </Text>
                <Text color={Theme.grey_C} fontSize={`13px`}>
                  토요일 오전 09:00 ~ 오후 5:00
                </Text>
                <Text color={Theme.grey_C} fontSize={`13px`}>
                  일, 공휴일 휴무
                </Text>
                <Text color={Theme.grey_C} fontSize={`13px`}>
                  점심시간 12:00 ~ 13:00
                </Text>
              </Wrapper>
            </ColWrapper>
          </Drawer>
        )}
      </MobileRow>
    </WholeWrapper>
  );
};

export default withResizeDetector(AppHeader);
