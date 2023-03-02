import React, { useState } from 'react'
import Style from '../styles/castVote.module.css'
import { Button, CandidateTable } from '../components/componentsIndex'


const CastVote = () => {
    const [reviewItem, setReviewItem] = useState(['ola', 'sola', 'bola'])
  return (
    <div className={Style.castVote}>
        <CandidateTable shortlistedNames={reviewItem} />
    </div>
  )
}

export default CastVote