import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { END } from "redux-saga";
import axios from "axios";
import { useRouter } from "next/router";
import { Table, Button, Modal, Image, message, Select, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";

import wrapper from "../../../store/configureStore";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import { Text, Wrapper } from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import {
  CREATE_MODAL_TOGGLE,
  REVIEW_LIST_REQUEST,
} from "../../../reducers/review";
import Theme from "../../../components/Theme";
import useInput from "../../../hooks/useInput";

const AdminContent = styled.div`
  padding: 20px;
`;

const ReviewList = () => {
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

  ////// GROBAL STATE //////

  const {
    reviewList,
    maxPage,
    createModal,
    st_reviewDeleteDone,
    st_reviewDeleteError,
  } = useSelector((state) => state.review);
  ///// HOOKS //////
  const dispatch = useDispatch();
  const [reviewData, setReviewData] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [searchType, setSearchType] = useState("제목");

  const searchValue = useInput("");

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_reviewDeleteDone) {
      dispatch({
        type: REVIEW_LIST_REQUEST,
        data: {
          page: currentPage,
          searchTitle: searchType === "제목" ? searchValue : "",
          searchAuthor: searchType === "작성자" ? searchValue : "",
        },
      });

      return message.success("삭제되었습니다.");
    }
  }, [st_reviewDeleteDone]);

  useEffect(() => {
    if (st_reviewDeleteError) {
      return message.error(st_reviewDeleteError);
    }
  }, [st_reviewDeleteError]);

  ////// TOGGLE //////
  const createModalToggle = useCallback(
    (data) => {
      if (data) {
        setReviewData(data);
      } else {
        setReviewData(null);
      }
      dispatch({
        type: CREATE_MODAL_TOGGLE,
      });
    },
    [createModal, reviewData]
  );

  const searchHandler = useCallback(() => {
    dispatch({
      type: REVIEW_LIST_REQUEST,
      data: {
        page: 1,
        searchTitle: searchType === "제목" ? searchValue.value : "",
        searchAuthor: searchType === "작성자" ? searchValue.value : "",
      },
    });
  }, [searchValue.value, searchType]);

  const selectValueHandler = useCallback(
    (data) => {
      setSearchType(data);
    },
    [searchType]
  );

  ////// HANDLER //////

  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);

      dispatch({
        type: REVIEW_LIST_REQUEST,
        data: {
          page: changePage,
          searchTitle: searchType === "제목" ? searchValue.value : "",
          searchAuthor: searchType === "작성자" ? searchValue.value : "",
        },
      });
    },
    [searchValue, searchValue.value, searchType]
  );

  ////// DATAVIEW //////

  const columns = [
    {
      title: "번호",
      dataIndex: "id",
    },

    {
      title: "상품이름",
      render: (data) => <div>{data.Product.title}</div>,
    },
    {
      title: "제목",
      dataIndex: "title",
    },
    {
      title: "조회수",
      dataIndex: "hit",
    },

    {
      title: "작성일",
      render: (data) => {
        return <div>{data.createdAt.substring(0, 10)}</div>;
      },
    },
    {
      title: "후기상세",
      render: (data) => (
        <Button
          type="primary"
          size="small"
          onClick={() => createModalToggle(data)}
        >
          후기상세
        </Button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["상품 문의", "상품 후기 리스트"]}
        title={`상품 후기 리스트`}
        subTitle={`홈페이지의 상품 후기를 관리할 수 있습니다.`}
      />
      <AdminContent>
        <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 10px`}>
          <Select
            style={{
              width: `100px`,
            }}
            defaultValue={searchType}
            onChange={selectValueHandler}
          >
            <Select.Option value={"제목"}>제목</Select.Option>
            <Select.Option value={"작성자"}>작성자</Select.Option>
          </Select>

          <Input style={{ width: `300px` }} {...searchValue} />
          <Button size="medium" type="primary" onClick={searchHandler}>
            찾기
          </Button>
        </Wrapper>

        <Table
          size="small"
          columns={columns}
          dataSource={reviewList ? reviewList : []}
          pagination={{
            defaultCurrent: 1,
            current: parseInt(currentPage),
            total: maxPage * 10,
            onChange: (page) => otherPageCall(page),
          }}
        />
      </AdminContent>

      <Modal
        title="후기상세"
        width={`920px`}
        visible={createModal}
        onCancel={() => createModalToggle(null)}
        footer={null}
      >
        <Wrapper border={`1px solid ${Theme.basicTheme_C}`}>
          <Wrapper dr={`row`} borderBottom={`1px solid ${Theme.basicTheme_C}`}>
            <Wrapper
              width={`30%`}
              padding={`20px 0`}
              bgColor={Theme.basicTheme_C}
              color={Theme.white_C}
            >
              상품명
            </Wrapper>
            <Wrapper
              width={`70%`}
              padding={`20px 0`}
              borderLeft={`1px solid ${Theme.basicTheme_C}`}
            >
              {reviewData && reviewData.Product.title}
            </Wrapper>
          </Wrapper>
          <Wrapper dr={`row`} borderBottom={`1px solid ${Theme.basicTheme_C}`}>
            <Wrapper
              width={`30%`}
              padding={`20px 0`}
              bgColor={Theme.basicTheme_C}
              color={Theme.white_C}
            >
              후기제목
            </Wrapper>
            <Wrapper
              width={`70%`}
              padding={`20px 0`}
              borderLeft={`1px solid ${Theme.basicTheme_C}`}
            >
              {reviewData && reviewData.title}
            </Wrapper>
          </Wrapper>
          <Wrapper dr={`row`} borderBottom={`1px solid ${Theme.basicTheme_C}`}>
            <Wrapper width={`calc(100% / 3)`} dr={`row`}>
              <Wrapper
                width={`30%`}
                bgColor={Theme.basicTheme_C}
                color={Theme.white_C}
                padding={`20px 0`}
              >
                조회수
              </Wrapper>
              <Wrapper
                width={`70%`}
                padding={`20px 0`}
                borderLeft={`1px solid ${Theme.basicTheme_C}`}
                borderRight={`1px solid ${Theme.basicTheme_C}`}
              >
                {reviewData && reviewData.hit}
              </Wrapper>
            </Wrapper>
            <Wrapper width={`calc(100% / 3)`} dr={`row`}>
              <Wrapper
                width={`30%`}
                bgColor={Theme.basicTheme_C}
                color={Theme.white_C}
                padding={`20px 0`}
              >
                작성자
              </Wrapper>
              <Wrapper
                width={`70%`}
                padding={`20px 0`}
                borderLeft={`1px solid ${Theme.basicTheme_C}`}
                borderRight={`1px solid ${Theme.basicTheme_C}`}
              >
                {reviewData && reviewData.author}
              </Wrapper>
            </Wrapper>
            <Wrapper width={`calc(100% / 3)`} dr={`row`}>
              <Wrapper
                width={`30%`}
                bgColor={Theme.basicTheme_C}
                color={Theme.white_C}
                padding={`20px 0`}
              >
                작성일
              </Wrapper>
              <Wrapper
                width={`70%`}
                padding={`20px 0`}
                borderLeft={`1px solid ${Theme.basicTheme_C}`}
              >
                {reviewData && reviewData.createdAt.substring(0, 10)}
              </Wrapper>
            </Wrapper>
          </Wrapper>

          <Wrapper dr={`row`} ju={`flex-end`} position={`relative`}>
            <Wrapper
              width={`30%`}
              height={`100%`}
              bgColor={Theme.basicTheme_C}
              color={Theme.white_C}
              position={`absolute`}
              top={`0`}
              left={`0`}
            >
              후기내용
            </Wrapper>
            <Wrapper
              width={`70%`}
              padding={`20px 0`}
              borderLeft={`1px solid ${Theme.basicTheme_C}`}
            >
              <Image
                width={`600px`}
                src={reviewData && reviewData.imagePath}
                alt="review_image"
              />
              <Text>{reviewData && reviewData.content}</Text>
            </Wrapper>
          </Wrapper>
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
      type: REVIEW_LIST_REQUEST,
      data: {
        page: 1,
        searchTitle: "",
        searchAuthor: "",
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default ReviewList;
