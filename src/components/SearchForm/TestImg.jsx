import React from 'react';
import testImg from './assets/테스트 .png';
import styled from 'styled-components';

function TestImg() {
  return (
    <StImgWrapper>
      <img src={testImg} alt="테스트 이미지" />
    </StImgWrapper>
  );
}

export default TestImg;

const StImgWrapper = styled.div`
  width: 100%;
  height: 650px;
  margin: 10px;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
