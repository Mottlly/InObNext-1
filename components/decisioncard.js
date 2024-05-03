import React from "react";
import Head from "next/head";
import Textbox from "../components/textbox";
import styles from "../styles/decisioncard.module.scss";
import CardImage from "../components/cardimage";

export default function DecisionCard() {
  return (
    <>
      <Head>
        <title>Decision Card Container</title>
      </Head>
      <div id="decisioncardcontainer" className={styles.CardAlpha}>
        <Textbox text="I Am Here!" />
        <CardImage imageUrl="/play.png" />
      </div>
    </>
  );
}
