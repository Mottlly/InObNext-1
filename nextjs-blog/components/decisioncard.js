import React from "react";
import Head from "next/head";
import styles from "../styles/decisioncard.module.scss";
import CardImage from "../components/cardimage";
import TypingTextBox from "../components/typingtextbox";
import dbMocks from "../__mocks__/dbMocks.json";

export default function DecisionCard({
  healthone,
  setHealthone,
  healthtwo,
  setHealthtwo,
  healththree,
  setHealththree,
  healthfour,
  setHealthfour,
}) {
  console.log(dbMocks);
  return (
    <>
      <Head>
        <title>Decision Card Container</title>
      </Head>
      <div id="decisioncardcontainer" className={styles.CardAlpha}>
        <TypingTextBox text={dbMocks[1].text} />
        <CardImage
          center={dbMocks[1].image}
          right={dbMocks[2].image}
          left={dbMocks[0].image}
          setHealthone={setHealthone}
          setHealthtwo={setHealthtwo}
          setHealththree={setHealththree}
          setHealthfour={setHealthfour}
        />
      </div>
    </>
  );
}
