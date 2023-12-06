import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import popularData from './popularData.json';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

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

  const popularFestival = popularData.festival;

  return (
    <StContainer>
      <StTitle>
        <h2>인기 축제</h2>
      </StTitle>
      <StImageSlider {...settings}>
        {popularFestival.map((item) => {
          return (
            <StImageBox key={item.id}>
              <img src={item.img} alt="축제 이미지" />
              <StDescription>
                <h3>{item.title}</h3>
                <p>{item.date}</p>
              </StDescription>
            </StImageBox>
          );
        })}
      </StImageSlider>
    </StContainer>
  );
}

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  gap: 12px;
`;

const StTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
`;

const StImageSlider = styled(Slider)`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  .silck-list {
    margin-right: 20px;
    overflow-x: hidden;
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
  padding: 0 6px;
  width: 240px;
  height: 370px;
  display: flex;
  flex-direction: column;

  & img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;

const StDescription = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px;

  & h3 {
    font-size: 16px;
  }

  & p {
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`;
