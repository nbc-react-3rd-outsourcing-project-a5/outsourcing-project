import React from 'react';
import styled from 'styled-components';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import { useState } from 'react';

export default function SearchForm() {
  const [startDate, setStartDate] = useState(new Date('2014/02/08'));
  const [endDate, setEndDate] = useState(null);

  const handleChange = ([newStartDate, newEndDate]) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };
  return (
    <StContainer>
      {/* 1. form 태그 -> onSubmit */}
      <StForm>
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
      </StForm>
    </StContainer>
  );
}

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  gap: 12px;
  outline: none;
`;

const StForm = styled.form`
  width: 100%;
`;

const StDate = styled.div``;
const StDatePicker = styled(DatePicker)``;
