import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <>
      <StContainer>
        <p>ⓒ 2023. 원터 원더랜드 가이드. All rights reserved.</p>
      </StContainer>
    </>
  );
};

const StContainer = styled.section`
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  color: #fff;
  background: #c21e1e;
`;
export default Footer;
