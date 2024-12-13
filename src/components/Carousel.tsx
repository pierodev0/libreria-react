// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      //   pagination={{ clickable: true }}
      //   scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      autoplay={{ delay: 3000 }}
      className=''
      speed={1200}
    >
      <SwiperSlide>
        <div className='h-full'>
          <img
            src='/1.webp'
            className='object-cover h-full'
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='h-full'>
          <img
            src='/2.webp'
            className='object-cover h-full'
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
