import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function AuthIndex() {
  return (
    <StLoginCardContainer>
      <StCard>
        <StLink to={'/auth/genernal'}>일반회원 로그인하기</StLink>
        <StLink to={'/auth/organizer'}>업체회원 로그인하기</StLink>
      </StCard>
    </StLoginCardContainer>
  );
}

const StLoginCardContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(130deg, #99353c 26.333333%, rgba(0, 38, 84, 0) 15.333333%),
    linear-gradient(130deg, #2b4238 80.666666%, #99353c 66.666666%);
`;

const StLink = styled(Link)`
  background-color: #99353c;
  border-radius: 15px;
  color: white;
  padding: 20px;
  font-weight: 600;
  font-size: medium;

  transition: all 0.5s;

  &:hover {
    background-color: #2b4238;
  }
`;

const StCard = styled.div`
  background-color: white;
  width: 25%;
  height: 60%;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;

  color: white;
  font-size: large;
  font-weight: 700;
  text-align: center;
  /* 맘에 안 들으시면 바꾸셔도 돼요!! */
  background-image: linear-gradient(rgba(0, 0, 0, 0.413), rgba(0, 0, 0, 0.504)),
    url(https://img.freepik.com/premium-photo/snowman-in-a-winter-christmas-scene-with-snow-pine-trees-and-warm-light-merry-christmas-background_719646-1121.jpg);
  background-position: center;
  background-size: cover;

  box-shadow: 0px 0px 15px 7px #0000006e;
`;
