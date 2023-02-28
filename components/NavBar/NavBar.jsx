import React, { useState, useEffect, useContext } from 'react'
import { Button } from '../componentsIndex'
import Style from './NavBar.module.css'
import { ElectionContext } from '../../context/Context'

const NavBar = () => {
const { connectWallet, walletAddr } = useContext(ElectionContext)
const [buttonConnected, setButtonConnected] = useState(false)
const [status, setStatus] = useState('Connect')    
// handle click to manage 
// const handleClick = () => {
//     // if the metamask is connected, update the button to 'connected' 
//     // else 'connect'
// }

  return (
    <div className={Style.navbar}>
        <p className={Style.logo}>
            PROWESS
        </p>

        <Button btnName={walletAddr && walletAddr.length > 0 ? `Connected: ${walletAddr.substring(0, 5)}...${walletAddr.substring(40)}` : "Connect"} handleClick={connectWallet} />
        {/* <p>
          Address: {walletAddr}
        </p> */}
    </div>
  )
}

export default NavBar