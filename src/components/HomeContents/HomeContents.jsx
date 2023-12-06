import { fakeData } from 'components/Carousel/Carousel';
import React, { useState } from 'react';
import styled from 'styled-components';

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
          $marginLeft="0px"
          $color={selectedCategory ? 'black' : '#888'}
          $textDecoration={selectedCategory ? 'underline' : 'none'}
          onClick={handleChangedCategory}
        >
          진행중
        </StP>
        <StP
          $marginLeft="30px"
          $color={selectedCategory ? '#888' : 'black'}
          $textDecoration={selectedCategory ? 'none' : 'underline'}
          onClick={handleChangedCategory}
        >
          진행예정
        </StP>
      </StCategory>
      <StContainer>
        {filteredData.map((item) => {
          return (
            <div>
              <div>
                <div>
                  <StContentsImgs width="300px" src={item.img} alt="" />
                </div>
              </div>
              <StContentTitle>{item.title}</StContentTitle>
              <StContentContent>{item.content}</StContentContent>
            </div>
          );
        })}
      </StContainer>
    </>
  );
}

const StCategory = styled.div`
  display: flex;
  margin-left: 120px;
`;
const StP = styled.p`
  margin-bottom: 20px;
  margin-left: ${(props) => props.$marginLeft};
  color: ${(props) => props.$color};
  font-size: xx-large;
  text-decoration: ${(props) => props.$textDecoration};
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
  gap: 20px;

  & > div {
    padding: 5px;
    width: 400px;
    margin-bottom: 20px;
  }
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
