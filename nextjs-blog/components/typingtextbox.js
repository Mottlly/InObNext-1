import React, { useState, useEffect } from "react";
import styles from "../styles/typingtext.module.scss";

const TypingText = ({ text, speed = 65 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return <span className={styles.textbox}>{displayedText}</span>;
};

export default TypingText;
