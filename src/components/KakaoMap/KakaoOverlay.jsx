import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function KakaoOverlay({ data, onClick = null }) {
  return (
    <StWrap className="wrap">
      <StHeader>
        <p className="title">{data?.title || '축제 이름'}</p>
        <StCloseBtn onClick={onClick && onClick}>닫기</StCloseBtn>
      </StHeader>
      <StBody>
        <StImgWrap>
          <img src={data.overlayImage} alt="" />
        </StImgWrap>
        <p className="address">
          <span>장소: </span>
          {data?.address || '축제 주소'}
        </p>
        <p className="address">
          <span>시작: </span>
          {data?.startDate || '축제 주소'}
        </p>
        <p className="address">
          <span>종료: </span>
          {data?.endDate || '축제 주소'}
        </p>
      </StBody>
      <StFooter>
        <StLink to={`/detail/${data.festivalId}`}>자세히 보기</StLink>
      </StFooter>
    </StWrap>
  );
}

const StWrap = styled.div`
  background-color: white;
  width: 20rem;
  text-align: left;
  overflow: hidden;
  padding: 0.5rem 1rem;
  border: 3px solid #99353c;
  outline: none;
  transform: translateX(-1px);
`;

const StHeader = styled.div`
  border: 0;
  display: flex;
  align-items: center;

  & > .title {
    font-size: 1.25rem;
    font-weight: bold;
  }
`;

const StCloseBtn = styled.button`
  border-radius: 1rem;
  padding: 0.5rem;
  cursor: pointer;
  margin-left: auto;
  border: none;
  font-size: ${({ theme }) => theme.fontSize.sm};
  background-color: #99353c;
  color: white;
  transition: 0.15s;

  &:hover {
    background-color: #dc1920;
  }
`;
const StBody = styled.div`
  overflow: hidden;
  padding-top: 1rem;

  & > .address {
    font-size: 0.8rem;
    color: #888;
  }

  & p {
    margin-top: 0.5rem;
  }

  & span {
    font-weight: bold;
  }
`;

const StImgWrap = styled.figure`
  width: 60%;
  margin: auto;

  & > img {
    width: 100%;
  }
`;

const StFooter = styled.div`
  display: flex;
`;

const StLink = styled(Link)`
  background-color: #99353c;
  border-radius: 1rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: white;
  padding: 0.5rem 1rem;
  transition: 0.15s;
  margin-left: auto;

  &:hover {
    background-color: #dc1920;
  }
`;

export default KakaoOverlay;
