import { useRef, useEffect, useState } from "react";
import { register } from "swiper/element/bundle";
import Image from "next/legacy/image";
import dbMocks from "../__mocks__/dbMocks.json";

register();

export default function CardImage({
  currentEvent,
  eventData,
  setCurrentEvent,
  setHealthOne,
  setHealthTwo,
  setHealthThree,
  setHealthFour,
}) {
  const swiperElRef = useRef(null);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    const swiperInstance = swiperElRef.current.swiper;
    setSwiper(swiperInstance);

    const onSlideChange = () => {
      const activeSlideIndex = swiperInstance.activeIndex;

      if (eventData) {
        setCurrentEvent(eventData.event_number); // Ensure eventData is valid before accessing
        console.log(currentEvent);
      }

      setHealthOne((prevHealthOne) => prevHealthOne + eventData.healthbars.hb1);
      setHealthTwo((prevHealthTwo) => prevHealthTwo + eventData.healthbars.hb2);
      setHealthThree(
        (prevHealthThree) => prevHealthThree + eventData.healthbars.hb3
      );
      setHealthFour(
        (prevHealthFour) => prevHealthFour + eventData.healthbars.hb4
      );
    };

    swiperInstance.on("slideChange", onSlideChange);

    // Cleanup the event listener on component unmount
    return () => {
      swiperInstance.off("slideChange", onSlideChange);
    };
  }, [eventData]); // Depend on eventData to re-run when it changes

  // Ensure the image source is valid
  const imageSrc = eventData.image;

  return (
    <div id="swipercontainer">
      <swiper-container ref={swiperElRef} slides-per-view="1">
        <swiper-slide>
          <Image
            src={imageSrc}
            alt="Link Icon"
            layout="responsive"
            width={100}
            height={100}
          />
        </swiper-slide>
        <swiper-slide>
          <Image
            id="currenteventimage"
            src={imageSrc}
            alt="Link Icon"
            layout="responsive"
            width={100}
            height={100}
          />
        </swiper-slide>
        <swiper-slide>
          <Image
            src={imageSrc}
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
