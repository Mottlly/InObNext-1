import React from "react";
import Head from "next/head";
import Textbox from "../components/textbox";
import styles from "../styles/decisioncard.module.scss";
import CardImage from "../components/cardimage";
import TypingTextBox from "../components/typingtextbox";
import dbMocks from "../__mocks__/dbMocks.json";

export default function DecisionCard() {
  console.log(dbMocks);
  const text = dbMocks[0].text;
  return (
    <>
      <Head>
        <title>Decision Card Container</title>
      </Head>
      <div id="decisioncardcontainer" className={styles.CardAlpha}>
        <TypingTextBox text={text} />
        <CardImage imageUrl="/pixelholder.jpg" />
      </div>
    </>
  );
}
