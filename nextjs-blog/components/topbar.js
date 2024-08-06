import React from "react";
import SpeedDial from "../components/speeddial";
import FormDialog from "../components/loginpop";
import CreateAccount from "../components/createuser";
import styles from "../styles/topbar.module.scss";

export default function TopBar() {
  return (
    <div className={styles.topbarparent}>
      <SpeedDial />
      <FormDialog />
      <CreateAccount />
    </div>
  );
}
