import StContainer from 'components/common/StContainer';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useFestival } from 'hooks';
import Comments from 'components/Comments/Comments';

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

const Detail = () => {
  const { id } = useParams();
  const festival = useFestival();

  useEffect(() => {
    festival.get(id);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    centerMode: false,
    centerPadding: '10px',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <>
      <StBannerWrap>
        <StContainer>
          <StInfo>
            <StTitle>{festival?.responseData.name}</StTitle>
            <StPeriod>
              {festival?.responseData.startDate} - {festival?.responseData.endDate}
            </StPeriod>
            <StContent>{festival?.responseData.description}</StContent>
            <StShare>공유하기</StShare>
            {festival?.responseData.image && (
              <StBannerImgWrap>
                <StBanner src={festival?.responseData.image[1]?.url} />
              </StBannerImgWrap>
            )}
          </StInfo>
        </StContainer>
      </StBannerWrap>
      <StContainer>
        <StMain>
          <StImgSliderBox>
            <StContentTitle>축제 이미지</StContentTitle>
            <StImgSlider {...settings}>
              {festival?.responseData.image?.slice(1).map((item, index) => (
                <StImgSlide key={index}>
                  <StImg src={item.url} alt={`Image ${index + 2}`} />
                </StImgSlide>
              ))}
            </StImgSlider>
          </StImgSliderBox>
          <StMapBox>
            <StContentTitle>오시는길</StContentTitle>
            {/* 카카오맵  들어갈 자리 */}
            <StMap></StMap>
          </StMapBox>
        </StMain>
        <Comments />
      </StContainer>
    </>
  );
};

const StBannerWrap = styled.div`
  width: 100%;
  height: 500px;
  margin-top: 66px;
  padding-top: 100px;
  background: #dc1920;
`;
const StInfo = styled.div`
  position: relative;
  color: #fff;
`;
const StTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
`;
const StPeriod = styled.div`
  margin: 20px 0 40px;
`;
const StContent = styled.div`
  height: 100px;
  margin-bottom: 60px;
  line-height: 1.6;
  word-break: keep-all;
  overflow: hidden;
  white-space: pre-wrap;
`;
const StShare = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
const StBannerImgWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
`;
const StBanner = styled.img`
  width: 100%;
`;
const StMain = styled.div`
  width: 100%;
  margin-top: 350px;
  text-align: center;
`;
const StImgSliderBox = styled.div``;
const StImgSlider = styled(Slider)`
  width: 100%;
  height: 258px;
  margin-bottom: 100px;
  .slick-track {
    display: flex;
    gap: 10px;
  }
  .silck-list {
    margin: 0 auto;
    overflow-x: hidden;
  }
  .slick-slide img {
    height: 100%;
    width: 100%;
    object-fit: cover;
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
const StContentTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;
const StImgSlide = styled.div`
  display: flex !important;
  align-items: center;
  width: 100%;
  height: 258px;
  border-radius: 10px;
  overflow: hidden;
`;
const StImg = styled.img``;
const StMapBox = styled.div`
  margin-bottom: 100px;
`;
const StMap = styled.div``;

export default Detail;
