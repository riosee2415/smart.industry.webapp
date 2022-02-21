import { createGlobalStyle, css } from "styled-components";

const fontStyle = css`
  @import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);

  @font-face {
    font-family: "GongGothicBold";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicBold.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
`;

const GlobalStyles = createGlobalStyle`
  ${fontStyle}

  body {
    font-family: 'Noto Sans KR', sans-serif;
  }

  a {
    color : inherit;
    text-decoration : none;
  }

  textarea {
    resize: none;
    outline: none;
  }

  input {
    outline: none;
  }
  
  a:hover {
    color : inherit;
  }

  .ant-drawer-left .ant-drawer-content-wrapper, .ant-drawer-right .ant-drawer-content-wrapper{
    width: 85% !important;
  }
  
  @media (max-width : 576px) {
    html { 
      font-size : 14px;
    }
  }

  .customoverlay {
   position: relative;
   bottom: 55px;
   border-radius: 6px;
   border: 1px solid #ccc;
   border-bottom: 2px solid #ddd;
   float: left;
  }
  .customoverlay:nth-of-type(n) {
   border: 0;
   box-shadow: 0px 1px 2px #888;
  }
  .customoverlay a {
   display: block;
   text-decoration: none;
   color: #000;
   text-align: center;
   border-radius: 6px;
   font-size: 14px;
   font-weight: bold;
   overflow: hidden;
   background: #004EA2;
   background: #004EA2 url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png') no-repeat right 14px center;
  }
  .customoverlay .title {
   display: block;
   text-align: center;
   background: #fff;
   margin-right: 35px;
   padding: 10px 15px;
   font-size: 14px;
   font-weight: bold;
  }
  .customoverlay:after {
   content:'';
   position:absolute;
   margin-left:-12px;
   left:50%;
   bottom:-12px;
   width:22px;
   height:12px;
   background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')
  }
  
  .ant-notification{
    z-index: 10000 !important;
  }
`;

export default GlobalStyles;
