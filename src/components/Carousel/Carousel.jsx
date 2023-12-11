import { collection } from '@firebase/firestore';
import { db } from 'fb/firebase';
import { useFestival } from 'hooks';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <svg
      className={className}
      onClick={onClick}
      style={{
        ...style,
        width: '40px',
        height: '40px',
        top: 'calc(50% - 20px)',
        display: 'block',
        right: '5%'
      }}
      width="40"
      height="40"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#ffffff"
        d="M256.25 16.042c-132.548 0-240 107.451-240 240s107.452 240 240 240s240-107.452 240-240s-107.45-240-240-240ZM403.328 403.12A207.253 207.253 0 1 1 447.917 337a207.364 207.364 0 0 1-44.589 66.12Z"
      />
      <path
        fill="#ffffff"
        d="m239.637 164.987l75.053 75.054H128.137v32H314.69l-75.053 75.054l22.627 22.627l113.681-113.681L262.264 142.36l-22.627 22.627z"
      />
    </svg>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <svg
      className={className}
      onClick={onClick}
      style={{
        ...style,
        width: '40px',
        height: '40px',
        top: 'calc(50% - 20px)',
        left: '5%',
        display: 'block'
      }}
      width="40"
      height="40"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#ffffff"
        d="M256 16.042c-132.548 0-240 107.451-240 240s107.452 240 240 240s240-107.452 240-240s-107.452-240-240-240ZM403.078 403.12A207.253 207.253 0 1 1 447.667 337a207.364 207.364 0 0 1-44.589 66.12Z"
      />
      <path
        fill="#ffffff"
        d="m272.614 164.987l-22.628-22.627l-113.681 113.681l113.681 113.681l22.628-22.627l-75.054-75.054H385v-32H197.56l75.054-75.054z"
      />
    </svg>
  );
}

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    autoplaySpeed: 4000,
    centerPadding: '0px',
    draggable: false, // 드래그 막기
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

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

  const carouselFive = festival.snapshotData.slice(0, 5);

  return (
    <div>
      <StSlider {...settings}>
        {carouselFive.map((item, index) => {
          return (
            <StSliderContainer key={item.docID}>
              <StLink key={item.docID} to={`/detail/${item.docID}`}>
                <StSliderInner>
                  <StContentTitle>{item.name}</StContentTitle>
                  <StPeriod>
                    {item.startDate} - {item.endDate}
                  </StPeriod>
                  <StLocation>{item.address}</StLocation>
                  <StSlideNumber>
                    {index + 1}
                    <span> / 5</span>
                  </StSlideNumber>
                  <StImg src={item.image[0].url} />
                </StSliderInner>
              </StLink>
            </StSliderContainer>
          );
        })}
      </StSlider>
    </div>
  );
}

const StSlider = styled(Slider)`
  width: 100%;
  height: 100%;
  margin-top: 66px;
  .silck-list {
    margin: 0 auto;
    overflow-x: hidden;
  }
  .slick-dots {
    margin-bottom: 50px;
    .slick-active {
      button::before {
        color: #ffffff;
      }
    }
    button::before {
      color: #a2a2a2;
    }
  }
  .slick-prev:before,
  .slick-next:before {
    font-size: 45px;
    opacity: 0.5;
  }

  .slick-prev,
  .slick-next {
    font-size: 0;
    position: absolute;
    bottom: 20px;
    color: #fff;
    border: 0;
    background: none;
    z-index: 1;
    top: 20px;
    cursor: pointer;
  }
  .slick-dots li button:before {
    color: unset;
    border: 1px solid #fff;
    opacity: 0.7;
    font-family: inherit;
    width: 8px;
    height: 8px;
    background: unset;
    border-radius: 10px;
    content: '';
  }
  .slick-dots li.slick-active button:before {
    opacity: 1;
    background: white;
  }
`;

const StSliderContainer = styled.div`
  width: 100%;
  background-color: #dc1920;
  & > div {
    /* background-image: linear-gradient(rgba(0, 0, 0, 0.215), rgba(0, 0, 0, 0.281)), url(${(props) => props.$src}); */
    background-position: center;
    background-size: cover;
  }
`;

const StLink = styled(Link)``;
const StSliderInner = styled.div`
  position: relative;
  width: 1200px;
  height: 500px;
  margin: 0 auto;
  padding: 120px 100px;
  color: white;
`;

const StContentTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 15px;
`;

const StPeriod = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
`;

const StLocation = styled.p`
  font-size: 16px;
`;

const StSlideNumber = styled.div`
  position: absolute;
  left: 100px;
  bottom: 160px;
  & span {
    color: #fff;
    opacity: 0.5;
  }
`;
const StImg = styled.img`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 100px;
  width: 320px;
`;
