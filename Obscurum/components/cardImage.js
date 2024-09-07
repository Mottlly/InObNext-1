import { useRef, useEffect, useState } from "react";
import { register } from "swiper/element/bundle";
import styles from "../styles/choiceTextBox.module.scss";
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
  const [renderSwitch, setRenderSwitch] = useState(false);

  useEffect(() => {
    console.log("Effect triggered: initializing swiper");

    const swiperInstance = swiperElRef.current.swiper;
    setSwiper(swiperInstance);
    console.log(eventData);

    const onSlideChange = () => {
      console.log("Slide change detected");
      console.log("Should I render?", renderSwitch);
      if (renderSwitch) {
        const previousIndex = swiperInstance.previousIndex; // Index of the previous slide
        const currentIndex = swiperInstance.activeIndex; // Index of the currently active slide
        console.log("Previous index:", previousIndex);
        console.log("Current index:", currentIndex);

        // Determine the new event based on swipe direction
        console.log("Current Event Data:", currentEventData);
        let nextEvent = null;
        if (currentIndex > previousIndex) {
          nextEvent = currentEventData.nextswipe.right; // Get the event number for the right swipe
          console.log("Next event for right swipe:", nextEvent);
        } else if (currentIndex < previousIndex) {
          nextEvent = currentEventData.nextswipe.left; // Get the event number for the left swipe
          console.log("Next event for left swipe:", nextEvent);
        }

        // Directly set the current event without validation
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
          setHealthOne((prevHealthOne) => {
            const newHealth = prevHealthOne + nextEventData.healthbars.hb1;
            console.log("Updated health one:", newHealth);
            return newHealth;
          });
          setHealthTwo((prevHealthTwo) => {
            const newHealth = prevHealthTwo + nextEventData.healthbars.hb2;
            console.log("Updated health two:", newHealth);
            return newHealth;
          });
          setHealthThree((prevHealthThree) => {
            const newHealth = prevHealthThree + nextEventData.healthbars.hb3;
            console.log("Updated health three:", newHealth);
            return newHealth;
          });
          setHealthFour((prevHealthFour) => {
            const newHealth = prevHealthFour + nextEventData.healthbars.hb4;
            console.log("Updated health four:", newHealth);
            return newHealth;
          });
        }
        setRenderSwitch(false);
      } else {
        setRenderSwitch(true);
        console.log("renderSwitch set to:", renderSwitch);
      }
    };

    const onProgress = () => {
      const newProgress = swiperInstance.progress;
      console.log(renderSwitch);
      setProgress(newProgress); // Update progress state
      console.log("progress:", newProgress);

      if (newProgress > 0.5) {
        setDropdownContent(currentEventData.choicetext.rightChoice);
      } else {
        setDropdownContent(currentEventData.choicetext.leftChoice);
      }

      // Set opacity based on progress
      if (newProgress < 0.47 || newProgress > 0.53) {
        setDropdownOpacity(1);
        console.log("Dropdown opacity set to 1");
      } else {
        setDropdownOpacity(0);
        console.log("Dropdown opacity set to 0");
      }

      // Toggle dropdown visibility based on progress
      if (newProgress > 0.51 || newProgress < 0.49) {
        setDropdownVisible(true);
        console.log("Dropdown visibility set to true");
      } else {
        setDropdownVisible(false);
        console.log("Dropdown visibility set to false");
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
  }, [currentEvent, eventData, renderSwitch]); // currentEvent and eventData to re-run when they change

  useEffect(() => {
    console.log("Effect triggered: updating swiper");
    if (swiper) {
      swiper.update(); // Update Swiper when eventData changes
      console.log("Swiper updated");
      swiper.slideTo(activeIndex, 0); // Keep the current slide active
      console.log("Swiper slideTo activeIndex:", activeIndex);
    }
  }, [eventData, swiper]);

  useEffect(() => {
    console.log("Effect triggered: setting initial slide");
    if (swiper && eventData.length > 0) {
      const middleIndex = Math.floor(eventData.length / 2);
      console.log("Middle index:", middleIndex);
      swiper.slideTo(middleIndex, 0); // Move to the middle slide
      console.log("Swiper slideTo middleIndex:", middleIndex);
      setActiveIndex(middleIndex); // Set active index to the middle slide
      console.log("Active index set to:", middleIndex);
    }
  }, [swiper]);

  useEffect(() => {
    console.log("renderSwitch changed:", renderSwitch);
  }, [renderSwitch]);

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
          className={styles.choiceTextBox}
          style={{ opacity: dropdownOpacity }} // Apply dynamic opacity here
        >
          {dropdownContent}
        </div>
      )}
    </div>
  );
}
