import { ko } from 'date-fns/locale';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

export default function FestivalRegistrationForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [imageArr, setImageArr] = useState([]);

  //사진 여러 개 선택 (10개까지만)
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
      <h2>축제 등록하기</h2>
      <StForm>
        <StDivision>
          <div>
            <div>
              <StP>업체 이름</StP>
              <StInput type="text" />
            </div>
            <div>
              <StP>축제 이름</StP>
              <StInput type="text" />
            </div>
            <div>
              {/* 카카오 react-daum-postcode 패키지 이용하여 주소 검색 (보류)*/}
              <StP>주소</StP>
              <StInput type="text" />
            </div>
            <div>
              {/* React Datepicker 라이브러리 사용 달력으로 날짜 선택 */}
              <StP>축제 날짜</StP>
              <StDate>
                <div>
                  <StDatePicker
                    locale={ko}
                    minDate={new Date()}
                    dateFormat="yyyy년 MM월 dd일"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
                ~
                <div>
                  <StDatePicker
                    locale={ko}
                    dateFormat="yyyy년 MM월 dd일"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                  />
                </div>
              </StDate>
            </div>
          </div>
          <div>
            이미지를 선택해주세요!! (최대 10개까지)
            <div>
              <input type="file" accept=".jpg, .png, .jpeg" multiple onChange={handleImageUpload} />
            </div>
            <StImageContainer>
              {imageArr?.map((image) => {
                return <StImage key={image} src={image} alt="이미지 미리보기" />;
              })}
            </StImageContainer>
          </div>
        </StDivision>
        <StTextareaContainer>
          <StDescription placeholder="당신이 개최하는 축제를 소개해주세요!" />
        </StTextareaContainer>
        <StButton>
          <button type="submit">취소하기</button>
          <button type="submit">등록하기</button>
        </StButton>
      </StForm>
    </StFestivalFormContainer>
  );
}

const StFestivalFormContainer = styled.div`
  max-width: 1200px;
  margin: 0px auto;

  & > div {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  & > h2 {
    text-align: center;
    font-size: 2rem;
    margin: 20px 0px;
  }
`;

const StForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  & > div > div > div {
    width: 100%;
    margin: 10px 0px;
  }
`;

const StTextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StDescription = styled.textarea`
  width: 72%;
  height: 400px;
  padding: 10px;
  resize: none;
  outline: none;
  border: none;
  background-color: #d3d3d367;
  border-radius: 10px;
`;

const StP = styled.p`
  font-size: large;
  margin-bottom: 5px;
`;

const StInput = styled.input`
  padding: 5px;
  outline: none;
`;

const StButton = styled.div`
  display: flex;
  justify-content: space-evenly;

  & > button {
    border: none;
    border-radius: 10px;
    padding: 15px;
    margin: 50px 0px 20px 0px;
    width: 10%;

    cursor: pointer;
  }
`;

const StDatePicker = styled(DatePicker)`
  font-size: small;
  width: 180px;
  text-align: center;
  padding: 5px;
`;

const StDate = styled.div`
  display: flex;
  gap: 40px;
`;

const StDivision = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const StImage = styled.img`
  width: 100px;
  object-fit: cover;
`;

const StImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
