import React from "react";
import Head from "next/head";
import styles from "../styles/decisioncard.module.scss";
import CardImage from "../components/cardimage";
import TypingTextBox from "../components/typingtextbox";
import dbMocks from "../__mocks__/dbMocks.json";

export default function DecisionCard({
  currentevent,
  setCurrentevent,
  setHealthone,
  setHealthtwo,
  setHealththree,
  setHealthfour,
}) {
  console.log(dbMocks);
  console.log(currentevent);
  return (
    <>
      <Head>
        <title>Decision Card Container</title>
      </Head>
      <div id="decisioncardcontainer" className={styles.CardAlpha}>
        <TypingTextBox text={dbMocks[currentevent].text} />
        <CardImage
          currentevent={currentevent}
          setCurrentevent={setCurrentevent}
          setHealthone={setHealthone}
          setHealthtwo={setHealthtwo}
          setHealththree={setHealththree}
          setHealthfour={setHealthfour}
        />
      </div>
    </>
  );
}
