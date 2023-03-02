import React, { useContext, useState } from 'react'
import Style from '../styles/castVote.module.css'
import { Button, CalculateVoteTime, CandidateTable } from '../components/componentsIndex'
import { ElectionContext } from '../context/Context'


const CastVote = () => {

  const { castVote } = useContext(ElectionContext)

    const start = new Date('2023-03-02T10:00:00');
    const end = new Date('2023-03-02T12:30:04');

    const startISOString = start.toISOString();
    const endISOString = end.toISOString();
    const [reviewItem, setReviewItem] = useState(['ola', 'sola', 'bola'])
  return (
    <div className={Style.castVote}>
        <CalculateVoteTime startTime={startISOString} endTime={endISOString}/>
        <CandidateTable shortlistedNames={reviewItem} />
    </div>
  )
}

export default CastVote

// calculateVoteTime('2023-03-02T10:00:00', '2023-03-02T12:30:00');
// const start = new Date('2023-03-02T10:00:00');
// const end = new Date('2023-03-02T12:30:00');

// const startISOString = start.toISOString();
// const endISOString = end.toISOString();