import React from 'react';
import { Map, CustomOverlayMap, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
function KakaoMap({ mapState, children, onClick, className, mapControl = false }) {
  return (
    <StWrap className={className}>
      <Map
        center={mapState.center}
        level={mapState.level} // 지도의 확대 레벨
        style={mapState.style}
        isPanto={mapState.isPanto}
        draggable={mapState.draggable}
        onClick={onClick}
        ref={mapState.mapRef}
      >
        {mapControl && (
          <>
            <MapTypeControl position={'TOPRIGHT'} />
            <ZoomControl position={'RIGHT'} />
          </>
        )}

        {children && <CustomOverlayMap position={mapState.center}>{children}</CustomOverlayMap>}
      </Map>
    </StWrap>
  );
}

const StWrap = styled.section``;

export default KakaoMap;
