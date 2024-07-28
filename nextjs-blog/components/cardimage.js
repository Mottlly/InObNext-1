import { useRef, useEffect, useState } from "react";
import { register } from "swiper/element/bundle";
import Image from "next/legacy/image";

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
      const previousIndex = swiperInstance.previousIndex; // Index of the previous slide
      const activeIndex = swiperInstance.activeIndex; // Index of the currently active slide

      if (eventData) {
        const currentEventData = eventData[currentEvent];

        if (currentEventData) {
          // Determine the direction of the swipe
          let nextEventIndex;

          if (activeIndex > previousIndex) {
            // Swiped to the next event (right)
            nextEventIndex = currentEventData.nextswipe.right; // Get the event number for the right swipe
          } else if (activeIndex < previousIndex) {
            // Swiped to the previous event (left)
            nextEventIndex = currentEventData.nextswipe.left; // Get the event number for the left swipe
          }

          // Check if nextEventIndex is defined and valid
          if (nextEventIndex !== undefined) {
            // Update current event
            setCurrentEvent(nextEventIndex);

            // Update health based on the current event data
            const nextEventData = eventData[nextEventIndex];
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
  }, [eventData, currentEvent]); // Depend on eventData and currentEvent to re-run when they change

  // Ensure the image source is valid; fallback to a default image if eventData is not available
  const imageSrc =
    eventData && eventData[currentEvent]
      ? eventData[currentEvent].image
      : "/fallback-image.jpg";

  return (
    <div id="swipercontainer">
      <swiper-container ref={swiperElRef} slides-per-view="1">
        {eventData &&
          eventData.map((event) => (
            <swiper-slide key={event.event_number}>
              <Image
                src={event.image}
                alt={`Image for event ${event.event_number}`}
                layout="responsive"
                width={100}
                height={100}
              />
            </swiper-slide>
          ))}
      </swiper-container>
    </div>
  );
}
