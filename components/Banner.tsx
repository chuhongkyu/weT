import styles from "styles/Layout.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from "react";
import Image from "next/image";

const Img = [
    {
        background: "/img/banner_1.png",
        text: "우리들의 OTT",
        text2: "We T"
    },
    {
        background: "/img/banner_2.png",
        text: "우리들의 OTT",
        text2: "We T"
    },
    {
        background: "/img/banner_3.png"
    },
    {
        background: "/img/banner_2.png",
        text: "우리들의 OTT",
        text2: "We T"
    },
]

export default function Banner(){
    return (
        <div id={styles.Banner}>
            <div 
                style={{width: "100%"}}
                className={styles.banner_center}
                >
                    <Swiper 
                        className={styles.wrapper}
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1.2}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{ delay: 5000}}
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        breakpoints={{
                            1024: {
                                slidesPerView: 1.5,
                                spaceBetween: 24,
                            }}
                        }
                    >
                        {Img ? Img.map((img, index)=>{
                            return(
                                <SwiperSlide key={index + "Id"} 
                                // style={{width: "calc(200% / 3)"}}
                                >
                                    <div className={styles.content}>
                                        <div className={styles.content_child}>
                                            <Image layout="fill" objectFit="cover" src={img.background} alt={"1" + index}/>
                                            {img.text ? (
                                                <div className={styles.texts}>
                                                    <h5>{img.text}</h5>
                                                    <p>{img.text2}</p>
                                                </div>
                                            ):null}
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