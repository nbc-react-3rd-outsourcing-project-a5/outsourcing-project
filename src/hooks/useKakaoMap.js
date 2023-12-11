import { useEffect, useRef, useState } from 'react';
import { useGeolocation } from './useGeolocation';
import { useKakaoLoader } from 'react-kakao-maps-sdk';

export const useKakaoMap = () => {
  const [isLoading, error] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAO_APP_KEY // 발급 받은 APPKEY
  });

  const mapRef = useRef();
  const [mapState, setMapState] = useState({
    center: {
      lat: 20.450701,
      lng: 126.570667
    },
    level: 3,
    style: {
      // 지도의 크기
      width: '100%',
      height: '450px'
    },
    isPanto: true,
    draggable: true,
    mapRef: mapRef
  });

  const [position, setPosition] = useState({
    click: {
      lat: 0,
      lng: 0
    },
    geolocation: useGeolocation()
  });

  const changeState = (object) => {
    setMapState((prev) => ({ ...prev, ...object }));
  };

  const handleClickGetPosition = (_t, mouseEvent) => {
    setPosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng()
    });
  };

  const mapController = {
    changeState,
    handleClickGetPosition
  };

  return { isLoading, error, mapState, position, mapController };
};
