import React from "react";
import ClientLayout from "../../../components/ClientLayout";
import {
  RsWrapper,
  WholeWrapper,
  Text,
  Wrapper,
} from "../../../components/commonComponents";

const DetailProduct = () => {
  return (
    <ClientLayout>
      <WholeWrapper>
        <RsWrapper>
          <Wrapper margin={`280px 0 0`}>
            <Wrapper dr={`row`} ju={`space-between`}>
              <Wrapper width={`calc(50% - 30px)`} padding={`30px 110px 40px`}>
                test
              </Wrapper>
              <Wrapper width={`calc(50% - 30px)`}>test</Wrapper>
            </Wrapper>
          </Wrapper>
        </RsWrapper>
      </WholeWrapper>
    </ClientLayout>
  );
};

export default DetailProduct;
