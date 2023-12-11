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
        <StTitle>내 주변 축제</StTitle>
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

const StTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 1em 0;
  padding-top: 3rem;
`;

const StkakaoMap = styled(KakaoMap)`
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

export default Search;
