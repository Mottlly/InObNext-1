import React from "react";
import Head from "next/head";
import styles from "../styles/decisioncard.module.scss";
import CardImage from "../components/cardimage";
import TypingTextBox from "../components/typingtextbox";

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
