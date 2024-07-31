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
  const [activeIndex, setActiveIndex] = useState(0); // Track the current slide index

  useEffect(() => {
    const swiperInstance = swiperElRef.current.swiper;
    setSwiper(swiperInstance);

    const onSlideChange = () => {
      const previousIndex = swiperInstance.previousIndex; // Index of the previous slide
      const currentIndex = swiperInstance.activeIndex; // Index of the currently active slide
      setActiveIndex(currentIndex); // Update active index

      if (eventData && currentEventData) {
        let nextEvent;

        // Determine the new event based on swipe direction
        if (currentIndex > previousIndex) {
          nextEvent = currentEventData.nextswipe.right; // Get the event number for the right swipe
        } else if (currentIndex < previousIndex) {
          nextEvent = currentEventData.nextswipe.left; // Get the event number for the left swipe
        }

        // Ensure nextEvent is valid and within bounds
        if (
          nextEvent !== undefined &&
          nextEvent >= 0 &&
          nextEvent < eventData.length
        ) {
          // Update current event only if it's different
          //it is THIS. IF THIS IS REMOVED DOUBLE RENDER DOESNT HAPPEN
          //YEAH ITS THIS FORE SURE
          if (nextEvent !== currentEvent) {
            console.log("current event:", currentEvent);
            console.log("next event:", nextEvent);
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
    // okay, if the below doesn't happen, then nothing happens when slide BUT also no re-render.
    swiperInstance.on("slideChange", onSlideChange);

    // Cleanup the event listener on component unmount
    return () => {
      swiperInstance.off("slideChange", onSlideChange);
    };
  }, [currentEvent, eventData]); // currentEvent and eventData to re-run when they change

  // Effect to handle when eventData updates
  useEffect(() => {
    if (swiper) {
      swiper.update(); // Update Swiper when eventData changes
      swiper.slideTo(activeIndex, 0); // Keep the current slide active
    }
  }, [eventData, swiper]);

  // Effect to set the initial slide to the middle one
  useEffect(() => {
    if (swiper && eventData.length > 0) {
      const middleIndex = Math.floor(eventData.length / 2);
      swiper.slideTo(middleIndex, 0); // Move to the middle slide
      setActiveIndex(middleIndex); // Set active index to the middle slide
    }
  }, [swiper, eventData]);

  return (
    <div id="swipercontainer">
      <swiper-container ref={swiperElRef} slides-per-view="1">
        {eventData &&
          eventData.map((event) => {
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
