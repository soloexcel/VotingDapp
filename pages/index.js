import { ST } from 'next/dist/shared/lib/utils'
import React from 'react'
import { Button } from '../components/componentsIndex'
import Style from '../styles/index.module.css'
// import { Card, Footer, NavBar } from '../components/componentsIndex'

const Home = () => {

  const handler = () => {

  }

  return (
    <div className={Style.main}>
      <p>
        Vote 
      </p>

      <Button btnName='Get Started' handleClick={() => {}}/>

    </div>
  )
}


export default Home;


