import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';
import Image from "next/image";

const Img = [
    {
        background: "/img/banner_1_mobile.jpg",
        text: "우리들의 OTT",
        text2: "We T",
        color: "rgba(0,216,254)"
    },
    {
        background: "/img/banner_2_mobile.jpg",
        text: "우리들의 OTT",
        text2: "We T",
        color: "rgba(0,190,224)"
    },
    {
        background: "/img/banner_3_mobile.jpg",
        color: "rgba(0,0,0)"
    },
    {
        background: "/img/banner_1_mobile.jpg",
        text: "우리들의 OTT",
        text2: "We T",
        color: "rgba(0,216,254)"
    },
]

export default function Banner(){
    return (
        <div id="Banner">
            <Swiper
                modules={[ Pagination, Autoplay]}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false}}
                pagination={{ clickable: true }}
                grabCursor={true}
            >
                {Img?.map((img, index)=>{
                    return(
                        <SwiperSlide className="content" key={index + "Id"} style={{backgroundColor: img.color}}>
                            <Image width={425} height={280} className="w-auto h-full" quality={75} priority={true} 
                                src={img.background} alt={"1" + index}
                            />
                            {img.text && 
                                <div className="texts">
                                    <h5>{img.text}</h5>
                                    <p>{img.text2}</p>
                                </div>
                            }
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}