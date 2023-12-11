import SearchForm from 'components/SearchForm/SearchForm';
import React from 'react';
import StContainer from 'components/common/StContainer';
import KakaoMap from 'components/KakaoMap/KakaoMap';
import { useKakaoMap, useKakaoMapMarker } from 'hooks';
import styled from 'styled-components';

function Search() {
  const { mapState, mapController } = useKakaoMap();
  const markerController = useKakaoMapMarker();

  return (
    <>
      <StContainer>
        <StkakaoMap mapState={mapState} onClick={mapController.handleClickSetMarker} mapControl={true}>
          {markerController.showGeoLocationMarker()}
          {markerController.showFestivalMarkers()}
        </StkakaoMap>
      </StContainer>
      <StContainer>
        <SearchForm />
      </StContainer>
    </>
  );
}

const StkakaoMap = styled(KakaoMap)`
  margin-top: 6rem;
  margin-bottom: 3rem;
`;

export default Search;
