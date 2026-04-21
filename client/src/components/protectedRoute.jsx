import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getLoggedUser } from "../apicalls/users"
import { useState } from "react"

function ProtectedRoute({children}){
    const [user,setUser]=useState(null)
    const navigate=useNavigate()
    const getLoggedInUser=async ()=>{
        let response=null
        try {
            response=await getLoggedUser()
            if(response.success){
                setUser(response.data)
            }
            else
            {
                navigate('/login')
            }
        } catch (error) {
            navigate('/login')
        }
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
            //write logic to current user details
            getLoggedInUser()
        }
        else{
           navigate('/login')
        }
    })
   return(
    <div>
        
        {children}
    </div>
   ) 
}
export default ProtectedRoute;