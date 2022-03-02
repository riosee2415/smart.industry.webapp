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
  const dispatch = useDispatch();

  const [updateData, setUpdateData] = useState(null);

  const [deletePopVisible, setDeletePopVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const answer = useInput("");

  const {
    questions,
    types,
    listMaxPage,
    updateModal,

    st_questionUpdateDone,
    st_questionDeleteDone,

    st_questionUpdateError,
    st_questionDeleteError,
  } = useSelector((state) => state.question);

  const [currentPage, setCurrentPage] = useState(1);

  const getQs = () => {
    const qs = router.query;

    let value = "";

    if (!qs.page) {
      setCurrentPage(1);
      value = "?page=1";
    } else {
      setCurrentPage(qs.page);
      value = `?page=${qs.page}`;
    }

    if (qs.search) {
      value += `&search=${qs.search}`;
    }

    return value;
  };

  ////// USEEFFECT //////
  useEffect(() => {
    const qs = router.query;

    dispatch({
      type: QUESTION_TYPE_GET_REQUEST,
    });

    dispatch({
      type: QUESTION_GET_REQUEST,
      data: { listType: qs.type ? qs.type : 3 },
    });
  }, [router.query]);

  useEffect(() => {
    if (st_questionUpdateDone) {
      const qs = router.query;

      dispatch({
        type: QUESTION_GET_REQUEST,
        data: { listType: qs.type ? qs.type : 3 },
      });

      dispatch({
        type: UPDATE_MODAL_CLOSE_REQUEST,
      });
      return message.success("처리되었습니다.");
    }
  }, [st_questionUpdateDone]);

  useEffect(() => {
    if (st_questionUpdateError) {
      return message.error(st_questionUpdateError);
    }
  }, [st_questionUpdateError]);

  useEffect(() => {
    if (st_questionDeleteDone) {
      const qs = router.query;

      dispatch({
        type: QUESTION_GET_REQUEST,
        data: { listType: qs.type ? qs.type : 3 },
      });

      return message.success("삭제되었습니다.");
    }
  }, [st_questionDeleteDone]);

  useEffect(() => {
    if (st_questionDeleteError) {
      return message.error(st_questionDeleteError);
    }
  }, [st_questionDeleteError]);

  ////// TOGGLE //////
  const otherPageCall = useCallback((changePage) => {
    setCurrentPage(changePage);
    const queryString = `?page=${changePage}`;

    dispatch({
      type: QUESTION_GET_REQUEST,
      data: {
        qs: queryString || "",
      },
    });
  }, []);

  const updateModalOpen = useCallback(
    (data) => {
      dispatch({
        type: UPDATE_MODAL_OPEN_REQUEST,
      });

      // let type = "";

      // for (let i = 0; i < types.length; i++) {
      //   if (data.QuestionTypeId === types[i].id) {
      //     type = types[i].value;
      //   }
      // }

      answer.setValue(data.answer);
      setUpdateData({ ...data });
    },
    [updateModal]
  );

  const updateModalClose = useCallback(() => {
    dispatch({
      type: UPDATE_MODAL_CLOSE_REQUEST,
    });
    setUpdateData(null);
  }, [updateModal]);

  ////// HANDLER //////
  const onSubmitUpdate = useCallback(() => {
    if (!answer.value || answer.value.trim() === "") {
      return LoadNotification("ADMIN SYSTEM ERRLR", "문의 답변을 입력해주세요");
    }

    dispatch({
      type: QUESTION_UPDATE_REQUEST,
      data: {
        id: updateData.id,
        answer: answer.value,
        title: updateData.title,
        content: updateData.content,
      },
    });
  }, [updateData, answer]);
  ////// DATAVIEW //////

  // Table
  const columns = [
    {
      title: "번호",
      dataIndex: "id",
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
        breadcrumbs={["문의 관리", "1:1 문의 리스트"]}
        title={`1:1 문의 리스트`}
        subTitle={`홈페이지의 1:1 문의를 관리할 수 있습니다.`}
      />
      {/* <AdminTop createButton={true} createButtonAction={() => {})} /> */}

      <AdminContent>
        <RowWrapper margin={`0 0 10px 0`} gutter={5}>
          <Col>
            <Button
              style={{ width: "70px" }}
              size="small"
              type={router.query && router.query.type === "1" && "primary"}
              onClick={() => moveLinkHandler(`/admin/question/list?type=1`)}
            >
              미처리
            </Button>
          </Col>
          <Col>
            <Button
              style={{ width: "70px" }}
              size="small"
              type={router.query && router.query.type === "2" && "primary"}
              onClick={() => moveLinkHandler(`/admin/question/list?type=2`)}
            >
              처리
            </Button>
          </Col>
          <Col>
            <Button
              style={{ width: "70px" }}
              size="small"
              type={router.query && router.query.type === "3" && "primary"}
              onClick={() => moveLinkHandler(`/admin/question/list?type=3`)}
            >
              전체
            </Button>
          </Col>
        </RowWrapper>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={questions ? questions.questions : []}
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
                color={Theme.white_C}
              >
                이메일
              </ColWrapper>
              <ColWrapper>{updateData && updateData.email}</ColWrapper>
            </RowWrapper>
            {/*  */}
            <RowWrapper gutter={5}>
              <ColWrapper
                width={`120px`}
                height={`30px`}
                bgColor={Theme.basicTheme_C}
                color={Theme.white_C}
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
                color={Theme.white_C}
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
                color={Theme.white_C}
                height={`30px`}
              >
                연락처
              </ColWrapper>
              <ColWrapper>{updateData && updateData.mobile}</ColWrapper>
            </RowWrapper>
            {/*  */}
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
              {...answer}
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
