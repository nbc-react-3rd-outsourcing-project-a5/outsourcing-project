import React, { MapMarker } from 'react-kakao-maps-sdk';

function KakaoMapMarker({ data, children, onClick = null }) {
  return (
    <MapMarker
      position={data.position} // 마커를 표시할 위치
      image={data.image}
      title={data.title}
      draggable={data.draggable} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      onClick={onClick}
    >
      {children}
    </MapMarker>
  );
}

export default KakaoMapMarker;
