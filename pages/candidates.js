import React, { useState } from 'react';
import Style from '../styles/candidate.module.css';
import { Button, CandidateTable } from '../components/componentsIndex';

const Candidate = () => {
  const [shortlistname, setShortlistname] = useState('');
  const [reviewItem, setReviewItem] = useState([]);
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [errorMsg, setErrorMsg] = useState("")
  const [displayMsg,setDisplayMsg] = useState(false);
  const [dnt, setDnt] = useState([])
  const [isCandidateListed, setIsCandidateListed] = useState(false)
  // const [submitButton, setSubmitButon] = useState(false)

  
  const onChangeHandler = (e) => {
    setShortlistname(e.target.value);
  };

  const shortlistHandler = () => {
    setReviewItem([...reviewItem, shortlistname]);
    setShortlistname('');
  };


  const startDatehandler = (e) => {
    setStartDate(e.target.value);
    setDnt()
    console.log(startDate)

  }

  const endDatehandler = (e) => {
    setEndDate(e.target.value);
    console.log(endDate)

  }


  const isValidstartDate = (startDate) => {
    const re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    return re.test(String(startDate).toLowerCase());

}

const isValidendDate = (endDate) => {
  const re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  return re.test(String(endDate).toLowerCase());
}


  // //
  const dateHandler = () => {
    if (startDate === "" || endDate === ""){
      setErrorMsg("You are required to provide a valid date.")
    }else if (!isValidstartDate(startDate) || !isValidendDate(endDate)) {
      setErrorMsg("Provide a valid date and time in this format: 3/1/2023");
    } else {setErrorMsg("Continue to the review section.");}
    // setStartDate("");
    // setEndDate("");
    setDisplayMsg(true);
  }

  // cancel button
  const cancel = () => {
    setShortlistname('')
    setReviewItem([])
    setStartDate('')
    setEndDate('')
    setErrorMsg('')
    setDisplayMsg(false)
  }

  // submit button
  const submit = () => {
    if (reviewItem === "" || startDate === "" || endDate === "") {
      alert("One of the required field is missing. Fill it out to continue.")
    }
    else {
      // call the async function from the context file to submit to the blockchain.
      // and display the candidates
      setIsCandidateListed(true)
    }
  }

  return (
    <div>
      {isCandidateListed ? <CandidateTable shortlistedNames={reviewItem} /> : (
        <div className={Style.main}>
          <div className={Style.shortList}>
          <h1>Shortlist candidates</h1>
          <p className={Style.note}>
            <span>NOTE</span> You may add as much contestants as needed one at a time before you submit.
          </p>
  
          <div>
            <div className={Style.details}>
              <input className={Style.input} type="text" placeholder="Short List a Candidate" onChange={onChangeHandler} value={shortlistname} />
              <Button btnName="ShortList" handleClick={shortlistHandler} />
            </div>
  
            <p className={Style.msg}> </p>
          </div>
  
          <div className={Style.time}>
            <input className={Style.startTime} type="text" placeholder="Vote Start Date and Time" value={startDate} onChange={startDatehandler} />
            <input className={Style.endTime} type="text" placeholder="Vote End Date and Time" value={endDate} onChange={endDatehandler} />
  
            <Button className={Style.button} btnName="Ok" handleClick={dateHandler} />  
          </div>
          <p className={Style.errorMsg}>
          {displayMsg && <p>{errorMsg}</p>}
          </p>
          </div>
  
          {/* <div className={Style.button}>
            
        </div> */}
  
        <div className={Style.review}>
          <h3>REVIEW</h3>
          <p className={Style.note}>
            <span>NOTE</span> Review before submission.
          </p>
  
          <div className={Style.reviewItemlist}>
            {reviewItem.map((el, i) => (
              <div key={i}>{el}</div>
            ))}
          </div>
  
          <div className={Style.dnt}>
            <p>
              Start-Date: {startDate}
            </p>
  
            <p>
              End-Date: {endDate}
            </p>
          </div>
  
          <div className={Style.reviewButtons}>
            <Button btnName='Cancel' handleClick={cancel}/>
            <Button btnName='Submit' handleClick={submit}/>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Candidate;
