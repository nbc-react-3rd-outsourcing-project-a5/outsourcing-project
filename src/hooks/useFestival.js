import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  __createFestival,
  __getFestival,
  __getQueryFestivals,
  __updateFestival,
  __deleteFestival,
  clearError
} from '../redux/modules/festivalSlice';

export const useFestival = (method = null) => {
  const dispatch = useDispatch();
  const { error, isError, targertFestival, snapshotFestivals } = useSelector((state) => state.festivalSlice);
  useEffect(() => {
    if (isError) {
      console.error('커스텀 훅 에러');
      console.error(error);
      dispatch(clearError());
    }
  }, [isError, dispatch, error]);

  switch (method) {
    case 'create':
      const handelCreate = (festivalData) => {
        dispatch(__createFestival(festivalData));
      };

      return handelCreate;
    case 'get':
      const handleGet = (festivalID) => {
        dispatch(__getFestival(festivalID));
      };
      return [targertFestival, handleGet];
    case 'getQuery':
      const handleGetQuery = (query) => {
        dispatch(__getQueryFestivals(query));
      };
      return [snapshotFestivals, handleGetQuery];

    case 'update':
      const handleUpdate = (festivalData) => {
        dispatch(__updateFestival(festivalData));
      };
      return handleUpdate;

    case 'delete':
      const handleDelete = (festivalID) => {
        dispatch(__deleteFestival(festivalID));
      };
      return handleDelete;

    default:
      return { targertFestival, snapshotFestivals };
  }
};
