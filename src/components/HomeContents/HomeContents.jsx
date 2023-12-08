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
    // 진행중, 진행예정 분류
    isOncoming();
  }, []);

  const isOncoming = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Adding 1 to get the actual month (1-12)
    const day = today.getDate();

    festival.snapshotData.forEach((item) => {
      const startDate = new Date(item.startDate);
      const todayDate = new Date(`${year}. ${month}. 6.`);

      console.log(`${startDate} is startDate.`);
      console.log(`${todayDate} is todayDate.`);

      if (startDate > todayDate) {
        console.log(`${item.name} is in the future.`);
      } else if (startDate <= todayDate) {
        console.log(`${item.name} is in progress or today.`);
      }
    });
  };

  const handleChangedCategory = (value) => {
    if (value !== oncoming) {
      setOncoming(value);
    }
  };

  const filterFestivalsByDate = (festivals, isOncoming) => {
    const today = new Date();

    return festivals.filter((item) => {
      const startDate = new Date(item.startDate);
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
  font-size: 20px;
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
  font-size: 20px;
  font-weight: bold;
`;

const StContentContent = styled.div`
  margin-top: 8px;
  margin-bottom: 24px;
  color: #777;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;

  font-size: 16px;
`;
