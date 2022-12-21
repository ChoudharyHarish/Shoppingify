import React from 'react'
import { Grid, Container, Typography, TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Category from './Category';
import { useSelector } from 'react-redux';

export default function Main({ setIsProductClicked }) {


    const data = useSelector((state) => state.auth.products);
    return (
        <Container className='pd-8 bg' style={{ height: "100vh", overflow: "scroll" }}>
            <Grid className="justify-between mb-4 respCenter" container spacing={2}>
                <Grid className='title' item width='60%'>
                    <Typography align='left' variant='h5' className='respFont'  ><span style={{ color: "#ebab34" }}>Shoppingify</span> allows you to take your shopping list wherever you go</Typography>
                </Grid>
                <Grid item >
                    <TextField
                        type='text'
                        placeholder='search'
                        style={{ textAlign: 'center' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>

            <div className="flex flex-col" >
                {data?.map((category, i) => <Category key={i} categoryName={category._id.category} data={category.products} setIsProductClicked={setIsProductClicked} />)}
            </div>
        </Container >
    )
}
