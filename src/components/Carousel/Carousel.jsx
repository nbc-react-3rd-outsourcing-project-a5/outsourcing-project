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
      title: '축제1',
      img: 'https://www.adobe.com/kr/creativecloud/photography/hub/guides/media_1a4ed903dd512735ac7c19d9d9c7c9e91598a1bb3.jpeg?width=750&format=jpeg&optimize=medium'
    },
    { id: 2, title: '축제2', img: 'https://www.e-patentnews.com/imgdata/e-patentnews_com/202209/2022090300016624.jpg' },
    {
      id: 3,
      title: '축제3',
      img: 'https://m.mariasarang.net/files/picture_xmas/happy-new-year-merry-christmas-new-hd.jpg'
    },
    { id: 4, title: '축제4', img: 'https://i.pinimg.com/736x/97/56/dd/9756ddfff85d616c00686c672dea1d85.jpg' }
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
      padding: 40px;
    }
  }
`;
