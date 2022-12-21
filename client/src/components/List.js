import React, { useState } from 'react'
import { Button, Typography, Box, Grid, TextField } from '@mui/material'
import image from "../images/source.svg"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ListItem from './ListItem';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, getAllItems, editListName } from '../redux/authSlice';




const Form = ({ clicked, setClicked }) => {


    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: "",
        image: "",
        note: "",
        category: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(addItem(data));
        await dispatch(getAllItems());
        setData({
            name: "",
            image: "",
            note: "",
            category: "",
        })
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name: property, value } = e.target;
        setData({
            ...data,
            [property]: value,
        })
    }


    return (
        <>

            <Typography variant="h5">Add new Item</Typography>
            <Box component="form" type noValidate style={{ marginTop: "2rem" }}>
                <div className='flex flex-col justify-between  ht-100'>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="Name"
                            type="text"
                            fullWidth
                            name='name'
                            style={{ outline: "none" }}
                            value={data.name}
                            onChange={(e) => handleChange(e)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            margin='normal'
                            required
                            label="Image"
                            type=""
                            fullWidth
                            name='image'
                            value={data.image}

                            onChange={(e) => handleChange(e)}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input type="text" style={{ height: "150px", width: "96%", border: '2px solid lightGrey', backgroundColor: "#FFF0DE", outline: 'none', paddingLeft: "0.5rem", display: 'flex', alignItems: "flex-start" }}
                            placeholder="Enter a note"
                            name='note'
                            value={data.note}
                            onChange={(e) => handleChange(e)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            margin='normal'
                            required
                            label="Enter a category"
                            type=""
                            fullWidth
                            name='category'
                            value={data.category}
                            onChange={(e) => handleChange(e)}

                        />
                    </Grid>

                    <Grid item xs={12} style={{ display: 'flex', justifyContent: "space-between" }} >
                        <Button type='submit' variant="contained" sx={{ mt: 2, mb: 1, color: "#F9A109", backgroundColor: "white" }} onClick={() => setClicked(!clicked)} > Cancel
                        </Button>
                        <Button type='submit' variant="contained" sx={{ mt: 2, mb: 1, color: "white", backgroundColor: "#F9A109" }} onClick={(e) => handleSubmit(e)} > Add Item
                        </Button>
                    </Grid>
                </div>
            </Box>
            {/* <ArrowBackIcon onClick={(e) => handleClick(e)} /> */}
        </>
    )
}


const List = () => {

    const dispatch = useDispatch();
    const data = useSelector((state) => state.auth.userData);
    const [clicked, setClicked] = useState(false);
    const [listName, setListName] = useState("");
    const [inputName, setInputName] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setClicked(!clicked);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setListName(inputName);
        dispatch(editListName(inputName));
        setInputName('');
    }

    return (

        !clicked ?
            <div className='flex flex-col container pd-6 hide sideBar' style={{ width: '30%', backgroundColor: "#FFF0DE", height: "100vh !important", overflow: "scroll" }}>

                <div className='flex center bg-maron'>
                    <img className="resp" src={image} alt="" />
                    <div className='flex flex-col mr-2 pd-4'>
                        <Typography variant='h6' fontSize={'14px'} lineHeight={'14px'} color="white">Didn't find what you need</Typography>
                        <Button className='border' style={{ color: "black", backgroundColor: "white", borderRadius: "10px", marginTop: "1rem" }} onClick={(e) => handleClick(e)} >Add Item</Button>
                    </div>
                </div>

                <div className="flex flex-col mt-8 justify-between ht-100">

                    <div>
                        <div className="flex justify-between align-center">
                            <Typography variant='h5' >{listName !== "" ? listName : "Shopping List"}  </Typography>
                            <ModeEditIcon onClick={() => setIsEdit(!isEdit)} />
                        </div>
                        <div>
                            {data?.map((item) => <ListItem isEdit={isEdit} key={item?.category} category={item?.category} data={item?.items} />)}
                        </div>
                    </div>


                    <div className='flex' style={{ border: "2px solid #F9A109", width: "fit-content", borderRadius: '8px', padding: '0.1rem' }}>
                        <input type="text" name='listName' value={inputName} placeholder='enter a text' style={{ border: 'none', outline: 'none', padding: "0.8rem" }} onChange={(e) => setInputName(e.target.value)} />
                        <button className='btn2' onClick={(e) => handleSubmit(e)} >Save</button>
                    </div>

                </div>



            </div>
            :
            <div className='container pd-6 show sideBar add' style={{ width: '30%', backgroundColor: "#FFF0DE", display: 'flex', flexDirection: "column", }}>

                <Form clicked={clicked} setClicked={setClicked} />
            </div>
    )
}

export default List;