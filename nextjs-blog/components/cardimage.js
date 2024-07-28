import { useRef, useEffect, useState } from "react";
import { register } from "swiper/element/bundle";
import Image from "next/legacy/image";

register();

export default function CardImage({
  currentEventData,
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
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    console.log("current event data banana:", currentEventData);
    const swiperInstance = swiperElRef.current.swiper;
    setSwiper(swiperInstance);

    const onSlideChange = () => {
      const previousIndex = swiperInstance.previousIndex; // Index of the previous slide
      const activeIndex = swiperInstance.activeIndex; // Index of the currently active slide

      if (eventData) {
        if (currentEventData) {
          // Determine the direction of the swipe
          let nextEvent;

          if (activeIndex > previousIndex) {
            console.log("active index:", activeIndex);
            console.log("prev index:", previousIndex);
            // Swiped to the next event (right)
            nextEvent = currentEventData.nextswipe.right; // Get the event number for the right swipe
          } else if (activeIndex < previousIndex) {
            // Swiped to the previous event (left)
            nextEvent = currentEventData.nextswipe.left; // Get the event number for the left swipe
          }

          // Check if nextEventIndex is defined and valid
          if (nextEvent !== undefined) {
            // Update current event
            setCurrentEvent(nextEvent);

            // Update health based on the current event data
            const nextEventData = eventData[nextEvent];
            if (nextEventData) {
              setHealthOne(
                (prevHealthOne) => prevHealthOne + nextEventData.healthbars.hb1
              );
              setHealthTwo(
                (prevHealthTwo) => prevHealthTwo + nextEventData.healthbars.hb2
              );
              setHealthThree(
                (prevHealthThree) =>
                  prevHealthThree + nextEventData.healthbars.hb3
              );
              setHealthFour(
                (prevHealthFour) =>
                  prevHealthFour + nextEventData.healthbars.hb4
              );
            }
          }
        }
      }
    };

    swiperInstance.on("slideChange", onSlideChange);

    // Cleanup the event listener on component unmount
    return () => {
      swiperInstance.off("slideChange", onSlideChange);
    };
  }, [currentEvent]); //currentEvent to re-run when they change

  return (
    <div id="swipercontainer">
      <swiper-container ref={swiperElRef} slides-per-view="1">
        {eventData &&
          eventData.map((event) => {
            console.log("event image:", event.image);
            return (
              <swiper-slide key={event.event_number}>
                <Image
                  src={event.image}
                  alt={`Image for event ${event.event_number}`}
                  layout="responsive"
                  width={100}
                  height={100}
                />
              </swiper-slide>
            );
          })}
      </swiper-container>
    </div>
  );
}
