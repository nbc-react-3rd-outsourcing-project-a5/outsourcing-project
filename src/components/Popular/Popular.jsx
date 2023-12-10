import React, { useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import popularData from './popularData.json';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import StContainer from 'components/common/StContainer';
import { useFestival } from 'hooks';
import { collection } from '@firebase/firestore';
import { db } from 'fb/firebase';
import { useSelector } from 'react-redux';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        width: '20px',
        top: '45%',
        display: 'block',
        right: '3%'
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, width: '20px', top: '45%', left: '1%', display: 'block' }}
      onClick={onClick}
    />
  );
}

export default function Popular() {
  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const { isLoading, snapshotFestivals } = useSelector((state) => state.festivalSlice);
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

  if (isLoading) {
    return <div>로딩 중..</div>;
  }

  return (
    <StContainer>
      <StContainerInner>
        <StTitle>
          <h2>인기 축제</h2>
        </StTitle>
        <StImageSlider {...settings}>
          {snapshotFestivals.map((item) => {
            return (
              <StImageBox key={item.docID}>
                <img src={item.image[0]?.url} alt="축제 이미지" />
                <StLocation>📍{item.address}</StLocation>
                <StDescription>
                  <h3>{item.name}</h3>
                  <p>
                    {item.startDate} - {item.endDate}
                  </p>
                </StDescription>
              </StImageBox>
            );
          })}
        </StImageSlider>
      </StContainerInner>
    </StContainer>
  );
}

const StContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const StTitle = styled.div`
  margin-top: 80px;
  margin-bottom: 20px;
  font-weight: 700;

  & h2 {
    font-size: 24px;
  }
`;

const StImageSlider = styled(Slider)`
  width: 100%;

  & .slick-track {
    display: flex;
    gap: 10px;
  }

  & .slick-slide img {
    border-radius: 10px;
  }
  .slick-prev:before,
  .slick-next:before {
    font-size: 45px;
    opacity: 1;
  }

  .slick-prev,
  .slick-next {
    font-size: 0;
    position: absolute;
    bottom: 20px;
    border: 0;
    background: none;
    z-index: 1;
    top: 20px;
    cursor: pointer;
  }
`;

const StImageBox = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;

  & img {
    width: 100%;
    height: 280px;
    object-fit: cover;
  }
`;

const StLocation = styled.p`
  margin-top: 16px;
  color: #777;
  font-size: 14px;
`;

const StDescription = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-top: 8px;
  margin-left: 2px;
  font-size: 20px;
  gap: 8px;

  & h3 {
    font-size: 18px;
    font-weight: bold;
    white-space: nowrap; /* 텍스트가 한 줄로만 표시되도록 설정 */
    overflow: hidden; /* 넘치는 부분은 숨김 처리 */
    text-overflow: ellipsis; /* 말줄임표 적용 */
  }

  & p {
    font-size: 14px;
    color: #777;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`;
