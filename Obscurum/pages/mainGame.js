import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/mainGame.module.scss";
import TrackContainer from "../components/TrackContainer";
import DecisionCard from "../components/decisioncard";
import SpeedDial from "../components/SpeedDial";

export default function Main() {
  const [currentEvent, setCurrentEvent] = useState(0);
  const [healthOne, setHealthOne] = useState(5);
  const [healthTwo, setHealthTwo] = useState(5);
  const [healthThree, setHealthThree] = useState(5);
  const [healthFour, setHealthFour] = useState(5);
  const [eventData, setEventData] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Token is invalid");
    } else {
      console.log("Token is valid");
    }
  }, []);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(
          `/api/events?currentevent=${currentEvent}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("maingame received data", data);
        setEventData(data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [currentEvent]);

  useEffect(() => {
    if (gameOver) {
      console.log("Game Over! Displaying modal.");
    }
  }, [gameOver]);

  const handleCloseModal = () => {
    setGameOver(false);
    router.push("/Menu");
  };

  return (
    <div className={styles["page-container"]}>
      <Head>
        <title>Main Game Screen</title>
      </Head>

      <div className={styles["content"]}>
        <SpeedDial />
        <DecisionCard
          currentEvent={currentEvent}
          setCurrentEvent={setCurrentEvent}
          setHealthOne={setHealthOne}
          setHealthTwo={setHealthTwo}
          setHealthThree={setHealthThree}
          setHealthFour={setHealthFour}
          eventData={eventData}
        />
        <TrackContainer
          healthOne={healthOne}
          healthTwo={healthTwo}
          healthThree={healthThree}
          healthFour={healthFour}
          setGameOver={setGameOver}
        />
      </div>

      {gameOver && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Game Over! Try Again.</h2>
            <button onClick={handleCloseModal}>Go to Main Menu</button>
          </div>
        </div>
      )}

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI,
            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
          color-scheme: light dark;
          color: rgba(255, 255, 255, 0.87);
          background-color: #242424;
          height: 100%; /* Ensure body takes full height */
          width: 100%; /* Ensure body takes full width */
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
        }

        img {
          max-width: 100%;
          height: auto;
        }

        .page-container {
          background-image: url("../public/galBack.jpg"); /* Replace with your image URL */
          background-size: cover; /* Cover the entire screen */
          background-position: center; /* Center the background image */
          background-repeat: no-repeat; /* Prevent repeating */
          display: flex;
          flex-direction: column;
          align-items: center; /* Center horizontally */
          justify-content: flex-start; /* Align items at the start of the container */
          height: 100%; /* Full height of the parent */
          width: 100%; /* Full width of the parent */
        }

        button {
          background: #0070f3;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}
