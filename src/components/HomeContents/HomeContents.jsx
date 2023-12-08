import { collection } from '@firebase/firestore';
import StContainer from 'components/common/StContainer';
import { db } from 'fb/firebase';
import { useFestival } from 'hooks';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function HomeContents() {
  const [oncoming, setOncoming] = useState(true);
  const festival = useFestival();

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const query = collection(db, 'festival');
        await festival.getQuery(query);
      } catch (error) {
        console.error('Error fetching festivals:', error);
      }
    };

    fetchFestivals();
  }, []);

  // 진행중, 진행예정 클릭시 전환
  const handleChangedCategory = (value) => {
    if (value !== oncoming) {
      setOncoming(value);
    }
  };

  // 진행중, 진행예정 클릭시 전환
  const filterFestivalsByDate = (festivals, isOncoming) => {
    // 오늘 날짜
    const today = new Date();

    return festivals.filter((item) => {
      // 축제 각각 날짜
      const startDate = new Date(item.startDate);
      // 축제 진행중, 진행예정
      return isOncoming ? startDate <= today : startDate > today;
    });
  };

  return (
    <StContainer>
      <StCategory>
        <StP
          $color={oncoming ? 'black' : '#888'}
          $fontWeight={oncoming ? 'bold' : 'normal'}
          onClick={() => handleChangedCategory(true)}
        >
          진행중
        </StP>
        <StP
          $color={oncoming ? '#888' : 'black'}
          $fontWeight={oncoming ? 'normal' : 'bold'}
          onClick={() => handleChangedCategory(false)}
        >
          진행예정
        </StP>
      </StCategory>
      <StList>
        {filterFestivalsByDate(festival.snapshotData, oncoming).map((item) => {
          return (
            <StLink key={item.docID} to={`/detail/${item.docID}`}>
              <StContentImgWrap>
                <StContentsImgs src={item.image[0].url} alt="축제 썸네일 이미지" />
              </StContentImgWrap>
              <StLocation>📍{item.address}</StLocation>
              <StContentTitle>{item.name}</StContentTitle>
              <StContentContent>
                {item.startDate} - {item.endDate}
              </StContentContent>
            </StLink>
          );
        })}
      </StList>
    </StContainer>
  );
}

const StCategory = styled.div`
  display: flex;
  margin: 80px auto 20px;
`;
const StP = styled.p`
  padding-right: 20px;
  color: ${(props) => props.$color};
  font-size: 24px;
  text-decoration: ${(props) => props.$textDecoration};
  font-weight: ${(props) => props.$fontWeight};
  cursor: pointer;
`;
const StContentImgWrap = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  overflow: hidden;
`;

const StContentsImgs = styled.img`
  width: 100%;
  object-fit: cover;
  display: flex;
  align-items: center;
`;
const StList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  margin: 0 auto 100px;
`;

const StLink = styled(Link)`
  width: calc(33.3333% - 10px);
`;

const StLocation = styled.p`
  margin-top: 16px;
  color: #777;
  font-size: 14px;
`;

const StContentTitle = styled.h2`
  margin-top: 8px;
  margin-left: 2px;
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap; /* 텍스트가 한 줄로만 표시되도록 설정 */
  overflow: hidden; /* 넘치는 부분은 숨김 처리 */
  text-overflow: ellipsis; /* 말줄임표 적용 */
`;

const StContentContent = styled.div`
  margin-top: 8px;
  margin-left: 2px;
  margin-bottom: 24px;
  font-size: 14px;
  color: #777;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
`;
