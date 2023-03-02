import React, { useState } from 'react';
import { Button } from '../components/componentsIndex';
import Style from '../styles/result.module.css'

const Result = ({ shortlistedNames }) => {

    const numberVotes = ['ola', 'sola', 'bola', 'lola', 'tola']
  return (
    <div className={Style.result}>
      <table className={Style.table}>
      <thead>
        <tr>
          <th>contestants</th>
          <th>Number Of Votes</th>
        </tr>
      </thead>
      <tbody>
        {numberVotes.map((name, index) => (
          <tr key={index}>
            <td className={Style.tableData}>{name}</td>
            <td className={Style.tableData}>_</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Result