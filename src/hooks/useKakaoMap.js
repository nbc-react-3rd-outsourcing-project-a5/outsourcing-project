import KakaoMap from 'components/KakaoMap/KakaoMap';
import KakaoMapOverlay from 'components/KakaoMap/KakaoMapOverlay';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const useKakaoMap = () => {
  const navigate = useNavigate();
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

  const handleSetOverlayMarker = () => {
    const marker = new window.kakao.maps.Marker({
      map: kakaoMap.current,
      position: new window.kakao.maps.LatLng(33.450701, 126.570667)
    });
    //   const content = `<div class="wrap">
    //  <div class="info">
    //      <div class="title">
    //             카카오 스페이스닷원
    //            <button class="close" >닫기</button>
    //         </div>
    //        <div class="body">
    //               <div class="img">
    //                     <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70">
    //              </div>
    //              <div class="desc">
    //                  <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>
    //                   <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>
    //                   <div><a onclick="navigate('/detail/123')" class="link">홈페이지</a></div>
    //             </div>
    //           </div>
    //       </div>
    //   </div>`;
    // const content = '<div class="kakaoMap__overlay" id="123"><button onclick={}>이동하기</button></div>';
    const content = '<div class="kakaoMap__overlay" id="123"></div>';
    // const content =
    //   '<div class="kakaoMap__overlay" id="123"><button onclick="() => {const updateUrlParam = (paramName, paramValue) => {const url = new URL(window.location.href);url.searchParams.set(paramName, paramValue);window.history.pushState(null, ``, url.toString());const event = new Event(`popstate`);window.dispatchEvent(event);};updateUrlParam(`linkTo`, `1`)}"}>이동하기</button></div>';
    const overlay = new window.kakao.maps.CustomOverlay({
      content: content,
      map: kakaoMap.current,
      position: marker.getPosition()
    });
    console.log(document.querySelector('.kakaoMap__overlay'));
    window.kakao.maps.event.addListener(marker, 'click', () => {
      overlay.setMap(kakaoMap.current);
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
    clickSetMarker: handleClickSetMarker,
    setOverlayMarker: handleSetOverlayMarker
  };
  return { kakaoMapView, controller };
};
// const { kakaoMapView, controller } = useKakaoMap();

// 페이지 이동하고 DB에 데이터가져와서  뿌려줄 땐 이걸 사용하자
// useEffect(() => {
//   if (controller.isReady) {
//     controller.setMarker(37, 126, true);
//   }
// }, [controller.isReady]);

//  <div>
// <button onClick={() => controller.move(37, 126)}>순간이동</button>
// <button onClick={() => controller.resize(100, 100)}>사이즈 조절</button>
// <button onClick={() => controller.traffic(true)}>교통보기</button>
// <button onClick={() => controller.traffic(false)}>교통끄기</button>
// <button onClick={() => controller.clickSetMarker()}>clickSetMarker</button>
// <button onClick={() => controller.setMarker(37, 126, true)}>마커표시</button>
// <button onClick={() => controller.setOverlayMarker()}>setOverlayMarker</button>
// <button onClick={() => {}}>URL 확인하기</button>
// </div>
