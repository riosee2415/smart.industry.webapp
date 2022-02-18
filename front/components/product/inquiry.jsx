import { Table } from "antd";
import React from "react";
import { Wrapper, CommonButton } from "../commonComponents";
import styled from "styled-components";
import Theme from "../Theme";

const CustomTable = styled(Table)`
  & .ant-table-thead tr {
    border-top: 1px solid ${Theme.grey2_C} !important;
    border-bottom: 1px solid ${Theme.grey2_C} !important;
  }

  & .ant-table-thead .ant-table-cell {
    height: 40px;
    text-align: center;
  }
  & .ant-table-thead .ant-table-cell::before {
    display: none;
  }
`;

const Inquiry = () => {
  ////// DATAIVEW //////

  const columns = [
    {
      title: "번호",
      dataIndex: "id",
      width: `10%`,
    },
    {
      title: "제목",
      dataIndex: "title",
      width: `60%`,
    },
    {
      title: "작성자",
      dataIndex: "author",
      width: `10%`,
    },
    {
      title: "작성일",
      dataIndex: "createdAt",
      width: `10%`,
    },
    {
      title: "조회수",
      dataIndex: "hit",
      width: `10%`,
    },
  ];

  const testData = [
    {
      id: 1,
      title: "상품문의",
      aouthor: "",
    },
  ];

  return (
    <Wrapper>
      <CustomTable style={{ width: `100%` }} size="middle" columns={columns} />

      <Wrapper al={`flex-end`}>
        <CommonButton
          radius={`0`}
          width={`106px`}
          height={`40px`}
          fontSize={`15px`}
          padding={`0`}
        >
          상품 문의하기
        </CommonButton>
      </Wrapper>
    </Wrapper>
  );
};

export default Inquiry;
