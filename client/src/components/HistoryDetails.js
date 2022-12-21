import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button, Typography, Paper } from '@mui/material'


const Item = ({ itemName, quantity }) => {
    return (
        <Paper elevation={3} className="m-2" >
            <Button className="w-5" style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
                <h4>{itemName}</h4>
                <Typography variant='h6' fontSize={"16px"}>{quantity}pcs</Typography>
            </Button>
        </Paper>
    )
}

const Category = ({ categoryName, items }) => {
    return (
        <div className="flex flex-wrap flex-col">
            <Typography variant='h5'>{categoryName}</Typography>

            <div className="flex flex-wrap pt-4 justify-between">
                {items?.map((item, i) => <Item key={i} itemName={item.name} quantity={item.quantity} />)}
            </div>
        </div>
    )
}


export default function HistoryDetails({ handleClick, list }) {
    const data = list[2];
    return (
        <div className='wt-100 pd-6'>
            <div className='flex'>
                <ArrowBackIcon onClick={() => handleClick()} />
                <Typography variant='h6' fontSize={"16px"}>Back</Typography>
            </div>

            <div className="flex flex-col mt-4">
                <Typography>{list[0]}</Typography>
                <div className="flex">
                    <CalendarMonthIcon />
                    <Typography variant='h6' fontSize={'16px'}>{list[1]}</Typography>
                </div>
            </div>

            <div className="flex flex-col mt-4" >
                {data?.map((item, i) => <Category key={i} categoryName={item.category} items={item.items} />)}
            </div>
        </div>
    )
}
