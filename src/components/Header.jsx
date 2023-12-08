import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StContainer from './common/StContainer';
import VwContainer from './common/StVwContainer';

const Header = () => {
  return (
    <StFixed>
      <VwContainer $backgroundColor="#dc1920">
        <StContainer>
          <StHeader>
            <StLogo>
              <Link to={'/'}>윈터 원더랜드 가이드☃️</Link>
            </StLogo>
            <StNav>
              <StToMapLink to={'/search'}>
                <svg width="12" height="12" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="#ffffff"
                    d="M16 2A11.013 11.013 0 0 0 5 13a10.889 10.889 0 0 0 2.216 6.6s.3.395.349.452L16 30l8.439-9.953c.044-.053.345-.447.345-.447l.001-.003A10.885 10.885 0 0 0 27 13A11.013 11.013 0 0 0 16 2Zm0 15a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4Z"
                  />
                  <circle cx="16" cy="13" r="4" fill="none" />
                </svg>
                내 주변 축제
              </StToMapLink>
              <StSignupLink to={'/auth'}>회원가입</StSignupLink>
              <StLoginLink to={'/auth'}>로그인</StLoginLink>
            </StNav>
          </StHeader>
        </StContainer>
      </VwContainer>
    </StFixed>
  );
};
const StFixed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
`;
const StHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 24px 20px;
`;
const StLogo = styled.h1`
  font-size: 18px;
  font-family: 'omyu_pretty', sans-serif;

  & a {
    color: #fff;
  }
`;

const StNav = styled.nav`
  display: flex;

  align-items: center;
  gap: 20px;
  margin-left: auto;
  font-size: 15px;
`;
const StToMapLink = styled(Link)`
  position: relative;
  display: flex;
  padding-right: 20px;
  color: #fff;

  & svg {
    margin-right: 4px;
  }

  &::after {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    content: '';
    display: block;
    width: 1px;
    height: 10px;
    background: #eee;
  }
`;
const StSignupLink = styled(Link)`
  color: #fff;
`;
const StLoginLink = styled(Link)`
  color: #fff;
`;
export default Header;
