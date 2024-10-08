import React from "react";
import Head from "next/head";
import OpeningCrawl from "./Opener";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

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
          width: 30vw;
          height: 10vh;
        }
        #intro {
          width: 50%;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
