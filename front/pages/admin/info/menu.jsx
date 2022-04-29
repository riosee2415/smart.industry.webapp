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
import {
  CREATE_MODAL_TOGGLE,
  MENU_BANNER_IMAGE_PATH,
  MENU_BANNER_UPLOAD_REQUEST,
  MENU_CREATE_REQUEST,
  MENU_DELETE_REQUEST,
  MENU_IMAGE_PATH,
  MENU_LIST_REQUEST,
  MENU_UPDATE_REQUEST,
  MENU_UPLOAD_REQUEST,
} from "../../../reducers/menu";
import { useState } from "react";

const MENU_WIDTH = `194`;
const MENU_HEIGHT = `296`;

const MENU_BANNER_WIDTH = `1350`;
const MENU_BANNER_HEIGHT = `320`;

const AdminContent = styled.div`
  padding: 20px;
`;

const MenuImage = styled.img`
  width: 194px;
  height: 296px;
  object-fit: cover;
`;

const MenuImage2 = styled.img`
  width: 1350px;
  height: 320px;
  object-fit: cover;
`;
const UploadWrapper = styled.div`
  width: 100%;
  margin: 5px 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const GuideWrapper = styled.section`
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;

  border-radius: 3px;
  background-color: #eeeeee;
`;

const GuideText = styled.div`
  font-size: 13.5px;
  color: #5e5e5e;
  font-weight: 700;
`;

const PreviewGuide = styled.p`
  font-weight: 700;
  color: #b1b1b1;
`;

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};

const MenuList = () => {
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
    menuList,
    createModal,
    menuImagePath,
    menuImageBannerPath,
    st_menuUploadLoading,
    st_menuUploadError,
    st_menuBannerUploadLoading,
    st_menuBannerUploadError,
    //
    st_menuCreateDone,
    st_menuCreateError,
    //
    st_menuUpdateDone,
    st_menuUpdateError,
    //
    st_menuDeleteDone,
    st_menuDeleteError,
  } = useSelector((state) => state.menu);

  const [updateMenuData, setUpdateMenuData] = useState(null);

  const dispatch = useDispatch();

  const imageRef = useRef();
  const imageBannerRef = useRef();

  const [menuForm] = Form.useForm();
  const menuFormRef = useRef();

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_menuUploadError) {
      return message.error(st_menuUploadError);
    }
  }, [st_menuUploadError]);

  useEffect(() => {
    if (st_menuBannerUploadError) {
      return message.error(st_menuBannerUploadError);
    }
  }, [st_menuBannerUploadError]);

  useEffect(() => {
    if (st_menuCreateDone) {
      dispatch({
        type: MENU_LIST_REQUEST,
      });

      createModalToggle(null);

      return message.success("생성되었습니다.");
    }
  }, [st_menuCreateDone]);

  useEffect(() => {
    if (st_menuCreateError) {
      return message.error(st_menuCreateError);
    }
  }, [st_menuCreateError]);

  useEffect(() => {
    if (st_menuUpdateDone) {
      dispatch({
        type: MENU_LIST_REQUEST,
      });
      createModalToggle(null);

      return message.success("수정되었습니다.");
    }
  }, [st_menuUpdateDone]);

  useEffect(() => {
    if (st_menuUpdateError) {
      return message.error(st_menuUpdateError);
    }
  }, [st_menuUpdateError]);

  useEffect(() => {
    if (st_menuDeleteDone) {
      dispatch({
        type: MENU_LIST_REQUEST,
      });

      return message.success("삭제되었습니다.");
    }
  }, [st_menuDeleteDone]);

  useEffect(() => {
    if (st_menuDeleteError) {
      return message.error(st_menuDeleteError);
    }
  }, [st_menuDeleteError]);

  useEffect(() => {
    if (createModal) {
      if (updateMenuData) {
        menuFormRef.current.setFieldsValue({
          value: updateMenuData.value,
          content: updateMenuData.content,
        });

        dispatch({
          type: MENU_IMAGE_PATH,
          data: updateMenuData.imagePath,
        });

        dispatch({
          type: MENU_BANNER_IMAGE_PATH,
          data: updateMenuData.imagePath2,
        });
      }
    }
  }, [updateMenuData]);

  ////// TOGGLE //////

  const createModalToggle = useCallback(
    (data) => {
      if (data) {
        setUpdateMenuData(data);
      } else {
        setUpdateMenuData(null);
        menuForm.resetFields();
        dispatch({
          type: MENU_IMAGE_PATH,
          data: null,
        });
        dispatch({
          type: MENU_BANNER_IMAGE_PATH,
          data: null,
        });
      }
      dispatch({
        type: CREATE_MODAL_TOGGLE,
      });
    },
    [createModal]
  );

  ////// HANDLER //////

  const clickImageUpload = useCallback(() => {
    imageRef.current.click();
  }, [imageRef.current]);

  const clickBannerImageUpload = useCallback(() => {
    imageBannerRef.current.click();
  }, [imageBannerRef.current]);

  const onChangeImages = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: MENU_UPLOAD_REQUEST,
      data: formData,
    });
  }, []);

  const onChangeBannerImages = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: MENU_BANNER_UPLOAD_REQUEST,
      data: formData,
    });
  }, []);

  const menuCreateSubmit = useCallback(
    (data) => {
      // if (!menuImagePath) {
      //   return LoadNotification("ADMIN SYSTEM ERROR", "이미지를 등록해주세요");
      // }
      if (!menuImageBannerPath) {
        return LoadNotification(
          "ADMIN SYSTEM ERROR",
          "배너 이미지를 등록해주세요"
        );
      }

      dispatch({
        type: MENU_CREATE_REQUEST,
        data: {
          imagePath:
            // menuImagePath
            "-",
          imagePath2: menuImageBannerPath,
          value: data.value,
          content: data.content,
        },
      });
    },
    [
      // menuImagePath
      menuImageBannerPath,
    ]
  );

  const menuUpdateSubmit = useCallback(
    (data) => {
      // if (!menuImagePath) {
      //   return LoadNotification("ADMIN SYSTEM ERROR", "이미지를 등록해주세요");
      // }
      if (!menuImageBannerPath) {
        return LoadNotification(
          "ADMIN SYSTEM ERROR",
          "배너 이미지를 등록해주세요"
        );
      }

      dispatch({
        type: MENU_UPDATE_REQUEST,
        data: {
          id: updateMenuData.id,
          imagePath:
            // menuImagePath
            "-",
          imagePath2: menuImageBannerPath,
          value: data.value,
          content: data.content,
        },
      });
    },
    [
      // menuImagePath
      updateMenuData,
      menuImageBannerPath,
    ]
  );

  const menuDeleteSubmit = useCallback((data) => {
    dispatch({
      type: MENU_DELETE_REQUEST,
      data: {
        menuId: data.id,
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
      title: "이미지",
      render: (data) => (
        <Image width={`100px`} src={data.imagePath2} alt="menu_image" />
      ),
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
          onConfirm={() => menuDeleteSubmit(data)}
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
        breadcrumbs={["기초 관리", "메뉴 관리"]}
        title={`메뉴 관리`}
        subTitle={`헤더에 보여지는 메뉴을 제어할 수 있습니다.`}
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
          dataSource={menuList ? menuList : []}
        />
      </AdminContent>

      {/* MENU CREATE / UPDATE MODAL */}
      <Modal
        width={`1400px`}
        title={updateMenuData ? "메뉴 수정" : "메뉴 생성"}
        visible={createModal}
        footer={null}
        onCancel={() => createModalToggle(null)}
      >
        {/* <GuideWrapper>
          <GuideText>
            이미지 사이즈는 가로 {MENU_WIDTH}px 과 세로
            {MENU_HEIGHT}px을 기준으로 합니다.
          </GuideText>
          <GuideText>
            이미지 사이즈가 상이할 경우 화면에 올바르지 않게 보일 수 있으니
            이미지 사이즈를 확인해주세요.
          </GuideText>
        </GuideWrapper>
        <Wrapper>
          <MenuImage
            src={
              menuImagePath
                ? `${menuImagePath}`
                : `https://via.placeholder.com/${MENU_WIDTH}x${MENU_HEIGHT}`
            }
            alt="main_GALLEY_image"
          />
          <PreviewGuide>
            {menuImagePath && `이미지 미리보기 입니다.`}
          </PreviewGuide>
        </Wrapper>

        <UploadWrapper>
          <input
            type="file"
            name="image"
            accept=".png, .jpg"
            // multiple
            hidden
            ref={imageRef}
            onChange={onChangeImages}
          />
          <Button
            type="primary"
            size="small"
            onClick={clickImageUpload}
            loading={st_menuUploadLoading}
          >
            UPLOAD
          </Button>
        </UploadWrapper> */}

        <GuideWrapper>
          <GuideText>
            베너 사이즈는 가로 {MENU_BANNER_WIDTH}px 과 세로
            {MENU_BANNER_HEIGHT}px을 기준으로 합니다.
          </GuideText>
          <GuideText>
            이미지 사이즈가 상이할 경우 화면에 올바르지 않게 보일 수 있으니
            이미지 사이즈를 확인해주세요.
          </GuideText>
        </GuideWrapper>
        <Wrapper>
          <MenuImage2
            src={
              menuImageBannerPath
                ? `${menuImageBannerPath}`
                : `https://via.placeholder.com/${MENU_BANNER_WIDTH}x${MENU_BANNER_HEIGHT}`
            }
            alt="main_GALLEY_image"
          />
          <PreviewGuide>
            {menuImageBannerPath && `이미지 미리보기 입니다.`}
          </PreviewGuide>
        </Wrapper>

        <UploadWrapper>
          <input
            type="file"
            name="image"
            accept=".png, .jpg"
            // multiple
            hidden
            ref={imageBannerRef}
            onChange={onChangeBannerImages}
          />
          <Button
            type="primary"
            size="small"
            onClick={clickBannerImageUpload}
            loading={st_menuBannerUploadLoading}
          >
            UPLOAD
          </Button>
        </UploadWrapper>

        <Form
          form={menuForm}
          ref={menuFormRef}
          onFinish={updateMenuData ? menuUpdateSubmit : menuCreateSubmit}
        >
          <Form.Item
            label="이름"
            name="value"
            rules={[{ required: true, message: "이름을 입력해주세요." }]}
          >
            <Input placeholder="이름을 입력해주세요." />
          </Form.Item>
          <Form.Item
            label="설명"
            name="content"
            rules={[{ required: true, message: "이름을 입력해주세요." }]}
          >
            <Input.TextArea placeholder="설명을 입력해주세요." />
          </Form.Item>
          <Wrapper al={`flex-end`}>
            <Button size="small" htmlType="submit" type="primary">
              {updateMenuData ? "수정" : "생성"}
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

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default MenuList;
