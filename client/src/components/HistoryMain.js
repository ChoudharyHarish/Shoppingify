import React from 'react'
import { Typography } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';



const HistoryCard = ({ date, list, name, status, handleClick }) => {

    return (
        <div className="flex justify-between mt-8 pd-4 box-shadow br-10 respFlex bgw">
            <div className='flex'>
                <Typography variant='h6'>{name}</Typography>
            </div>
            <div className="flex align-center  justify-between w-30 respWid">
                <CalendarMonthIcon />
                <Typography variant='h6' fontSize={'14px'}>{date}</Typography>
                <Typography variant='h6' fontSize={'14px'} >{status}</Typography>
                <NavigateNextIcon onClick={() => handleClick(list, name, date)} />
            </div>
        </div>
    )
}


export default function HistoryMain({ history, handleClick }) {
    return (
        <div className='wt-100 flex flex-col pd-6 respPad bg'>
            <div>
                <Typography variant='h4'>Shopping History</Typography>
            </div>
            {history?.map((history, i) => <HistoryCard key={i} {...history} handleClick={handleClick} />)}
        </div>
    )
}
