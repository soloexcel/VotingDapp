import React, { useState } from 'react';
import { Button } from '../componentsIndex';
import Style from './CandidateTable.module.css'

const CandidateTable = ({ shortlistedNames }) => {
  return (
    <table className={Style.table}>
      <thead>
        <tr>
          <th>Shortlisted Names</th>
          <th>Vote</th>
        </tr>
      </thead>
      <tbody>
        {shortlistedNames.map((name, index) => (
          <tr key={index}>
            <td className={Style.tableData}>{name}</td>
            <td className={Style.tableData}><Button btnName='Vote' handleClick={() => { /* handle vote */ }}/></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CandidateTable;