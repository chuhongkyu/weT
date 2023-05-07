import styles from "styles/Layout.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Banner(){
    return (
        <div id={styles.Banner}>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={1.2}
                centeredSlides={true}
                loop={true}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                <SwiperSlide>
                    <div className={styles.content_1}>
                        <h5 className={styles.__icon}>We T</h5>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.content_2}>
                        <img src={"/img/img_cat2.png"} alt="2"/>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.content_2}>
                        <img src={"/img/img_cat2.png"} alt="2"/>
                    </div>
                </SwiperSlide>
            </Swiper>
            
        </div>
    )
}