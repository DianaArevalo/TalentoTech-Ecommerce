import React from 'react'
import CardHome from '../../components/Cards/CardHome'
import Search from '../../components/Cards/Search'
import Maps from '../../components/Cards/Maps'
import Average from '../../components/Cards/Average'

const home = () => {
  return (
    <div>
      <Search/>
      <CardHome/>
      <Average/>
      <Maps/>
    </div>
  )
}

export default home
