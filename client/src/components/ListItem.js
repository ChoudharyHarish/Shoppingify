import React, { useState } from 'react'
import { Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from "react-redux";
import { addItemInList, removeItem, getList, addData } from "../redux/authSlice";

const Item = ({ isEdit, name, category, quantity }) => {

    const [isOver, setIsOver] = useState(false);
    // const [quantity2, setQuantity] = useState(quantity);
    const dispatch = useDispatch();

    const handleClickAdd = async (e) => {
        e.preventDefault();
        // setQuantity(quantity2 + 1);
        await dispatch(addItemInList({ name, category }));
        const { payload } = await dispatch(getList());
        dispatch(addData(payload.list));
    }

    const handleClickSubtract = async (e) => {
        e.preventDefault();
        // setQuantity(quantity2 - 1);
        await dispatch(removeItem({ name, category }));
        const { payload } = await dispatch(getList());
        dispatch(addData(payload.list));
    }

    const dispatchRemove = async (e) => {
        e.preventDefault();
        let deleteComplete = 1;
        await dispatch(removeItem({ name, category, deleteComplete }));
        const { payload } = await dispatch(getList());
        dispatch(addData(payload.list));
    }

    const strikeThrough = async (e) => {
        e.preventDefault();
        let deleteComplete = 1;
        await dispatch(removeItem({ name, category, deleteComplete }));
        const nameElement = document.querySelector('.name')
        nameElement.classList.toggle('line-through');
    }

    return (
        <div className="flex justify-between mt-2" onMouseEnter={() => setIsOver(true)} onMouseLeave={() => setIsOver(false)} >
            <div className='flex justify-between ' style={{ width: "100%" }} >
                {(isEdit) && <input type="checkbox" name="" id="" style={{ border: "#ebab34" }} onClick={(e) => strikeThrough(e)} />}
                <Typography className="name" variant='h6' fontSize='16px' >{name}</Typography>
                {((!isOver || isEdit)) && <button className='btn' >{quantity}pcs</button>}
            </div>

            {((isOver && !isEdit)) && <div className='flex align-center justify-between' style={{ backgroundColor: "white", borderRadius: '5px', width: "60%", padding: "0 0.3rem" }}>
                <DeleteIcon style={{ color: "white", backgroundColor: "#ebab34", padding: '0.2rem', borderRadius: '8px', fontSize: "16px" }} onClick={(e) => dispatchRemove(e)} />
                <RemoveIcon onClick={(e) => handleClickSubtract(e)} style={{ color: "#ebab34", fontSize: "16px" }} />
                <button className='btn' >{quantity}pcs</button>
                <AddIcon onClick={(e) => handleClickAdd(e)} style={{ color: "#ebab34", fontSize: "16px" }} />
            </div>
            }

        </div>
    )
}

export default function ListItem({ isEdit, isCart, category, data }) {

    return (
        <div className="flex flex-col mt-8">
            <h5>{category}</h5>
            <div className="flex flex-col mt-4">
                {data?.map((item, i) => <Item key={i} isEdit={isEdit} name={item.name} quantity={item.quantity} category={category} />)}
            </div>

        </div>

    )
}
