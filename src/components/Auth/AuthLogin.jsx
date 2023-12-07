import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from 'fb/firebase';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/modules/authSlice';
import { useNavigate } from 'react-router';

export default function AuthLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [switchLogin, setSwitchLogin] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (switchLogin) {
      if (!email || !password || !userName || !checkPassword) {
        alert('빈 칸 없이 입력해주세요!');
        return;
      }
    } else {
      if (!email || !password) {
        alert('이메일 또는 비밀번호를 입력해주세요!');
        return;
      }
    }
    try {
      if (switchLogin) {
        //회원가입;
        if (!(checkPassword === password)) {
          alert('비밀번호가 같지 않습니다!');
          return;
        }
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log(response);
        setEmail('');
        setPassword('');
        setSwitchLogin(false);
      } else {
        //로그인
        const signIn = await signInWithEmailAndPassword(auth, email.trim(), password);
        dispatch(login(signIn.user.providerData[0]));
        navigate('/');
      }
    } catch (err) {
      alert('알 수 없는 오류가 발생하였습니다.');
    }
  };

  return (
    <StLoginCardContainer>
      <StLoginCard>
        <form onSubmit={handleSignUp}>
          <h2>{switchLogin ? '회원가입' : '로그인'}</h2>
          <div>
            {switchLogin ? (
              <>
                <div>
                  <input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="업체 이름" />
                </div>
              </>
            ) : (
              ''
            )}
            <div>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="아이디" />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
              />
            </div>
            {switchLogin ? (
              <div>
                <input
                  type="password"
                  value={checkPassword}
                  onChange={(e) => setCheckPassword(e.target.value)}
                  placeholder="비밀번호 확인"
                />
              </div>
            ) : (
              ''
            )}
          </div>
          <button type="submit">{switchLogin ? '가입하기' : '로그인'}</button>
          <StSwitchBtn
            onClick={() => {
              setSwitchLogin((s) => !s);
            }}
            type="button"
          >
            {switchLogin ? '로그인하기' : '회원가입하기'}
          </StSwitchBtn>
        </form>
      </StLoginCard>
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

const StLoginCard = styled.div`
  height: 60%;
  width: 40%;
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 15px 7px #0000006e;
  background: linear-gradient(90deg, #fff 50%, rgba(0, 0, 0, 0) 25%),
    linear-gradient(90deg, #2b4238 57.666666%, rgba(0, 0, 0, 0.219) 50%),
    url(https://blog.kakaocdn.net/dn/Av4yp/btqRpubzxJV/UJc3HveupJXuI58p3foKik/img.jpg);
  background-position: center;
  background-size: cover;

  & > form {
    display: flex;
    flex-direction: column;
  }
`;

const StSwitchBtn = styled.button`
  margin-top: 20px;
  border: none;
  background-color: transparent;
  text-decoration: underline;
  color: #00000085;
  cursor: pointer;
`;
