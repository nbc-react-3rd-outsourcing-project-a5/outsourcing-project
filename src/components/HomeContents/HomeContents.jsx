import { collection } from '@firebase/firestore';
import StContainer from 'components/common/StContainer';
import { db } from 'fb/firebase';
import { useFestival } from 'hooks';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function HomeContents() {
  const [selectedCategory, setSeletedCategory] = useState(false);

  const [Festivals, getFestivals] = useFestival('get');
  const [snapshotFestivals, getQueryFestivals] = useFestival('getQuery');

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const query = collection(db, 'festival');
        await getQueryFestivals(query);
      } catch (error) {
        console.error('Error fetching festivals:', error);
      }
    };

    fetchFestivals();
  }, []);
  // 데이터가 로드되면 출력
  // console.log('Festivals', Festivals);
  // console.log('snapshotFestivals 값입니다', snapshotFestivals);

  const handleChangedCategory = () => {
    setSeletedCategory((state) => !state);
  };

  const hdhd = () => {
    getFestivals('3e33c3b4-5905-82ac-abd4-6010f7934ebb');
    // getQueryFestivals('3e33c3b4-5905-82ac-abd4-6010f7934ebb');
  };

  // const filteredData = selectedCategory
  //   ? fakeData.filter((item) => item.isDone)
  //   : fakeData.filter((item) => !item.isDone);

  return (
    <StContainer>
      <StCategory>
        <StP
          $color={selectedCategory ? 'black' : '#888'}
          $fontWeight={selectedCategory ? 'bold' : 'normal'}
          onClick={handleChangedCategory}
        >
          진행중
        </StP>
        <StP
          $color={selectedCategory ? '#888' : 'black'}
          $fontWeight={selectedCategory ? 'normal' : 'bold'}
          onClick={handleChangedCategory}
        >
          진행예정
        </StP>
      </StCategory>
      <StList>
        {snapshotFestivals &&
          snapshotFestivals.map((item) => {
            return (
              <StLink key={item.organizerID} item={item} to={`/detail/${item.organizerID}`}>
                <StContentImgWrap>
                  <StContentsImgs src={item.image[0].url} alt="" />
                </StContentImgWrap>
                <StContentTitle>{item.name}</StContentTitle>
                {/* <StContentContent>{item.description}</StContentContent> */}
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
  padding: 0 20px 10px;
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
  margin: 0 auto;
`;

const StLink = styled(Link)`
  width: calc(33.3333% - 10px);
`;

const StContentTitle = styled.div`
  margin-top: 8px;
  font-size: 18px;
`;

const StContentContent = styled.div`
  margin-top: 5px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;

  font-size: 16px;
`;
