import React from 'react';
import styled from 'styled-components';

export default function Login({
  setUserName,
  setPassword,
  setEmail,
  setCheckPassword,
  setPhoneNumber,
  userName,
  password,
  email,
  checkPassword,
  phoneNumber,
  switchLogin,
  handler
}) {
  const handleUserNameOnchange = (e) => setUserName(e.target.value);
  const handlePasswordOnchange = (e) => setPassword(e.target.value);
  const handleEmailOnchange = (e) => setEmail(e.target.value);
  const handleCheckPwOnchange = (e) => setCheckPassword(e.target.value);
  const handlePhoneOnchange = (e) => setPhoneNumber(e.target.value);
  return (
    <form>
      {switchLogin ? (
        <>
          <div>
            <StInput required value={userName} onChange={handleUserNameOnchange} type="text" placeholder="이름" />
          </div>
          <div>
            <StInput
              type="number"
              maxLength={11}
              required
              value={phoneNumber}
              onChange={handlePhoneOnchange}
              placeholder="전화번호(숫자만 써주세요!)"
            />
          </div>
          <div>
            <StInput type="email" value={email} required onChange={handleEmailOnchange} placeholder="이메일" />
          </div>
        </>
      ) : (
        <div>
          <StInput type="email" value={email} required onChange={handleEmailOnchange} placeholder="이메일" />
        </div>
      )}
      <div>
        <StInput
          type="password"
          value={password}
          onChange={handlePasswordOnchange}
          required
          minLength={6}
          maxLength={12}
          placeholder="비밀번호(6자~12자)"
        />
      </div>
      {switchLogin ? (
        <div>
          <StInput
            type="password"
            value={checkPassword}
            onChange={handleCheckPwOnchange}
            required
            minLength={6}
            maxLength={12}
            placeholder="비밀번호 확인(6자~12자)"
          />
        </div>
      ) : (
        ''
      )}
      <div>
        <StBtn onClick={handler} type="submit">
          {switchLogin ? '가입하기' : '로그인'}
        </StBtn>
      </div>
    </form>
  );
}

const StInput = styled.input`
  padding: 9px;
  margin-bottom: 20px;
  border: none;
  border-radius: 10px;
  outline: none;
`;

const StBtn = styled.button`
  border: none;
  border-radius: 10px;
  padding: 8px 15px;
  cursor: pointer;
`;
