import { useRef, useEffect, useState } from "react";
import { register } from "swiper/element/bundle";
import Image from "next/legacy/image";
import dbMocks from "../__mocks__/dbMocks.json";

register();

export default function CardImage({
  currentevent,
  setCurrentevent,
  setHealthone,
  setHealthtwo,
  setHealththree,
  setHealthfour,
}) {
  const swiperElRef = useRef(null);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    const swiper = swiperElRef.current.swiper;
    setSwiper(swiper);

    swiper.on("slideChange", () => {
      const activeSlideIndex = swiper.activeIndex;
      setCurrentevent(activeSlideIndex);
      setHealthone(
        (prevHealthone) =>
          prevHealthone + dbMocks[activeSlideIndex].healthbars.hb1
      );
      setHealthtwo(
        (prevHealthtwo) =>
          prevHealthtwo + dbMocks[activeSlideIndex].healthbars.hb2
      );
      setHealththree(
        (prevHealththree) =>
          prevHealththree + dbMocks[activeSlideIndex].healthbars.hb3
      );
      setHealthfour(
        (prevHealthfour) =>
          prevHealthfour + dbMocks[activeSlideIndex].healthbars.hb4
      );
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
            src={dbMocks[currentevent].image}
            alt="Link Icon"
            layout="responsive"
            width={100}
            height={100}
          />
        </swiper-slide>
        <swiper-slide>
          {" "}
          <Image
            id="currenteventimage"
            src={dbMocks[currentevent].image}
            alt="Link Icon"
            layout="responsive"
            width={100}
            height={100}
          />
        </swiper-slide>
        <swiper-slide>
          {" "}
          <Image
            src={dbMocks[currentevent].image}
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
