import axios from 'axios'


const url = "https://shoppingify-three.vercel.app/api";


const signUp = (data) => axios.post(`${url}/auth/signup`, data);
const signIn = (data) => axios.post(`${url}/auth/login`, data);

const getItems = (token) => axios.get(`${url}/products/all`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})
const createItem = (data, token) => axios.post(`${url}/products/create`, data, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})

const getSingleItem = (itemName, token) => axios.post(`${url}/products/product`, { name: itemName }, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})


const updateItem = (data, token) => axios.patch(`${url}/products/update`, { data }, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})

const deleteProduct = (data, token) => axios.delete(`${url}/products/delete`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    data
})


const getUserList = (token) => axios.get(`${url}/user/userList`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

const addListName = (token, name) => axios.post(`${url}/user/listName`, { name }, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

const addItemInUserList = (token, data) => axios.post(`${url}/user/addItem`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

const deleteItem = (data, token) => axios.delete(`${url}/user/deleteItem`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
    data
})

const getHistory = (token) => axios.get(`${url}/user/history`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})


export { signUp, signIn, getItems, createItem, updateItem, deleteItem, getSingleItem, getUserList, addItemInUserList, deleteProduct, addListName, getHistory };