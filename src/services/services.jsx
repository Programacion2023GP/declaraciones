import axios from 'axios'
import { Success,Error,Info,Warning } from '../toasts/toast';

export const Axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // timeout:500000,
    headers:{
        Accept:'application/json',
        'Content-Type': 'application/json',

    }
})

export const CodigosPostales = axios.create({
    baseURL: import.meta.env.VITE_API_URLCODIGOSPOSTALES,
    // timeout:500000,
    headers:{
        Accept:'application/json',
        'Content-Type': 'application/json',

    }
})

export const GetPostales = async (codigo)=>{ 
     
    try {
        const response = await CodigosPostales.get(codigo);
        return response.data.data.result
    } catch (error) {
        return error; 
    }
}
export const PostAxios = async (url, values) => {
    try {
        const response = await Axios.post(url, values);
        // Success(response.data.data.message);
        // console.log("postaxios",response);
        return response.data;
    } catch (error) {
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