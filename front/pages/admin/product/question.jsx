import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Modal, Table, notification, Input, message } from "antd";
import {
  PRODUCT_ADMIN_QUESTION_LIST_REQUEST,
  PRODUCT_QUESTION_UPDATE_REQUEST,
} from "../../../reducers/product";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import { useRouter } from "next/router";
import useInput from "../../../hooks/useInput";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  ColWrapper,
  RowWrapper,
  Image,
  Wrapper,
} from "../../../components/commonComponents";
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

const Question = () => {
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

  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const answer = useInput("");

  const {
    productAdminQuestionList,

    st_productAdminQuestionListDone,
    st_productAdminQuestionListError,

    st_productQuestionUpdateDone,
    st_productQuestionUpdateError,
  } = useSelector((state) => state.product);

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_productAdminQuestionListError) {
      return LoadNotification(
        "ADMIN SYSTEM ERRLR",
        st_productAdminQuestionListError
      );
    }
  }, [st_productAdminQuestionListError]);

  useEffect(() => {
    const qs = router.query;

    dispatch({
      type: PRODUCT_ADMIN_QUESTION_LIST_REQUEST,
      data: { listType: qs.type ? qs.type : 3 },
    });
  }, [router.query]);

  useEffect(() => {
    if (st_productQuestionUpdateDone) {
      const qs = router.query;

      dispatch({
        type: PRODUCT_ADMIN_QUESTION_LIST_REQUEST,
        data: { listType: qs.type ? qs.type : 3 },
      });

      setUpdateModal(false);
      return message.success("승인이 완료 되었습니다.");
    }
  }, [st_productQuestionUpdateDone]);

  useEffect(() => {
    if (st_productQuestionUpdateError) {
      return LoadNotification(
        "ADMIN SYSTEM ERRLR",
        st_productQuestionUpdateError
      );
    }
  }, [st_productQuestionUpdateError]);

  ////// TOGGLE //////

  const updateModalOpen = useCallback(
    (data) => {
      answer.setValue(data.answer);
      setUpdateData({ ...data });
      setUpdateModal(true);
    },
    [updateModal]
  );

  const updateModalClose = useCallback(() => {
    setUpdateModal(false);
    setUpdateData(null);
  }, [updateModal]);

  ////// HANDLER //////
  const onSubmitUpdate = useCallback(() => {
    if (!answer.value || answer.value.trim() === "") {
      return LoadNotification("ADMIN SYSTEM ERRLR", "문의 답변을 입력해주세요");
    }

    dispatch({
      type: PRODUCT_QUESTION_UPDATE_REQUEST,
      data: {
        id: updateData.id,
        answer: answer.value,
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
      render: (data) => <div>{data.title}</div>,
    },
    {
      title: "답변 승인",
      render: (data) => <div>{data.isComplete ? `완료` : `미완료`}</div>,
    },
    ,
    {
      title: "생성일",
      render: (data) => {
        return <div>{data.createdAt.substring(0, 10)}</div>;
      },
    },
    {
      title: "승인일",
      render: (data) => <div>{data.updatedAt.substring(0, 10)}</div>,
    },
    {
      title: "승인",
      render: (data) => (
        <Button type="primary" onClick={() => updateModalOpen(data)}>
          승인
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["상품 문의", "상품 문의 리스트"]}
        title={`상품 문의 리스트`}
        subTitle={`홈페이지의 상품 문의를 관리할 수 있습니다.`}
      />

      {/* <AdminTop createButton={true} createButtonAction={createClick} /> */}

      {/* <AdminTop createButton={true} createButtonAction={createClick} /> */}

      <AdminContent>
        <RowWrapper margin={`0 0 10px 0`} gutter={5}>
          <Col>
            <Button
              onClick={() => moveLinkHandler(`/admin/product/question?type=3`)}>
              전체
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => moveLinkHandler(`/admin/product/question?type=2`)}>
              처리완료
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => moveLinkHandler(`/admin/product/question?type=1`)}>
              미처리
            </Button>
          </Col>
        </RowWrapper>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={productAdminQuestionList ? productAdminQuestionList : []}
          size="middle"
        />
      </AdminContent>

      <Modal
        visible={updateModal}
        width={`1000px`}
        title={`문의`}
        onCancel={updateModalClose}
        onOk={onSubmitUpdate}
        okText="승인"
        cancelText="취소">
        <RowWrapper padding={`50px`}>
          <ColWrapper
            span={12}
            al={`flex-start`}
            ju={`flex-start`}
            padding={`0 30px 0 0`}>
            <Wrapper>
              <Wrapper height={`30px`} bgColor={Theme.basicTheme_C}>
                상품 사진
              </Wrapper>
              <Image
                width={`100%`}
                height={`150px`}
                src={updateData && updateData.Product.thumbnail}
              />
            </Wrapper>
            <RowWrapper gutter={5}>
              <ColWrapper
                width={`120px`}
                height={`30px`}
                margin={`10px 0 0 0`}
                bgColor={Theme.basicTheme_C}>
                상품 이름
              </ColWrapper>
              <ColWrapper>{`${
                updateData && updateData.Product.title
              }`}</ColWrapper>
            </RowWrapper>
            {/*  */}
            <RowWrapper gutter={5}>
              <ColWrapper
                width={`120px`}
                height={`30px`}
                margin={`10px 0 0 0`}
                bgColor={Theme.basicTheme_C}>
                이름
              </ColWrapper>
              <ColWrapper>{`${updateData && updateData.author}`}</ColWrapper>
            </RowWrapper>
            {/*  */}
            <RowWrapper gutter={5}>
              <ColWrapper
                width={`120px`}
                height={`30px`}
                margin={`10px 0 0 0`}
                bgColor={Theme.basicTheme_C}>
                이메일
              </ColWrapper>
              <ColWrapper>{`${updateData && updateData.email}`}</ColWrapper>
            </RowWrapper>
            {/*  */}
            <RowWrapper gutter={5} margin={`10px 0`}>
              <ColWrapper
                width={`120px`}
                height={`30px`}
                bgColor={Theme.basicTheme_C}>
                핸드폰 번호
              </ColWrapper>
              <ColWrapper>{updateData && updateData.mobile}</ColWrapper>
            </RowWrapper>
            {/*  */}
            <RowWrapper gutter={5}>
              <ColWrapper
                width={`120px`}
                height={`30px`}
                bgColor={Theme.basicTheme_C}
                height={`30px`}>
                상품 문의 제목
              </ColWrapper>
              <ColWrapper>{updateData && updateData.title}</ColWrapper>
            </RowWrapper>
            {/*  */}
            <RowWrapper gutter={5} margin={`10px 0`}>
              <ColWrapper span={24} width={`100%`} bgColor={Theme.basicTheme_C}>
                상품 문의 내용
              </ColWrapper>
              <ColWrapper>{updateData && updateData.content}</ColWrapper>
            </RowWrapper>
          </ColWrapper>
          <ColWrapper span={12} ju={`flex-start`}>
            <ColWrapper bgColor={Theme.basicTheme_C} width={`100%`}>
              답변
            </ColWrapper>
            <Input.TextArea
              allowClear
              placeholder="답변 내용을 입력해주세요."
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

export default Question;
