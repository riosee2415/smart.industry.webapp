import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import AdminTop from "../../../components/admin/AdminTop";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Modal,
  Table,
  Button,
  Input,
  notification,
  message,
  Form,
  Select,
} from "antd";
import {
  FAQ_TYPE_GET_REQUEST,
  //
  CREATE_TYPE_MODAL_OPEN_REQUEST,
  CREATE_TYPE_MODAL_CLOSE_REQUEST,
  //
  FAQ_GUIDE_MODAL,
  UPDATE_MODAL_OPEN_REQUEST,
  UPDATE_MODAL_CLOSE_REQUEST,
  //
  FAQ_GET_REQUEST,
  FAQ_CREATE_REQUEST,
  FAQ_UPDATE_REQUEST,
  FAQ_DELETE_REQUEST,
} from "../../../reducers/faq";
import useInput from "../../../hooks/useInput";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { useRouter } from "next/router";
import { Wrapper, ColWrapper } from "../../../components/commonComponents";
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

const GuideUl = styled.ul`
  width: 100%;
  padding: 5px;
`;
const GuideLi = styled.li`
  width: 100%;
  margin-bottom: 5px;
  color: ${(props) => (props.isImpo ? props.theme.red_C : "")};
`;

const List = () => {
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
  ///////////////////////////////////////////////////////////////////////

  ////// HOOKS //////
  const dispatch = useDispatch();
  const {
    types,
    faqs,
    createTypeModal,
    faqGuideModal,
    updateModal,
    //
    st_faqError,
    st_faqCreateDone,
    st_faqCreateError,
    st_faqUpdateDone,
    st_faqUpdateError,
    st_faqDeleteDone,
    st_faqDeleteError,
  } = useSelector((state) => state.faq);

  const [updateData, setUpdateData] = useState(null);

  const [deletePopVisible, setDeletePopVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const formRef = useRef();
  const [form] = Form.useForm();

  const inputTypeId = useInput("");
  const inputSearch = useInput("");

  ////// USEEFFECT //////
  useEffect(() => {
    dispatch({
      type: FAQ_GET_REQUEST,
      data: {
        typeId: "",
        search: "",
      },
    });
  }, []);

  useEffect(() => {
    if (st_faqCreateDone) {
      dispatch({
        type: CREATE_TYPE_MODAL_CLOSE_REQUEST,
      });

      dispatch({
        type: FAQ_GET_REQUEST,
        data: {
          typeId: "",
          search: "",
        },
      });

      message.success("FAQ 리스트가 생성 되었습니다.");
    }
  }, [st_faqCreateDone]);

  useEffect(() => {
    if (st_faqDeleteDone) {
      dispatch({
        type: FAQ_GET_REQUEST,
        data: { typeId: "", search: "" },
      });
    }
  }, [st_faqDeleteDone]);

  useEffect(() => {
    if (st_faqError) {
      return message.error(st_faqError);
    }
  }, [st_faqError]);

  useEffect(() => {
    if (st_faqCreateError) {
      return message.error(st_faqCreateError);
    }
  }, [st_faqCreateError]);

  useEffect(() => {
    if (st_faqUpdateError) {
      return message.error(st_faqUpdateError);
    }
  }, [st_faqUpdateError]);

  useEffect(() => {
    if (st_faqDeleteError) {
      return message.error(st_faqDeleteError);
    }
  }, [st_faqDeleteError]);

  useEffect(() => {
    if (st_faqUpdateDone) {
      dispatch({
        type: FAQ_GET_REQUEST,
        data: { typeId: "", search: "" },
      });

      dispatch({
        type: CREATE_TYPE_MODAL_CLOSE_REQUEST,
      });
    }
  }, [st_faqUpdateDone]);

  useEffect(() => {
    if (updateData) {
      setTimeout(() => {
        onFill(updateData);
      }, 500);
    }
  }, [updateData]);

  useEffect(() => {
    if (!createTypeModal) {
      form.resetFields();

      setUpdateData(null);
    }
  }, [createTypeModal]);

  ////// TOGGLE //////
  const createModalOpen = useCallback(() => {
    dispatch({
      type: CREATE_TYPE_MODAL_OPEN_REQUEST,
    });
  }, [createTypeModal]);

  const createModalClose = useCallback(() => {
    dispatch({
      type: CREATE_TYPE_MODAL_CLOSE_REQUEST,
    });
  }, [createTypeModal]);

  const updateModalOpen = useCallback(
    (data) => {
      dispatch({
        type: CREATE_TYPE_MODAL_OPEN_REQUEST,
      });

      setUpdateData(data);
    },
    [createTypeModal]
  );

  const updateModalClose = useCallback(() => {
    dispatch({
      type: CREATE_TYPE_MODAL_CLOSE_REQUEST,
    });
    setUpdateData(null);
  }, [createTypeModal]);

  const deletePopToggle = useCallback(
    (id) => () => {
      setDeleteId(id);
      setDeletePopVisible((prev) => !prev);
    },
    [deletePopVisible, deleteId]
  );

  ////// HANDLER //////

  const onKeyDonwComboHandler = useCallback(() => {
    dispatch({
      type: FAQ_GET_REQUEST,
      data: {
        typeId: inputTypeId.value,
        search: inputSearch.value,
      },
    });
  }, [inputTypeId.value, inputSearch.value]);

  const createModalOk = useCallback(() => {
    formRef.current.submit();
  }, [formRef]);

  const onSubmit = useCallback((value) => {
    dispatch({
      type: FAQ_CREATE_REQUEST,
      data: {
        question: value.question,
        answer: value.answer,
        typeId: value.type,
      },
    });
  }, []);

  const onSubmitUpdate = useCallback(
    (value) => {
      dispatch({
        type: FAQ_UPDATE_REQUEST,
        data: {
          id: updateData.id,
          question: value.question,
          answer: value.answer,
          typeId: value.typeId,
        },
      });
      console.log(value);
    },
    [updateData]
  );

  const onFill = useCallback((data) => {
    formRef.current.setFieldsValue({
      type: data.FaqType.value,
      typeId: data.FaqTypeId,
      question: data.question,
      answer: data.answer,
    });
  }, []);

  const deleteFaqHandler = useCallback(() => {
    if (!deleteId) {
      return LoadNotification(
        "ADMIN SYSTEM ERRLR",
        "일시적인 장애가 발생되었습니다. 잠시 후 다시 시도해주세요."
      );
    }

    dispatch({
      type: FAQ_DELETE_REQUEST,
      data: { id: deleteId },
    });

    setDeleteId(null);
    setDeletePopVisible((prev) => !prev);
  }, [deleteId]);

  const guideModalToggle = useCallback(() => {
    dispatch({
      type: FAQ_GUIDE_MODAL,
    });
  }, [faqGuideModal]);

  ////// DATAVIEW //////

  // Table
  const columns = [
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "유형",
      render: (data) => <div>{data.FaqType && data.FaqType.value}</div>,
    },
    {
      title: "질문",

      render: (data) => <div>{data.question}</div>,
    },

    {
      title: "답변",

      render: (data) => <div>{data.answer}</div>,
    },
    {
      title: "수정",
      render: (data) => (
        <Button
          type="primary"
          size="small"
          onClick={() => updateModalOpen(data)}
        >
          수정
        </Button>
      ),
    },
    {
      title: "삭제",
      render: (data) => (
        <Button type="danger" size="small" onClick={deletePopToggle(data.id)}>
          삭제
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["게시판 관리", "FAQ 리스트"]}
        title={`FAQ 리스트`}
        subTitle={`홈페이지의 FAQ 리스트을 관리할 수 있습니다.`}
      />

      <Wrapper></Wrapper>

      <AdminTop createButton={true} createButtonAction={createModalOpen} />

      <AdminContent>
        <Row gutter={[10, 10]} style={{ padding: "0 0 10px 0" }}>
          <Col>
            <Select
              defaultValue="제목"
              placeholder="FAQ 유형"
              size="small"
              value={inputTypeId.value}
              onChange={(data) => inputTypeId.setValue(data)}
            >
              <Select.Option value={``}>유형 선택</Select.Option>
              {types &&
                types.map((data) => {
                  return (
                    <Select.Option key={data.id} value={data.id}>
                      {data.value}
                    </Select.Option>
                  );
                })}
            </Select>
          </Col>

          <Col span={`6`}>
            <Input
              size="small"
              onKeyDown={(e) => e.keyCode === 13 && onKeyDonwComboHandler()}
              style={{ width: "100%" }}
              placeholder="검색어"
              {...inputSearch}
            />
          </Col>

          <Col>
            <Button size="small" onClick={() => onKeyDonwComboHandler()}>
              <SearchOutlined />
              검색
            </Button>
          </Col>

          <ColWrapper dr={`row`}>
            <Button size="small" type="danger" onClick={guideModalToggle}>
              주의사항
            </Button>
            <Wrapper
              width={`auto`}
              color={Theme.red_C}
              fontSize={`14px`}
              margin={`0 0 0 5px`}
            >
              * 주의사항 열람 후 조작해주세요!
            </Wrapper>
          </ColWrapper>
        </Row>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={faqs ? faqs : []}
          size="small"
        />
      </AdminContent>

      {/* Guide Modal */}
      <Modal
        visible={faqGuideModal}
        width="900px"
        onOk={guideModalToggle}
        onCancel={guideModalToggle}
        title="주의사항"
        footer={null}
      >
        <GuideUl>
          <GuideLi>
            사용자에게 제공하는 자주묻는질문을 관리하는 관리자 전산 시스템
            입니다.
          </GuideLi>
          <GuideLi>
            자주묻는질문 새로운질문을 작성할땐, 오른쪽 상단에 "+" 버튼을
            클릭하고 작성하면 됩니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            글 작성시 제목과 답변을 입력하고 ok버튼을 누르면 등록됩니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            수정버튼으로 수정을 할 수 있으며, 수정 후 ok버튼을 누르면
            완료됩니다.
          </GuideLi>
          <GuideLi isImpo={true}>
            삭제버튼 클릭 시 바로 삭제되며, 복구불가능하니 신중하게 삭제하시길
            바랍니다.
          </GuideLi>
          <GuideLi>
            기능 및 시스템 관련 문의 : 1600 - 4198 [4LEAFSOFTWARE 솔루션개발팀]
          </GuideLi>
        </GuideUl>
      </Modal>

      <Modal
        visible={createTypeModal}
        width={`800px`}
        title={`새로운 FAQ 작성`}
        onCancel={updateData ? updateModalClose : createModalClose}
        onOk={createModalOk}
      >
        <Wrapper padding={`10px`}>
          <Form
            form={form}
            ref={formRef}
            style={{ width: `100%` }}
            onFinish={updateData ? onSubmitUpdate : onSubmit}
          >
            <Form.Item name={"typeId"} style={{ height: "0" }}></Form.Item>
            <Form.Item name={"type"} label="유형" rules={[{ required: true }]}>
              <Select style={{ width: 200 }} placeholder="FAQ 유형">
                <Select.Option value={``}>유형 선택</Select.Option>

                {types &&
                  types.map((data) => {
                    return (
                      <Select.Option key={data.id} value={String(data.id)}>
                        {data.value}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>

            <Form.Item
              name={`question`}
              label="질문"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                allowClear
                placeholder="질문을 입력해주세요."
                autoSize={{ minRows: 10, maxRows: 10 }}
              />
            </Form.Item>

            <Form.Item
              name={`answer`}
              label="답변"
              rules={[{ required: true }]}
            >
              <Input.TextArea
                allowClear
                placeholder="답변을 입력해주세요."
                autoSize={{ minRows: 10, maxRows: 10 }}
              />
            </Form.Item>
          </Form>
        </Wrapper>
      </Modal>

      <Modal
        visible={deletePopVisible}
        onOk={deleteFaqHandler}
        onCancel={deletePopToggle(null)}
        title="정말 삭제하시겠습니까?"
      >
        <Wrapper padding={`20px`}>
          <Wrapper>삭제 된 데이터는 다시 복구할 수 없습니다.</Wrapper>
          <Wrapper>정말 삭제하시겠습니까?</Wrapper>
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
      type: FAQ_TYPE_GET_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default List;
