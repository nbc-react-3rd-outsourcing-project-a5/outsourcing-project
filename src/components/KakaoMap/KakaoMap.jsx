import React, { useEffect, useState } from 'react';
import StContainer from 'components/common/StContainer';
import styled from 'styled-components';
function KakaoMap({ kakaoMapRef, kakaoMap, isReady, setIsReady }) {
  const scriptSrc = '//dapi.kakao.com/v2/maps/sdk.js';
  // const [hasLoaded, setHasLoaded] = useState(false);

  // 카카오맵 API script load Effect
  useEffect(() => {
    const existScript = document.querySelector(`script[src*="${scriptSrc}"`);
    if (!existScript) {
      console.log('스크립트 다시 다운로드함');
      const kakaoMapScript = document.createElement('script');
      kakaoMapScript.async = false;
      kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&autoload=false`;
      document.head.appendChild(kakaoMapScript);

      kakaoMapScript.addEventListener('load', () => {
        window.kakao.maps.load(() => {
          setIsReady(true);
        });
      });
    } else {
      setIsReady(true);
    }
  }, []);

  // 카카오맵 생성 Effect
  useEffect(() => {
    if (isReady) {
      const defaultOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      };
      kakaoMap.current = new window.kakao.maps.Map(kakaoMapRef.current, defaultOption);
    }
  }, [isReady]);

  return (
    <StContainer>
      <StMap ref={kakaoMapRef}></StMap>
    </StContainer>
  );
}

const StMap = styled.div`
  width: 100%;
  height: 400px;
  border: 1px solid red;
`;
export default KakaoMap;
