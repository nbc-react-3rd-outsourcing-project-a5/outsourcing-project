import { fakeData } from 'components/Carousel/Carousel';
import React from 'react';
import { useParams } from 'react-router';

const Detail = () => {
  const params = useParams();
  const selectedData = fakeData.filter((item) => item.id === parseInt(params.id));
  console.log('fakeData', fakeData);
  console.log('selectedData', selectedData);
  return <div>{selectedData.id}</div>;
};

export default Detail;
