import KakaoMapMarker from 'components/KakaoMap/KakaoMapMarker';
import KakaoOverlay from 'components/KakaoMap/KakaoOverlay';
import { useState } from 'react';
import { useGeolocation } from './useGeolocation';
import geoMarker from 'assets/geoMarker.png';
export const useKakaoMapMarker = () => {
  const geoLocationData = useGeolocation();
  const [markers, setMarkers] = useState([]);
  const [festivalmarkers, setFestivalMarkers] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(geoLocationData);
  const defaultMarkerData = {
    position: {
      lat: 33.450701,
      lng: 126.570667
    },
    draggable: false,
    title: 'defaultMapMarker',
    image: {
      src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
      size: {
        width: 24,
        height: 35
      }
    }
  };

  const createMarkerData = (data) => {
    const initData = data ? { ...defaultMarkerData, ...data } : defaultMarkerData;
    return initData;
  };

  const createMarker = (data) => {
    const markerData = createMarkerData(data);
    setMarkers([markerData]);
  };

  const createMarkers = (array) => {
    const markersData = array.map((n) => createMarkerData(n));
    setMarkers((prev) => [...prev, ...markersData]);
  };

  const showMarkers = () => {
    return markers.map((n, i) => {
      return (
        <KakaoMapMarker
          data={n}
          key={`marker-${i}`}
          // title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        />
      );
    });
  };

  const showGeoLocationMarker = (draggable) => {
    const initData = {
      position: geoLocationData,
      title: '현재 위치',
      image: {
        src: geoMarker, // 마커이미지의 주소입니다
        size: {
          width: 44,
          height: 49
        }
      },
      draggable: draggable
    };
    const geolocationMarkerData = createMarkerData(initData);

    return geoLocationData && <KakaoMapMarker data={geolocationMarkerData} />;
  };

  const createFestivalMarkers = (array) => {
    const markersData = array.map((n) => createMarkerData({ ...n, isOpen: false }));

    setFestivalMarkers((prev) => [...prev, ...markersData]);
  };

  const showFestivalMarkers = () => {
    const handleToggleOverlay = (index) => {
      const copy = [...festivalmarkers];
      copy[index].isOpen = !copy[index].isOpen;
      setFestivalMarkers(copy);
    };

    return (
      festivalmarkers.length > 0 &&
      festivalmarkers.map((n, i) => {
        return (
          <KakaoMapMarker data={n} key={`marker-${i}`} onClick={() => handleToggleOverlay(i, true)}>
            {n.isOpen && (
              <KakaoOverlay
                data={n}
                onClick={() => {
                  handleToggleOverlay(i, false);
                }}
              />
            )}
          </KakaoMapMarker>
        );
      })
    );
  };

  const markerController = {
    createMarkers,
    createMarker,
    showMarkers,
    showGeoLocationMarker,
    createFestivalMarkers,
    showFestivalMarkers
  };
  return markerController;
};
