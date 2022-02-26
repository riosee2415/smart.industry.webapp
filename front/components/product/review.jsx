import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RsWrapper, WholeWrapper, Wrapper, Image } from "../commonComponents";
import Theme from "../Theme";

const Review = () => {
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  const [datum, setDatum] = useState(null);

  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {}, []);

  ////// TOGGLE //////
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
      <Wrapper margin={`40px 0 180px`}>
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
        {testReview && testReview.length === 0
          ? ``
          : testReview &&
            testReview.reverse().map((data, idx) => {
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
                      {data.user.replace(/(?<=.{1})./gi, "*")}
                    </Wrapper>
                    <Wrapper width={`10%`}>
                      {data.createdAt.substring(0, 10)}
                    </Wrapper>
                    <Wrapper width={`10%`}>{data.hit}</Wrapper>
                  </Wrapper>

                  {datum && datum.id === data.id && (
                    <Wrapper borderBottom={`1px solid ${Theme.grey2_C}`}>
                      <Wrapper width={`90%`}>
                        <Image
                          width={`600px`}
                          height={`600px`}
                          src={`${data.thumbnail}`}
                        />
                      </Wrapper>
                      <Wrapper
                        width={`90%`}
                        al={`flex-start`}
                        padding={`60px 0 40px`}
                      >
                        {data.content}
                      </Wrapper>
                    </Wrapper>
                  )}
                </Wrapper>
              );
            })}
      </Wrapper>
    </>
  );
};

export default Review;
