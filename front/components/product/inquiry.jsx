import { message, Table, notification, Modal } from "antd";
import React, { useState, useCallback } from "react";
import {
  Wrapper,
  CommonButton,
  Text,
  TextInput,
  TextArea,
} from "../commonComponents";
import styled from "styled-components";
import Theme from "../Theme";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "../../store/configureStore";
import axios from "axios";
import useInput from "../../hooks/useInput";
import { PRODUCT_QUESTION_CREATE_REQUEST } from "../../reducers/product";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CustomModal = styled(Modal)`
  & .ant-modal-close-x {
    display: none;
  }

  & .ant-modal-header {
    border-bottom: 1px solid ${Theme.grey_C};
  }
`;

const CustomTable = styled(Table)`
  & .ant-table-thead tr {
    border-top: 1px solid ${Theme.grey2_C} !important;
    border-bottom: 1px solid ${Theme.grey2_C} !important;
  }

  & .ant-table-thead .ant-table-cell {
    height: 40px;
    text-align: center;
  }
  & .ant-table-thead .ant-table-cell::before {
    display: none;
  }
`;

const Inquiry = () => {
  const router = useRouter();
  ////// DATAIVEW //////

  const { me } = useSelector((state) => state.user);

  const { st_productQuestionCreateDone, st_productQuestionCreateError } =
    useSelector((state) => state.product);

  const dispatch = useDispatch();

  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);

  const inputTitle = useInput("");
  const inputContent = useInput("");
  const inputPassword = useInput("");

  useEffect(() => {
    if (st_productQuestionCreateDone) {
      ModalToggle();
      return LoadNotification("상품 문의", "상품 문의가 생성 되었습니다.");
    }
  }, [st_productQuestionCreateDone]);

  const columns = [
    {
      title: "번호",
      dataIndex: "id",
      width: `10%`,
    },
    {
      title: "제목",
      dataIndex: "title",
      width: `60%`,
    },
    {
      title: "작성자",
      dataIndex: "author",
      width: `10%`,
    },
    {
      title: "작성일",
      dataIndex: "createdAt",
      width: `10%`,
    },
    {
      title: "조회수",
      dataIndex: "hit",
      width: `10%`,
    },
  ];

  const testData = [
    {
      id: 1,
      title: "상품문의",
      aouthor: "",
    },
  ];

  const ModalToggle = useCallback(() => {
    setIsModalVisible1((prev) => !prev);

    if (!isModalVisible1) {
      inputTitle.setValue("");
      inputContent.setValue("");
      inputPassword.setValue("");
    }
  }, []);

  const createProdQnaHandler = useCallback(() => {
    if (!inputTitle.value || inputTitle.value.trim() === "") {
      return LoadNotification("제목", "제목을 입력해주세요.");
    } else if (!inputContent.value || inputContent.value.trim() === "") {
      return LoadNotification("내용", "내용을 입력해주세요.");
    }
    // else if (!inputPassword.value || inputPassword.value.trim() === "") {
    //   return message.error("제목을 입력해주세요.");
    // }

    dispatch({
      type: PRODUCT_QUESTION_CREATE_REQUEST,
      data: {
        author: me.username,
        mobile: me.mobile,
        email: me.email,
        title: inputTitle.value,
        content: inputContent.value,
        isSecret: inputPassword.value ? true : false,
        secret: inputPassword.value ? inputPassword.value : null,
        ProductId: router.query.id,
      },
    });
  }, [inputTitle.value, inputPassword.value, inputContent.value, me]);

  const LoadNotification = (msg, content) => {
    notification.open({
      message: msg,
      description: content,
      onClick: () => {},
    });
  };

  return (
    <Wrapper>
      <CustomTable style={{ width: `100%` }} size="middle" columns={columns} />

      <Wrapper al={`flex-end`}>
        <CommonButton
          radius={`0`}
          width={`106px`}
          height={`40px`}
          fontSize={`15px`}
          padding={`0`}
          onClick={() => (me ? ModalToggle() : "")}>
          상품 문의하기
        </CommonButton>
      </Wrapper>

      <CustomModal
        footer={null}
        centered={true}
        width={`1350px`}
        title="상품 문의작성"
        visible={isModalVisible1}
        zIndex={10000}>
        <Wrapper>
          <Wrapper al={`flex-start`}>
            <Text fontSize={`16px`} width={`30px`} color={Theme.darkGrey_C}>
              제목
            </Text>
            <TextInput
              width={`100%`}
              margin={`10px 0 0 0`}
              border={`1px solid ${Theme.basicTheme_C}`}
              {...inputTitle}
            />
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`35px 0 0 0`}>
            <Text fontSize={`16px`} width={`150px`} color={Theme.darkGrey_C}>
              상품명
            </Text>
            <TextArea
              width={`100%`}
              height={`300px`}
              radius={`0px`}
              margin={`10px 0 0 0`}
              border={`1px solid ${Theme.basicTheme_C}`}
              placeholder="문의 내용을 입력해주세요."
              {...inputContent}
            />
          </Wrapper>

          <Wrapper al={`flex-start`}>
            <Text
              fontSize={`16px`}
              width={`60px`}
              color={Theme.darkGrey_C}
              margin={`35px 0 0 0`}>
              비밀번호
            </Text>
            <TextInput
              width={`100%`}
              margin={`10px 0 0 0`}
              border={`1px solid ${Theme.basicTheme_C}`}
            />
          </Wrapper>

          <Wrapper dr={`row`} margin={`40px 0 0 0`}>
            <CommonButton
              width={`120px`}
              height={`38px`}
              margin={`0 5px 0 0`}
              fontSize={`14px`}
              kindOf={`darkgrey`}
              onClick={() => ModalToggle()}>
              취소하기
            </CommonButton>
            <CommonButton
              width={`120px`}
              height={`38px`}
              fontSize={`14px`}
              onClick={() => createProdQnaHandler()}>
              작성하기
            </CommonButton>
          </Wrapper>
        </Wrapper>
      </CustomModal>
    </Wrapper>
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

export default Inquiry;
