import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { auth, db } from 'fb/firebase';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/modules/authSlice';
import { useNavigate } from 'react-router';
import { doc, setDoc } from '@firebase/firestore';
import Login from './Login';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function OrganizerLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [switchLogin, setSwitchLogin] = useState(false);
  const [organizer] = useState(true);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (switchLogin) {
      if (!email || !password || !userName || !checkPassword) {
        toast.warning('빈 칸 없이 입력해주세요!');
        return;
      }
    } else {
      if (!email || !password) {
        toast.warning('이메일 또는 비밀번호를 입력해주세요!');
        return;
      }
    }
    try {
      if (switchLogin) {
        //회원가입;
        if (!(checkPassword === password)) {
          toast.warning('비밀번호가 같지 않습니다!');
          return;
        }
        const response = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'user', response.user.uid), {
          //오거나이저 true, false
          name: userName,
          phoneNumber,
          email,
          organizer,
          festivals: []
        });
        setEmail('');
        setPassword('');
        setUserName('');
        setCheckPassword('');
        setPhoneNumber('');
        setSwitchLogin(false);
        toast.success('회원가입이 완료되었습니다.');
      } else {
        //로그인
        const signIn = await signInWithEmailAndPassword(auth, email.trim(), password);
        dispatch(login(signIn.user.providerData[0]));
        toast.success('로그인 되었습니다.');
        navigate('/');
      }
    } catch (err) {
      toast.error('알 수 없는 오류가 발생하였습니다.');
    }
  };

  return (
    <StLoginCardContainer>
      <StLoginCard>
        <div>
          <h2>환영합니다!</h2>
          <p>업체회원 로그인</p>
        </div>
        <Login
          userName={userName}
          setUserName={setUserName}
          password={password}
          setPassword={setPassword}
          email={email}
          setEmail={setEmail}
          checkPassword={checkPassword}
          setCheckPassword={setCheckPassword}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          switchLogin={switchLogin}
          handler={handleSignUp}
        />
        <div>
          <StSwitchBtn onClick={() => setSwitchLogin((s) => !s)}>
            {switchLogin ? '로그인하기' : '회원가입하기'}
          </StSwitchBtn>
        </div>
        <div>
          <StP>일반회원이신가요?</StP>
          <StLink to={'/auth/genernal'}>일반회원 로그인 바로가기</StLink>
        </div>
      </StLoginCard>
    </StLoginCardContainer>
  );
}

const StLoginCardContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(130deg, #99353c 26.333333%, rgba(0, 38, 84, 0) 15.333333%),
    linear-gradient(130deg, #2b4238 80.666666%, #99353c 66.666666%);
`;

const StLoginCard = styled.div`
  /* background-color: white; */
  width: 25%;
  height: 60%;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  color: white;
  font-size: large;
  font-weight: 700;
  text-align: center;
  background-color: #99353c;
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.413), rgba(0, 0, 0, 0.504)),
    url(https://img.freepik.com/premium-photo/snowman-in-a-winter-christmas-scene-with-snow-pine-trees-and-warm-light-merry-christmas-background_719646-1121.jpg);
  background-position: center;
  background-size: cover; */
  box-shadow: 0px 0px 15px 7px #0000006e;

  & > div > h2 {
    margin-bottom: 10px;
  }
`;

const StSwitchBtn = styled.button`
  margin-top: 20px;
  border: none;
  background-color: transparent;
  text-decoration: underline;
  color: #ffffff6f;
  font-size: small;
  font-weight: 700;
  cursor: pointer;
`;

const StLink = styled(Link)`
  color: #ffffff6f;
  font-size: small;
  text-decoration: underline;
`;

const StP = styled.p`
  margin-bottom: 5px;
`;
