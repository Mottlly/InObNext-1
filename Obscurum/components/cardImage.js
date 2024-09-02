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
  const [progress, setProgress] = useState(0); // Track swiper progress
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to control dropdown visibility
  const [dropdownOpacity, setDropdownOpacity] = useState(0);
  const [dropdownContent, setDropdownContent] = useState("dropdown content"); // State to control dropdown opacity

  useEffect(() => {
    console.log("Effect triggered: initializing swiper");
    const swiperInstance = swiperElRef.current.swiper;
    setSwiper(swiperInstance);

    const onSlideChange = () => {
      console.log("Slide change detected");

      const previousIndex = swiperInstance.previousIndex; // Index of the previous slide
      const currentIndex = swiperInstance.activeIndex; // Index of the currently active slide
      console.log("Previous index:", previousIndex);
      console.log("Current index:", currentIndex);

      // Determine the new event based on swipe direction
      console.log("Current Event Data:", currentEventData);
      let nextEvent = null;
      if (currentIndex > previousIndex) {
        nextEvent = currentEventData.nextswipe.right; // Get the event number for the right swipe
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

    const onProgress = () => {
      const newProgress = swiperInstance.progress;
      setProgress(newProgress); // Update progress state
      if (newProgress > 0.34) {
        setDropdownContent("steven");
      } else {
        setDropdownContent("allen");
      }

      // Set opacity based on progress
      if (newProgress < 0.3 || newProgress > 0.37) {
        setDropdownOpacity(1);
      } else {
        setDropdownOpacity(0);
      }

      // Toggle dropdown visibility based on progress
      if (newProgress > 0.34 || newProgress < 0.32) {
        setDropdownVisible(true);
      } else {
        setDropdownVisible(false);
      }
    };

    swiperInstance.on("slideChange", onSlideChange);
    swiperInstance.on("progress", onProgress);

    // Cleanup the event listener on component unmount
    return () => {
      console.log("Cleaning up slideChange and progress event listeners");
      swiperInstance.off("slideChange", onSlideChange);
      swiperInstance.off("progress", onProgress);
    };
  }, [currentEvent, eventData]); // currentEvent and eventData to re-run when they change

  useEffect(() => {
    console.log("Effect triggered: updating swiper");
    if (swiper) {
      swiper.update(); // Update Swiper when eventData changes
      swiper.slideTo(activeIndex, 0); // Keep the current slide active
    }
  }, [eventData, swiper]);

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
    <div id="swipercontainer" style={{ position: "relative", height: "100vh" }}>
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
      {/* Render the dropdown message based on visibility state */}
      {dropdownVisible && (
        <div
          style={{
            position: "absolute",
            top: "2%", // Drop into view from the top
            left: "50%",
            width: "200px",
            height: "50px",
            backgroundColor: "#333", // Slightly darker grey for better contrast
            color: "#fff", // White text color
            textAlign: "center",
            lineHeight: "50px",
            transform: "translateX(-50%)",
            borderRadius: "8px", // Rounded corners
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow effect
            transition:
              "top 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease-in-out", // Added transition for smooth transform
            zIndex: 10,
            opacity: dropdownOpacity, // Apply calculated opacity
          }}
        >
          {dropdownContent}
        </div>
      )}
    </div>
  );
}
