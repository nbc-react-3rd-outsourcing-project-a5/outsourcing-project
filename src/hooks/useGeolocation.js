import { useEffect, useState } from 'react';

export const useGeolocation = () => {
  const [state, setState] = useState({
    position: { lat: null, lng: null },
    isLoading: true,
    isError: false,
    error: null
  });

  useEffect(() => {
    const fetchGeolocation = async () => {
      try {
        if (navigator.geolocation) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          setState((prev) => ({
            ...prev,
            isLoading: false,
            position: { lat: position.coords.latitude, lng: position.coords.longitude }
          }));
        } else {
          throw new Error('Geolocation을 지원하지 않습니다.');
        }
      } catch (error) {
        console.error(error);
        setState((prev) => ({ ...prev, isLoading: false, isError: true, error }));
      }
    };

    fetchGeolocation();
  }, []);

  useEffect(() => {
    // TODO: tostify alert으로 교체하기
    if (state.isError) {
      alert(state.error);
    }
  }, [state.isError, state.error]);

  return state.isLoading ? null : state.position;
};
