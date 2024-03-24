import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';
import Image from "next/image";

const Img = [
    {
        background: "/img/banner_1.jpg",
        text: "우리들의 OTT",
        text2: "We T"
    },
    {
        background: "/img/banner_2.jpg",
        text: "우리들의 OTT",
        text2: "We T"
    },
    {
        background: "/img/banner_3.jpg",
    },
    {
        background: "/img/banner_2.jpg",
        text: "우리들의 OTT",
        text2: "We T"
    },
]

export default function Banner(){
    return (
        <div id="Banner">
            <Swiper
                modules={[ Pagination, Autoplay]}
                spaceBetween={10}
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
                        <SwiperSlide className="content" key={index + "Id"}>
                            <Image width={320} height={200} className="h-full w-full" quality={75} priority={true} 
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