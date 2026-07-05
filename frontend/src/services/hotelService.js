import API from '../api/axios';
import { mockHotels } from '../data/mockHotels';
 
// later this becomes: const res = await axios.get('/api/hotels'); return res.data;
export const getAllHotels = async () => {
  try{
    const response=await API.get('/hotels')
    return response.data
  }catch(error){
    console.log('Error fetching all the hotels',error)
    throw error
  }
};
 
// later this becomes: const res = await axios.get(`/api/hotels/${id}`); return res.data;
export const getHotelById = async (id) => {
  try{
    const response=await API.get(`/hotels/${id}`)
    return response.data
  }catch(error){
     console.log(`Error fetching  the hotel with id:${id}`,error)
    throw error
  }
};