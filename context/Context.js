import React, { useState, useEffect } from 'react'
import {ethers} from 'ethers'
import Web3Modal from 'web3modal'
import { CONTRACTADDRESS, ELECTIONABI } from './config'




const contractDetails = (provider) => new ethers.Contract(CONTRACTADDRESS, ELECTIONABI, provider);

export const ElectionContext = React.createContext();
export const ContextProvider = ({ children }) => {

  const [walletAddr, setWalletAddr] = useState("")
  useEffect(() => {
    connectedWallet();
    WalletTracker();
  }, [])
  
  // connect wallet
  const connectWallet = async () => {
      if(typeof window != "undefined" && typeof window.ethereum != "undefined") {
        try {
          const accounts = await window.ethereum.request({method: "eth_requestAccounts", });
          console.log(accounts[0])
          setWalletAddr(accounts[0])
        } catch (error) {
          console.log(error.message)
        }
      } else {
        // metamask is not installed.
        console.log("Please install metamask.")
      }
  };

  const connectedWallet = async () => {
    if(typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({method: "eth_accounts",});
        if (accounts.length > 0) {
          console.log(accounts[0])
          setWalletAddr(accounts[0])
        } else( console.log("Use Connect button to connect your Metamask."))
      } catch (error) {
        console.log(error.message)
      }
    } else {
      // metamask is not installed.
      console.log("Please install metamask.")
    }
};

const WalletTracker = async () => {
  if(typeof window != "undefined" && typeof window.ethereum != "undefined") {
    window.ethereum.on("accountsChanged", (accounts) => {
      setWalletAddr(accounts[0])
      console.log(accounts[0])
    })
  } else {
    // metamask is not installed.
    setWalletAddr("")
    console.log("Please install metamask.")
  }
};
    
  return (
    <ElectionContext.Provider value = {{ connectWallet, connectedWallet, walletAddr, contractDetails  }}>
        { children }
    </ElectionContext.Provider>
  );
};

