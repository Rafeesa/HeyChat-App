import { axiosInstance } from "."
export const getAllChats = async()=>{
try {
   const response=await axiosInstance.get('/api/chat/get-all-chat')
   return response.data
} catch (error) {
    return error
}
}