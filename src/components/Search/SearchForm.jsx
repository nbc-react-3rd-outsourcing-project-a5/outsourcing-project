import React from 'react';
import styled from 'styled-components';

export default function SearchForm() {
  return (
    <ScSearchForm>
      <ScSelectWrapper>
        <select>
          <option>기간</option>
          <option>3일</option>
          <option>일주일</option>
          <option>한달</option>
          <option>일년</option>
        </select>
        <select>
          <option>지역</option>
          <option>서울</option>
          <option>경기도</option>
        </select>
      </ScSelectWrapper>
      <ScInputWrapper>
        <input type="text" />
        <button>검색</button>
      </ScInputWrapper>
    </ScSearchForm>
  );
}

const ScSearchForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;
  gap: 12px;
`;

const ScSelectWrapper = styled.div`
  width: 100%;
`;

const ScInputWrapper = styled.div`
  width: 100%;
`;
