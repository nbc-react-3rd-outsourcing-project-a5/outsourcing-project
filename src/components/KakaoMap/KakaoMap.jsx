import React, { useEffect } from 'react';
import StContainer from 'components/common/StContainer';
import { Map } from 'react-kakao-maps-sdk';
function KakaoMap({ mapState, children, onClick }) {
  const positions = [
    {
      title: '카카오',
      latlng: { lat: 33.450705, lng: 126.570677 }
    },
    {
      title: '생태연못',
      latlng: { lat: 33.450936, lng: 126.569477 }
    },
    {
      title: '텃밭',
      latlng: { lat: 33.450879, lng: 126.56994 }
    },
    {
      title: '근린공원',
      latlng: { lat: 33.451393, lng: 126.570738 }
    }
  ];
  return (
    <StContainer>
      <Map
        center={mapState.center}
        level={mapState.level} // 지도의 확대 레벨
        style={mapState.style}
        isPanto={mapState.isPanto}
        draggable={mapState.draggable}
        onClick={onClick}
        ref={mapState.mapRef}
      >
        {children}
      </Map>
    </StContainer>
  );
}

export default KakaoMap;
