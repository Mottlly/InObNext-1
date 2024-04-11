import React from "react";
import Head from "next/head";
import Link from "next/link";
import OpeningCrawl from "./opener";
import MainMenuButtons from "../components/mainbuttonmenu";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <MainMenuButtons />
      <OpeningCrawl />

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          color-scheme: light dark;
          color: rgba(255, 255, 255, 0.87);
          background-color: #242424;
        }
        * {
          box-sizing: border-box;
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
        }
        #intro {
          width: 50%;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
