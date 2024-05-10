import { useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";
import Image from "next/image";
import styles from "../styles/swipercontainer.module.scss";

register();

export default function CardImage() {
  const swiperElRef = useRef(null);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener("swiperprogress", (e) => {
      const [swiper, progress] = e.detail;
      console.log(progress);
    });

    swiperElRef.current.addEventListener("swiperslidechange", (e) => {
      console.log("slide changed");
    });
  }, []);

  return (
    <div id="swipercontainer" className={styles.CardAlpha}>
      <swiper-container
        ref={swiperElRef}
        slides-per-view="1"
        navigation="true"
        pagination="true"
      >
        <swiper-slide>
          <Image
            src="/pixelholder.jpg"
            alt="Link Icon"
            width={100}
            height={100}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto"
            }} />
        </swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
      </swiper-container>
    </div>
  );
}
