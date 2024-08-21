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
  const renderBlockRef = useRef(true); // Use useRef to track the block state

  useEffect(() => {
    console.log("Effect triggered: initializing swiper");
    const swiperInstance = swiperElRef.current.swiper;
    setSwiper(swiperInstance);

    const onSlideChange = () => {
      console.log("Slide change detected");

      if (renderBlockRef.current) {
        console.log("Blocked initial render");
        renderBlockRef.current = false; // Use ref to set the block state
        return; // Prevent action on initial render
      }

      const previousIndex = swiperInstance.previousIndex; // Index of the previous slide
      const currentIndex = swiperInstance.activeIndex; // Index of the currently active slide
      console.log("Previous index:", previousIndex);
      console.log("Current index:", currentIndex);

      // Determine the new event based on swipe direction
      console.log("Current Event Data:", currentEventData);
      let nextEvent = null;
      if (currentIndex > previousIndex) {
        nextEvent = currentEventData.nextswipe.right; // Get the event number for the right skeeet
      } else if (currentIndex < previousIndex) {
        nextEvent = currentEventData.nextswipe.left; // Get the event number for the left swipe
      }

      // Directly set the current event without validation
      console.log("Next event (before validation):", nextEvent);
      setCurrentEvent(nextEvent);

      // Update health based on the current event data
      let nextEventData;
      if (currentIndex > previousIndex) {
        nextEventData = eventData[2]; // Get the event number for the right swipe
      } else if (currentIndex < previousIndex) {
        nextEventData = eventData[0]; // Get the event number for the left swipe
      }
      console.log("Next event data:", nextEventData);

      if (nextEventData) {
        console.log("Updating health for event:", nextEventData.event_number);
        setHealthOne(
          (prevHealthOne) => prevHealthOne + nextEventData.healthbars.hb1
        );
        setHealthTwo(
          (prevHealthTwo) => prevHealthTwo + nextEventData.healthbars.hb2
        );
        setHealthThree(
          (prevHealthThree) => prevHealthThree + nextEventData.healthbars.hb3
        );
        setHealthFour(
          (prevHealthFour) => prevHealthFour + nextEventData.healthbars.hb4
        );
      }
    };

    renderBlockRef.current = true; // Use ref to set the block state
    swiperInstance.on("slideChange", onSlideChange);

    // Cleanup the event listener on component unmount
    return () => {
      console.log("Cleaning up slideChange event listener");
      swiperInstance.off("slideChange", onSlideChange);
    };
  }, [currentEvent, eventData]); // currentEvent and eventData to re-run when they change

  // Effect to handle when eventData updates
  useEffect(() => {
    console.log("Effect triggered: updating swiper");
    if (swiper) {
      swiper.update(); // Update Swiper when eventData changes
      swiper.slideTo(activeIndex, 0); // Keep the current slide active
    }
  }, [eventData, swiper]);

  // Effect to set the initial slide to the middle one
  useEffect(() => {
    console.log("Effect triggered: setting initial slide");
    if (swiper && eventData.length > 0) {
      const middleIndex = Math.floor(eventData.length / 2);
      console.log("Middle index:", middleIndex);
      swiper.slideTo(middleIndex, 0); // Move to the middle slide
      setActiveIndex(middleIndex); // Set active index to the middle slide
    }
  }, [swiper, eventData]);
  console.log("event data:", eventData);
  return (
    <div id="swipercontainer">
      <swiper-container ref={swiperElRef} slides-per-view="1">
        {eventData &&
          eventData.map((event) => {
            return (
              <swiper-slide>
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
