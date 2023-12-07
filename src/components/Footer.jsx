import React from 'react';
import styled from 'styled-components';
import VwContainer from './common/VwContainer';
import StContainer from './common/StContainer';

const Footer = () => {
  return (
    <VwContainer backgroundColor="#126136">
      <StContainer>
        <Stp>ⓒ 2023. 원터 원더랜드 가이드. All rights reserved.</Stp>
      </StContainer>
    </VwContainer>
  );
};

const Stp = styled.p`
  text-align: center;
  padding: 20px 0;
  color: #fff;
`;
export default Footer;
