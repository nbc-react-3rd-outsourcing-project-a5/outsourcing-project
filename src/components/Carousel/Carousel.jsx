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
    title: '석촌호수의 가을과 겨울, 그리고 루미나리에',
    content: `석촌호수 동 서호 일대에서 ‘빛으로 이어지는 마음과 마음’이라는 주제로 ‘호수의 가을과 겨울 그리고 루미나리에 축제가 개최된다. 2023년 루미나리에 라는 새로운 컨셉을 도입하여 큰 호응을 얻은 본 축제는 올해도 다양한 경관조명, 빛조형물, 포토존을 설치하여 빛의 향연을 펼친다. ’루미나리에‘는 조명으로 건축물을 만들거나 치장하는 축제로서 빛의 예술 또는 빛의 조각이라고도 한다.

    석촌호수의 입구에서 관람객들을 맞이하는 메인 루미나리에 게이트를 시작으로 크고 작은 루미나리에 게이트와 빛터널, 다양한 경관조명과 포토존, 미디어아트 들이 설치된다. 경관조명과 포토존은 축제가 끝난 이후에도 내년 2월까지 계속 전시를 이어나가 연말 석촌호수를 찾는 관람객들에게 볼거리를 제공한다.
    
    개막점등식과 축하공연, 문화예술공연과 체험부스,플리마켓 등의 다채로운 문화행사와 체험도 열린다. 10월27일 금요일 개막식과 불꽃놀이를 시작으로 온가족이 함께 즐길 수 있는 즐길거리가 가득하다.
    
    올해는 세계적인 주얼리 브랜드 불가리의 협업을 통하여 불가리의 상징인 세르펜티라이트가 석촌호수 동호에 설치되어 루미나리에 축제에 신비한 빛을 더한다.`,
    period: '2023.10.27~2024.02.29',
    img: 'https://cdn.visitkorea.or.kr/kfes/upload/contents/db/400_1852e51d-5c6b-465b-ad7f-bcb72ad556a6_3.jpg',
    isDone: false
  },
  {
    id: 2,
    title: '부산불꽃축제',
    content: `"세계 속 빛으로 물들인 부산의 가을" 매년 광안리해수욕장을 화려하게 수놓는 부산불꽃축제가 어느덧 18회를 맞이했다. 2005년 APEC정상회의 기념행사 일환으로 시작돼, 해를 거듭할수록 세계적인 관심을 받으며 부산 대표 축제로 자리매김했다. 부산에서만 볼 수 있는 초대형 불꽃과 광안대교 경관조명을 활용한 미디어파사드 연출, 화려한 불꽃과 조명, 음악이 어우러져 스토리텔링이 가미된 부산멀티불꽃쇼를 만나볼 수 있다. 또한 광안리 해수욕장뿐만 아니라 동백섬, 이기대 앞까지 “3 point"연출로 다양한 장소에서 불꽃쇼를 관람할 수 있다.`,
    period: '2023.11.04 ~ 2023.11.04',
    img: 'https://cdn.visitkorea.or.kr/kfes/upload/contents/db/400_21318988-6590-40d5-a9ee-d17b806b89a1_3.jpg',
    isDone: false
  },
  {
    id: 3,
    title: '해운대 빛축제',
    content: `해운대의 대표적인 겨울축제로 자리매김하고 있는 '제10회 해운대 빛축제'가 2023년 12월 2일부터 2024년 1월 31일까지 개최된다.
    올해 특히 백사장 미디어존은 미디어아트 작가들과의 협업을 통해 더욱 창의적이고 신비로운 빛의 향연을 느낄 수 있다.
    아름다운 빛 조형물 포토존들과 다양한 프로그램을 즐기면서 해운대에서 잊지 못할 추억을 만들 수 있다.`,
    period: '2023.12.02 ~ 2024.01.31',
    img: 'https://cdn.visitkorea.or.kr/kfes/upload/contents/db/400_b3b7a23c-c7f6-45db-930a-b139e4d8cd9f_3.jpg',
    isDone: true
  },
  {
    id: 4,
    title: '이월드 일루미네이션',
    content: `<이월드 일루미네이션 2023>은 겨울 이월드에서만 볼 수 있는 아름답게 반짝이는 빛의 향연과 로맨틱하고 달콤한 겨울밤 분위기를 선보인다.

    이월드 일루미네이션에서는 30여 종의 놀이기구도 함께 즐길 수 있다. 또한 83타워 전망대에서 바라보는 대구야경과 13만 평 전체가 빛으로 물들여진 이월드의 광경 또한 이월드 일루미네이션에서 반드시 즐겨야 하는 필수코스다. 축제 기간 동안 빨간 2층버스, 회전목마 등 다양한 포토존들이 공간 내 가득 차 있어 가는 발걸음마다 수백 장의 인생샷을 찍을 수 있게 해준다.`,
    period: '2023.11.18 ~ 2024.02.28',
    img: 'https://cdn.visitkorea.or.kr/kfes/upload/contents/db/400_c864063f-35fc-4ca1-9988-46b29a6236c1_3.png',
    isDone: false
  },
  {
    id: 5,
    title: '겨울, 청계천의 빛',
    content: `올해로 9회째를 맞는 '2023 겨울, 청계천의 빛'이 12월 15일부터 31일까지 청계과장광장에서 모전교 구간에서 열린다. 푸른 별 지구의 모습을 블루 앤 화이트로 연출한 대형 트리, 사랑스러운 하얀 북극곰과 빙산 트러스 장식, 광장을 장식한 동그란 얼음 조각과 얼음 터널 등 지구온난화로 전 세계가 어려움을 겪는 가운데 아름답고 행복한 지구를 만들자는 소망을 빛으로 담았다.`,
    period: '2023.12.15 ~ 2023.12.31',
    img: 'https://cdn.visitkorea.or.kr/kfes/upload/contents/db/400_8e3215e7-02ad-488a-997d-979b2b8b682f_3.jpg',
    isDone: true
  },
  {
    id: 6,
    title: 'DDP 겨울축제',
    content: `2023 DDP 겨울축제는 2023년 12월 21일부터 31일까지 운영되며 총 11일간 다채로운 볼거리와 체험 프로그램을 즐길 수 있다. 디자이너들이 선보이는 크리스마스 제품부터 특별한 체험 프로그램까지 운영되는 이번 DDP 겨울축제는 서울라이트와 연계된다.`,
    period: '2023.12.21 ~ 2023.12.31',
    img: 'https://cdn.visitkorea.or.kr/kfes/upload/contents/db/400_07333455-6bd8-4979-aee3-1bb510eee54d_2.png',
    isDone: true
  },
  {
    id: 7,
    title: '청도 프로방스 산타마을 빛 축제',
    content: '이것은 프라방스에서만 볼 수 있는 크리스마스 축제~~',
    period: '2023.11.04 ~ 2023.11.04',
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
    period: '2023.11.04 ~ 2023.11.04',
    img: 'https://pasteve.com/wp-content/uploads/%ED%81%AC%EB%A6%AC%EC%8A%A4%EB%A7%88%EC%8A%A4%EC%9D%98-%EC%9C%A0%EB%9E%98%EC%99%80-%EC%97%AD%EC%82%AC.webp',
    isDone: false
  },
  {
    id: 10,
    title: '유성온천 크리스마스 축제',
    content: '이것은 유성온천에서만 볼 수 있는 크리스마스 축제~~',
    period: '2023.11.04 ~ 2023.11.04',
    img: 'https://newsimg.sedaily.com/2022/12/12/26EVH8FI5Z_1.jpg',
    isDone: true
  },
  {
    id: 11,
    title: '애버랜드 크리스마스 축제',
    content: '이것은 애버랜드에서만 볼 수 있는 크리스마스 축제~~',
    period: '2023.11.04 ~ 2023.11.04',
    img: 'https://file.nspna.com/news/2022/12/19/20221219124055_610622_1.jpg',
    isDone: true
  },
  {
    id: 12,
    title: '롯데월드 크리스마스 축제',
    content: '이것은 롯데월드에서만 볼 수 있는 크리스마스 축제~~',
    period: '2023.11.04 ~ 2023.11.04',
    img: 'https://news.kbs.co.kr/data/news/2019/12/18/4345376_7JO.jpg',
    isDone: true
  },
  {
    id: 13,
    title: '서울 크리스마스 축제',
    content: '이것은 서울에서만 볼 수 있는 크리스마스 축제~~',
    period: '2023.11.04 ~ 2023.11.04',
    img: 'https://blog.kakaocdn.net/dn/bgagY4/btqQNpQNlvi/c8pKyA1N7rSniJ5OoyHRL1/img.png',
    isDone: true
  },
  {
    id: 14,
    title: '남구 크리스마스 축제',
    content: '이것은 남구에서만 볼 수 있는 크리스마스 축제~~',
    period: '2023.11.04 ~ 2023.11.04',
    img: 'https://dimg.donga.com/wps/NEWS/IMAGE/2021/12/23/110891872.2.jpg',
    isDone: true
  },
  {
    id: 15,
    title: '청도 프로방스 산타마을 빛 축제',
    content: '이것은 프라방스에서만 볼 수 있는 크리스마스 축제~~',
    period: '2023.11.04 ~ 2023.11.04',
    img: 'https://wordpress-network.prod.aws.skyscnr.com/wp-content/uploads/2018/05/christmas_background_with_christmas_tree_and_snowman_shutterstock_232853431.jpg',
    isDone: false
  },
  {
    id: 16,
    title: '청도 산타마을 빛 축제',
    content: '이것은 청도에서만 볼 수 있는 크리스마스 축제~~',
    period: '2023.11.04 ~ 2023.11.04',
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
