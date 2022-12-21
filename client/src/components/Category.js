import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button, Typography, Paper } from '@mui/material'
import { useDispatch } from 'react-redux';
import { getItem } from '../redux/authSlice';


const Item = ({ itemName, setIsProductClicked }) => {
    const dispatch = useDispatch();
    const handleClick = async (e) => {
        const { payload } = await dispatch(getItem(itemName));
        setIsProductClicked(payload[0]);
    }
    return (
        <Paper elevation={3} className="m-2" >
            <Button className="w-5" style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
                <h4>{itemName}</h4>
                <AddIcon onClick={(e) => handleClick(e)} />
            </Button>
        </Paper>
    )
}

export default function Category({ categoryName, data, isProductClicked, setIsProductClicked }) {



    return (
        <div className="flex flex-wrap flex-col">
            <Typography variant='h5'>{categoryName}</Typography>

            <div className="flex flex-wrap pt-4 justify-between">
                {data?.map((name, i) => <Item key={i} itemName={name} setIsProductClicked={setIsProductClicked} />)}
            </div>
        </div>
    )
}
