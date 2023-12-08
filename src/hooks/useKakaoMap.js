import KakaoMap from 'components/KakaoMap/KakaoMap';
import { useRef } from 'react';
export const useKakaoMap = () => {
  // 공식문서의 document.getElementById('map')
  const kakaoMapRef = useRef();
  // 공식문서의 map
  const kakaoMap = useRef();
  // 화면에 출력되는 map 컴포넌트
  const kakaoMapView = <KakaoMap kakaoMapRef={kakaoMapRef} kakaoMap={kakaoMap} />;

  const handleMove = (x, y) => {
    const moveLatLon = new window.kakao.maps.LatLng(x, y);
    kakaoMap.current.panTo(moveLatLon);
  };

  const handelDraggable = (draggable) => kakaoMap.current.setDraggable(draggable);

  // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
  const handleZoomable = (zoomable) => kakaoMap.current.setZoomable(zoomable);

  // 지도에 교통정보를 표시하도록 지도타입을 추가합니다
  const handleTraffic = (display) => {
    display
      ? kakaoMap.current.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC)
      : kakaoMap.current.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);
  };

  // 지도를 표시하는 div 크기를 변경하는 함수입니다
  const handleResize = (w, h) => {
    kakaoMapRef.current.style.width = `${w}px`;
    kakaoMapRef.current.style.height = `${h}px`;
    kakaoMap.current.relayout();
  };

  // x,y 좌표에 마커를 생성합니다
  const handleSetMarker = (x, y) => {
    const markerPosition = new window.kakao.maps.LatLng(x, y);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(kakaoMap.current);
  };

  const controller = {
    move: handleMove,
    draggable: handelDraggable,
    zoomable: handleZoomable,
    traffic: handleTraffic,
    resize: handleResize,
    setMarker: handleSetMarker
  };
  return { kakaoMapView, controller };
};
