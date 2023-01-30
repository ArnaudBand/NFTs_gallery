import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import NftCard from './components/NftCard';

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
    if(collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const api_key = "dQUbHnCVVa5K0Sg0kEqcOzqgbxmlcQhR";
      const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
    }
    if(nfts) {
      console.log("NFTS in collection: ", nfts);
      setNFTs(nfts.nfts);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input disabled={fetchForCollection} className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={(e) => { setWallet(e.target.value) }} value={wallet} type={"text"} placeholder="Add your wallet address" />
        <input className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={(e) => { setCollection(e.target.value) }} value={collection} type={"text"} placeholder="Add the collection address" />
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
      <div className='flex flex-row flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map((nft, index) => (
            <div key={index }>
              <NftCard nft={nft} />
            </div>

          ))
        }
      </div>
  </div>
  )
}

export default Home
