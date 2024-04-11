import Head from "next/head";
import Link from "next/link";
import OpeningCrawl from "./opener";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
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
        #intro {
          width: 50%;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
