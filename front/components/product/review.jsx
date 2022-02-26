import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button, Empty, Form, Input, message, Modal } from "antd";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  CREATE_MODAL_TOGGLE,
  REVIEW_CREATE_REQUEST,
  REVIEW_NOTUSER_CREATE_REQUEST,
  REVIEW_PRODUCT_LIST_REQUEST,
} from "../../reducers/review";
import { Wrapper, Image, CommonButton, Text } from "../commonComponents";
import Theme from "../Theme";

const CustomForm = styled(Form)`
  width: 100%;

  & .ant-form-item {
    width: 100%;
  }
`;

const TitleInput = styled(Input)`
  height: 50px;
`;

const ContentInput = styled(Input.TextArea)`
  padding: 10px;
  height: 150px !important;
`;

const CustomModal = styled(Modal)`
  top: 180px;
`;

const Review = () => {
  ////// GLOBAL STATE //////
  const {
    productReivewList,
    createModal,
    //
    st_reviewCreateDone,
    st_reviewCreateError,
    //
    st_reviewNotUserCreateDone,
    st_reviewNotUserCreateError,
  } = useSelector((state) => state.review);

  const { me } = useSelector((state) => state.user);

  console.log(productReivewList);

  ////// HOOKS //////

  const dispatch = useDispatch();

  const [datum, setDatum] = useState(null);

  const router = useRouter();

  const [form] = Form.useForm();
  const formRef = useRef();

  ////// REDUX //////

  ////// USEEFFECT //////

  useEffect(() => {
    dispatch({
      type: REVIEW_PRODUCT_LIST_REQUEST,
      data: {
        ProductId: router.query.id,
      },
    });
  }, []);

  useEffect(() => {
    if (st_reviewCreateDone || st_reviewNotUserCreateDone) {
      form.resetFields();

      dispatch({
        type: CREATE_MODAL_TOGGLE,
      });

      dispatch({
        type: REVIEW_PRODUCT_LIST_REQUEST,
        data: {
          ProductId: router.query.id,
        },
      });

      return message.success("작성되었습니다.");
    }
  }, [st_reviewCreateDone, st_reviewNotUserCreateDone]);

  useEffect(() => {
    if (st_reviewCreateError) {
      return message.error(st_reviewCreateError);
    }
  }, [st_reviewCreateError]);

  useEffect(() => {
    if (st_reviewNotUserCreateError) {
      return message.error(st_reviewNotUserCreateError);
    }
  }, [st_reviewNotUserCreateError]);

  ////// TOGGLE //////

  const createModalToggle = useCallback(() => {
    form.resetFields();

    dispatch({
      type: CREATE_MODAL_TOGGLE,
    });
  }, [createModal]);

  ////// HANDLER //////
  const onClickToggleHandler = useCallback(
    (data) => {
      setDatum(data);

      if (datum && datum.id === data.id) {
        setDatum("");
      }
    },
    [datum]
  );

  const onSubmit = useCallback(
    (data) => {
      if (me) {
        dispatch({
          type: REVIEW_CREATE_REQUEST,
          data: {
            ProductId: router.query.id,
            title: data.title,
            author: me,
            imagePath: "test",
            content: data.content,
          },
        });
      } else {
        dispatch({
          type: REVIEW_NOTUSER_CREATE_REQUEST,
          data: {
            ProductId: router.query.id,
            title: data.title,
            author: data.author,
            imagePath: "test",
            content: data.content,
          },
        });
      }
    },
    [me, router.query]
  );

  ////// DATAVIEW //////
  const testReview = [
    // {
    //   type: "전체",
    // },
    {
      id: 1,
      product: "상품1",
      title: "상품1에 대한 제목",
      content: "상품문의답변",
      user: "사용자",
      createdAt: "2022-02-13-00:00",
      hit: "234",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxza-raAsJHK8wZ03T55ti77CChtEvLRpCQ&usqp=CAU",
    },
    {
      id: 2,
      product: "상품2",
      title: "상품2에 대한 제목",
      content: "배송문의답변",
      user: "사용자2",
      createdAt: "2022-02-14-00:00",
      hit: "123",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxza-raAsJHK8wZ03T55ti77CChtEvLRpCQ&usqp=CAU",
    },
    {
      id: 3,
      product: "상품3",
      title: "상품3에 대한 제목",
      content: "취소/반품/교환답변",
      user: "사용자3",
      createdAt: "2022-02-15-00:00",
      hit: "45",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSxza-raAsJHK8wZ03T55ti77CChtEvLRpCQ&usqp=CAU",
    },
  ];

  return (
    <>
      <Wrapper margin={`40px 0 0`}>
        <Wrapper
          bgColor={Theme.lightGrey2_C}
          height={`40px`}
          borderTop={`1px solid ${Theme.grey2_C}`}
          borderBottom={`1px solid ${Theme.grey2_C}`}
        >
          <Wrapper width={`10%`}>번호</Wrapper>
          <Wrapper width={`60%`}>제목</Wrapper>
          <Wrapper width={`10%`}>작성자</Wrapper>
          <Wrapper width={`10%`}>작성일</Wrapper>
          <Wrapper width={`10%`}>조회수</Wrapper>
        </Wrapper>
        {productReivewList &&
          (productReivewList.length === 0 ? (
            <Wrapper>
              <Empty description="상품에 해당하는 후기가 없습니다."></Empty>
            </Wrapper>
          ) : (
            productReivewList.map((data, idx) => {
              return (
                <Wrapper ju={`flex-start`}>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    padding={`14px 0px`}
                    cursor={`pointer`}
                    borderBottom={`1px solid ${Theme.grey2_C}`}
                    onClick={() => onClickToggleHandler(data)}
                  >
                    <Wrapper width={`10%`}>{data.id}</Wrapper>

                    <Wrapper width={`60%`} al={`flex-start`}>
                      {data.title}
                    </Wrapper>
                    <Wrapper width={`10%`}>
                      {data.author.replace(/(?<=.{1})./gi, "*")}
                    </Wrapper>
                    <Wrapper width={`10%`}>
                      {data.createdAt.substring(0, 10)}
                    </Wrapper>
                    <Wrapper width={`10%`}>{data.hit}</Wrapper>
                  </Wrapper>

                  {datum && datum.id === data.id && (
                    <Wrapper borderBottom={`1px solid ${Theme.grey2_C}`}>
                      <Wrapper al={`flex-end`}>
                        <Wrapper width={`90%`}>
                          <Wrapper>
                            <Image
                              width={`300px`}
                              height={`300px`}
                              src={data.imagePath}
                            />
                          </Wrapper>
                          <Wrapper al={`flex-start`} padding={`60px 0 40px`}>
                            {data.content}
                          </Wrapper>
                        </Wrapper>
                      </Wrapper>
                    </Wrapper>
                  )}
                </Wrapper>
              );
            })
          ))}
      </Wrapper>

      <Wrapper al={`flex-end`} margin={`20px 0 80px`}>
        <CommonButton
          width={`106px`}
          height={`40px`}
          fontSize={`15px`}
          padding={`0`}
          onClick={createModalToggle}
        >
          후기 작성하기
        </CommonButton>
      </Wrapper>

      <CustomModal
        width={`1350px`}
        visible={createModal}
        onCancel={createModalToggle}
        closable={false}
        footer={null}
      >
        <Wrapper
          al={`flex-start`}
          borderBottom={`1px solid ${Theme.grey_C}`}
          padding={`0 0 20px`}
          margin={`0 0 20px`}
        >
          <Text fontSize={`18px`} fontWeight={`bold`}>
            상품 후기작성
          </Text>
        </Wrapper>

        <CustomForm onFinish={onSubmit} form={form} ref={formRef}>
          <Wrapper al={`flex-start`}>
            <Text margin={`0 0 10px`}>제목</Text>
            <Form.Item
              name="title"
              rules={[{ required: true, message: "제목을 입력해주세요." }]}
            >
              <TitleInput placeholder="제목을 입력해주세요." />
            </Form.Item>
          </Wrapper>

          <Wrapper al={`flex-start`}>
            <Text margin={`0 0 10px`}>상품명이 들어갑니다.</Text>
            <Form.Item
              name="content"
              rules={[{ required: true, message: "후기내용을 입력해주세요." }]}
            >
              <ContentInput placeholder="후기내용을 입력해주세요." />
            </Form.Item>
          </Wrapper>

          {!me && (
            <Wrapper al={`flex-start`}>
              <Text margin={`0 0 10px`}>작성자</Text>
              <Form.Item
                name="author"
                rules={[{ required: true, message: "작성자를 입력해주세요." }]}
              >
                <TitleInput placeholder="작성자를 입력해주세요." />
              </Form.Item>
            </Wrapper>
          )}

          <Wrapper dr={`row`}>
            <CommonButton
              margin={`0 3px 0 0`}
              kindOf={`darkgrey`}
              onClick={createModalToggle}
            >
              취소하기
            </CommonButton>
            <CommonButton margin={`0 0 0 3px`} htmlType="submit">
              작성하기
            </CommonButton>
          </Wrapper>
        </CustomForm>
      </CustomModal>
    </>
  );
};

export default Review;
