import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../images/logo.svg";
import { Avatar } from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import RestoreIcon from '@mui/icons-material/Restore';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


export default function Navbar() {

    const handleCart = () => {
        document.querySelector(".sideBar").classList.toggle('show');
    }

    return (
        <div className="flex flex-col justify-between align-center pd-4 resp-pad">
            <div >
                <img src={logo} alt="" />
            </div>

            <div className='flex flex-col'>
                <Link to="/">
                    <ListIcon style={{ color: "black" }} fontSize="large" />
                </Link>
                <Link to="/history">
                    <RestoreIcon className="mt-4 mb-4" style={{ color: "black" }} fontSize="large" />
                </Link>
                <Link to='/stats'>
                    <AssessmentOutlinedIcon style={{ color: "black" }} fontSize="large" />
                </Link>

            </div>
            <div>
                <Avatar sx={{ backgroundColor: "#ebab34", m: 1 }} className="pd-2">
                    <ShoppingCartOutlinedIcon fontSize="large" onClick={() => handleCart()} />
                </Avatar>
            </div>
        </div >
    )
}
