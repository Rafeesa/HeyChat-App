import React, { useState } from 'react'
import Search from './Search'

const Sidebar = () => {
  const [searchkey,setSearchkey]=useState('')
  return (
    <div className="app-sidebar">
        <Search searchkey={searchkey} 
        setSearchkey={setSearchkey}/>
    
</div>
  )
}

export default Sidebar