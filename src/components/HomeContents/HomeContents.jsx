import { fakeData } from 'components/Carousel/Carousel';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export default function HomeContents() {
  const [selectedCategory, setSeletedCategory] = useState(false);

  const handleChangedCategory = () => {
    setSeletedCategory((state) => !state);
  };

  const filteredData = selectedCategory
    ? fakeData.filter((item) => item.isDone)
    : fakeData.filter((item) => !item.isDone);

  return (
    <>
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
      <StContainer>
        {filteredData.map((item) => {
          return (
            <StLink key={item.id} to={`/detail/${item.id}`}>
              <StContentsImgs src={item.img} alt="" />
              <StContentTitle>{item.title}</StContentTitle>
              <StContentContent>{item.content}</StContentContent>
            </StLink>
          );
        })}
      </StContainer>
    </>
  );
}

const StCategory = styled.div`
  display: flex;
  max-width: 1160px;
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

const StContentsImgs = styled.img`
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;

  border-radius: 15px;
`;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
`;

const StLink = styled(Link)`
  width: calc(33.3333% - 10px);
`;
const StContentTitle = styled.div`
  margin-top: 8px;
  font-size: xx-large;
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

  font-size: x-large;
`;
