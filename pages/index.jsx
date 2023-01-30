import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

const Home = () => {

  const [wallet, setWallet] = useState("");
  const [collection, setCollection] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  const fetchNfts = async() => {
    let nfts; 
    console.log("Fetching nfts:");
    const api_key = "dQUbHnCVVa5K0Sg0kEqcOzqgbxmlcQhR"
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;
    var requestOptions = {
        method: 'GET'
      };
     
    if (!collection.length) {
      const fetchURL = `${baseURL}?owner=${wallet}`;
  
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {

      console.log("fetching nfts for collection owned by address:")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
  
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    }
  
    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  }

  const fetchNFTsForCollection = async() => {
    let nfts;
    var requestOptions = {
      method: 'GET'
    };
    if(collection.length) {
      const api_key = "dQUbHnCVVa5K0Sg0kEqcOzqgbxmlcQhR";
      const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
    }
    if(nfts) {
      console.log("NFTS in collection: ", nfts);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
    <div className="flex flex-col w-full justify-center items-center gap-y-2">
      <input onChange={(e) => { setWallet(e.target.value) }} value={wallet} type={"text"} placeholder="Add your wallet address" />
      <input onChange={(e) => { setCollection(e.target.value) }} value={collection} type={"text"} placeholder="Add the collection address" />
      <label className="text-gray-600 ">
        <input onChange={(e) => { setFetchForCollection(e.target.checked) }} type={"checkbox"} className="mr-2"/>Fetch for collection</label>
      <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
        () => {
          if (fetchForCollection) {
            fetchNFTsForCollection();
          } else fetchNfts();
        }
      }>Let's go! </button>
    </div>
  </div>
  )
}

export default Home
