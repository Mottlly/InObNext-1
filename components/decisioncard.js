import React from "react";
import Head from "next/head";
import Textbox from "../components/textbox";
import styles from "../styles/decisioncard.module.scss";

export default function DecisionCard() {
  return (
    <>
      <Head>
        <title>Decision Card Container</title>
      </Head>
      <div id="decisioncardcontainer" className={styles.CardAlpha}>
        <Textbox text="I Am Here!" />
      </div>
    </>
  );
}
