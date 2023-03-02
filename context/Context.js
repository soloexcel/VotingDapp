import React, { useState, useEffect } from 'react'
import {ethers} from 'ethers'
import Web3Modal from 'web3modal'
import { contractAddress, electionABI } from './config'





// const contractDetails = (signer) => new ethers.Contract(contractAddress, electionABI, signer);

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    contractAddress,
    electionABI,
    signerOrProvider
  );

const contractConnection = async ()=>{
  const web3Modal = new Web3Modal()
  const connectivity = await web3Modal.connect();
  const node = new ethers.providers.Web3Provider(connectivity)
  const signer = node.getSigner();
  const  contract = fetchContract(signer);
  return contract;
}

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

// contestants, and voting start date and end date timestamps
const candidates = async ({candidateNames, votingStartTime, votingEndTime, minVotes}) => {
  
// Create a new date instance with the desired date and time
// Convert the timestamp to a Date object
// NOTE: vst means votingStartTime
// NOTE: vet means votingEndTime

const vst = new Date(votingStartTime);
const vet = new Date(votingEndTime);

// Get the Unix timestamp in seconds
const startTimeStamp = Math.floor(vst.getTime() / 1000);
const endTimeStamp = Math.floor(vet.getTime() / 1000);

console.log(startTimeStamp); // sample in Unix : 1687988580
console.log(endTimeStamp);
  try{
  const contract = await contractConnection();
  await contract.contestants(candidateNames, startTimeStamp,endTimeStamp, minVotes);
  }catch(error){
    console.log(error);
    alert(`${error} : transaction unsuccessful`);
  }

}


//Register a voter
const registerVoter = async() => {

  try{if (walletAddr)
  {
    const contract = await contractConnection();
    await contract.registerVoter();
    alert(`${walletAddr} has been registered to vote you're ready to cast your vote once voting begins`)
    console.log(`${walletAddr} has been registered to vote you're ready to cast your vote once voting begins`)
  }
    else{
      alert("please connect wallet");
    }} catch(error){
      console.log(error)
      alert("registration unsuccessful", error.message);
    }
}


// cast vote 
const castVote = async (candidateIndex)=>{
  try{
    if (walletAddr){
        const contract = await contractConnection();
        await contract.castVote(candidateIndex);
    }else{
      alert(`please connect wallet`);
      console.log("please connect wallet")
    }
  }catch(error){

    console.log(error);
    alert(`${error} : transaction unsuccessful `);
    console.log(`${error} : transaction unsuccessful`)
  }
}


// const registerVoter = async() => {

//   // Connect to the provider
//   const provider = new ethers.providers.Web3Provider(window.ethereum);

//   // Get the signer
//   const signer = provider.getSigner();

//   const contract = contractDetails(signer)

//   // const contractAddress = "<CONTRACT_ADDRESS>"; // Replace with your contract address
//   // const abi = [/* Replace with your contract ABI */];

//   // const contract = new ethers.Contract(contractAddress, abi, signer);

//   try {
//     const tx = await contract.registerVoter();
//     await tx.wait();

//     alert("Voter registration successful!");
//   } catch (error) {
//     alert("Voter registration failed. " + error.message);
//   }
// }

    
  return (
    <ElectionContext.Provider value = {{ connectWallet, connectedWallet, walletAddr, fetchContract, registerVoter, castVote, candidates  }}>
        { children }
    </ElectionContext.Provider>
  );
};

