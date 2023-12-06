import React, { useState } from 'react';
import styled from 'styled-components';

export default function FestivalRegistrationForm() {
  const [imageArr, setImageArr] = useState([]);
  const handleImageUpload = (e) => {
    const fileArr = e.target.files;

    let fileURLs = [];
    let file;
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];

      let reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        fileURLs[i] = reader.result;
        setImageArr([...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <StFestivalFormContainer>
      <div>
        <h2>축제 등록하기</h2>
      </div>
      <StForm>
        <div>
          <p>업체 이름</p>
          <input type="text" />
        </div>
        <div>
          <p>축제 이름</p>
          <input type="text" />
        </div>
        <div>
          {/* 카카오 react-daum-postcode 패키지 이용하여 주소 검색 (보류)*/}
          <p>주소</p>
          <input type="text" />
        </div>
        <div>
          {/* React Datepicker 라이브러리 사용 달력으로 날짜 선택 */}
          <p>축제 날짜</p>
          <input type="text" /> ~
          <input type="text" />
        </div>
        <div>
          <p>축제 설명</p>
          <StDescription />
        </div>
        <div>
          <input type="file" accept=".jpg, .png, .jpeg" multiple onChange={handleImageUpload} />
        </div>
        <div>
          {imageArr?.map((image) => {
            return <img src={image} alt="" />;
          })}
        </div>
        <StButton>
          <button type="submit">취소하기</button>
          <button type="submit">등록하기</button>
        </StButton>
      </StForm>
    </StFestivalFormContainer>
  );
}

const StFestivalFormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div > h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  & > div {
    margin: 10px 0px;

    & > img {
      width: 100px;
    }

    & > input {
      padding: 3px 5px;
    }

    & > p {
      margin-bottom: 5px;
    }
  }
`;

const StDescription = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 5px;
  resize: none;
`;

const StButton = styled.div`
  display: flex;
  justify-content: space-around;

  & > button {
    border: none;
    border-radius: 10px;
    padding: 10px;

    cursor: pointer;
  }
`;
