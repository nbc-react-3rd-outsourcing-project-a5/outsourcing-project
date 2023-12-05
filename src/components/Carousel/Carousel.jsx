import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        width: '20px',
        top: '50%',
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
      style={{ ...style, width: '20px', top: '50%', left: '2%', display: 'block' }}
      onClick={onClick}
    />
  );
}

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    autoplaySpeed: 2900,
    centerPadding: '0px',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  //가짜 더미데이터
  const carouselImage = [
    {
      id: 1,
      title: '남포동 크리스마스 축제',
      img: 'https://mblogthumb-phinf.pstatic.net/MjAyMDExMzBfMjUz/MDAxNjA2NzQ2NzUzMDMz.4CF4ct9o0ZPIcMYDlEdyvWoHxC190eZ8SFMAYdvoa7wg.TQRY-0ElReUMQiF7i7OHZM6szH30Bc3XtbN9S2VxDTgg.JPEG.molli1108/SE-d9d0f7be-3f15-4ef9-944e-81a147698f8a.jpg?type=w800'
    },
    {
      id: 2,
      title: '유성온천 크리스마스 축제',
      img: 'https://img3.yna.co.kr/etc/inner/KR/2022/11/25/AKR20221125112900053_01_i_P4.jpg'
    },
    {
      id: 3,
      title: '애버랜드 크리스마스 축제',
      img: 'https://file.nspna.com/news/2022/12/19/20221219124055_610622_1.jpg'
    },
    {
      id: 4,
      title: '롯데월드 크리스마스 축제',
      img: 'https://adventure.lotteworld.com/image/2019/11/201911050241235701_1350.jpg'
    }
  ];

  return (
    <div>
      <StSlider {...settings}>
        {carouselImage.map((item) => {
          return (
            <StSliderContainer key={item.id} $src={item.img}>
              <div>
                <h2>{item.title}</h2>
              </div>
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
`;

const StSliderContainer = styled.div`
  & > div {
    width: 100%;
    height: 500px;

    background-image: linear-gradient(rgba(0, 0, 0, 0.215), rgba(0, 0, 0, 0.281)), url(${(props) => props.$src});
    background-position: center;
    background-size: cover;

    & > h2 {
      font-size: 2rem;
      color: white;
      padding: 140px;
    }
  }
`;
