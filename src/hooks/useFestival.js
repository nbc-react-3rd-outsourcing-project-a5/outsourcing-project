import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  __createFestival,
  __getFestival,
  __getQueryFestivals,
  __updateFestival,
  __deleteFestival,
  clearError
} from '../redux/modules/festivalSlice';
export const useFestival = () => {
  const dispatch = useDispatch();
  const {
    error,
    isError,
    targetFestival: responseData,
    snapshotFestivals: snapshotData
  } = useSelector((state) => state.festivalSlice);
  useEffect(() => {
    if (isError) {
      console.error('커스텀 훅 에러');
      console.error(error);
      dispatch(clearError());
    }
  }, [isError, dispatch, error]);
  const festival = {
    create: (festivalData) => dispatch(__createFestival(festivalData)),
    get: (festivalID) => dispatch(__getFestival(festivalID)),
    getQuery: (query) => dispatch(__getQueryFestivals(query)),
    upDate: (festivalData) => dispatch(__updateFestival(festivalData)),
    delete: (festivalID) => dispatch(__deleteFestival(festivalID)),
    responseData,
    snapshotData
  };
  return festival;
};
