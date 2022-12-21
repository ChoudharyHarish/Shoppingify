// import jwt_decode from 'jwt-decode'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signUp, signIn, getItems, createItem, deleteItem, getSingleItem, getUserList, addItemInUserList, addListName, getHistory } from "../api/api";


export const signup = createAsyncThunk('signup', async (formData) => {
    try {
        const { data } = await signUp(formData);
        return { token: data.token };
    }
    catch (error) {
        console.log(error)
    }
})

export const login = createAsyncThunk('login', async (formData) => {
    try {
        const { data } = await signIn(formData);

        return { token: data.token }

    }
    catch (error) {
        console.log(error.response.data)
    }
})

export const getAllItems = createAsyncThunk('getAllItems', async () => {
    try {
        const token = localStorage.getItem('profile');
        const { data } = await getItems(token);
        return data;

    }
    catch (error) {
        localStorage.removeItem('profile');
        console.log(error.response.data)
    }
})
export const getItem = createAsyncThunk('getItem', async (itemName) => {
    try {

        const token = localStorage.getItem('profile');
        const { data } = await getSingleItem(itemName, token);
        return data;

    }
    catch (error) {
        console.log(error.response.data)
    }
})
export const addItem = createAsyncThunk('addItem', async (formData) => {
    try {
        const token = localStorage.getItem('profile');
        const { data } = await createItem(formData, token);
        return data;
    }
    catch (error) {
        console.log(error)
    }
})


export const getList = createAsyncThunk('getList', async () => {
    try {
        const token = localStorage.getItem('profile');
        const { data } = await getUserList(token);
        return data;
    }
    catch (error) {
        console.log(error)
    }
})

export const editListName = createAsyncThunk('addListName', async (name) => {
    try {
        const token = localStorage.getItem('profile');
        const { data } = await addListName(token, name);
        return data;
    }
    catch (error) {
        console.log(error)
    }
})

export const addItemInList = createAsyncThunk('addItemInList', async ({ name, category }) => {
    try {
        const token = localStorage.getItem('profile');
        const { data } = await addItemInUserList(token, { name, category });
        return data;
    }
    catch (error) {
        console.log(error.response.data)
    }
})

export const removeItem = createAsyncThunk('removeItem', async ({ name, category, deleteComplete }) => {
    try {
        const token = localStorage.getItem('profile');
        const { data } = await deleteItem({ name, category, deleteComplete }, token);
        return data;
    }
    catch (error) {
        console.log(error.response.data)
    }
})

export const getUserHistory = createAsyncThunk('getUserHistory', async () => {
    try {
        const token = localStorage.getItem('profile');
        const { data } = await getHistory(token);
        return data;
    }
    catch (error) {
        console.log(error)
    }
})




const AuthSlice = createSlice({
    name: 'AuthSlice',
    initialState: {
        isAuthenticated: false,
        userData: null,
        products: [],
        isProductClicked: false,
        listName: '',
        userHistory: [],
    },
    reducers: {
        toggleIsAuthenticated: (state, action) => {
            state.isAuthenticated = !state.isAuthenticated
        },
        checkAuthenticated: (state, action) => {
            const token = localStorage.getItem('profile');
            if (!token) {
                state.isAuthenticated = false;
                return;
            }
            else {
                // const decoded = jwt_decode(token);
                state.isAuthenticated = true;
            }
        },
        addData: (state, action) => {
            state.userData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signup.fulfilled, (state, action) => {
            const { token } = action.payload;
            localStorage.setItem('profile', token);
            state.isAuthenticated = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            const { token } = action.payload;
            localStorage.setItem('profile', token);
            state.isAuthenticated = true
        })
        builder.addCase(getAllItems.fulfilled, (state, action) => {
            const data = action.payload;
            state.products = data;
        })
        builder.addCase(getAllItems.rejected, (state, action) => {
            localStorage.removeItem('profile');
        })
        // builder.addCase(addItem.fulfilled, (state, action) => {
        //     // const data = action.payload;
        // })
        // builder.addCase(getItem.fulfilled, (state, action) => {
        //     // const data = action.payload;
        // })
        builder.addCase(getList.fulfilled, (state, action) => {
            const { listName, list } = action.payload;
            state.listName = listName;
            state.userData = list;
        })
        builder.addCase(getUserHistory.fulfilled, (state, action) => {
            state.userHistory = action.payload
        })
    }
})

export const { toggleIsAuthenticated, checkAuthenticated, addData } = AuthSlice.actions;
export default AuthSlice.reducer;