import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import uuid from 'react-uuid';
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

  const carouselImage = [
    {
      id: uuid(),
      title: '광복로 겨울빛 트리 축제',
      date: '2023.12.08 - 2024.01.14',
      img: 'https://img0.yna.co.kr/etc/inner/KR/2023/12/04/AKR20231204078200051_02_i_P4.jpg'
    },
    {
      id: uuid(),
      title: '유성온천 크리스마스 축제',
      date: '2023.12.01 - 2023.12.03',
      img: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb0HkQm%2FbtsAXhZ7Pgu%2FKXQKC8rBAAIyRU6bdK18H1%2Fimg.png'
    },
    {
      id: uuid(),
      title: '에버랜드 바오 패밀리 인 윈터토피아',
      date: '2023.12.08 - 2024.03.01',
      img: 'https://pbs.twimg.com/media/GAfDXBrawAA0xTf.jpg'
    },
    {
      id: uuid(),
      title: '롯데월드 크리스마스 축제',
      date: '2023.11.25 - 2023.12.31',
      img: 'https://adventure.lotteworld.com/common/images/icon/2023_miraclewinter/pc/bg_main.jpg'
    },
    {
      id: uuid(),
      title: '서울 빛초롱 축제',
      date: '2023.12.15 - 2024.01.21',
      img: 'http://www.sukbakmagazine.com/news/photo/202312/55003_409829_5141.png'
    },
    {
      id: uuid(),
      title: '대구 이월드 일루미네이션 축제',
      date: '2023.11.28 - 2024.02.28',
      img: 'https://cdn.visitkorea.or.kr/kfes/upload/contents/db/400_c864063f-35fc-4ca1-9988-46b29a6236c1_3.png'
    },
    {
      id: uuid(),
      title: '담양 메타 뮤직 페스티벌',
      date: '2023.12.23 - 2023.12.25',
      img: 'https://news.kbs.co.kr/data/fckeditor/new/image/2023/12/05/300091701756683649.jpg'
    }
  ];
  return (
    <StContainer>
      <StTitle>
        <h2>인기 축제</h2>
      </StTitle>
      <StImageSlider {...settings}>
        {carouselImage.map((item) => {
          return (
            <StImageBox key={item.id}>
              <img src={item.img} />
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
  gap: 16px;
`;

const StTitle = styled.div`
  font-size: 1.2rem;
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
  padding: 10px;
  width: 240px;
  height: 400px;
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
