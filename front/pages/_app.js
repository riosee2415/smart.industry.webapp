import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { ThemeProvider } from "styled-components";
import Theme from "../components/Theme";
import GlobalStyles from "../components/GlobalStyles";
import wrapper from "../store/configureStore";
import WidthProvider from "../components/WidthProvider";
import { useRouter } from "next/dist/client/router";
import { useDispatch } from "react-redux";
import { ACCEPT_LOG_CREATE_REQUEST } from "../reducers/accept";

const Fourleaf = ({ Component }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const getIpClient = useCallback(async () => {
    const isCheck = sessionStorage.getItem("QSIDSPDSDQDAQSTEFA");

    if (!isCheck && router.pathname.indexOf("admin") === -1) {
      try {
        const ipData = await fetch("https://geolocation-db.com/json/");
        const locationIp = await ipData.json();

        sessionStorage.setItem(
          "QSIDSPDSDQDAQSTEFA",
          "ISDGSAWDCASDHERGEKIJCSDMK"
        );

        dispatch({
          type: ACCEPT_LOG_CREATE_REQUEST,
          data: {
            ip: locationIp.IPv4,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    getIpClient();
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Head>
        <title>대한기계공구(주) | admin</title>

        <meta name="author" content="4LEAF SOFTWARE <4leaf.ysh@gmail.com>" />
        {/* <!-- OG tag  --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kor09.com/" />
        <meta property="og:image" content="./og_img.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="400" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="canonical" href="https://kor09.com" />
        <meta
          name="keywords"
          content="건설기계, 집진형건식카타기, 집진형그라인다카타기, 집진형보도블럭카타기, 방음형발전기, 도로카타기, 브로워/분무기, 엔진카타기, 진동로라, 람마, 콤팩타, 발전기, 엔진"
        />
        <meta
          property="og:keywords"
          content="건설기계, 집진형건식카타기, 집진형그라인다카타기, 집진형보도블럭카타기, 방음형발전기, 도로카타기, 브로워/분무기, 엔진카타기, 진동로라, 람마, 콤팩타, 발전기, 엔진"
        />
      </Head>
      <Component />
    </ThemeProvider>
  );
};
Fourleaf.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Fourleaf);
