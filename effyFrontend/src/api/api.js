import axios from 'axios';


const API_URL='http://localhost:5005/api';
//user routes
export const createUser= (user)=>axios.post(`${API_URL}/User/create`,user);
export const getUsers= ()=>axios.get(`${API_URL}/User`);

export const getUserById = (id) => axios.get(`${API_URL}/User/${id}`);
export const updateUser= (id,user)=>axios.put(`${API_URL}/User/${id}`,user);
export const deleteUser= (id)=>axios.delete(`${API_URL}/User/${id}`);

//company routes

export const createCompany = (company)=>axios.post(`${API_URL}/Company/create`,company);
export const getCompanies = ()=>axios.get(`${API_URL}/Company/`);
export const deleteCompany = (id)=>axios.delete(`${API_URL}/Company/${id}`);
export const getCompanyById = (id)=>axios.get(`${API_URL}/Company/${id}`);
export const updateCompany =(id,company)=>axios.put(`${API_URL}/Company/${id}`,company);
export const deleteUserFromCompany=(uId,cId)=>axios.delete(`${API_URL}/Company/${cId}/user/${uId}/delete`);
export const addUserToCompany=(uId,cId)=>axios.put(`${API_URL}/Company/${cId}/user/${uId}/add`);