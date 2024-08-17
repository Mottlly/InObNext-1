import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/mainGame.module.scss";
import TrackContainer from "../components/trackContainer";
import DecisionCard from "../components/decisionCard";
import SpeedDial from "../components/speedDial";

export default function Main() {
  const [currentEvent, setCurrentEvent] = useState(0);
  const [healthOne, setHealthOne] = useState(5);
  const [healthTwo, setHealthTwo] = useState(5);
  const [healthThree, setHealthThree] = useState(5);
  const [healthFour, setHealthFour] = useState(5);
  const [eventData, setEventData] = useState([]);

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
        />
      </div>

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

        #container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 30px;
        }

        .imagebutt {
          background-color: #242424;
          border: none;
        }

        .imagebutt:hover {
          cursor: pointer;
        }

        .mainbuttons {
          display: flex;
          justify-content: flex-start;
          margin: 20px;
          width: 30vw;
          height: 5vh;
        }

        .textbox {
          display: flex;
          justify-content: space-around;
          margin: 20px;
          width: 90%;
          height: 5vh;
        }

        .healthBar {
          display: flex;
          align-items: center;
        }

        .healthSection {
          width: 20px;
          height: 20px;
          margin-right: 5px;
          border: 1px solid #000;
        }

        .active {
          background-color: white;
        }

        #intro {
          width: 50%;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
