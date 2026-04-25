import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getLoggedUser,getAllUsers} from "../apicalls/users"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { setUser,setAllUsers } from "../redux/userSlice"

function ProtectedRoute({children}){
   const {user} =useSelector(state=>state.userReducer||{})
   const dispatch=useDispatch()
    const navigate=useNavigate()
    const getLoggedInUser=async ()=>{
        
        let response=null
        try {
            response=await getLoggedUser()
            console.log("API called")
            if(response.success){
                dispatch(setUser(response.data))
            }
            else
            {
                toast.error(response.message)
                navigate('/login')
            }
        } catch (error) {
            navigate('/login')
        }
    }
    const getAllUsersFromDb=async()=>{
         let response=null
        try {
            response=await getAllUsers()
            console.log("All users API called")
            if(response.success){
                dispatch(setAllUsers(response.data))
            }
            else
            {
                toast.error(response.message)
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
            getAllUsersFromDb()
        }
        else{
           navigate('/login')
        }
    },[])
     if (!user) {
    return <div>Loading...</div>;
  }
   return(
    <div>
        
        {children}
    </div>
   ) 
}
export default ProtectedRoute;