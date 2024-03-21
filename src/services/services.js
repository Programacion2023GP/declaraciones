import axios from 'axios'
import { Success,Error,Info,Warning } from '../toasts/toast';

export const Axios = axios.create({
    baseURL:'http://127.0.0.1:8000/api',
    timeout:5000,
    headers:{
        Accept:'application/json',
        'Content-Type': 'application/json',

    }
})

export const PostAxios = async (url, values) => {
    try {
        const response = await Axios.post(url, values);
        Success(response.data.data.message);
        return response.data;
    } catch (error) {
        console.log(error.response)
        Error(error.response.data.data.message);
        throw error; // Propaga la excepción para que se maneje externamente
    }
};






export const GetAxios = async (url)=>{ 
     
    try {
        const response = await Axios.get(url);
        return response.data.data.result
    } catch (error) {
        return error; 
    }
}