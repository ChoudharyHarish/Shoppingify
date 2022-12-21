import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Main from '../components/Main';
import List from '../components/List';
import { useDispatch } from "react-redux";
import { getAllItems, getList, getUserHistory } from '../redux/authSlice';
import ProductDetails from '../components/ProductDetails';


export default function Home() {

    const dispatch = useDispatch();
    const [isProductClicked, setProductClicked] = useState(false);
    const [productDetails, setProductDetails] = useState(null);


    useEffect(() => {
        dispatch(getAllItems());
        dispatch(getList());
        dispatch(getUserHistory());
    }, [dispatch]);


    const setIsProductClicked = (productDetails) => {
        setProductDetails(productDetails);
        setProductClicked(true);
    }

    const setFalse = () => {
        setProductDetails(null)
        setProductClicked(false);
    }


    return (
        <>
            <Navbar />
            <Main setIsProductClicked={setIsProductClicked} />
            {!isProductClicked && !productDetails ?
                <List /> :
                <ProductDetails {...productDetails} setIsProductClicked={setFalse} />
            }
        </>
    )
}
