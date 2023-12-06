import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  return (
    <StContainer>
      <StHeader>
        <Logo>🎄윈터 원더랜드 가이드☃️</Logo>
        <Description>🎅크리스마스까지 D-20🌟</Description>
        {/* <Nav /> */}
      </StHeader>
    </StContainer>
  );
};

const StContainer = styled.section`
  width: 100%;
  border-bottom: 1px solid #e6e6e6;
`;
const StHeader = styled.header`
  position: relative;
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
`;
const Logo = styled.h1`
  font-size: 18px;
`;

const Description = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: self-end;
  transform: translate(-50%, -50%);
  height: 40px;
  background: #eeeeee;
  padding: 10px 70px;
  border-radius: 20px;
`;
export default Header;
