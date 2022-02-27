import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button, Empty, Form, Input, message, Modal, notification } from "antd";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  CREATE_MODAL_TOGGLE,
  REVIEW_CREATE_REQUEST,
  REVIEW_NOTUSER_CREATE_REQUEST,
  REVIEW_PRODUCT_LIST_REQUEST,
  REVIEW_UPLOAD_REQUEST,
  REVIEW_HIT_REQUEST,
} from "../../reducers/review";
import { Wrapper, Image, CommonButton, Text } from "../commonComponents";
import Theme from "../Theme";
import useWidth from "../../hooks/useWidth";

const REVIEW_WIDTH = `600`;
const REVIEW_HEIGHT = `600`;

const CustomForm = styled(Form)`
  width: 50%;

  & .ant-form-item {
    width: 100%;
  }

  @media (max-width: 900px) {
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

const ThumbnailImage = styled.img`
  width: 600px;
  height: 600px;
  object-fit: cover;

  @media (max-width: 1280px) {
    width: 400px;
    height: 400px;
  }

  @media (max-width: 700px) {
    width: 100%;
    height: 100%;
  }
`;
const UploadWrapper = styled.div`
  width: 600px;
  margin: 5px 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 1280px) {
    width: 400px;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
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
const Review = () => {
  ////// GLOBAL STATE //////
  const {
    productReivewList,
    createModal,
    //
    reviewImagePath,
    st_reviewUploadLoading,
    //
    st_reviewCreateDone,
    st_reviewCreateError,
    //
    st_reviewNotUserCreateDone,
    st_reviewNotUserCreateError,
    //
    st_reviewHitDone,
    st_reviewHitError,
  } = useSelector((state) => state.review);

  const { me } = useSelector((state) => state.user);

  ////// HOOKS //////

  const dispatch = useDispatch();

  const width = useWidth();

  const [datum, setDatum] = useState(null);

  const router = useRouter();

  const [form] = Form.useForm();
  const formRef = useRef();

  const imageRef = useRef();

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
    if (datum) {
      dispatch({
        type: REVIEW_HIT_REQUEST,
        data: {
          id: datum.id,
        },
      });
    }
  }, [datum]);

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
    if (st_reviewHitDone) {
      dispatch({
        type: REVIEW_PRODUCT_LIST_REQUEST,
        data: {
          ProductId: router.query.id,
        },
      });
    }
  }, [st_reviewHitDone]);

  useEffect(() => {
    if (st_reviewHitError) {
      dispatch({
        type: REVIEW_LIST_REQUEST,
      });
    }
  }, [st_reviewHitError]);

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
        setDatum(null);
      }
    },
    [datum]
  );

  const onSubmit = useCallback(
    (data) => {
      if (!reviewImagePath) {
        return LoadNotification("안내", "첨부이미지를 등록해주세요.");
      }

      if (me) {
        dispatch({
          type: REVIEW_CREATE_REQUEST,
          data: {
            ProductId: router.query.id,
            title: data.title,
            author: me.username,
            imagePath: reviewImagePath,
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
            imagePath: reviewImagePath,
            content: data.content,
          },
        });
      }
    },
    [me, router.query, reviewImagePath]
  );

  const clickImageUpload = useCallback(() => {
    imageRef.current.click();
  }, []);

  const onChangeImages = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: REVIEW_UPLOAD_REQUEST,
      data: formData,
    });
  }, []);

  ////// DATAVIEW //////

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
                              width={width < 700 ? `100%` : `600px`}
                              height={`auto`}
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

      <Modal
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

        <Wrapper dr={`row`} al={`flex-start`}>
          <Wrapper width={width < 900 ? `100%` : `50%`}>
            <ThumbnailImage
              src={
                reviewImagePath
                  ? `${reviewImagePath}`
                  : `https://via.placeholder.com/${REVIEW_WIDTH}x${REVIEW_HEIGHT}`
              }
              alt="review_image"
            />
            <PreviewGuide>
              {reviewImagePath && `이미지 미리보기 입니다.`}
            </PreviewGuide>

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
                size="small"
                type="primary"
                onClick={clickImageUpload}
                loading={st_reviewUploadLoading}
              >
                UPLOAD
              </Button>
            </UploadWrapper>
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
                rules={[
                  { required: true, message: "후기내용을 입력해주세요." },
                ]}
              >
                <ContentInput placeholder="후기내용을 입력해주세요." />
              </Form.Item>
            </Wrapper>

            {!me && (
              <Wrapper al={`flex-start`}>
                <Text margin={`0 0 10px`}>작성자</Text>
                <Form.Item
                  name="author"
                  rules={[
                    { required: true, message: "작성자를 입력해주세요." },
                  ]}
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
        </Wrapper>
      </Modal>
    </>
  );
};

export default Review;
