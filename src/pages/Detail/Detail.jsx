import StContainer from 'components/common/StContainer';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Comments from 'components/Comments/Comments';
import { useFestival, useKakaoMap, useKakaoMapMarker } from 'hooks';
import KakaoMap from 'components/KakaoMap/KakaoMap';

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
  const [selectImageNum, setSelectImageNum] = useState(1);
  const { mapState, mapController } = useKakaoMap();
  const markerController = useKakaoMapMarker();

  useEffect(() => {
    //TODO : DB에서 데이터 받은거 CreateMarkers로 넘겨주기
    // marker : {
    //   [33,125]
    // }
    // createMarkers(festival.responseData.marker);
    const test11 = [
      {
        title: '테스트'
      }
    ];
    markerController.createFestivalMarkers(test11);
  }, []);

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

  const onCopy = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('현재 게시물의 주소가 복사되었습니다.');
      })
      .catch((err) => {
        console.error('Something went wrong', err);
      });
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
            <StShare onClick={onCopy}>
              <svg width="16" height="16" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#ffffff"
                  fill-rule="evenodd"
                  d="M5 2V1h5v1H5Zm-.25-2A.75.75 0 0 0 4 .75V1h-.5A1.5 1.5 0 0 0 2 2.5v10A1.5 1.5 0 0 0 3.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 11.5 1H11V.75a.75.75 0 0 0-.75-.75h-5.5ZM11 2v.25a.75.75 0 0 1-.75.75h-5.5A.75.75 0 0 1 4 2.25V2h-.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H11Z"
                  clip-rule="evenodd"
                />
              </svg>{' '}
              링크 복사하기
            </StShare>
            {festival?.responseData.image && (
              <StBannerImgWrap>
                <StBanner src={festival?.responseData.image[selectImageNum]?.url} />
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
              {festival?.responseData.image?.map((item, index) => (
                <StImgSlide key={index} onClick={() => setSelectImageNum(index)}>
                  <StImg src={item.url} alt={`Image ${index + 2}`} />
                </StImgSlide>
              ))}
            </StImgSlider>
          </StImgSliderBox>
          <StMapBox>
            <StContentTitle>오시는길</StContentTitle>
            <KakaoMap mapState={mapState} onClick={mapController.handleClickSetMarker}>
              {markerController.showGeoLocationMarker()}
              {markerController.showFestivalMarkers()}
            </KakaoMap>
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
  display: flex;
  align-items: center;
  cursor: pointer;

  & svg {
    margin-right: 4px;
  }
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
