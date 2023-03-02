import React, { useContext, useState } from 'react'
import { Button } from '../components/componentsIndex'
import Style from '../styles/registerVoters.module.css'
import { ElectionContext } from '../context/Context'
const registerVoters = () => {

    

    const [voterAddr, setVoterAddr] = useState('')

    // const { registerVoter } = useContext(ElectionContext)

    // get the input 
    const onChangeHandler = (e) => {
        setVoterAddr(e.target.value)
    }

  return (
    <div className={Style.registerVoter}> 
        <div className={Style.registerfield}>
            <input className={Style.input} type="text" placeholder="Register Voter" onChange={onChangeHandler} value={voterAddr} />
            <Button btnName='Register' handleClick={() => {}}/>
        </div>

        <div className={Style.registeredVoter}>
            <h4>Registered Voters</h4>
            {"voter addresses."}
        </div>
    </div>
  )
}

export default registerVoters