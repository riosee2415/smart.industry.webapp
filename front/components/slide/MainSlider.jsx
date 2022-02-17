import React, { useEffect, useCallback } from "react";
import {
  ColWrapper,
  RowWrapper,
  Wrapper,
  CommonButton,
  RsWrapper,
  Text,
} from "../commonComponents";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { MAIN_BANNER_REQUEST } from "../../reducers/banner";
import Theme from "../Theme";
import { Carousel, Button } from "antd";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";

const MainSliderWrapper = styled(RowWrapper)`
  margin: 192px 0 0;
  & .ant-carousel {
    width: 100%;
  }
`;

const BannerBlackBackWrapper = styled(ColWrapper)`
  position: relative;

  &::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
`;
const MainProductButton = styled(Button)`
  border: 1px solid ${Theme.white_C};
  color: ${Theme.white_C};
  font-size: 16px;
  width: 135px;
  height: 50px;
  border-radius: 0;
  background-color: transparent;
`;

const MainSlider = () => {
  const width = useWidth();

  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.banner);
  const { me } = useSelector((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: MAIN_BANNER_REQUEST,
    });
  }, [me]);

  const moveLinkHandler = useCallback((link) => {
    window.open(link);
  }, []);
  return (
    <MainSliderWrapper>
      <Carousel autoplay={true} speed={3000}>
        {banners &&
          banners.map((data, idx) => {
            return (
              <BannerBlackBackWrapper
                key={idx}
                span={24}
                height={width < 800 ? `500px` : `720px`}
                bgImg={`url(${data.imagePath})`}
                position={`relative`}
                display={`flex !important`}
              >
                <RsWrapper height={`100%`}>
                  <Wrapper zIndex={`2`}>
                    <Wrapper
                      color={Theme.white_C}
                      fontSize={width < 700 ? `22px` : `40px`}
                      lineHeight={`1.55`}
                      fontSize={`46px`}
                    >
                      <Text>{data.title}</Text>
                    </Wrapper>
                    <ColWrapper
                      color={Theme.white_C}
                      lineHeight={`1.26`}
                      margin={`25px 0 78px`}
                      fontSize={`22px`}
                    >
                      <Text fontSize={`1.125rem`}>{data.content}</Text>
                    </ColWrapper>
                    <Wrapper>
                      <MainProductButton>더 보기</MainProductButton>
                    </Wrapper>
                  </Wrapper>
                </RsWrapper>
              </BannerBlackBackWrapper>
            );
          })}
      </Carousel>
    </MainSliderWrapper>
  );
};

export default MainSlider;
