import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import resetIcon from './assets/resetIcon.png';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';

import { useDate } from 'hooks';
import FormSelect from './FormSelect';
import { collection, getDocs, where } from 'firebase/firestore';
import { db } from 'fb/firebase';
import { Link } from 'react-router-dom';
import { format, isBefore } from 'date-fns';

export default function SearchForm({ searchResult, setSearchResult, cityObject, regionObject, address }) {
  const [city, onSelectCity, onResetCity] = cityObject;
  const [regionNameList, regionList, region, onSelectRegion, onResetRegion] = regionObject;
  const [isSearching, setIsSearching] = useState(false);

  const [startDate, handleChangeStartDate] = useDate();
  const [endDate, handleChangeEndDate] = useDate();

  const regionCityList = region && regionList.find((n) => n.name === region).city;

  const handleResetButton = () => {
    // 날짜 필터 초기화
    handleChangeStartDate(new Date());
    handleChangeEndDate(new Date());

    // 지역 필터 초기화 => 작동 X custom hook을 reset 하는 방법..
    onResetRegion();
    onResetCity();

    // 검색 결과 초기화
    setSearchResult([]);
    setIsSearching(!isSearching);
  };

  const onSubmit = async (e) => {
    setIsSearching(!isSearching);
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
      } catch (error) {
        console.error('쿼리 실패: ', error);
      }
    };

    fetchData();
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
              <FormSelect listData={['선택안함', ...regionCityList]} onChange={onSelectCity} />
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
      {searchResult.length > 0 && (
        <StSearchResultBox>
          {searchResult
            .filter((item) => {
              if (city === '선택안함') {
                return item.address.startsWith(region);
              }

              return item.address === address;
            })
            .map((item) => {
              const formattedStartDate = format(item.startDate.toDate(), 'yyyy-MM-dd');
              const formattedEndDate = format(item.endDate.toDate(), 'yyyy-MM-dd');
              const hasFestivalEnded = isBefore(new Date(), item.endDate.toDate());
              return (
                <li key={item.id}>
                  <Link key={item.id} to={`/detail/${item.id}`}>
                    <h2>{item.name}</h2>
                  </Link>
                  <span className="festival-address">{item.address}</span>
                  <span className="festival-date">
                    {formattedStartDate} ~ {formattedEndDate}
                    &nbsp; &nbsp;
                    {hasFestivalEnded || <span style={{ color: 'red' }}>(축제 종료)</span>}
                  </span>
                </li>
              );
            })}
        </StSearchResultBox>
      )}
      {isSearching ? (
        searchResult.length === 0 ? (
          <StNoneResultBox>
            <p style={{ textAlign: 'center' }}>검색 결과가 없습니다.</p>
          </StNoneResultBox>
        ) : null
      ) : null}
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
const StSearchResultBox = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;

  & li {
    width: 100%;
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

  & .festival-address {
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

const StNoneResultBox = styled(StSearchResultBox)`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 20px 0;
`;
