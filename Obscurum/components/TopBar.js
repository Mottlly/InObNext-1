import React from "react";
import SpeedDial from "./SpeedDial";
import FormDialog from "./LoginPop";
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
