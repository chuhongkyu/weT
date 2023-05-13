import styles from "styles/Layout.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from "react";

const Img = [
    {
        background: "/img/banner_1.png"
    },
    {
        background: "/img/banner_2.png"
    },
    {
        background: "/img/banner_3.png"
    },
    {
        background: "/img/banner_2.png"
    },
]

export default function Banner(){
    return (
        <div id={styles.Banner}>
            <div style={{width: "200%"}}
                 className={styles.banner_center}
                >
                    <Swiper 
                        className={styles.wrapper}
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={24}
                        slidesPerView={3}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{ delay: 5000}}
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                    >
                        {Img ? Img.map((img, index)=>{
                            return(
                                <SwiperSlide key={index + "Id"} style={{width: "calc(200% / 3)"}}>
                                    <div className={styles.content}>
                                        <div className={styles.content_child}>
                                            <img src={img.background} alt={"1" + index}/>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        }):null}
                    </Swiper>
            </div>
            
            
        </div>
    )
}