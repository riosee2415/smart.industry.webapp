import React from "react";
import styled from "styled-components";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import { Table } from "antd";

const AdminContent = styled.div`
  padding: 20px;
`;

const ProductList = () => {
  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["상품 관리", "상품 리스트"]}
        title={`상품 리스트`}
        subTitle={`홈페이지에 보여주는 상품을 관리할 수 있습니다.`}
      />

      <AdminContent>
        <Table />
      </AdminContent>
    </AdminLayout>
  );
};

export default ProductList;
