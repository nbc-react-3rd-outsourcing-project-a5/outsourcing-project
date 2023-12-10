import React, { useEffect } from 'react';
import StContainer from 'components/common/StContainer';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
function KakaoMap({ mapState, children, onClick }) {
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
        {children && <CustomOverlayMap position={mapState.center}>{children}</CustomOverlayMap>}
      </Map>
    </StContainer>
  );
}

export default KakaoMap;
