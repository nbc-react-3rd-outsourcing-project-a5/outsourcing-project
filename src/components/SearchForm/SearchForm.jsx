import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import resetIcon from './assets/resetIcon.png';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import regionList from 'data/regionList';
import { useDate } from 'hooks';
import { useInput } from 'hooks';
import FormSelect from './FormSelect';
import { collection, getDocs, where } from 'firebase/firestore';
import { db } from 'fb/firebase';
import { Link } from 'react-router-dom';
import { format, isBefore } from 'date-fns';

export default function SearchForm() {
  const [startDate, handleChangeStartDate] = useDate();
  const [endDate, handleChangeEndDate] = useDate();
  const [region, onSelectRegion, onResetRegion] = useInput();
  const [city, onSelectCity, onResetCity] = useInput();
  const [searchResult, setSearchResult] = useState([]);
  const regionNameList = regionList.map((n) => n.name);
  const regionCityList = region && regionList.find((n) => n.name === region).city;
  const address = `${region} ${city}`;

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      startDate,
      endDate,
      address
    };

    const fetchData = async () => {
      // collection: festival -> 모든 문서 가져오기

      try {
        // festival 콜렉션의 모든 문서 가져오기
        const querySnapshot = await getDocs(
          collection(db, 'festival'),
          where('startDate', '>=', data.startDate),
          where('endDate', '<=', data.endDate),
          where('address', '==', data.address)
        );
        const result = [];
        querySnapshot.forEach((doc) => {
          result.push({ id: doc.id, ...doc.data() });
        });
        setSearchResult(result);
        console.log(result);
      } catch (error) {
        console.error('쿼리 실패: ', error);
      }
    };
    fetchData();
  };

  const handleResetButton = () => {
    // 날짜 필터 초기화
    handleChangeStartDate(new Date());
    handleChangeEndDate(new Date());

    // 지역 필터 초기화 => 작동 X custom hook을 reset 하는 방법..
    onResetRegion();
    onResetCity();

    // 검색 결과 초기화
    setSearchResult([]);
  };

  return (
    <>
      <StForm onSubmit={onSubmit}>
        <StFilterBox>
          <StDate>
            <label>날짜</label>
            <StDateWrapper>
              <div>
                <StDatePicker
                  locale={ko}
                  dateFormat="yyyy-MM-dd"
                  selected={startDate}
                  onChange={handleChangeStartDate}
                  selectsStartyarn
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
          <span onClick={handleResetButton} type="reset">
            필터링 초기화
            <img src={resetIcon} alt="초기화 아이콘" />
          </span>
        </StButtonWrapper>
      </StForm>
      <StSearchResultBox>
        {searchResult.length > 0 ? (
          searchResult
            .filter((item) => item.address === address)
            .map((item) => {
              const formattedStartDate = format(item.startDate.toDate(), 'yyyy-MM-dd');
              const formattedEndDate = format(item.endDate.toDate(), 'yyyy-MM-dd');
              const hasFestivalEnded = isBefore(new Date(), item.endDate.toDate());
              return (
                <li key={item.id}>
                  <Link key={item.id} to={`/detail/${item.id}`}>
                    <h2>{item.name}</h2>
                  </Link>
                  <span className="festival-date">
                    {formattedStartDate} ~ {formattedEndDate}
                    &nbsp; &nbsp;
                    {hasFestivalEnded || <span style={{ color: 'red' }}>(축제 종료)</span>}
                  </span>
                </li>
              );
            })
        ) : (
          <p style={{ textAlign: 'center' }}>검색 결과가 없습니다.</p>
        )}
      </StSearchResultBox>
    </>
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
const StSearchResultBox = styled.ul`
  width: 100%;
  margin: 10px;

  & li {
    width: 100%;
    height: 200px;
    padding: 10px;
  }

  & img {
    width: 200px;
    height: 100%;
  }

  & h2 {
    display: inline-block;
    font-size: 1rem;
    margin-right: 20px;
  }
  & .festival-date {
    margin-right: 20px;
  }
  & span {
    font-size: 14px;
    color: #888;
  }
`;
