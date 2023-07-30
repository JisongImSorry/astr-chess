import { ChessBoard, ChessEvent } from "./chess/ChessBoard";
import { useState, useEffect } from "react";
import { MetaMaskSDK } from "@metamask/sdk";

function App() {
  const eventCallback = (event: ChessEvent) => {
    if (event === ChessEvent.CheckMate) {
      console.log("Checkmate!");
    } else if (event === ChessEvent.Check) {
      console.log("Check!");
    } else if (event === ChessEvent.StaleMate) {
      console.log("Stalemate!");
    }
  };

  const [eth, setEth] = useState<any>();
  useEffect(() => {
    const MMSDK = new MetaMaskSDK();

    const ethereum = window.ethereum;
    setEth(ethereum);
  }, []);

  const animals = [
    "https://i.seadn.io/gae/q0p-gokvEuV6UCQhcBenllSGqQxCkwMQOB8GxiDbeHFr1OOf9eYe0zqbQrpmk_28KCzdx5oDgeyB6aYyRgYOGno768PLjbQr-JM9ig?auto=format&dpr=1&w=1000",
    "https://i.seadn.io/gae/tcLy2faf3GUgY-qC6xAQZJNfkKqquGXiT4w2RdSZ0Y8-_TCD8ImMpUZa9oVuQdORWxgvqZzGKawDI8EAOSePPZ4EipzIbBqMaRrEDHE?auto=format&dpr=1&w=1000",
    "https://i.seadn.io/gae/2YsmfO5yp0cEqWBBcEZA40YAkFht1bDwNPKW57f7iXTiPCBwNWaNz_pkGLxl5GrSam5QuXMoX6lFyexEBdNwf3v9rtv8_B3_Zfg1jA?auto=format&dpr=1&w=1000",
    "https://i.seadn.io/gae/midzdQnSEWhvhdY-dcKOAOZPyTBPks5ZW5gh9Y3nDxIuaBQ5XtJyywljkvyY9AaMdlevjOxZJXvrZPPu3Z11unvUeAB36rS-XZeR?auto=format&dpr=1&w=1000",
    "https://i.seadn.io/gae/zWNbIKwoHQ1_WiI3VAT40wWk0kC6h0wrC2Yg0n_LZSCg3ZyiyFJGH4mGQS5wu4IYe4WIkYp2PVS3nABxRNBbxxzKytbquIhlL1z0?auto=format&dpr=1&w=1000",
    "https://i.seadn.io/gae/52vFjbwM4f_yct2KA1Vjsy55Xz6b8YuXzxCoD3XdNOYpkCv4Spd_OBW6bemsyPA-Yvrk_UQmOwaklt0l5LKJcSe6CGR3Lv3W5PiR94o?auto=format&dpr=1&w=1000",
    "https://i.seadn.io/gae/1Womfh1dGrqgfMH1HcXDR0GlXkdGFmIlhteDyili7C68ynYEyJIOMdlURoCTxz7AnWjW_a4a3LLL8ZRFz75fcy_Y_Y-bZFQFOioXbQ?auto=format&dpr=1&w=1000",
    "https://i.seadn.io/gae/eJnRvthusTZnRD1OVd4kvQfc47CuMucNs3k7j0EBL7j5nzOdfrwudANsyKrHsPm1BQ8vHjSf6qXHG1_FszbJqJXUiZTPGGrv89Ld?auto=format&dpr=1&w=1000",
    "https://i.seadn.io/gae/eYj8NWKj6m_Qt7-SM2CdatJeaXhk4p_6333j6RIFdBWWEgQRw6A2ntL9eSAtqcOmD2ZcbvLwxSOUmEvikwBUra9QUnyC2qdxOqitMw?auto=format&dpr=1&w=1000",
    "https://i.seadn.io/gae/IlVYu5aoudIKCEY-RyWebiGir2_5DjYYrsc2KUnP9BGtpiW7-q9fQYv-39UU9aq7uBUTRlZlpRfbq3Ws5iCDKIAugUiZNqRpXPVZ5A?auto=format&dpr=1&w=1000",
  ];

  const [animalLeft, setAnimalLeft] = useState(animals[0]);
  const [animalRight, setAnimalRight] = useState(animals[1]);

  return (
    <div className="w-full h-screen flex justify-center items-center flex flex-col">
      <div className="absolute w-full h-[5rem] bg-blue-300 top-0 flex items-center px-10">
        <button
          className="ml-auto flex flex-row gap-5 p-2 rounded-[1000px] bg-white border-2 border-black"
          onClick={() => {
            eth.request({ method: "eth_requestAccounts", params: [] });
          }}
        >
          <img
            src="https://s2.coinmarketcap.com/static/img/coins/64x64/12885.png"
            className="w-6 h-6"
          />
          <p className="font-bold">Connect Wallet</p>
        </button>
      </div>
      <div className="flex flex-row gap-5">
        <div>
          <img src={animalLeft} />
          <button
            onClick={() => {
              setAnimalLeft(
                animals[Math.floor(Math.random() * animals.length)]
              );
            }}
            className=" p-1 mt-3 bg-blue-400 rounded-xl w-full"
          >
            <RefeshButton />
          </button>
        </div>
        <div>
          <ChessBoard event={eventCallback} />
        </div>
        <div>
          <img src={animalRight} />
          <button
            onClick={() => {
              setAnimalRight(
                animals[Math.floor(Math.random() * animals.length)]
              );
            }}
            className=" p-1 mt-3 bg-blue-400 rounded-xl w-full"
          >
            <RefeshButton />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

const RefeshButton = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="white"
      className="w-6 h-6 mx-auto"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );
};
