import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/decisioncard.module.scss";
import CardImage from "../components/cardimage";
import TypingTextBox from "../components/typingtextbox";
import dbMocks from "../__mocks__/dbMocks.json";

export default function DecisionCard({
  currentEvent,
  setCurrentEvent,
  setHealthOne,
  setHealthTwo,
  setHealthThree,
  setHealthFour,
}) {
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEventData() {
      if (!currentEvent) {
        console.warn("No currentEvent provided");
        return;
      }

      try {
        const response = await fetch(`/api/fetch?currentEvent=${currentEvent}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEventData(data);
      } catch (error) {
        console.error("Failed to fetch event data:", error);
        setError("Failed to load event data");
      }
    }

    fetchEventData();
  }, [currentEvent]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!eventData) {
    return <div>No event data available</div>;
  }

  return (
    <>
      <Head>
        <title>Decision Card Container</title>
      </Head>
      <div id="decisioncardcontainer" className={styles.CardAlpha}>
        <TypingTextBox text={dbMocks[currentEvent].text} />
        <CardImage
          currentEvent={currentEvent}
          setCurrentEvent={setCurrentEvent}
          setHealthOne={setHealthOne}
          setHealthTwo={setHealthTwo}
          setHealthThree={setHealthThree}
          setHealthFour={setHealthFour}
        />
      </div>
    </>
  );
}
