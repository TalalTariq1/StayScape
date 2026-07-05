import API from "../api/axios";

export const registerUser=async (fullname,email,password)=>{
    const response=await API.post('/auth/signup',{fullname,email,password})
    return response.data
}

export const loginUser=async (email,password)=>{
    const response=await API.post('/auth/login',{email,password})
    return response.data
}
