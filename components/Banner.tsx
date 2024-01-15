import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';
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
        <div id="Banner">
            <div 
                style={{width: "100%"}}
                >
                    <Swiper 
                        modules={[ Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1.2}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{ delay: 5000, disableOnInteraction: false}}
                        pagination={{ clickable: true }}
                        grabCursor={true}
                        breakpoints={{
                            1024: {
                                slidesPerView: 1.5,
                                spaceBetween: 24,
                            }}
                        }
                    >
                        {Img?.map((img, index)=>{
                            return(
                                <SwiperSlide key={index + "Id"} 
                                // style={{width: "calc(200% / 3)"}}
                                >
                                    <div className="content">
                                        <div className="content-child">
                                            <Image 
                                                fill className="h-full w-full"
                                                priority={true} src={img.background} alt={"1" + index}
                                            />
                                            {img.text && 
                                                <div className="texts">
                                                    <h5>{img.text}</h5>
                                                    <p>{img.text2}</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
            </div>
        </div>
    )
}