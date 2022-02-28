import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Modal,
  Table,
  notification,
  Input,
  message,
  Popconfirm,
} from "antd";

import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import { useRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { ColWrapper, RowWrapper } from "../../../components/commonComponents";
import { saveAs } from "file-saver";
import Theme from "../../../components/Theme";
import {
  CONTACT_COMPLETED_REQUEST,
  CONTACT_GET_REQUEST,
  CREATE_MODAL_TOGGLE,
} from "../../../reducers/contact";
import useInput from "../../../hooks/useInput";

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

  const {
    contacts,
    listMaxPage,
    createModal,
    //
    st_contactCompletedDone,
    st_contactCompletedError,
  } = useSelector((state) => state.contact);

  const dispatch = useDispatch();
  const router = useRouter();

  ////// HOOKS //////

  const [currentPage, setCurrentPage] = useState(1);
  const [selectType, setSelectType] = useState(3);
  const [updateData, setUpdateData] = useState(null);
  const answerInput = useInput("");

  ////// USEEFFECT //////
  useEffect(() => {
    dispatch({
      type: CONTACT_GET_REQUEST,
      data: {
        page: currentPage,
        isCompleted:
          selectType === 1
            ? null
            : selectType === 2
            ? true
            : selectType === 3 && false,
      },
    });
  }, [selectType]);

  useEffect(() => {
    if (st_contactCompletedDone) {
      dispatch({
        type: CONTACT_GET_REQUEST,
        data: {
          page: currentPage,
          isCompleted:
            selectType === 1
              ? null
              : selectType === 2
              ? true
              : selectType === 3 && false,
        },
      });
      dispatch({
        type: CREATE_MODAL_TOGGLE,
      });
      setUpdateData(null);
      answerInput.setValue("");
      return message.success("처리완료되었습니다.");
    }
  }, [st_contactCompletedDone]);

  useEffect(() => {
    if (st_contactCompletedError) {
      return message.error(st_contactCompletedError);
    }
  }, [st_contactCompletedError]);

  ////// TOGGLE //////

  const updateModalToggle = useCallback(
    (data) => {
      if (data) {
        setUpdateData(data);
        answerInput.setValue(data.answer);
      } else {
        setUpdateData(null);
      }
      dispatch({
        type: CREATE_MODAL_TOGGLE,
      });
    },
    [updateData]
  );

  ////// HANDLER //////

  const selectTypeHandler = useCallback(
    (type) => {
      setSelectType(type);
    },
    [selectType]
  );

  const onUpdateHandler = useCallback(() => {
    dispatch({
      type: CONTACT_COMPLETED_REQUEST,
      data: {
        id: updateData.id,
        answer: answerInput.value,
      },
    });
  }, [updateData, answerInput.value]);

  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);

      dispatch({
        type: CONTACT_GET_REQUEST,
        data: {
          page: changePage,
          isCompleted:
            selectType === 1
              ? null
              : selectType === 2
              ? true
              : selectType === 3 && false,
        },
      });
    },
    [selectType, currentPage]
  );
  ////// DATAVIEW //////

  // Table
  const columns = [
    {
      title: "번호",
      dataIndex: "id",
    },

    {
      title: "종류",
      dataIndex: "type",
    },

    {
      title: "제목",
      dataIndex: "title",
    },

    {
      title: "작성자",
      dataIndex: "author",
    },
    {
      title: "처리여부",
      render: (data) => <div>{data.isCompleted ? `완료` : `미완료`}</div>,
    },
    ,
    {
      title: "작성일",
      dataIndex: "createdAt",
    },
    {
      title: "상세보기",
      render: (data) => (
        <Button
          type="primary"
          size="small"
          onClick={() => updateModalToggle(data)}
        >
          상세보기
        </Button>
      ),
    },
  ];
  const completedColumns = [
    {
      title: "번호",
      dataIndex: "id",
    },

    {
      title: "종류",
      dataIndex: "type",
    },

    {
      title: "제목",
      dataIndex: "title",
    },

    {
      title: "작성자",
      dataIndex: "author",
    },
    {
      title: "처리여부",
      render: (data) => <div>{data.isCompleted ? `완료` : `미완료`}</div>,
    },
    ,
    {
      title: "작성일",
      dataIndex: "createdAt",
    },
    {
      title: "상세보기",
      render: (data) => (
        <Button
          type="primary"
          size="small"
          onClick={() => updateModalToggle(data)}
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
        subTitle={`홈페이지의 임대문의, 사업자문의, 장비판매의뢰를 관리할 수 있습니다.`}
      />
      {/* <AdminTop createButton={true} createButtonAction={() => {})} /> */}

      <AdminContent>
        <RowWrapper margin={`0 0 10px 0`} gutter={5}>
          <Col>
            <Button
              style={{ width: `70px` }}
              size="small"
              type={selectType === 3 && "primary"}
              onClick={() => selectTypeHandler(3)}
            >
              미처리
            </Button>
          </Col>
          <Col>
            <Button
              style={{ width: `70px` }}
              size="small"
              type={selectType === 2 && "primary"}
              onClick={() => selectTypeHandler(2)}
            >
              처리
            </Button>
          </Col>
          <Col>
            <Button
              style={{ width: `70px` }}
              size="small"
              type={selectType === 1 && "primary"}
              onClick={() => selectTypeHandler(1)}
            >
              전체
            </Button>
          </Col>
        </RowWrapper>
        <Table
          rowKey="id"
          columns={selectType !== 3 ? completedColumns : columns}
          dataSource={contacts ? contacts : []}
          size="small"
          pagination={{
            defaultCurrent: 1,
            current: parseInt(currentPage),
            total: listMaxPage * 10,
            onChange: (page) => otherPageCall(page),
          }}
        />
      </AdminContent>

      <Modal
        visible={createModal}
        width={`1000px`}
        title={`문의`}
        onCancel={() => updateModalToggle(null)}
        onOk={onUpdateHandler}
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
                color={Theme.white_C}
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
                color={Theme.white_C}
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
                color={Theme.white_C}
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
                color={Theme.white_C}
              >
                연락처
              </ColWrapper>
              <ColWrapper>{updateData && updateData.mobile}</ColWrapper>
            </RowWrapper>
            <RowWrapper gutter={5} margin={`10px 0`}>
              <ColWrapper
                span={24}
                width={`100%`}
                bgColor={Theme.basicTheme_C}
                color={Theme.white_C}
              >
                문의 내용
              </ColWrapper>
              <ColWrapper>{updateData && updateData.content}</ColWrapper>
            </RowWrapper>
          </ColWrapper>
          <ColWrapper span={12}>
            <ColWrapper
              bgColor={Theme.basicTheme_C}
              width={`100%`}
              color={Theme.white_C}
            >
              답변
            </ColWrapper>
            <Input.TextArea
              allowClear
              placeholder="Content..."
              autoSize={{ minRows: 10, maxRows: 10 }}
              {...answerInput}
            />
          </ColWrapper>
        </RowWrapper>
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default List;
