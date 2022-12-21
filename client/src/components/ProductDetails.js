import React from 'react'
import { Button, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from "react-redux";
import { addItemInList, getList, addData } from "../redux/authSlice";


export default function ProductDetails({ name, image, note, category, setIsProductClicked }) {
    const dispatch = useDispatch();
    const dispatchAdd = async (e) => {
        e.preventDefault();
        await dispatch(addItemInList({ name, category }));
        const { payload } = await dispatch(getList());
        dispatch(addData(payload.list));
        setIsProductClicked();
    }

    const dispatchRemove = async (e) => {
        e.preventDefault();
        setIsProductClicked();
    }
    return (
        <div className='container pd-6 pb-0  sideBar show h-98' style={{ width: '30%', backgroundColor: "#FFF0DE", display: 'flex', flexDirection: "column", }}>
            <ArrowBackIcon onClick={() => setIsProductClicked()} />
            <div className="flex flex-col justify-between align-center w-100">

                <div className="object-cover img-container">
                    <img className='img-resp' src={image} alt="Product" />
                </div>
                <div className="flex flex-col  h-100 justify-between" style={{ width: "100%" }}>
                    <div>


                        <div className="flex flex-col m-4">
                            <Typography variant='h6' fontSize={'12px'}>name</Typography>
                            <Typography variant='h5' fontSize={"24px"}>{name}</Typography>
                        </div>
                        <div className="flex flex-col m-4">
                            <Typography variant='h6' fontSize={'12px'}>category</Typography>
                            <Typography variant='h5' fontSize={"18px"}>{category}</Typography>
                        </div>
                        <div className="flex flex-col m-4">
                            <Typography variant='h6' fontSize={'12px'}>note</Typography>
                            <Typography variant='h5' fontSize={"18px"}>{note}</Typography>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <Button type='submit' variant="contained" sx={{ mt: 2, mb: 1, color: "#F9A109", backgroundColor: "white" }}
                            onClick={(e) => dispatchRemove(e)}
                        >
                            delete
                        </Button>
                        <Button type='submit' variant="contained" sx={{ mt: 2, mb: 1, color: "white", backgroundColor: "#F9A109" }} onClick={(e) => dispatchAdd(e)}  > Add to list
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
