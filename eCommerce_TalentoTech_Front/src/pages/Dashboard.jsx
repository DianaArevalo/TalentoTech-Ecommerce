import React from 'react'
import CardHome from '../components/Cards/CardHome'
import Average from '../components/Cards/Average'
import Maps from '../components/Cards/Maps'

const Dashboard = () => {
  return (
    <div className='bg-red-300 w-full h-screen flex-row anyBox '>
      <CardHome/>
     <Average/>
     <Maps/>

    </div>
  )
}

export default Dashboard
