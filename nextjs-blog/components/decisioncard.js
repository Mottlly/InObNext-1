import React from "react";
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
