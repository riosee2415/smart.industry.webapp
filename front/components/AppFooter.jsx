import React, { useEffect } from "react";
import {
  RowWrapper,
  ColWrapper,
  Image,
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
} from "./commonComponents";
import Theme from "./Theme";
import styled from "styled-components";
import useWidth from "../hooks/useWidth";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { COMPANY_GET_REQUEST } from "../reducers/company";
import { message } from "antd";
const AppFooter = () => {
  const width = useWidth();

  const dispatch = useDispatch();

  const {
    companys,
    //
    st_companyDone,
    st_companyError,
  } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch({
      type: COMPANY_GET_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (st_companyError) {
      return message.error(st_companyError);
    }
  }, [st_companyError]);

  return (
    <WholeWrapper bgColor={Theme.darkGrey_C} color={Theme.grey_C}>
      <RsWrapper fontSize={`12px`}>
        <Wrapper
          dr={`row`}
          ju={`space-between`}
          height={width < 1000 ? `auto` : `100px`}
          padding={width < 1000 && `20px 0`}
          borderBottom={`1px solid ${Theme.grey3_C}`}
        >
          <Wrapper
            width={width < 800 ? `100%` : `auto`}
            dr={`row`}
            color={Theme.grey_C}
          >
            <Link href={`/`}>
              <a>
                <Text margin={width < 1000 ? `0 15px 0 0` : `0 40px 0 0`}>
                  홈
                </Text>
              </a>
            </Link>
            <Link href={`/privacy`}>
              <a>
                <Text margin={width < 1000 ? `0 15px 0 0` : `0 40px 0 0`}>
                  개인정보수집동의
                </Text>
              </a>
            </Link>

            <Link href={`/contact/partner`}>
              <a>
                <Text margin={width < 1000 ? `0 15px 0 0` : `0 40px 0 0`}>
                  이용약관
                </Text>
              </a>
            </Link>
            {/* <Link href={`/contact/advertisement`}>
              <a>
                <Text margin={width < 1000 ? `0 15px 0 0` : `0 40px 0 0`}>
                  고객센터
                </Text>
              </a>
            </Link> */}
          </Wrapper>
          <Wrapper
            width={width < 1000 ? `100%` : `auto`}
            margin={width < 1000 && `15px 0 0`}
            al={`flex-end`}
            fontSize={width < 800 && `10px`}
          >
            <Text>
              평일 오전 09:00 ~ 오후 6:00 / 토요일 오전 09:00 ~ 오후 5:00 / 일,
              공휴일 휴무
            </Text>
            <Text>점심시간 12:00 ~ 13:00</Text>
          </Wrapper>
        </Wrapper>
        <Wrapper
          dr={`row`}
          ju={`space-between`}
          padding={width < 800 ? `20px 0 40px` : `40px 0 60px`}
        >
          <Wrapper width={`auto`} al={`flex-start`}>
            {companys && (
              <>
                <Wrapper width={`auto`} dr={`row`}>
                  {companys[0] && (
                    <Text>{`${companys[0].name} : ${companys[0].value}`}</Text>
                  )}

                  {companys[1] && (
                    <Text margin={`0 0 0 20px`}>
                      {`${companys[1].name} : ${companys[1].value}`}
                    </Text>
                  )}
                </Wrapper>
                <Wrapper
                  width={`auto`}
                  dr={`row`}
                  color={Theme.grey_C}
                  margin={`10px 0 0`}
                >
                  {companys[2] && (
                    <Text>{`${companys[2].name} : ${companys[2].value}`}</Text>
                  )}
                </Wrapper>
                <Wrapper
                  width={`auto`}
                  dr={`row`}
                  ju={`flex-start`}
                  color={Theme.grey_C}
                  margin={`10px 0`}
                >
                  {companys[3] && (
                    <Text>{`${companys[3].name} : ${companys[3].value}`}</Text>
                  )}

                  {companys[5] && (
                    <Text margin={`0 0 0 20px`}>
                      <a
                        href={`mailto:${companys[5].value}`}
                      >{`${companys[5].name} : ${companys[5].value}`}</a>
                    </Text>
                  )}
                </Wrapper>

                <Wrapper
                  width={`auto`}
                  dr={`row`}
                  color={Theme.grey_C}
                  margin={`0 0 10px`}
                >
                  {companys[4] && (
                    <Text>{`${companys[4].name} : ${companys[4].value}`}</Text>
                  )}
                </Wrapper>
              </>
            )}

            <Wrapper width={`auto`} fontSize={width < 800 && `11px`}>
              COPYRIGHT © 2022 대한기계공구(주). ALL RIGHTS RESERVED.
            </Wrapper>
          </Wrapper>

          <Image
            margin={width < 800 && `20px 0 0`}
            alt="logo"
            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/logo/logo_footer.png`}
            width={width < 900 ? `150px` : `250px`}
          />
        </Wrapper>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default AppFooter;
