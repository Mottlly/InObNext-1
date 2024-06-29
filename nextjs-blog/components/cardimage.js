import { useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";
import Image from "next/legacy/image";
import dbMocks from "../__mocks__/dbMocks.json";

register();

export default function CardImage({
  left,
  center,
  right,
  setHealthone,
  setHealthtwo,
  setHealththree,
  setHealthfour,
}) {
  const swiperElRef = useRef(null);
  useEffect(() => {
    const swiper = swiperElRef.current.swiper;

    swiper.on("slideChange", () => {
      setHealthone(2);
      setHealthtwo(4);
      setHealththree(6);
      setHealthfour(8);
    });
  }, []);

  return (
    <div id="swipercontainer">
      <swiper-container
        ref={swiperElRef}
        slides-per-view="1"
        navigation="true"
        pagination="true"
      >
        <swiper-slide>
          <Image
            src={left}
            alt="Link Icon"
            layout="responsive"
            width={100}
            height={100}
          />
        </swiper-slide>
        <swiper-slide>
          {" "}
          <Image
            src={center}
            alt="Link Icon"
            layout="responsive"
            width={100}
            height={100}
          />
        </swiper-slide>
        <swiper-slide>
          {" "}
          <Image
            src={right}
            alt="Link Icon"
            layout="responsive"
            width={100}
            height={100}
          />
        </swiper-slide>
      </swiper-container>
    </div>
  );
}
