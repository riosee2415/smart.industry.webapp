import React, { useCallback, useEffect, useState, useRef } from "react";
import { InboxOutlined } from "@ant-design/icons";
import styled from "styled-components";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Upload,
  notification,
  message,
  Popconfirm,
  Switch,
  Image,
} from "antd";
import { Wrapper } from "../../../components/commonComponents";
import { useDispatch, useSelector } from "react-redux";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import { useRouter, withRouter } from "next/router";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import {
  CREATE_MODAL_TOGGLE,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_LIST_REQUEST,
  PRODUCT_UPLOAD_REQUEST,
  PRODUCT_IMAGE_PATH,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DETAIL_UPLOAD_REQUEST,
  PRODUCT_CREATE_IMAGE_REQUEST,
  PRODUCT_LIST_IMAGE_REQUEST,
  PRODUCT_DETAIL_IMAGE_PATH,
  PRODUCT_DELETE_IMAGE_REQUEST,
  PRODUCT_USED_UPDATE_REQUEST,
  PRODUCT_SALE_UPDATE_REQUEST,
  PRODUCT_BEST_UPDATE_REQUEST,
  PROD_COMPANY_MODAL_TOGGLE,
  PRODUCT_COMPANY_LIST_REQUEST,
  PROD_COMPANY_CREATE_MODAL_TOGGLE,
  PRODUCT_COMPANY_CREATE_REQUEST,
  PRODUCT_COMPANY_UPDATE_REQUEST,
  PRODUCT_COMPANY_DELETE_REQUEST,
  UNIT_MODAL_TOGGLE,
} from "../../../reducers/product";
import { CATEGORY_LIST_REQUEST } from "../../../reducers/category";
import Theme from "../../../components/Theme";

const PRODUCT_WIDTH = `216`;
const PRODUCT_HEIGHT = `216`;

const AdminContent = styled.div`
  padding: 20px;
`;

const Filename = styled.span`
  margin-right: 15px;
  color: #555;
  font-size: 13px;
`;

const GalleryWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ThumbnailImage = styled.img`
  width: 216px;
  height: 216px;
  object-fit: cover;
`;
const UploadWrapper = styled.div`
  width: 216px;
  margin: 5px 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const GuideWrapper = styled.section`
  width: 600px;
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

const AdminUl = styled.ul``;
const Adminli = styled.li`
  margin: -10px 0 20px 70px;
  color: ${Theme.red_C};
`;

const GuideUl = styled.ul`
  width: 100%;
  padding: 5px;
`;
const GuideLi = styled.li`
  width: 100%;
  margin-bottom: 5px;
  color: ${(props) => (props.isImpo ? props.theme.red_C : "")};
`;

const LoadNotification = (msg, content) => {
  notification.open({
    message: msg,
    description: content,
    onClick: () => {},
  });
};
const ProductList = () => {
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

  const {
    productImages,
    productList,
    prodCompanyList,
    productId,
    maxPage,
    createModal,
    prodCompanyModal,
    prodCompanyCreateModal,
    unitModal,
    //
    productImagePath,
    productDetailImagePath,
    //
    st_productUploadLoading,
    st_productCreateDone,
    st_productCreateError,
    st_productUpdateDone,
    st_productUpdateError,
    st_productDeleteDone,
    st_productDeleteError,
    st_productDetailUploadDone,
    st_productDetailUploadError,
    st_productCreateImageDone,
    st_productUsedUpdateDone,
    st_productUsedUpdateError,
    st_productSaleUpdateDone,
    st_productSaleUpdateError,
    st_productBestUpdateDone,
    st_productBestUpdateError,
    //

    st_productCompanyCreateDone,
    st_productCompanyCreateError,

    st_productCompanyUpdateDone,
    st_productCompanyUpdateError,

    st_productCompanyDeleteDone,
    st_productCompanyDeleteError,
  } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  const [currentPage, setCurrentPage] = useState(1);
  const [updateData, setUpdateData] = useState(null);
  const [selectCategory, setSelectCategory] = useState(null);
  const [companyUpdateData, setCompanyUpdateData] = useState(null);

  const [detailImageArr, setDetailImageArr] = useState([]);
  const [createDone, setCreateDone] = useState(false);

  const [form] = Form.useForm();
  const formRef = useRef();

  const [companyForm] = Form.useForm();
  const companyFormRef = useRef();

  const dispatch = useDispatch();

  const imageRef = useRef();

  ////// USEEFFECT //////

  useEffect(() => {
    if (st_productCompanyCreateDone) {
      dispatch({
        type: PRODUCT_COMPANY_LIST_REQUEST,
      });

      dispatch({
        type: PROD_COMPANY_CREATE_MODAL_TOGGLE,
      });

      companyForm.resetFields();

      return message.success("생성되었습니다.");
    }
  }, [st_productCompanyCreateDone]);

  useEffect(() => {
    if (st_productCompanyCreateError) {
      return message.error(st_productCompanyCreateError);
    }
  }, [st_productCompanyCreateError]);

  useEffect(() => {
    if (st_productCompanyUpdateDone) {
      dispatch({
        type: PRODUCT_COMPANY_LIST_REQUEST,
      });

      dispatch({
        type: PROD_COMPANY_CREATE_MODAL_TOGGLE,
      });

      companyForm.resetFields();

      setCompanyUpdateData(null);

      return message.success("수정되었습니다.");
    }
  }, [st_productCompanyUpdateDone]);

  useEffect(() => {
    if (st_productCompanyUpdateError) {
      return message.error(st_productCompanyUpdateError);
    }
  }, [st_productCompanyUpdateError]);

  useEffect(() => {
    if (st_productCompanyDeleteDone) {
      dispatch({
        type: PRODUCT_COMPANY_LIST_REQUEST,
      });

      return message.success("삭제되었습니다.");
    }
  }, [st_productCompanyDeleteDone]);

  useEffect(() => {
    if (st_productCompanyDeleteError) {
      return message.error(st_productCompanyDeleteError);
    }
  }, [st_productCompanyDeleteError]);

  useEffect(() => {
    if (
      st_productUsedUpdateDone ||
      st_productSaleUpdateDone ||
      st_productBestUpdateDone
    ) {
      dispatch({
        type: PRODUCT_LIST_REQUEST,
        data: {
          page: currentPage,
          categoryId: selectCategory,
        },
      });
    }
  }, [
    st_productUsedUpdateDone,
    st_productSaleUpdateDone,
    st_productBestUpdateDone,
  ]);

  useEffect(() => {
    if (st_productBestUpdateError) {
      return message.error(st_productBestUpdateError);
    }
  }, [st_productBestUpdateError]);

  useEffect(() => {
    if (st_productUsedUpdateError) {
      return message.error(st_productUsedUpdateError);
    }
  }, [st_productUsedUpdateError]);

  useEffect(() => {
    if (st_productSaleUpdateError) {
      return message.error(st_productSaleUpdateError);
    }
  }, [st_productSaleUpdateError]);

  useEffect(() => {
    if (st_productDetailUploadDone) {
      if (updateData && productDetailImagePath) {
        let imageArr = productImages && productImages.map((data) => data.sort);

        dispatch({
          type: PRODUCT_CREATE_IMAGE_REQUEST,
          data: {
            imagePath: productDetailImagePath,
            sort: parseInt(Math.max.apply(imageArr)) + 1,
            prodId: updateData.id,
          },
        });
      } else {
        let imageArr = detailImageArr.map((data) => data);

        imageArr.push(productDetailImagePath);

        setDetailImageArr(imageArr);
      }
    }
  }, [st_productDetailUploadDone, updateData]);

  useEffect(() => {
    if (st_productDetailUploadError) {
      return message.error(st_productDetailUploadError);
    }
  }, [st_productDetailUploadError]);

  useEffect(() => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
      data: {
        page: currentPage,
        categoryId: selectCategory,
      },
    });
  }, [selectCategory]);

  useEffect(() => {
    if (updateData) {
      formRef.current.setFieldsValue({
        title: updateData.title,
        price: updateData.price,
        discount: updateData.discount,
        deliveryPay: updateData.deliveryPay,
        youtubeLink: updateData.youtubeLink,
        category: updateData.CategoryId,
        prodCompany: updateData.ProdCompanyId,
        image: productImages
          ? productImages.map((data) => ({
              uid: data.id,
              url: data.imagePath,
            }))
          : null,
      });

      dispatch({
        type: PRODUCT_IMAGE_PATH,
        data: updateData.thumbnail,
      });
    }
  }, [updateData, productImages]);

  useEffect(() => {
    if (st_productCreateDone) {
      for (let i = 0; i < detailImageArr.length; i++) {
        dispatch({
          type: PRODUCT_CREATE_IMAGE_REQUEST,
          data: {
            imagePath: detailImageArr[i],
            sort: i,
            prodId: productId,
          },
        });
      }

      dispatch({
        type: PRODUCT_LIST_REQUEST,
        data: {
          page: currentPage,
          categoryId: selectCategory,
        },
      });

      dispatch({
        type: CREATE_MODAL_TOGGLE,
      });

      dispatch({
        type: PRODUCT_IMAGE_PATH,
        data: null,
      });

      dispatch({
        type: PRODUCT_DETAIL_IMAGE_PATH,
        data: null,
      });

      form.resetFields();
      setDetailImageArr([]);

      return message.success("상품이 생성되었습니다.");
    }
  }, [st_productCreateDone]);

  useEffect(() => {
    if (st_productCreateError) {
      return message.error(st_productCreateError);
    }
  }, [st_productCreateError]);

  useEffect(() => {
    if (st_productUpdateDone) {
      dispatch({
        type: PRODUCT_LIST_REQUEST,
        data: {
          page: currentPage,
          categoryId: selectCategory,
        },
      });

      dispatch({
        type: CREATE_MODAL_TOGGLE,
      });

      dispatch({
        type: PRODUCT_IMAGE_PATH,
        data: null,
      });

      dispatch({
        type: PRODUCT_DETAIL_IMAGE_PATH,
        data: null,
      });

      setUpdateData(null);
      form.resetFields();

      return message.success("상품이 수정되었습니다.");
    }
  }, [st_productUpdateDone]);

  useEffect(() => {
    if (st_productUpdateError) {
      return message.error(st_productUpdateError);
    }
  }, [st_productUpdateError]);

  useEffect(() => {
    if (st_productDeleteDone) {
      dispatch({
        type: PRODUCT_LIST_REQUEST,
        data: {
          page: currentPage,
          categoryId: selectCategory,
        },
      });

      return message.success("상품이 삭제되었습니다.");
    }
  }, [st_productDeleteDone]);

  useEffect(() => {
    if (st_productDeleteError) {
      return message.error(st_productDeleteError);
    }
  }, [st_productDeleteError]);

  useEffect(() => {
    if (companyUpdateData) {
      companyFormRef.current.setFieldsValue({
        value: companyUpdateData.value,
      });
    }
  }, [companyUpdateData]);

  ////// TOGGLE //////

  const createModalToggle = useCallback(
    (data) => {
      if (data) {
        setUpdateData(data);

        dispatch({
          type: PRODUCT_LIST_IMAGE_REQUEST,
          data: {
            prodId: data.id,
          },
        });
      } else {
        setUpdateData(null);
        form.resetFields();
        dispatch({
          type: PRODUCT_IMAGE_PATH,
          data: null,
        });
      }
      dispatch({
        type: CREATE_MODAL_TOGGLE,
      });
    },
    [updateData]
  );

  const prodCompanyToggle = useCallback(() => {
    dispatch({
      type: PROD_COMPANY_MODAL_TOGGLE,
    });
  }, [prodCompanyModal]);

  const prodCompanyCreateToggle = useCallback(
    (data) => {
      if (data) {
        setCompanyUpdateData(data);
      } else {
        setCompanyUpdateData(null);
      }
      dispatch({
        type: PROD_COMPANY_CREATE_MODAL_TOGGLE,
      });
    },
    [prodCompanyCreateModal]
  );

  const unitMdoalToggle = useCallback(() => {
    dispatch({
      type: UNIT_MODAL_TOGGLE,
    });
  }, [unitModal]);

  ////// HANDLER //////

  const prodCompanyCreateSubmit = useCallback((data) => {
    dispatch({
      type: PRODUCT_COMPANY_CREATE_REQUEST,
      data: {
        value: data.value,
      },
    });
  }, []);

  const prodCompanyUpdateSubmit = useCallback(
    (data) => {
      dispatch({
        type: PRODUCT_COMPANY_UPDATE_REQUEST,
        data: {
          id: companyUpdateData.id,
          value: data.value,
        },
      });
    },
    [companyUpdateData]
  );

  const prodCompanyDeleteSubmit = useCallback((data) => {
    dispatch({
      type: PRODUCT_COMPANY_DELETE_REQUEST,
      data: {
        comId: data.id,
      },
    });
  }, []);

  const clickImageUpload = useCallback(() => {
    imageRef.current.click();
  }, [imageRef]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onChangeImages = useCallback((e) => {
    const formData = new FormData();

    [].forEach.call(e.target.files, (file) => {
      formData.append("image", file);
    });

    dispatch({
      type: PRODUCT_UPLOAD_REQUEST,
      data: formData,
    });
  }, []);

  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);

      dispatch({
        type: PRODUCT_LIST_REQUEST,
        data: {
          page: changePage,
          categoryId: selectCategory,
        },
      });
    },
    [currentPage, selectCategory, productList]
  );

  const onSubmit = useCallback(
    async (data) => {
      if (!productImagePath) {
        return LoadNotification(
          "ADMIN SYSTEM ERROR ",
          "썸네일 이미지를 등록해주세요."
        );
      }

      // let expUrl = /^http[s]?\:\/\//i;

      const youtubeUrl =
        /(http:|https:)?(\/\/)?(www\.)?(youtube.com|youtu.be)\/(watch|embed)?(\?v=|\/)?(\S+)?/g;

      if (!youtubeUrl.test(data.youtubeLink)) {
        return LoadNotification(
          "ADMIN SYSTEM ERROR ",
          "유튜브링크 형식에 맞게 등록해주세요."
        );
      }

      dispatch({
        type: PRODUCT_CREATE_REQUEST,
        data: {
          thumbnail: productImagePath,
          title: data.title,
          price: data.price,
          discount: data.discount,
          deliveryPay: data.deliveryPay,
          youtubeLink: data.youtubeLink,
          CategoryId: data.category,
          ProdCompanyId: data.prodCompany,
        },
      });

      for (let i = 0; i < data.image.length; i++) {
        const formData = new FormData();

        formData.append("image", data.image[i].originFileObj);

        dispatch({
          type: PRODUCT_DETAIL_UPLOAD_REQUEST,
          data: formData,
        });
      }
    },
    [productImagePath]
  );

  const onUpdateSubmit = useCallback(
    async (data) => {
      if (!productImagePath) {
        return LoadNotification(
          "ADMIN SYSTEM ERROR ",
          "썸네일 이미지를 등록해주세요."
        );
      }

      const youtubeUrl =
        /(http:|https:)?(\/\/)?(www\.)?(youtube.com|youtu.be)\/(watch|embed)?(\?v=|\/)?(\S+)?/g;

      if (!youtubeUrl.test(data.youtubeLink)) {
        return LoadNotification(
          "ADMIN SYSTEM ERROR ",
          "유튜브링크 형식에 맞게 등록해주세요."
        );
      }

      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
        data: {
          id: updateData.id,
          thumbnail: productImagePath,
          title: data.title,
          price: data.price,
          discount: data.discount,
          deliveryPay: data.deliveryPay,
          youtubeLink: data.youtubeLink,
          CategoryId: data.category,
          ProdCompanyId: data.prodCompany,
        },
      });
    },
    [productImagePath, updateData]
  );

  const onCreateDetailImage = useCallback(
    (file) => {
      if (file.file.status === "removed") {
        dispatch({
          type: PRODUCT_DELETE_IMAGE_REQUEST,
          data: {
            imageId: file.file.uid,
          },
        });
      } else if (file.file.status === "done") {
        const formData = new FormData();

        formData.append("image", file.file.originFileObj);

        dispatch({
          type: PRODUCT_DETAIL_UPLOAD_REQUEST,
          data: formData,
        });
      }
    },
    [updateData]
  );

  const onDeleteSubmit = useCallback((data) => {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
      data: {
        productId: data.id,
      },
    });
  }, []);

  const usedChangeHandler = useCallback((data, checked) => {
    dispatch({
      type: PRODUCT_USED_UPDATE_REQUEST,
      data: {
        id: data.id,
        isUsed: checked,
      },
    });
  }, []);

  const saleChangeHandler = useCallback((data, checked) => {
    dispatch({
      type: PRODUCT_SALE_UPDATE_REQUEST,
      data: {
        id: data.id,
        isSale: checked,
      },
    });
  }, []);

  const bestChangeHandler = useCallback((data, checked) => {
    dispatch({
      type: PRODUCT_BEST_UPDATE_REQUEST,
      data: {
        id: data.id,
        isBest: checked,
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
      title: "썸네일",
      dataIndex: "thumbnail",
      render: (data) => <Image width={`80px`} src={data} alt="thumbnail" />,
    },
    {
      title: "상품이름",
      dataIndex: "title",
    },
    {
      title: "가격",
      render: (data) => `${data.price}원`,
    },
    {
      title: "할인율",
      render: (data) => `${data.discount}%`,
    },
    {
      title: "배송비",
      render: (data) => `${data.deliveryPay}원`,
    },
    {
      title: "중고장비",
      render: (data) => (
        <Switch
          checked={data.isUsed}
          onChange={(checked) => usedChangeHandler(data, checked)}
        />
      ),
    },
    {
      title: "특가상품",
      render: (data) => (
        <Switch
          checked={data.isSale}
          onChange={(checked) => saleChangeHandler(data, checked)}
        />
      ),
    },
    {
      title: "베스트상품",
      render: (data) => (
        <Switch
          checked={data.isBest}
          onChange={(checked) => bestChangeHandler(data, checked)}
        />
      ),
    },
    {
      title: "상세정보",
      render: (data) => {
        return (
          <Button
            size="small"
            type="primary"
            onClick={() => createModalToggle(data)}
          >
            상세정보
          </Button>
        );
      },
    },
    {
      title: "상품삭제",
      render: (data) => {
        return (
          <Popconfirm
            title="삭제하시겠습니까?"
            onConfirm={() => onDeleteSubmit(data)}
            okText="삭제"
            cancelText="취소"
          >
            <Button size="small" type="danger">
              상품삭제
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  const prodCompanyColumns = [
    {
      title: "번호",
      dataIndex: "id",
    },
    {
      title: "이름",
      dataIndex: "value",
    },
    {
      title: "수정",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          onClick={() => prodCompanyCreateToggle(data)}
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
          onConfirm={() => prodCompanyDeleteSubmit(data)}
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
        breadcrumbs={["상품 관리", "상품 리스트"]}
        title={`상품 리스트`}
        subTitle={`홈페이지에 보여주는 상품을 관리할 수 있습니다.`}
      />

      <AdminContent>
        <Wrapper dr={`row`} ju={`space-between`} margin={`0 0 5px`}>
          <Wrapper width={`40%`} al={`flex-start`}>
            <Select
              style={{ width: `200px` }}
              placeholder="카테고리를 선택해주세요."
              onChange={(data) => setSelectCategory(data)}
            >
              {categoryList &&
                categoryList.map((data) => {
                  return (
                    <Select.Option value={data.id}>{data.value}</Select.Option>
                  );
                })}
            </Select>
          </Wrapper>
          <Wrapper width={`60%`} dr={`row`} ju={`flex-end`}>
            <Button size="small" type="danger" onClick={unitMdoalToggle}>
              주의사항
            </Button>
            <Button
              size="small"
              style={{ margin: `0 0 0 5px` }}
              onClick={prodCompanyToggle}
            >
              제조사 리스트
            </Button>
            <Button
              size="small"
              style={{ margin: `0 5px` }}
              type="dashed"
              onClick={() => setSelectCategory(null)}
            >
              전체조회
            </Button>
            <Button
              size="small"
              type="primary"
              onClick={() => createModalToggle(null)}
            >
              + 상품등록
            </Button>
          </Wrapper>
        </Wrapper>
        <Table
          rowKey="id"
          size="small"
          columns={columns}
          dataSource={productList ? productList : []}
          pagination={{
            defaultCurrent: 1,
            current: parseInt(currentPage),
            pageSize: 20,

            total: maxPage * 10,
            onChange: (page) => otherPageCall(page),
          }}
        />
      </AdminContent>

      <Modal
        title={updateData ? "상품 수정" : "상품 등록"}
        width={`720px`}
        visible={createModal}
        onCancel={() => createModalToggle(null)}
        footer={null}
      >
        <Wrapper>
          <GuideWrapper>
            <GuideText>
              썸네일 이미지 사이즈는 가로 {PRODUCT_WIDTH}px 과 세로
              {PRODUCT_HEIGHT}px을 기준으로 합니다.
            </GuideText>
            <GuideText>
              이미지 사이즈가 상이할 경우 화면에 올바르지 않게 보일 수 있으니
              이미지 사이즈를 확인해주세요.
            </GuideText>
          </GuideWrapper>

          <ThumbnailImage
            src={
              productImagePath
                ? `${productImagePath}`
                : `https://via.placeholder.com/${PRODUCT_WIDTH}x${PRODUCT_HEIGHT}`
            }
            alt="main_product_image"
          />
          <PreviewGuide>
            {productImagePath && `이미지 미리보기 입니다.`}
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
              // loading={st_productUploadLoading}
            >
              UPLOAD
            </Button>
          </UploadWrapper>
        </Wrapper>
        <Form
          wrapperCol={{ span: 20 }}
          labelCol={{ span: 4 }}
          onFinish={updateData ? onUpdateSubmit : onSubmit}
          form={form}
          ref={formRef}
        >
          <Form.Item
            label="이름"
            rules={[{ required: true, message: "이름을 입력해주세요." }]}
            name="title"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="가격"
            rules={[{ required: true, message: "가격을 입력해주세요." }]}
            name="price"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="할인율"
            rules={[{ required: true, message: "할인율를 입력해주세요." }]}
            name="discount"
          >
            <Input type="number" />
          </Form.Item>
          <AdminUl>
            <Adminli>할인율은 % 단위 입니다.</Adminli>
          </AdminUl>
          <Form.Item
            label="배송비"
            rules={[{ required: true, message: "배송비를 입력해주세요." }]}
            name="deliveryPay"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="상품상세링크"
            rules={[{ required: true, message: "유튜브링크를 입력해주세요." }]}
            name="youtubeLink"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="카테고리"
            rules={[{ required: true, message: "카테고리를 선택해주세요." }]}
            name="category"
          >
            <Select>
              {categoryList &&
                categoryList.map((data) => {
                  return (
                    <Select.Option value={data.id}>{data.value}</Select.Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item
            label="제조사"
            rules={[{ required: true, message: "제조사를 선택해주세요." }]}
            name="prodCompany"
          >
            <Select>
              {prodCompanyList &&
                prodCompanyList.map((data) => {
                  return (
                    <Select.Option value={data.id}>{data.value}</Select.Option>
                  );
                })}
            </Select>
          </Form.Item>

          <Form.Item
            label="상품이미지"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "상세이미지를 등록해주세요." }]}
          >
            <Upload.Dragger
              name="files"
              listType="picture-card"
              accept="image/png, image/jpeg"
              showUploadList={{
                showPreviewIcon: false,
              }}
              onChange={(data) => onCreateDetailImage(data)}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">상품 상세사진을 등록해주세요.</p>
            </Upload.Dragger>
          </Form.Item>

          <Wrapper al={`flex-end`}>
            <Button size="small" type="primary" htmlType="submit">
              {updateData ? "상품수정" : "상품등록"}
            </Button>
          </Wrapper>
        </Form>
      </Modal>

      <Modal
        title="제조사 리스트"
        width={`700px`}
        visible={prodCompanyModal}
        onCancel={prodCompanyToggle}
        footer={null}
      >
        <Wrapper al={`flex-end`} margin={`0 0 10px`}>
          <Button size="small" type="primary" onClick={prodCompanyCreateToggle}>
            + 생성
          </Button>
        </Wrapper>
        <Table
          rowKey="id"
          size="small"
          columns={prodCompanyColumns}
          dataSource={prodCompanyList ? prodCompanyList : []}
        />
      </Modal>

      <Modal
        title={companyUpdateData ? "제조사 수정" : "제조사 생성"}
        visible={prodCompanyCreateModal}
        onCancel={prodCompanyCreateToggle}
        footer={null}
      >
        <Form
          onFinish={
            companyUpdateData
              ? prodCompanyUpdateSubmit
              : prodCompanyCreateSubmit
          }
          form={companyForm}
          ref={companyFormRef}
        >
          <Form.Item
            label="이름"
            name="value"
            rules={[{ required: true, message: "이름을 입력해주세요." }]}
          >
            <Input />
          </Form.Item>
          <Wrapper al={`flex-end`}>
            <Button type="primary" size="small" htmlType="submit">
              {companyUpdateData ? "수정" : "+ 생성"}
            </Button>
          </Wrapper>
        </Form>
      </Modal>

      <Modal
        title="주의사항"
        visible={unitModal}
        onCancel={unitMdoalToggle}
        footer={null}
        width={`600px`}
      >
        <GuideUl>
          <GuideLi>베스트상품은 총 4개까지만 존재할 수 있습니다.</GuideLi>
          <GuideLi>가겨, 할인율, 배송비는 숫자만 입력가능합니다.</GuideLi>
          <GuideLi>상품상세링크에는 유튜브 링크만 입력가능합니다.</GuideLi>
          <GuideLi isImpo={true}>
            조작의 실수 및 기능문의는 (주)4LEAF SOFTWARE 1600-4198로
            연락바랍니다.
          </GuideLi>
        </GuideUl>
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
      type: PRODUCT_LIST_REQUEST,
      data: {
        page: 1,
      },
    });

    context.store.dispatch({
      type: CATEGORY_LIST_REQUEST,
    });

    context.store.dispatch({
      type: PRODUCT_COMPANY_LIST_REQUEST,
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default ProductList;
