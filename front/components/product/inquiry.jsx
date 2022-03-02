import {
  message,
  Table,
  notification,
  Modal,
  Checkbox,
  Pagination,
  Empty,
} from "antd";
import React, { useState, useCallback } from "react";
import {
  Wrapper,
  CommonButton,
  Text,
  TextInput,
  TextArea,
  Image,
  SpanText,
} from "../commonComponents";
import styled from "styled-components";
import Theme from "../Theme";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "../../store/configureStore";
import axios from "axios";
import useInput from "../../hooks/useInput";
import {
  PRODUCT_QUESTION_CREATE_REQUEST,
  PRODUCT_QUESTION_LIST_PROD_REQUEST,
  PRODUCT_QUESTION_NOT_USER_CREATE_REQUEST,
} from "../../reducers/product";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import useWidth from "../../hooks/useWidth";

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

const CustomPagination = styled(Pagination)`
  & .ant-pagination-item-active {
    border: none;
    border-bottom: 1px solid ${Theme.basicTheme_C} !important;
  }

  & .ant-pagination-item-link {
    border: none;
  }
`;

const Inquiry = () => {
  const router = useRouter();

  const width = useWidth();

  ////// DATAIVEW //////

  const { me } = useSelector((state) => state.user);

  const {
    productQuestionListProd,
    productQuestionListProdLastPage,
    productQuestionListProdLen,

    st_productQuestionListProdDone,
    st_productQuestionListProdError,

    st_productQuestionCreateDone,
    st_productQuestionCreateError,
    st_productQuestionNotUserCreateDone,
    st_productQuestionNotUserCreateError,
  } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);

  const inputTitle = useInput("");
  const inputContent = useInput("");
  const inputPassword = useInput("");
  const [isSecret1, setIsSecret1] = useState(false);

  const inputNotName = useInput("");
  const inputNotMobile = useInput("");
  const inputNotEmail = useInput("");
  const inputNotTitle = useInput("");
  const inputNotContent = useInput("");
  const inputNotPassword = useInput("");
  const [isSecret2, setIsSecret2] = useState(false);
  const [isCheckAgree, setIsCheckAgree] = useState(false);

  const inputModalPassword = useInput("");
  const [code, setCode] = useState("");
  const [id, setId] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [toggleArr, setToggleArr] = useState([]);
  const [secretArr, setSecretArr] = useState([]);

  const inputSecretPassword = useInput("");

  useEffect(() => {
    dispatch({
      type: PRODUCT_QUESTION_LIST_PROD_REQUEST,
      data: {
        ProductId: router.query.id,
        page: 1,
      },
    });
  }, [router.query.id]);

  useEffect(() => {
    if (st_productQuestionListProdDone) {
      let boolArr = [];

      for (let i = 0; i < productQuestionListProd.length; i++) {
        boolArr.push(false);
      }

      let saveSecret = productQuestionListProd.map((data) => data.isSecret);

      setSecretArr(saveSecret);
      setToggleArr(boolArr);
    }
  }, [st_productQuestionListProdDone]);

  useEffect(() => {
    if (st_productQuestionListProdError) {
    }
  }, [st_productQuestionListProdError]);

  useEffect(() => {
    if (st_productQuestionNotUserCreateDone) {
      notModalToggle();

      dispatch({
        type: PRODUCT_QUESTION_LIST_PROD_REQUEST,
        data: {
          ProductId: router.query.id,
          page: 1,
        },
      });
      return LoadNotification("상품 문의", "상품 문의가 생성 되었습니다.");
    }
  }, [st_productQuestionNotUserCreateDone]);

  useEffect(() => {
    if (st_productQuestionCreateError) {
      return LoadNotification(st_productQuestionCreateError);
    }
  }, [st_productQuestionCreateError]);

  useEffect(() => {
    if (st_productQuestionCreateDone) {
      ModalToggle();
      dispatch({
        type: PRODUCT_QUESTION_LIST_PROD_REQUEST,
        data: {
          ProductId: router.query.id,
          page: 1,
        },
      });

      return LoadNotification("상품 문의", "상품 문의가 생성 되었습니다.");
    }
  }, [st_productQuestionCreateDone]);

  const onClickToggleHandler = useCallback(
    (idx2) => {
      let Arr = toggleArr.map((data2, idx) => {
        return idx2 === idx && !data2;
      });

      setToggleArr(Arr);
    },
    [toggleArr]
  );

  const ModalToggle = useCallback(() => {
    setIsModalVisible1((prev) => !prev);

    inputTitle.setValue("");
    inputContent.setValue("");
    inputPassword.setValue("");
    setIsSecret1(false);
  }, []);

  const notModalToggle = useCallback(() => {
    setIsModalVisible2((prev) => !prev);

    inputNotName.setValue("");
    inputNotMobile.setValue("");
    inputNotEmail.setValue("");
    inputNotTitle.setValue("");
    inputNotContent.setValue("");
    inputNotPassword.setValue("");
    setIsSecret2(false);
    setIsCheckAgree(false);
  }, []);

  const isSecretModalToggle = useCallback(() => {
    setIsModalVisible3((prev) => !prev);
  }, []);

  const isSecretModalOk = useCallback(() => {
    if (!inputModalPassword.value) {
      return message.error("비밀번호를 입력해주세요.");
    } else {
      if (code === inputModalPassword.value) {
        moveLinkHandler(`/community/productQnA/detail/${id}?Code=${code}`);

        isSecretModalToggle();
        inputModalPassword.setValue("");
        return message.success("비밀번호를 확인했습니다.");
      } else {
        return message.error("비밀번호가 틀렸습니다.");
      }
    }
  }, [inputModalPassword.value]);

  const createProdQnaHandler = useCallback(() => {
    if (!inputTitle.value || inputTitle.value.trim() === "") {
      return LoadNotification("제목", "제목을 입력해주세요.");
    } else if (!inputContent.value || inputContent.value.trim() === "") {
      return LoadNotification("내용", "내용을 입력해주세요.");
    } else if (isSecret1) {
      if (!inputPassword.value || inputPassword.value.trim() === "") {
        return LoadNotification("비밀번호", "비밀번호을 입력해주세요.");
      }
    }

    dispatch({
      type: PRODUCT_QUESTION_CREATE_REQUEST,
      data: {
        author: me.username,
        mobile: me.mobile,
        email: me.email,
        title: inputTitle.value,
        content: inputContent.value,
        isSecret: isSecret1,
        secret: isSecret1 ? inputPassword.value : null,
        ProductId: router.query.id,
      },
    });
  }, [
    inputTitle.value,
    inputPassword.value,
    inputContent.value,
    me,
    isSecret1,
  ]);

  const createNotUserProdQnaHandler = useCallback(() => {
    if (!inputNotName.value || inputNotName.value.trim() === "") {
      return LoadNotification("이름", "이름을 입력해주세요.");
    } else if (!inputNotMobile.value || inputNotMobile.value.trim() === "") {
      return LoadNotification("연락처", "연락처를 입력해주세요.");
    } else if (!inputNotEmail.value || inputNotEmail.value.trim() === "") {
      return LoadNotification("이메일", "이메일을 입력해주세요.");
    } else if (!inputNotTitle.value || inputNotTitle.value.trim() === "") {
      return LoadNotification("제목", "제목을 입력해주세요.");
    } else if (!inputNotContent.value || inputNotContent.value.trim() === "") {
      return LoadNotification("내용", "내용을 입력해주세요.");
    } else if (isSecret2) {
      if (!inputNotPassword.value || inputNotPassword.value.trim() === "") {
        return LoadNotification("비밀번호", "비밀번호을 입력해주세요.");
      }
    }
    if (!isCheckAgree) {
      return LoadNotification("개인정보", "개인정보 제공에 동의해주세요.");
    }

    dispatch({
      type: PRODUCT_QUESTION_NOT_USER_CREATE_REQUEST,
      data: {
        author: inputNotName.value,
        mobile: inputNotMobile.value,
        email: inputNotEmail.value,
        title: inputNotTitle.value,
        content: inputNotContent.value,
        isSecret: isSecret2,
        secret: isSecret2 ? inputNotPassword.value : null,
        ProductId: router.query.id,
        terms: isCheckAgree,
      },
    });
  }, [
    inputNotName.value,
    inputNotMobile.value,
    inputNotEmail.value,
    inputNotTitle.value,
    inputNotContent.value,
    inputNotPassword.value,
    isSecret2,
    isCheckAgree,
  ]);

  const LoadNotification = (msg, content) => {
    notification.open({
      message: msg,
      description: content,
      onClick: () => {},
    });
  };

  const onChangeisCheckAgree = useCallback((e) => {
    setIsCheckAgree(e.target.checked);
  }, []);

  const isSecretHandler1 = useCallback((e) => {
    setIsSecret1(e.target.checked);
  }, []);

  const isSecretHandler2 = useCallback((e) => {
    setIsSecret2(e.target.checked);
  }, []);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const onChangePageHandler = useCallback((page) => {
    setCurrentPage(page);

    dispatch({
      type: PRODUCT_QUESTION_LIST_PROD_REQUEST,
      data: {
        ProductId: router.query.id,
        page,
      },
    });
  }, []);

  const secretPasswordHandler = useCallback(
    (secret, idx) => {
      if (inputSecretPassword.value === secret) {
        let changeBool = secretArr.map((data, idx2) => {
          return idx === idx2 ? !data : data;
        });

        setSecretArr(changeBool);
        inputSecretPassword.setValue("");
      }
    },
    [inputSecretPassword.value, secretArr]
  );

  return (
    <Wrapper>
      <Wrapper margin={`40px 0 0`}>
        <Wrapper
          bgColor={Theme.lightGrey2_C}
          height={`40px`}
          borderTop={`1px solid ${Theme.grey2_C}`}
          borderBottom={`1px solid ${Theme.grey2_C}`}
        >
          <Wrapper width={`10%`}>번호</Wrapper>
          <Wrapper width={width < 700 ? `50%` : `60%`}>제목</Wrapper>
          <Wrapper width={width < 700 ? `15%` : `10%`}>작성자</Wrapper>
          <Wrapper width={width < 700 ? `15%` : `10%`}>작성일</Wrapper>
          <Wrapper width={`10%`}>조회수</Wrapper>
        </Wrapper>
        {productQuestionListProd &&
          (productQuestionListProd.length === 0 ? (
            <Wrapper margin={`100px 0`}>
              <Empty description="상품에 해당하는 문의가 없습니다."></Empty>
            </Wrapper>
          ) : (
            productQuestionListProd.map((data, idx) => {
              return (
                <Wrapper ju={`flex-start`}>
                  <Wrapper
                    dr={`row`}
                    ju={`flex-start`}
                    padding={`14px 0px`}
                    cursor={`pointer`}
                    borderBottom={`1px solid ${Theme.grey2_C}`}
                    onClick={() => onClickToggleHandler(idx)}
                  >
                    <Wrapper width={`10%`}>{data.id}</Wrapper>

                    <Wrapper
                      width={width < 700 ? `50%` : `60%`}
                      ju={`flex-start`}
                      dr={`row`}
                    >
                      <Wrapper width={`auto`} margin={`0 17px 0 0`}>
                        {data.title}&nbsp;
                        {data.isComplete ? `[답변완료]` : ""}
                      </Wrapper>
                      <Wrapper width={`10px`} height={`10px`}>
                        {data.isSecret && (
                          <Image
                            height={`100%`}
                            src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/smart/assets/images/question/icon_lock.png`}
                          />
                        )}
                      </Wrapper>
                    </Wrapper>
                    <Wrapper width={width < 700 ? `15%` : `10%`}>
                      {data.author}
                    </Wrapper>
                    <Wrapper width={width < 700 ? `15%` : `10%`}>
                      {data.createdAt.substring(0, 10)}
                    </Wrapper>
                    <Wrapper width={`10%`}>{data.hit}</Wrapper>
                  </Wrapper>

                  {toggleArr[idx] && (
                    <Wrapper
                      dr={`row`}
                      ju={`flex-start`}
                      padding={`14px 0px`}
                      cursor={`pointer`}
                      borderBottom={`1px solid ${Theme.grey2_C}`}
                    >
                      <Wrapper width={`10%`}></Wrapper>

                      {secretArr[idx] ? (
                        <Wrapper width={`60%`} ju={`flex-start`} dr={`row`}>
                          <Wrapper
                            dr={`row`}
                            al={`flex-start`}
                            bgColor={Theme.lightGrey2_C}
                          >
                            <Wrapper al={`flex-start`}>
                              <Text color={Theme.red_C}>
                                비공개 글 입니다.&nbsp;
                                <SpanText color={Theme.black_C}>
                                  글 작성시 입력한 비밀번호를 입력해주세요.
                                </SpanText>
                              </Text>

                              <Wrapper
                                dr={`row`}
                                ju={`flex-start`}
                                margin={`10px 0 0 0`}
                              >
                                <TextInput
                                  margin={`0 16px 0 0`}
                                  width={`146px`}
                                  height={`20px`}
                                  border={`1px solid ${Theme.grey3_C}`}
                                  type={`password`}
                                  {...inputSecretPassword}
                                />
                                <CommonButton
                                  color={Theme.darkGrey_C}
                                  width={`54px`}
                                  height={`30px`}
                                  kindOf={`white`}
                                  fontSize={`14px`}
                                  onClick={() =>
                                    secretPasswordHandler(data.secret, idx)
                                  }
                                >
                                  확인
                                </CommonButton>
                              </Wrapper>
                            </Wrapper>
                          </Wrapper>
                        </Wrapper>
                      ) : (
                        <Wrapper
                          dr={`row`}
                          ju={`flex-start`}
                          padding={`14px 0px`}
                          cursor={`pointer`}
                          borderBottom={`1px solid ${Theme.grey2_C}`}
                        >
                          <Wrapper width={`10%`}></Wrapper>

                          <Wrapper width={`60%`} ju={`flex-start`} dr={`row`}>
                            <Wrapper
                              dr={`row`}
                              al={`flex-start`}
                              bgColor={Theme.lightGrey2_C}
                            >
                              <Wrapper
                                width={`20px`}
                                height={`20px`}
                                color={Theme.white_C}
                                radius={`100%`}
                                bgColor={Theme.red_C}
                                margin={`23px 26px 0 20px`}
                              >
                                A
                              </Wrapper>
                              <Wrapper
                                width={`calc(100% - 66px)`}
                                minHeight={`140px`}
                                al={`flex-start`}
                                ju={`flex-start`}
                                padding={`23px 10px 0 0`}
                              >
                                {data && data.answer}
                              </Wrapper>
                            </Wrapper>
                          </Wrapper>
                        </Wrapper>
                      )}

                      <Wrapper width={`10%`}></Wrapper>
                      <Wrapper width={`10%`}></Wrapper>
                      <Wrapper width={`10%`}></Wrapper>
                    </Wrapper>
                  )}
                </Wrapper>
              );
            })
          ))}
      </Wrapper>

      <Wrapper al={`flex-end`} margin={`20px 0 0 0`}>
        <CommonButton
          radius={`0`}
          width={`106px`}
          height={`40px`}
          fontSize={`15px`}
          padding={`0`}
          onClick={() => (me ? ModalToggle() : notModalToggle())}
        >
          상품 문의하기
        </CommonButton>
      </Wrapper>

      <Wrapper margin={`50px 0px`}>
        <CustomPagination
          total={productQuestionListProdLastPage * 10}
          onChange={onChangePageHandler}
          current={currentPage}
        />
      </Wrapper>

      <CustomModal
        footer={null}
        centered={true}
        width={`1350px`}
        title="상품 문의작성"
        visible={isModalVisible1}
        zIndex={10000}
      >
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

          <Wrapper al={`flex-start`} margin={`35px 0 0 0`}>
            <Checkbox checked={isSecret1} onChange={(e) => isSecretHandler1(e)}>
              비밀글 여부
            </Checkbox>
          </Wrapper>

          {isSecret1 && (
            <Wrapper al={`flex-start`}>
              <Text
                fontSize={`16px`}
                width={`60px`}
                color={Theme.darkGrey_C}
                margin={`35px 0 0 0`}
              >
                비밀번호
              </Text>
              <TextInput
                width={`100%`}
                margin={`10px 0 0 0`}
                border={`1px solid ${Theme.basicTheme_C}`}
                type={`password`}
                {...inputPassword}
              />
            </Wrapper>
          )}

          <Wrapper dr={`row`} margin={`40px 0 0 0`}>
            <CommonButton
              width={`120px`}
              height={`38px`}
              margin={`0 5px 0 0`}
              fontSize={`14px`}
              kindOf={`darkgrey`}
              onClick={() => ModalToggle()}
            >
              취소하기
            </CommonButton>
            <CommonButton
              width={`120px`}
              height={`38px`}
              fontSize={`14px`}
              onClick={() => createProdQnaHandler()}
            >
              작성하기
            </CommonButton>
          </Wrapper>
        </Wrapper>
      </CustomModal>

      {/* ///////////////////////////////////////////////////////////////////////// 비회원 모달창 */}

      <CustomModal
        footer={null}
        centered={true}
        width={`1350px`}
        title="상품 문의작성"
        visible={isModalVisible2}
        zIndex={10000}
      >
        <Wrapper>
          <Wrapper al={`flex-start`}>
            <Text fontSize={`16px`} width={`30px`} color={Theme.darkGrey_C}>
              이름
            </Text>
            <TextInput
              width={`100%`}
              margin={`10px 0 0 0`}
              border={`1px solid ${Theme.basicTheme_C}`}
              placeholder="이름을 입력해주세요."
              {...inputNotName}
            />
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`35px 0 0 0`}>
            <Text fontSize={`16px`} width={`50px`} color={Theme.darkGrey_C}>
              연락처
            </Text>
            <TextInput
              width={`100%`}
              margin={`10px 0 0 0`}
              border={`1px solid ${Theme.basicTheme_C}`}
              placeholder="연락처를 입력해주세요."
              {...inputNotMobile}
            />
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`35px 0 0 0`}>
            <Text fontSize={`16px`} width={`50px`} color={Theme.darkGrey_C}>
              이메일
            </Text>
            <TextInput
              width={`100%`}
              margin={`10px 0 0 0`}
              border={`1px solid ${Theme.basicTheme_C}`}
              placeholder="이메일을 입력해주세요."
              {...inputNotEmail}
            />
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`35px 0 0 0`}>
            <Text fontSize={`16px`} width={`30px`} color={Theme.darkGrey_C}>
              제목
            </Text>
            <TextInput
              width={`100%`}
              margin={`10px 0 0 0`}
              border={`1px solid ${Theme.basicTheme_C}`}
              placeholder="제목을 입력해주세요."
              {...inputNotTitle}
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
              {...inputNotContent}
            />
          </Wrapper>

          <Wrapper al={`flex-start`} margin={`35px 0 0 0`}>
            <Checkbox checked={isSecret2} onChange={(e) => isSecretHandler2(e)}>
              비밀글 여부
            </Checkbox>
          </Wrapper>

          {isSecret2 && (
            <Wrapper al={`flex-start`}>
              <Text
                fontSize={`16px`}
                width={`60px`}
                color={Theme.darkGrey_C}
                margin={`35px 0 0 0`}
              >
                비밀번호
              </Text>
              <TextInput
                width={`100%`}
                margin={`10px 0 0 0`}
                border={`1px solid ${Theme.basicTheme_C}`}
                type={`password`}
                {...inputNotPassword}
              />
            </Wrapper>
          )}

          <Wrapper al={`flex-start`} margin={`25px 0 0 0`}>
            <Checkbox
              checked={isCheckAgree}
              onChange={(e) => onChangeisCheckAgree(e)}
            >
              개인정보 제공에 동의합니다.
            </Checkbox>
          </Wrapper>

          <Wrapper dr={`row`} margin={`40px 0 0 0`}>
            <CommonButton
              width={`120px`}
              height={`38px`}
              margin={`0 5px 0 0`}
              fontSize={`14px`}
              kindOf={`darkgrey`}
              onClick={() => notModalToggle()}
            >
              취소하기
            </CommonButton>
            <CommonButton
              width={`120px`}
              height={`38px`}
              fontSize={`14px`}
              onClick={() => createNotUserProdQnaHandler()}
            >
              작성하기
            </CommonButton>
          </Wrapper>
        </Wrapper>
      </CustomModal>

      <CustomModal
        title="비밀글 입력"
        visible={isModalVisible3}
        onOk={() => isSecretModalOk()}
        onCancel={() => isSecretModalToggle()}
        okText="확인"
        cancelText="취소"
      >
        <Wrapper dr={`row`}>
          <Text width={`80px`}>비밀번호</Text>
          <TextInput
            placeholder="비밀글 비밀번호를 입력해주세요."
            width={`calc(100% - 80px)`}
            {...inputModalPassword}
          />
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
