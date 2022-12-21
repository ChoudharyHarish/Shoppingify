import React, { useState, useEffect } from 'react'
import HistoryMain from '../components/HistoryMain'
import Navbar from '../components/Navbar';
import List from '../components/List';
import { useSelector, useDispatch } from "react-redux";
import ProductDetails from '../components/ProductDetails';
import { getUserHistory } from '../redux/authSlice';
import HistoryDetails from '../components/HistoryDetails';



export default function History() {

    const [isCart, setCart] = useState(false);
    const [isProductClicked, setProductClicked] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const [historyDetails, setHistoryDetails] = useState(false);
    const [list, setList] = useState([]);

    const history = useSelector(state => state.auth.userHistory);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserHistory());
    }, [dispatch])

    const handleCart = () => {
        setCart(!isCart);
    }
    const setFalse = () => {
        setProductDetails(null)
        setProductClicked(false);
    }

    const handleClick = (list, name, date) => {
        setHistoryDetails(!historyDetails);
        let data = [name, date];
        data.push(list);
        setList(data);
    }

    return (
        <div className='flex wt-100' >
            <Navbar handleCart={handleCart} />

            {!historyDetails ? <HistoryMain history={history} handleClick={handleClick} /> : <HistoryDetails handleClick={handleClick} list={list} />}
            {!isProductClicked && !productDetails ?
                <List isCart={isCart} /> :
                <ProductDetails {...productDetails} setIsProductClicked={setFalse} />
            }
        </div>
    )
}
