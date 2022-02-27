import React from "react";
import styled from "styled-components";
import { Table } from "antd";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";

const AdminContent = styled.div`
  padding: 20px;
`;

const BoughtList = () => {
  ////// DATAVIEW //////

  const columns = [
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "",
      dataIndex: "id",
    },
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "번호",
      dataIndex: "id",
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["상품 관리", "상품 주문 리스트"]}
        title={`상품 주문 리스트`}
        subTitle={`홈페이지에서 신청한 상품 주문을 관리할 수 있습니다.`}
      />
      <AdminContent>
        <Table />
      </AdminContent>
    </AdminLayout>
  );
};

export default BoughtList;
