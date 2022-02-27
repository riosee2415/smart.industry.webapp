import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { Table, Button } from "antd";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { useRouter, withRouter } from "next/router";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import { WISH_ADMIN_LIST_REQUEST } from "../../../reducers/wish";

const AdminContent = styled.div`
  padding: 20px;
`;

const BoughtList = () => {
  // LOAD CURRENT INFO AREA /////////////////////////////////////////////
  const { me, st_loadMyInfoDone } = useSelector((state) => state.user);

  const router = useRouter();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);
  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////
  const { adminBoughtList } = useSelector((state) => state.wish);
  console.log(adminBoughtList);

  ////// DATAVIEW //////

  const columns = [
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "주문자",
      dataIndex: "name",
    },
    {
      title: "결제금액",
      dataIndex: "price",
      render: (data) =>
        String(data).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원",
    },
    {
      title: "처리현황",
      dataIndex: "isCompleted",
      render: (data) => (data ? "승인" : "미승인"),
    },
    {
      title: "주문일",
      dataIndex: "createdAt",
      render: (data) => data.substring(0, 10),
    },
    {
      title: "주문상세",
      render: (data) => <Button size="small">주문상세</Button>,
    },
    {
      title: "승인",
      render: (data) => (
        <Button size="small" type="primary">
          승인
        </Button>
      ),
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
        <Table
          size="small"
          columns={columns}
          dataSource={adminBoughtList ? adminBoughtList : []}
        />
      </AdminContent>
    </AdminLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch({
      type: WISH_ADMIN_LIST_REQUEST,
      data: {
        listType: 1,
      },
    });
    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default BoughtList;
