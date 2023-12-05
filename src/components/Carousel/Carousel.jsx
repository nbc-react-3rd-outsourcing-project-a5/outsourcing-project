import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  //가짜 더미데이터
  const carouselImage = [
    {
      id: 1,
      title: '축제1',
      img: 'https://www.adobe.com/kr/creativecloud/photography/hub/guides/media_1a4ed903dd512735ac7c19d9d9c7c9e91598a1bb3.jpeg?width=750&format=jpeg&optimize=medium'
    },
    { id: 2, title: '축제2', img: 'https://www.e-patentnews.com/imgdata/e-patentnews_com/202209/2022090300016624.jpg' },
    {
      id: 3,
      title: '축제3',
      img: 'https://m.mariasarang.net/files/picture_xmas/happy-new-year-merry-christmas-new-hd.jpg'
    },
    { id: 4, title: '축제4', img: 'https://i.pinimg.com/736x/97/56/dd/9756ddfff85d616c00686c672dea1d85.jpg' }
  ];

  return (
    <div>
      <Slider {...settings}>
        {carouselImage.map((item) => {
          return (
            <div key={item.id}>
              <img src={item.img} alt={item.title} />
              <p>{item.title}</p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
