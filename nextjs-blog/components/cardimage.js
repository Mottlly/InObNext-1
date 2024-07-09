import { useRef, useEffect, useState } from "react";
import { register } from "swiper/element/bundle";
import Image from "next/legacy/image";
import dbMocks from "../__mocks__/dbMocks.json";

register();

export default function CardImage({
  currentEvent,
  setCurrentEvent,
  setHealthOne,
  setHealthTwo,
  setHealthThree,
  setHealthFour,
}) {
  const swiperElRef = useRef(null);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    const swiper = swiperElRef.current.swiper;
    setSwiper(swiper);

    swiper.on("slideChange", () => {
      const activeSlideIndex = swiper.activeIndex;
      setCurrentEvent(activeSlideIndex);
      setHealthOne(
        (prevHealthOne) =>
          prevHealthOne + dbMocks[activeSlideIndex].healthbars.hb1
      );
      setHealthTwo(
        (prevHealthTwo) =>
          prevHealthTwo + dbMocks[activeSlideIndex].healthbars.hb2
      );
      setHealthThree(
        (prevHealthThree) =>
          prevHealthThree + dbMocks[activeSlideIndex].healthbars.hb3
      );
      setHealthFour(
        (prevHealthFour) =>
          prevHealthFour + dbMocks[activeSlideIndex].healthbars.hb4
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
            src={dbMocks[currentEvent].image}
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
            src={dbMocks[currentEvent].image}
            alt="Link Icon"
            layout="responsive"
            width={100}
            height={100}
          />
        </swiper-slide>
        <swiper-slide>
          {" "}
          <Image
            src={dbMocks[currentEvent].image}
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
