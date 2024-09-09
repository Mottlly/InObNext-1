import React from "react";
import Head from "next/head";
import styles from "../styles/decisionCard.module.scss";
import CardImage from "./CardImage.js";
import TypingTextBox from "./TypingTextBox.js";

export default function DecisionCard({
  currentEvent,
  eventData,
  setCurrentEvent,
  setHealthOne,
  setHealthTwo,
  setHealthThree,
  setHealthFour,
}) {
  // Extract the current event data from the eventData array
  const currentEventData = eventData
    ? eventData.find((event) => event.event_number === currentEvent)
    : null;
  console.log("Decision Card Current", currentEventData);

  return (
    <>
      <Head>
        <title>Decision Card Container</title>
      </Head>
      <div id="decisioncardcontainer" className={styles.CardAlpha}>
        {currentEventData ? (
          <>
            <TypingTextBox text={currentEventData.text} />
            <CardImage
              currentEventData={currentEventData}
              currentEvent={currentEvent}
              eventData={eventData}
              setCurrentEvent={setCurrentEvent}
              setHealthOne={setHealthOne}
              setHealthTwo={setHealthTwo}
              setHealthThree={setHealthThree}
              setHealthFour={setHealthFour}
            />
          </>
        ) : (
          <div>Loading event data...</div>
        )}
      </div>
    </>
  );
}
