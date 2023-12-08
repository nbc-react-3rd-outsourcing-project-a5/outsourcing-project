import React, { useEffect } from 'react';
import styled from 'styled-components';
import resetIcon from './assets/resetIcon.png';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import regionList from 'data/regionList';
import { useDate } from 'hooks';
import { useInput } from 'hooks';
import FormSelect from './FormSelect';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'fb/firebase';

export default function SearchForm() {
  const [startDate, handleChangeStartDate] = useDate();
  const [endDate, handleChangeEndDate] = useDate();
  const [region, onSelectRegion] = useInput();
  const [city, onSelectCity] = useInput();
  const regionNameList = regionList.map((n) => n.name);
  const regionCityList = region && regionList.find((n) => n.name === region).city;

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      startDate,
      endDate,
      region,
      city
    };
    console.log(data); // 부산광역시 해운대구
    const fetchData = async () => {
      // collection: festival -> 모든 문서 가져오기
      const q = query(
        collection(db, 'festival'),
        where('startDate', '==', data.startDate),
        where('endDate', '==', data.endDate),
        where('region', '==', data.region),
        where('city', '==', data.city)
      );
      const querySnapshot = await getDocs(q);

      const result = [];

      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
    };
    fetchData();
  };

  return (
    <StForm onSubmit={onSubmit}>
      <StFilterBox>
        <StDate>
          <label>날짜</label>
          <StDateWrapper>
            <div>
              <StDatePicker
                locale={ko}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                selected={startDate}
                onChange={handleChangeStartDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
            </div>
            -
            <div>
              <StDatePicker
                locale={ko}
                dateFormat="yyyy-MM-dd"
                selected={endDate}
                onChange={handleChangeEndDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>
          </StDateWrapper>
        </StDate>
        <StLocation>
          <label>지역</label>
          <div>
            <FormSelect listData={regionNameList} onChange={onSelectRegion} />
            <FormSelect listData={regionCityList} onChange={onSelectCity} />
          </div>
        </StLocation>
      </StFilterBox>
      <StButtonWrapper>
        <button type="submit">검색</button>
        <span>
          필터링 초기화
          <img src={resetIcon} alt="초기화 아이콘" />
        </span>
      </StButtonWrapper>
    </StForm>
  );
}

const StForm = styled.form`
  width: 100%;
  height: 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  gap: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px;
`;

const StFilterBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const StDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  & label {
    font-size: 14px;
    font-weight: 700;
    margin-right: 20px;
  }
`;

const StDateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const StDatePicker = styled(DatePicker)`
  font-size: small;
  width: 180px;
  height: 30px;
  text-align: center;
  padding: 5px;
  border-radius: 8px;
  outline: none;
  border: 1px solid #ddd;
`;

const StLocation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;

  & label {
    font-size: 14px;
    font-weight: 700;
  }

  & select {
    width: 180px;
    height: 30px;
    text-align: center;
    padding: 5px;
    border-radius: 8px;
    outline: none;
    border: 1px solid #ddd;
  }
  & select:last-child {
    margin-left: 5px;
  }
`;

const StButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  & button {
    width: 200px;
    height: 35px;
    border-radius: 8px;
    background-color: #dc1920;
    border: none;
    color: white;
  }

  & span {
    font-size: 14px;
    display: flex;
    align-items: center;
    color: #888;
  }

  & img {
    width: 14px;
    margin-left: 10px;
  }
`;
