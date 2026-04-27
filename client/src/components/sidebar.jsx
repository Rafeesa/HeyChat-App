import React, { useState } from 'react'
import Search from './Search'
import UsersList from './usersList'

const Sidebar = () => {
  const [searchkey,setSearchkey]=useState('')
  return (
    <div className="app-sidebar">
        <Search searchkey={searchkey} 
        setSearchkey={setSearchkey}/>
      <UsersList searchkey={searchkey}/>
    
</div>
  )
}

export default Sidebar