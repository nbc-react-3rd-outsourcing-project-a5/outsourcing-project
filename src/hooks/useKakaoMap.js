import KakaoMap from 'components/KakaoMap/KakaoMap';
import { useEffect, useRef, useState } from 'react';
export const useKakaoMap = () => {
  const [isReady, setIsReady] = useState(false);

  // 공식문서의 document.getElementById('map')
  const kakaoMapRef = useRef();
  // 공식문서의 map
  const kakaoMap = useRef();
  // 화면에 출력되는 map 컴포넌트
  const kakaoMapView = (
    <KakaoMap kakaoMapRef={kakaoMapRef} kakaoMap={kakaoMap} isReady={isReady} setIsReady={setIsReady} />
  );

  // 지도를 해당 위치로 이동
  const handleMove = (x, y) => {
    const moveLatLon = new window.kakao.maps.LatLng(x, y);
    kakaoMap.current.panTo(moveLatLon);
  };

  const handelDraggable = (draggable) => kakaoMap.current.setDraggable(draggable);

  // 마우스 휠의 지도 확대,축소 가능여부 설정
  const handleZoomable = (boolean) => kakaoMap.current.setZoomable(boolean);

  // 지도에 교통정보를 표시
  const handleTraffic = (boolean) => {
    boolean
      ? kakaoMap.current.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC)
      : kakaoMap.current.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);
  };

  // 지도를 표시하는 div 크기를 변경
  const handleResize = (w, h) => {
    kakaoMapRef.current.style.width = `${w}px`;
    kakaoMapRef.current.style.height = `${h}px`;
    kakaoMap.current.relayout();
  };

  // 해당 위치에 마커 생성
  // boolean의 값에 따라서 마커를 한번 더 클릭하면 지울 수 있는 상태로 만들음
  const handleSetMarker = (x, y, boolean = false) => {
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(x, y),
      clickable: true
    });

    marker.setMap(kakaoMap.current);

    if (boolean) {
      window.kakao.maps.event.addListener(marker, 'click', () => {
        marker.setMap(null);
      });
    }
  };

  // 지도를 클릭하면 해당 위치에 마커생기는 기능
  const handleClickSetMarker = () => {
    const marker = new window.kakao.maps.Marker({
      position: kakaoMap.current.getCenter(),
      clickable: true
    });
    marker.setMap(kakaoMap.current);
    window.kakao.maps.event.addListener(kakaoMap.current, 'click', (mouseEvent) => {
      const latlng = mouseEvent.latLng;
      marker.setPosition(latlng);

      // DB에 저장할 데이터
      const overlay = [latlng.getLat(), latlng.getLng()];
      console.log(overlay);
    });
  };

  const controller = {
    isReady,
    move: handleMove,
    draggable: handelDraggable,
    zoomable: handleZoomable,
    traffic: handleTraffic,
    resize: handleResize,
    setMarker: handleSetMarker,
    clickSetMarker: handleClickSetMarker
  };
  return { kakaoMapView, controller };
};
