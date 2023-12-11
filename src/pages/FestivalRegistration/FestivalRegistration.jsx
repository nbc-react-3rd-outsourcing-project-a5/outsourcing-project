import FestivalRegistrationForm from 'components/FestivalRegistration/FestivalRegistrationForm';
import React, { useEffect } from 'react';
import KakaoMap from 'components/KakaoMap/KakaoMap';
import { useKakaoMap, useKakaoMapMarker, useGeolocation } from 'hooks';
export default function FestivalRegistration() {
  const { mapState, mapController, position } = useKakaoMap();
  const markerController = useKakaoMapMarker();
  const geolocation = useGeolocation();

  useEffect(() => {
    if (geolocation) {
      mapController.changeState({ center: geolocation });
    }
  }, [geolocation]);

  useEffect(() => {
    markerController.createMarker({ position: position });
  }, [position]);

  return (
    <FestivalRegistrationForm position={position}>
      <KakaoMap mapState={mapState} onClick={mapController.handleClickGetPosition} mapControl={true}>
        {markerController.showMarkers()}
      </KakaoMap>
    </FestivalRegistrationForm>
  );
}
