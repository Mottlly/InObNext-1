import React from "react";
import SpeedDial from "./speedDial";
import FormDialog from "./loginPop";
import CreateAccount from "./createUser";
import styles from "../styles/topBar.module.scss";

export default function TopBar() {
  return (
    <div className={styles.topbarparent}>
      <SpeedDial />
      <FormDialog />
      <CreateAccount />
    </div>
  );
}
