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

//가짜 더미데이터
export const fakeData = [
  {
    id: 1,
    title: '남포동 크리스마스 축제',
    content: '이것은 남포동에서만 볼 수 있는 크리스마스 축제~~',
    img: 'https://mblogthumb-phinf.pstatic.net/MjAyMDExMzBfMjUz/MDAxNjA2NzQ2NzUzMDMz.4CF4ct9o0ZPIcMYDlEdyvWoHxC190eZ8SFMAYdvoa7wg.TQRY-0ElReUMQiF7i7OHZM6szH30Bc3XtbN9S2VxDTgg.JPEG.molli1108/SE-d9d0f7be-3f15-4ef9-944e-81a147698f8a.jpg?type=w800',
    isDone: false
  },
  {
    id: 2,
    title: '유성온천 크리스마스 축제',
    content: '이것은 유성온천에서만 볼 수 있는 크리스마스 축제~~',
    img: 'https://img3.yna.co.kr/etc/inner/KR/2022/11/25/AKR20221125112900053_01_i_P4.jpg',
    isDone: false
  },
  {
    id: 3,
    title: '애버랜드 크리스마스 축제',
    content: '이것은 애버랜드에서만 볼 수 있는 크리스마스 축제~~',
    img: 'https://file.nspna.com/news/2022/12/19/20221219124055_610622_1.jpg',
    isDone: true
  },
  {
    id: 4,
    title: '롯데월드 크리스마스 축제',
    content: '이것은 롯데월드에서만 볼 수 있는 크리스마스 축제~~',
    img: 'https://adventure.lotteworld.com/image/2019/11/201911050241235701_1350.jpg',
    isDone: false
  },
  {
    id: 5,
    title: '서울 크리스마스 축제',
    content: '이것은 서울에서만 볼 수 있는 크리스마스 축제~~',
    img: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEyMTJfOTcg/MDAxNTc2MTM2MDg3MzQ0.PAdrj86mx2zDw7hzz7X3JF64MnRmzxXhn6k_fdL4R0sg.wOaDtbqv6VbXtGNjR9V2GQfZNEGbh10444chBNv83RIg.JPEG.haechiseoul/%EC%84%9C%EC%9A%B8%EC%8B%9C_%EC%B9%B4%EB%93%9C%EB%89%B4%EC%8A%A4_%ED%81%AC%EB%A6%AC%EC%8A%A4%EB%A7%88%EC%8A%A4%ED%8E%98%EC%8A%A4%ED%8B%B0%EB%B2%8C01_191212.jpg?type=w800',
    isDone: true
  },
  {
    id: 6,
    title: '남구 크리스마스 축제',
    content: '이것은 남구에서만 볼 수 있는 크리스마스 축제~~',
    img: 'https://i.ytimg.com/vi/nvLYNZ2BIOM/sddefault.jpg',
    isDone: true
  },
  {
    id: 7,
    title: '청도 프로방스 산타마을 빛 축제',
    content: '이것은 프라방스에서만 볼 수 있는 크리스마스 축제~~',
    img: 'https://tong.visitkorea.or.kr/cms/resource/15/2952515_image2_1.jpg',
    isDone: false
  },
  {
    id: 8,
    title: '청도 산타마을 빛 축제',
    content: '이것은 청도에서만 볼 수 있는 크리스마스 축제~~',
    img: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEyMDlfMTU2/MDAxNTc1ODk1NTA4Mzgz.QdffA41d7CiRvVpiRnsJgtzZQjPfMu2k1yn69MoK-gAg.1XtR_LigTnPrUEqKSzwccGDsfINA1GfLiwPrVDtqX0og.JPEG.kji206/1_DSI8582.jpg?type=w800',
    isDone: true
  },
  {
    id: 9,
    title: '남포동 크리스마스 축제',
    content: '이것은 남포동에서만 볼 수 있는 크리스마스 축제~~',
    img: 'https://pasteve.com/wp-content/uploads/%ED%81%AC%EB%A6%AC%EC%8A%A4%EB%A7%88%EC%8A%A4%EC%9D%98-%EC%9C%A0%EB%9E%98%EC%99%80-%EC%97%AD%EC%82%AC.webp',
    isDone: false
  },
  {
    id: 10,
    title: '유성온천 크리스마스 축제',
    content: '이것은 유성온천에서만 볼 수 있는 크리스마스 축제~~',
    img: 'https://newsimg.sedaily.com/2022/12/12/26EVH8FI5Z_1.jpg',
    isDone: true
  },
  {
    id: 11,
    title: '애버랜드 크리스마스 축제',
    content: '이것은 애버랜드에서만 볼 수 있는 크리스마스 축제~~',
    img: 'https://file.nspna.com/news/2022/12/19/20221219124055_610622_1.jpg',
    isDone: true
  },
  {
    id: 12,
    title: '롯데월드 크리스마스 축제',
    content: '이것은 롯데월드에서만 볼 수 있는 크리스마스 축제~~',
    img: 'https://news.kbs.co.kr/data/news/2019/12/18/4345376_7JO.jpg',
    isDone: true
  },
  {
    id: 13,
    title: '서울 크리스마스 축제',
    content: '이것은 서울에서만 볼 수 있는 크리스마스 축제~~',
    img: 'https://blog.kakaocdn.net/dn/bgagY4/btqQNpQNlvi/c8pKyA1N7rSniJ5OoyHRL1/img.png',
    isDone: true
  },
  {
    id: 14,
    title: '남구 크리스마스 축제',
    content: '이것은 남구에서만 볼 수 있는 크리스마스 축제~~',
    img: 'https://dimg.donga.com/wps/NEWS/IMAGE/2021/12/23/110891872.2.jpg',
    isDone: true
  },
  {
    id: 15,
    title: '청도 프로방스 산타마을 빛 축제',
    content: '이것은 프라방스에서만 볼 수 있는 크리스마스 축제~~',
    img: 'https://wordpress-network.prod.aws.skyscnr.com/wp-content/uploads/2018/05/christmas_background_with_christmas_tree_and_snowman_shutterstock_232853431.jpg',
    isDone: false
  },
  {
    id: 16,
    title: '청도 산타마을 빛 축제',
    content: '이것은 청도에서만 볼 수 있는 크리스마스 축제~~',
    img: 'https://cdn.imweb.me/thumbnail/20211118/204bd70183acf.jpg',
    isDone: true
  }
];

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

  const carouselFakeData = fakeData.slice(0, 5);

  return (
    <div>
      <StSlider {...settings}>
        {carouselFakeData.map((item) => {
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
