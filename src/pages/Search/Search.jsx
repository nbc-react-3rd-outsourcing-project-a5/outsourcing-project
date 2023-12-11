import SearchForm from 'components/SearchForm/SearchForm';
import React, { useEffect, useState } from 'react';
import StContainer from 'components/common/StContainer';
import KakaoMap from 'components/KakaoMap/KakaoMap';
import { useGeolocation, useKakaoMap, useKakaoMapMarker } from 'hooks';
import styled from 'styled-components';
import { useInput } from 'hooks';
import regionList from 'data/regionList';
function Search() {
  const { mapState, mapController } = useKakaoMap();
  const markerController = useKakaoMapMarker();
  const geoLocation = useGeolocation();
  const [searchResult, setSearchResult] = useState([]);
  const [city, onSelectCity, onResetCity] = useInput();
  const regionNameList = regionList.map((n) => n.name);
  const [region, onSelectRegion, onResetRegion] = useInput(regionNameList[0]);
  const address = `${region} ${city}`;

  const cityObject = [city, onSelectCity, onResetCity];
  const regionObject = [regionNameList, regionList, region, onSelectRegion, onResetRegion];

  useEffect(() => {
    if (geoLocation) {
      mapController.changeState({ center: geoLocation });
    }
  }, [geoLocation]);

  useEffect(() => {
    const filteredFestival = searchResult.filter((item) => {
      if (city === '선택안함') {
        return item.address.startsWith(region);
      }

      return item.address === address;
    });

    console.log(filteredFestival);
    if (filteredFestival) {
      const festivalMarkerData = filteredFestival.map((n) => {
        const data = {
          position: n.position,
          title: n.name,
          address: n.address,
          overlayImage: n.image[0].url,
          startDate: n.startDate.toDate().toLocaleDateString(),
          endDate: n.endDate.toDate().toLocaleDateString(),
          festivalId: n.id
        };
        return data;
      });
      markerController.createFestivalMarkers(festivalMarkerData);
      festivalMarkerData.length > 0 &&
        mapController.changeState({
          center: festivalMarkerData[0]?.position,
          level: 12,
          style: { width: '100%', height: '600px' }
        });
    }
  }, [searchResult]);

  return (
    <>
      <StContainer>
        <StTitle>내 주변 축제</StTitle>
        <StkakaoMap mapState={{ ...mapState, style: { width: '100%', height: '600px' } }} mapControl={true}>
          {/* {markerController.showGeoLocationMarker()} */}
          {markerController.showFestivalMarkers()}
        </StkakaoMap>
      </StContainer>
      <StContainer>
        <SearchForm
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          cityObject={cityObject}
          regionObject={regionObject}
          address={address}
        />
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
