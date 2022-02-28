import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Modal, Table, notification, Input, message } from "antd";
import {
  UPDATE_MODAL_CLOSE_REQUEST,
  UPDATE_MODAL_OPEN_REQUEST,
  QUESTION_UPDATE_REQUEST,
  QUESTION_DELETE_REQUEST,
  QUESTION_GET_REQUEST,
  QUESTION_TYPE_GET_REQUEST,
} from "../../../reducers/question";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import { useRouter } from "next/router";
import useInput from "../../../hooks/useInput";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { ColWrapper, RowWrapper } from "../../../components/commonComponents";
import { saveAs } from "file-saver";
import Theme from "../../../components/Theme";
import { CONTACT_GET_REQUEST } from "../../../reducers/contact";

const AdminContent = styled.div`
  padding: 20px;
`;

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const List = ({ location }) => {
  // LOAD CURRENT INFO AREA /////////////////////////////////////////////
  const { me, st_loadMyInfoDone } = useSelector((state) => state.user);

  const { contacts } = useSelector((state) => state.contact);

  const dispatch = useDispatch();
  const router = useRouter();

  ////// HOOKS //////

  ////// USEEFFECT //////
  useEffect(() => {
    dispatch({
      type: CONTACT_GET_REQUEST,
    });
  }, []);

  ////// TOGGLE //////

  ////// HANDLER //////

  ////// DATAVIEW //////

  // Table
  const columns = [
    {
      title: "번호",
      dataIndex: "id",
    },

    {
      title: "제목",
      render: (data) => <div>{data.title}</div>,
    },
    {
      title: "처리여부",
      render: (data) => <div>{data.isCompleted ? `완료` : `미완료`}</div>,
    },
    ,
    {
      title: "작성일",
      render: (data) => {
        return <div>{data.createdAt.substring(0, 10)}</div>;
      },
    },
    {
      title: "처리일",
      render: (data) => <div>{data.updatedAt.substring(0, 10)}</div>,
    },
    {
      title: "상세보기",
      render: (data) => (
        <Button
          type="primary"
          size="small"
          onClick={() => updateModalOpen(data)}
        >
          상세보기
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["문의 관리", "문의 리스트"]}
        title={`문의 리스트`}
        subTitle={`홈페이지의 문의를 관리할 수 있습니다.`}
      />
      {/* <AdminTop createButton={true} createButtonAction={() => {})} /> */}

      <AdminContent>
        <RowWrapper margin={`0 0 10px 0`} gutter={5}>
          <Col>
            <Button
              size="small"
              onClick={() => moveLinkHandler(`/admin/question/list?type=3`)}
            >
              전체
            </Button>
          </Col>
          <Col>
            <Button
              size="small"
              onClick={() => moveLinkHandler(`/admin/question/list?type=2`)}
            >
              처리완료
            </Button>
          </Col>
          <Col>
            <Button
              size="small"
              onClick={() => moveLinkHandler(`/admin/question/list?type=1`)}
            >
              미처리
            </Button>
          </Col>
        </RowWrapper>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={contacts ? contacts.contacts : []}
          size="small"
          //   pagination={{
          //     defaultCurrent: 1,
          //     current: parseInt(currentPage),

          //     total: listMaxPage * 10,
          //     onChange: (page) => otherPageCall(page),
          //   }}
        />
      </AdminContent>

      {/* <Modal
        visible={updateModal}
        width={`1000px`}
        title={`문의`}
        onCancel={updateModalClose}
        onOk={onSubmitUpdate}
        okText="처리완료"
        cancelText="취소"
      >
        <RowWrapper padding={`50px`}>
          <ColWrapper
            span={12}
            al={`flex-start`}
            ju={`flex-start`}
            padding={`0 30px 0 0`}
          >
            <RowWrapper gutter={5}>
              <ColWrapper
                width={`120px`}
                height={`30px`}
                bgColor={Theme.basicTheme_C}
              >
                이메일
              </ColWrapper>
              <ColWrapper>{updateData && updateData.email}</ColWrapper>
            </RowWrapper>
            <RowWrapper gutter={5}>
              <ColWrapper
                width={`120px`}
                height={`30px`}
                bgColor={Theme.basicTheme_C}
                height={`30px`}
              >
                문의 제목
              </ColWrapper>
              <ColWrapper>{updateData && updateData.title}</ColWrapper>
            </RowWrapper>
            <RowWrapper gutter={5}>
              <ColWrapper
                width={`120px`}
                height={`30px`}
                bgColor={Theme.basicTheme_C}
                height={`30px`}
              >
                작성자
              </ColWrapper>
              <ColWrapper>{updateData && updateData.author}</ColWrapper>
            </RowWrapper>
            <RowWrapper gutter={5}>
              <ColWrapper
                width={`120px`}
                height={`30px`}
                bgColor={Theme.basicTheme_C}
                height={`30px`}
              >
                연락처
              </ColWrapper>
              <ColWrapper>{updateData && updateData.mobile}</ColWrapper>
            </RowWrapper>
            <RowWrapper gutter={5} margin={`10px 0`}>
              <ColWrapper span={24} width={`100%`} bgColor={Theme.basicTheme_C}>
                문의 내용
              </ColWrapper>
              <ColWrapper>{updateData && updateData.content}</ColWrapper>
            </RowWrapper>
          </ColWrapper>
          <ColWrapper span={12}>
            <ColWrapper bgColor={Theme.basicTheme_C} width={`100%`}>
              답변
            </ColWrapper>
            <Input.TextArea
              allowClear
              placeholder="Content..."
              autoSize={{ minRows: 10, maxRows: 10 }}
            />
          </ColWrapper>
        </RowWrapper>
      </Modal> */}
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default List;
