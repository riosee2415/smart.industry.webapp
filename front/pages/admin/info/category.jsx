import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Table,
  notification,
  message,
  Popconfirm,
  Select,
} from "antd";
import { END } from "redux-saga";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import wrapper from "../../../store/configureStore";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import { Wrapper } from "../../../components/commonComponents";
import { useState } from "react";
import { MENU_LIST_REQUEST } from "../../../reducers/menu";
import {
  CATEGORY_CREATE_REQUEST,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_LIST_REQUEST,
  CATEGORY_UPDATE_REQUEST,
  CREATE_MODAL_TOGGLE,
} from "../../../reducers/category";

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

const CategoryList = () => {
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

  const { menuList } = useSelector((state) => state.menu);

  const {
    categoryList,
    createModal,
    //
    st_categoryCreateDone,
    st_categoryCreateError,
    //
    st_categoryUpdateDone,
    st_categoryUpdateError,
    //
    st_categoryDeleteDone,
    st_categoryDeleteError,
  } = useSelector((state) => state.category);

  const [updateCategoryData, setUpdateCategoryData] = useState(null);

  const dispatch = useDispatch();

  const [categoryForm] = Form.useForm();
  const categoryFormRef = useRef();

  ////// USEEFFECT //////
  useEffect(() => {
    if (st_categoryCreateDone) {
      dispatch({
        type: CATEGORY_LIST_REQUEST,
      });

      createModalToggle(null);

      return message.success("생성되었습니다.");
    }
  }, [st_categoryCreateDone]);

  useEffect(() => {
    if (st_categoryCreateError) {
      return message.error(st_categoryCreateError);
    }
  }, [st_categoryCreateError]);

  useEffect(() => {
    if (st_categoryUpdateDone) {
      dispatch({
        type: CATEGORY_LIST_REQUEST,
      });
      createModalToggle(null);

      return message.success("수정되었습니다.");
    }
  }, [st_categoryUpdateDone]);

  useEffect(() => {
    if (st_categoryUpdateError) {
      return message.error(st_categoryUpdateError);
    }
  }, [st_categoryUpdateError]);

  useEffect(() => {
    if (st_categoryDeleteDone) {
      dispatch({
        type: CATEGORY_LIST_REQUEST,
      });

      return message.success("삭제되었습니다.");
    }
  }, [st_categoryDeleteDone]);

  useEffect(() => {
    if (st_categoryDeleteError) {
      return message.error(st_categoryDeleteError);
    }
  }, [st_categoryDeleteError]);

  useEffect(() => {
    if (createModal) {
      if (updateCategoryData) {
        categoryFormRef.current.setFieldsValue({
          value: updateCategoryData.value,
          menu: updateCategoryData.MenuId,
        });
      }
    }
  }, [updateCategoryData]);

  ////// TOGGLE //////

  const createModalToggle = useCallback(
    (data) => {
      if (data) {
        setUpdateCategoryData(data);
      } else {
        setUpdateCategoryData(null);
        categoryForm.resetFields();
      }
      dispatch({
        type: CREATE_MODAL_TOGGLE,
      });
    },
    [createModal]
  );

  ////// HANDLER //////

  const categoryCreateSubmit = useCallback((data) => {
    console.log(data);
    dispatch({
      type: CATEGORY_CREATE_REQUEST,
      data: {
        value: data.value,
        MenuId: data.menu,
      },
    });
  }, []);

  const categoryUpdateSubmit = useCallback(
    (data) => {
      dispatch({
        type: CATEGORY_UPDATE_REQUEST,
        data: {
          id: updateCategoryData.id,
          value: data.value,
          MenuId: data.menu,
        },
      });
    },
    [updateCategoryData]
  );

  const categoryDeleteSubmit = useCallback((data) => {
    dispatch({
      type: CATEGORY_DELETE_REQUEST,
      data: {
        catId: data.id,
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
      title: "이름",
      dataIndex: "value",
    },
    {
      title: "소속메뉴이름",
      dataIndex: "menuValue",
    },
    {
      title: "생성일",
      dataIndex: "createdAt",
    },

    {
      title: "수정",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          onClick={() => createModalToggle(data)}
        >
          수정
        </Button>
      ),
    },
    {
      title: "삭제",
      render: (data) => (
        <Popconfirm
          title="삭제하시겠습니까?"
          onConfirm={() => categoryDeleteSubmit(data)}
          okText="삭제"
          cancelText="취소"
        >
          <Button size="small" type="danger">
            삭제
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["기초 관리", "카테고리 관리"]}
        title={`카테고리 관리`}
        subTitle={`카테고리을 제어할 수 있습니다.`}
      />

      <AdminContent>
        <Wrapper al={`flex-end`} margin={`0 0 8px`}>
          <Button
            size="small"
            type="primary"
            onClick={() => createModalToggle(null)}
          >
            + 생성
          </Button>
        </Wrapper>
        <Table
          size="middle"
          columns={columns}
          dataSource={categoryList ? categoryList : []}
        />
      </AdminContent>

      {/* CATEGORY CREATE / UPDATE MODAL */}
      <Modal
        width={`650px`}
        title={updateCategoryData ? "카테고리 수정" : "카테고리 생성"}
        visible={createModal}
        footer={null}
        onCancel={() => createModalToggle(null)}
      >
        <Form
          form={categoryForm}
          ref={categoryFormRef}
          onFinish={
            updateCategoryData ? categoryUpdateSubmit : categoryCreateSubmit
          }
        >
          <Form.Item
            label="메뉴"
            name="menu"
            rules={[{ required: true, message: "메뉴를 선택해주세요." }]}
          >
            <Select placeholder="메뉴를 선택해주세요.">
              {menuList &&
                menuList.map((data) => {
                  return (
                    <Select.Option value={data.id}>{data.value}</Select.Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item
            label="이름"
            name="value"
            rules={[{ required: true, message: "이름을 입력해주세요." }]}
          >
            <Input placeholder="이름을 입력해주세요." />
          </Form.Item>
          <Wrapper al={`flex-end`}>
            <Button size="small" htmlType="submit" type="primary">
              {updateCategoryData ? "수정" : "생성"}
            </Button>
          </Wrapper>
        </Form>
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
      type: MENU_LIST_REQUEST,
    });

    context.store.dispatch({
      type: CATEGORY_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default CategoryList;
