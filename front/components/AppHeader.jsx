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
} from "./commonComponents";
import { withResizeDetector } from "react-resize-detector";
import styled from "styled-components";
import Theme from "./Theme";
import { AlignRightOutlined, MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import Link from "next/link";

const WebRow = styled(RowWrapper)`
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  transition: 0.5s;

  &.background {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

const MobileRow = styled(RowWrapper)`
  display: none;

  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  transition: 0.5s;
  padding: 10px 0;

  &.background {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
  }

  @media (max-width: 700px) {
    display: flex;
  }
`;

const MenuCol = styled(ColWrapper)`
  height: 80px;
  background: ${Theme.basicTheme_C};
  color: ${Theme.white_C};
  cursor: pointer;
  transition: 0.5s;
  position: relative;

  &:hover {
    & .submenu {
      display: flex;
    }
  }
`;

const SubMenuCol = styled(ColWrapper)`
  position: absolute;
  width: 100%;
  height: auto;
  background: ${Theme.black_C};
  padding: 10px 30px;
  text-align: center;
  top: 60px;
`;

const SubMenuTextCol = styled(ColWrapper)`
  color: ${Theme.white_C};
  font-weight: 300;
  position: relative;
  padding: 10px 0 3px;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: ${Theme.white_C};
    transition: 0.5s;
  }

  &:hover {
    font-weight: 700;
    &:before {
      width: 100%;
    }
  }
`;

const AppHeader = ({ children, width }) => {
  ////////////// - USE STATE- ///////////////
  const [headerScroll, setHeaderScroll] = useState(false);
  const [pageY, setPageY] = useState(0);
  // const documentRef = useRef(document);

  const [drawar, setDrawar] = useState(false);
  const [subMenu, setSubMenu] = useState(``);

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

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [pageY]);
  return (
    <WholeWrapper>
      <WebRow className={headerScroll && "background"}>
        <Wrapper
          borderBottom={`1px solid ${Theme.lightGrey_C}`}
          padding={`10px 0`}
        >
          <RsWrapper dr={`row`} ju={`flex-end`} fontSize={`14px`}>
            <Link href={`/login`}>
              <a>
                <Text margin={`0 0 0 30px`}>로그인</Text>
              </a>
            </Link>
            <Text margin={`0 0 0 30px`}>회원가입</Text>
            <Text margin={`0 0 0 30px`}>주문조회</Text>
            <Text margin={`0 0 0 30px`}>마이페이지</Text>
          </RsWrapper>
        </Wrapper>
        <Wrapper
          borderBottom={`1px solid ${Theme.lightGrey_C}`}
          padding={`5px 0`}
        >
          <RsWrapper dr={`row`} ju={`space-between`}>
            <ATag width={`auto`} href="/">
              <Image
                width={`210px`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/logo/logo.png`}
              />
            </ATag>

            <Wrapper width={`290px`} position={`relative`}>
              <TextInput
                type={`text`}
                width={`100%`}
                height={`35px`}
                placeholder={`검색어를 입력해주세요.`}
                radius={`18px`}
                padding={`0 40px 0 20px`}
              />
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
            </Wrapper>
          </RsWrapper>
        </Wrapper>
        <Wrapper borderBottom={`1px solid ${Theme.lightGrey_C}`}>
          <RsWrapper>
            <Wrapper dr={`row`}>
              <MenuCol width={`calc(100% / 7)`} dr={`row`}>
                <MenuOutlined style={{ margin: `0 10px 0 0` }} />
                전체 카테고리
              </MenuCol>
              <Wrapper width={`calc(100% / 7)`}></Wrapper>
              <Wrapper width={`calc(100% / 7)`}></Wrapper>
              <Wrapper width={`calc(100% / 7)`}></Wrapper>
              <Wrapper width={`calc(100% / 7)`}></Wrapper>
              <Wrapper width={`calc(100% / 7)`}></Wrapper>
              <Wrapper width={`calc(100% / 7)`}></Wrapper>
            </Wrapper>
          </RsWrapper>
        </Wrapper>
      </WebRow>
      {/* mobile */}
      <MobileRow justify={`center`} className={headerScroll && "background"}>
        <ColWrapper span={11} al={`flex-start`}>
          <ATag width={`auto`} href="/">
            <Image
              width={`110px`}
              src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/SOUL/assets/images/logo/logo_long_white.png`}
            />
          </ATag>
        </ColWrapper>
        <ColWrapper
          span={11}
          al={`flex-end`}
          fontSize={`2rem`}
          color={Theme.white_C}
        >
          <AlignRightOutlined onClick={drawarToggle} />
        </ColWrapper>

        {drawar && (
          <Drawer
            placement="right"
            closable={true}
            onClose={drawarToggle}
            visible={drawarToggle}
            getContainer={false}
          >
            <ColWrapper al={`flex-start`}>
              <ColWrapper
                fontSize={`1.2rem`}
                onClick={() => {
                  setSubMenu(0);
                }}
              >
                한의원 소개
              </ColWrapper>
              {subMenu === 0 && (
                <>
                  <ATag href="about" width={`auto`} color={`initial`}>
                    <ColWrapper margin={`5px 10px 20px`}>
                      의료진 소개 및 진료 시간표
                    </ColWrapper>
                  </ATag>
                </>
              )}
              <ColWrapper
                fontSize={`1.2rem`}
                onClick={() => {
                  setSubMenu(1);
                }}
              >
                진료 과목
              </ColWrapper>
              {subMenu === 1 && (
                <>
                  <ColWrapper margin={`5px 10px 0`}>
                    <Link href="/diagnosis?type=1">체질 의학</Link>
                  </ColWrapper>

                  <ColWrapper margin={`5px 10px 0`}>
                    <Link href="/diagnosis?type=2">소울 다이어트</Link>
                  </ColWrapper>
                  <ColWrapper margin={`5px 10px 0`}>
                    <Link href="/diagnosis?type=3">만성 난치 클리닉</Link>
                  </ColWrapper>
                  <ColWrapper margin={`5px 10px 20px`}>
                    <Link href="/diagnosis?type=4">통증 클리닉</Link>
                  </ColWrapper>
                </>
              )}
              <ATag width={`auto`} href="notice" color={`initial`}>
                <ColWrapper
                  fontSize={`1.2rem`}
                  onClick={() => {
                    setSubMenu(2);
                  }}
                >
                  공지사항
                </ColWrapper>
              </ATag>
              <ATag href="location" width={`auto`} color={`initial`}>
                <ColWrapper
                  fontSize={`1.2rem`}
                  onClick={() => {
                    setSubMenu(3);
                  }}
                >
                  오시는 길
                </ColWrapper>
              </ATag>
            </ColWrapper>
          </Drawer>
        )}
      </MobileRow>
    </WholeWrapper>
  );
};

export default withResizeDetector(AppHeader);
