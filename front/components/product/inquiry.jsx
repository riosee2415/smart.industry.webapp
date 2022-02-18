import { Table } from "antd";
import React from "react";
import { Wrapper } from "../commonComponents";

const Inquiry = () => {
  ////// DATAIVEW //////

  const columns = [
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "제목",
      dataIndex: "id",
    },
    {
      title: "작성자",
      dataIndex: "id",
    },
    {
      title: "작성일",
      dataIndex: "id",
    },
    {
      title: "조회수",
      dataIndex: "id",
    },
  ];
  return (
    <Wrapper>
      <Table style={{ width: `100%` }} size="middle" columns={columns} />
    </Wrapper>
  );
};

export default Inquiry;
