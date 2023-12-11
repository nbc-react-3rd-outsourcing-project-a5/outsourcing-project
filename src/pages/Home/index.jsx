import Carousel from 'components/Carousel/Carousel';
import HomeContents from 'components/HomeContents/HomeContents';
import Popular from 'components/Popular/Popular';
import React from 'react';
function Home() {
  return (
    <div>
      <Carousel />
      <Popular />
      <HomeContents />
    </div>
  );
}

export default Home;
