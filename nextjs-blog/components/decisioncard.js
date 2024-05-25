import React from "react";
import Head from "next/head";
import Textbox from "../components/textbox";
import styles from "../styles/decisioncard.module.scss";
import CardImage from "../components/cardimage";
import TypingTextBox from "../components/typingtextbox";

export default function DecisionCard() {
  return (
    <>
      <Head>
        <title>Decision Card Container</title>
      </Head>
      <div id="decisioncardcontainer" className={styles.CardAlpha}>
        <TypingTextBox text="I Am Here..... And I can type myself!" />
        <CardImage imageUrl="/pixelholder.jpg" />
      </div>
    </>
  );
}
