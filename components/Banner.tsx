import styles from "styles/Layout.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';

export default function Banner(){
    return (
        <div id={styles.Banner}>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={1.1}
                centeredSlides={true}
                loop={true}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                <SwiperSlide>
                    <div className={styles.content_1}>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.content_2}>
                        <img src={"/img/banner_2.png"} alt="2"/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.content_3}>
                        <img src={"/img/img_cat2.png"} alt="3"/>
                    </div>
                </SwiperSlide>
            </Swiper>
            
        </div>
    )
}