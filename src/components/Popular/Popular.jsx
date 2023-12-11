import React, { useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import StContainer from 'components/common/StContainer';
import { useFestival } from 'hooks';
import { collection } from '@firebase/firestore';
import { db } from 'fb/firebase';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(50% - 40px)',
        bottom: '20px',
        display: 'block',
        right: '-20px',
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        width: '40px',
        height: '40px',
        zIndex: '1'
      }}
    >
      <svg
        className={className}
        onClick={onClick}
        style={{
          ...style,
          width: '40px',
          height: '40px',
          top: '20px',
          display: 'block',
          right: '0'
        }}
        width="40"
        height="40"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#dc1920"
          d="M256.25 16.042c-132.548 0-240 107.451-240 240s107.452 240 240 240s240-107.452 240-240s-107.45-240-240-240ZM403.328 403.12A207.253 207.253 0 1 1 447.917 337a207.364 207.364 0 0 1-44.589 66.12Z"
        />
        <path
          fill="#dc1920"
          d="m239.637 164.987l75.053 75.054H128.137v32H314.69l-75.053 75.054l22.627 22.627l113.681-113.681L262.264 142.36l-22.627 22.627z"
        />
      </svg>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(50% - 40px)',
        bottom: '20px',
        display: 'block',
        left: '-20px',
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        width: '40px',
        height: '40px',
        zIndex: '1'
      }}
    >
      <svg
        className={className}
        onClick={onClick}
        style={{
          ...style,
          width: '40px',
          height: '40px',
          top: '20px',
          display: 'block',
          left: '0'
        }}
        width="40"
        height="40"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#dc1920"
          d="M256 16.042c-132.548 0-240 107.451-240 240s107.452 240 240 240s240-107.452 240-240s-107.452-240-240-240ZM403.078 403.12A207.253 207.253 0 1 1 447.667 337a207.364 207.364 0 0 1-44.589 66.12Z"
        />
        <path
          fill="#dc1920"
          d="m272.614 164.987l-22.628-22.627l-113.681 113.681l113.681 113.681l22.628-22.627l-75.054-75.054H385v-32H197.56l75.054-75.054z"
        />
      </svg>
    </div>
  );
}

export default function Popular() {
  const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    draggable: false, // 드래그 막기
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
              <StLink key={item.docID} to={`/detail/${item.docID}`}>
                <StImageBox key={item.docID}>
                  <img src={item.image[0].url} alt="축제 이미지" />
                  <StLocation>📍{item.address}</StLocation>
                  <StDescription>
                    <h3>{item.name}</h3>
                    <p>
                      {item.startDate} - {item.endDate}
                    </p>
                  </StDescription>
                </StImageBox>
              </StLink>
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

const StLink = styled(Link)``;

const StImageBox = styled.div`
  width: 100%;
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
