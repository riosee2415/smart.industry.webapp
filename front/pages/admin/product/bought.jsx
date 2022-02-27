import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Table, Button, Popconfirm, Modal, Image, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import axios from "axios";
import { useRouter, withRouter } from "next/router";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import wrapper from "../../../store/configureStore";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import {
  DETAIL_MODAL_TOGGLE,
  WISH_ADMIN_LIST_REQUEST,
  WISH_COMPLETED_REQUEST,
} from "../../../reducers/wish";
import { Wrapper, Text } from "../../../components/commonComponents";
import Theme from "../../../components/Theme";

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
  const {
    adminBoughtList,
    detailModal,
    st_wishCompletedDone,
    st_wishCompletedError,
  } = useSelector((state) => state.wish);
  const dispatch = useDispatch();

  const [detailData, setDetailData] = useState(null);
  const [listType, setListType] = useState(1);

  ////// TOGGLE //////
  const detailModalToggle = useCallback(
    (data) => {
      if (data) {
        setDetailData(data);
      } else {
        setDetailData(null);
      }
      dispatch({
        type: DETAIL_MODAL_TOGGLE,
      });
    },
    [detailModal]
  );

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_wishCompletedDone) {
      dispatch({
        type: WISH_ADMIN_LIST_REQUEST,
        data: {
          listType: listType,
        },
      });

      return message.success("승인되었습니다.");
    }
  }, [st_wishCompletedDone]);

  useEffect(() => {
    if (st_wishCompletedError) {
      return message.error(st_wishCompletedError);
    }
  }, [st_wishCompletedError]);

  useEffect(() => {
    dispatch({
      type: WISH_ADMIN_LIST_REQUEST,
      data: {
        listType: listType,
      },
    });
  }, [listType]);

  ////// TOGGLE //////
  const listTypeHandler = useCallback(
    (data) => {
      setListType(data);
    },
    [listType]
  );

  ////// HANDLER //////
  const completedUpdate = useCallback((id) => {
    dispatch({
      type: WISH_COMPLETED_REQUEST,
      data: {
        id,
      },
    });
  }, []);

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
      render: (data) => (
        <Button size="small" onClick={() => detailModalToggle(data)}>
          주문상세
        </Button>
      ),
    },
    {
      title: "승인",
      render: (data) => (
        <Popconfirm
          title="승인하시겠습니까?"
          onConfirm={() => completedUpdate(data.id)}
          okText="승인"
          cancelText="취소"
        >
          <Button size="small" type="primary">
            승인
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const completedColumns = [
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
      render: (data) => (
        <Button size="small" onClick={() => detailModalToggle(data)}>
          주문상세
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
        <Wrapper dr={`row`} ju={`flex-start`}>
          <Button
            style={{ width: `70px` }}
            size="small"
            type={listType === 1 && "primary"}
            onClick={() => listTypeHandler(1)}
          >
            미승인
          </Button>
          <Button
            style={{ width: `70px`, margin: `0 5px` }}
            size="small"
            type={listType === 2 && "primary"}
            onClick={() => listTypeHandler(2)}
          >
            승인
          </Button>
          <Button
            style={{ width: `70px` }}
            size="small"
            type={listType === 3 && "primary"}
            onClick={() => listTypeHandler(3)}
          >
            전체조회
          </Button>
        </Wrapper>
        <Table
          size="small"
          columns={listType !== 1 ? completedColumns : columns}
          dataSource={adminBoughtList ? adminBoughtList : []}
        />
      </AdminContent>
      <Modal
        title="주문상세"
        width={`900px`}
        visible={detailModal}
        onCancel={() => detailModalToggle(null)}
        footer={null}
      >
        <Wrapper border={`1px solid ${Theme.basicTheme_C}`}>
          <Wrapper dr={`row`} borderBottom={`1px solid ${Theme.basicTheme_C}`}>
            <Wrapper width={`calc(100% / 3)`} dr={`row`}>
              <Wrapper
                width={`30%`}
                bgColor={Theme.basicTheme_C}
                color={Theme.white_C}
                padding={`20px 0`}
              >
                주문자
              </Wrapper>
              <Wrapper
                width={`70%`}
                padding={`20px 0`}
                borderLeft={`1px solid ${Theme.basicTheme_C}`}
                borderRight={`1px solid ${Theme.basicTheme_C}`}
              >
                {detailData && detailData.name}
              </Wrapper>
            </Wrapper>
            <Wrapper width={`calc(100% / 3)`} dr={`row`}>
              <Wrapper
                width={`30%`}
                bgColor={Theme.basicTheme_C}
                color={Theme.white_C}
                padding={`20px 0`}
              >
                전화번호
              </Wrapper>
              <Wrapper
                width={`70%`}
                padding={`20px 0`}
                borderLeft={`1px solid ${Theme.basicTheme_C}`}
                borderRight={`1px solid ${Theme.basicTheme_C}`}
              >
                {detailData && detailData.mobile}
              </Wrapper>
            </Wrapper>
            <Wrapper width={`calc(100% / 3)`} dr={`row`}>
              <Wrapper
                width={`30%`}
                bgColor={Theme.basicTheme_C}
                color={Theme.white_C}
                padding={`20px 0`}
              >
                작성일
              </Wrapper>
              <Wrapper
                width={`70%`}
                padding={`20px 0`}
                borderLeft={`1px solid ${Theme.basicTheme_C}`}
              >
                {detailData && detailData.createdAt.substring(0, 10)}
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper
            dr={`row`}
            ju={`flex-end`}
            position={`relative`}
            borderBottom={`1px solid ${Theme.basicTheme_C}`}
          >
            <Wrapper
              width={`30%`}
              height={`100%`}
              bgColor={Theme.basicTheme_C}
              color={Theme.white_C}
              position={`absolute`}
              top={`0`}
              left={`0`}
            >
              주문 내용
            </Wrapper>
            <Wrapper
              width={`70%`}
              padding={`20px 0`}
              borderLeft={`1px solid ${Theme.basicTheme_C}`}
            >
              <Text>{detailData && detailData.content}</Text>
            </Wrapper>
          </Wrapper>

          <Wrapper dr={`row`} ju={`flex-end`} position={`relative`}>
            <Wrapper
              width={`30%`}
              height={`100%`}
              bgColor={Theme.basicTheme_C}
              color={Theme.white_C}
              position={`absolute`}
              top={`0`}
              left={`0`}
            >
              주문 번호
            </Wrapper>
            <Wrapper
              width={`70%`}
              padding={`20px 0`}
              borderLeft={`1px solid ${Theme.basicTheme_C}`}
            >
              <Text>{detailData && detailData.orderNum}</Text>
            </Wrapper>
          </Wrapper>

          <Wrapper
            padding={`10px`}
            borderTop={`1px solid ${Theme.basicTheme_C}`}
          >
            {detailData &&
              detailData.WishItems.map((data, idx) => {
                return (
                  <Wrapper
                    border={`1px solid ${Theme.basicTheme_C}`}
                    margin={`0 0 10px`}
                  >
                    <Wrapper
                      dr={`row`}
                      borderBottom={`1px solid ${Theme.basicTheme_C}`}
                    >
                      <Wrapper
                        width={`30%`}
                        bgColor={Theme.basicTheme_C}
                        color={Theme.white_C}
                        padding={`10px 0`}
                      >
                        상품이름
                      </Wrapper>
                      <Wrapper
                        width={`70%`}
                        padding={`10px 0`}
                        borderLeft={`1px solid ${Theme.basicTheme_C}`}
                      >
                        {data.Product.title}
                      </Wrapper>
                    </Wrapper>
                    <Wrapper
                      dr={`row`}
                      borderBottom={`1px solid ${Theme.basicTheme_C}`}
                    >
                      <Wrapper
                        width={`30%`}
                        bgColor={Theme.basicTheme_C}
                        color={Theme.white_C}
                        padding={`10px 0`}
                      >
                        상품가격
                      </Wrapper>
                      <Wrapper
                        width={`70%`}
                        padding={`10px 0`}
                        borderLeft={`1px solid ${Theme.basicTheme_C}`}
                      >
                        {String(
                          data.Product.price -
                            data.Product.price * (data.Product.discount / 100) +
                            data.Product.deliveryPay
                        ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </Wrapper>
                    </Wrapper>
                    <Wrapper dr={`row`}>
                      <Wrapper
                        width={`30%`}
                        bgColor={Theme.basicTheme_C}
                        color={Theme.white_C}
                        padding={`10px 0`}
                      >
                        상품수량
                      </Wrapper>
                      <Wrapper
                        width={`70%`}
                        padding={`10px 0`}
                        borderLeft={`1px solid ${Theme.basicTheme_C}`}
                      >
                        {data.count}개
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                );
              })}
          </Wrapper>
        </Wrapper>
      </Modal>
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
