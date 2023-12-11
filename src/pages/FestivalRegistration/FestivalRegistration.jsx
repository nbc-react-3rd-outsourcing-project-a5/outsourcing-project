import FestivalRegistrationForm from 'components/FestivalRegistration/FestivalRegistrationForm';
import React from 'react';
import KakaoMap from 'components/KakaoMap/KakaoMap';
import { useKakaoMap, useKakaoMapMarker } from 'hooks';
export default function FestivalRegistration() {
  const { mapState, mapController } = useKakaoMap();
  const markerController = useKakaoMapMarker();
  return (
    <FestivalRegistrationForm>
      <KakaoMap mapState={mapState} onClick={mapController.handleClickSetMarker} mapControl={true}>
        {markerController.showGeoLocationMarker(true)}
      </KakaoMap>
    </FestivalRegistrationForm>
  );
}
