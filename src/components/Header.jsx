import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StContainer from './common/StContainer';
import VwContainer from './common/StVwContainer';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from 'fb/firebase';
import { logout } from '../redux/modules/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
  const user = useSelector((state) => state.auth.targetUser);
  const userProfile = !!user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate('/');
      toast.success('로그아웃 되셨습니다.');
    } catch (error) {
      console.error('로그아웃 실패', error);
      toast.error('알 수 없는 오류가 발생하였습니다.');
    }
  };
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
              {user?.organizer ? <StLoginLink to={'/registration'}>축제 등록하기</StLoginLink> : ''}
              {/* 잠시 주석처리 */}
              {/* <StSignupLink to={'/auth'}>회원가입</StSignupLink> */}
              {!userProfile ? (
                <StLoginLink to={'/auth'}>로그인</StLoginLink>
              ) : (
                <StLoginLink onClick={handleLogout}>로그아웃</StLoginLink>
              )}
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
  box-shadow: 1px 1px 10px 10px #00000017;
`;
const StHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 24px 0;
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
