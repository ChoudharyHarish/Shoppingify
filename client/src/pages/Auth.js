import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Container, TextField, Button, Typography, Avatar, Grid, Link } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import { signup, login } from "../redux/authSlice"
import { useDispatch } from 'react-redux';

const Auth = () => {

    const dispatch = useDispatch();
    const [isSignUp, setIsSignUp] = useState(true);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const handleChange = (e) => {
        const property = e.target.name;
        const value = e.target.value;
        setData({
            ...data,
            [property]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(signup(data));

        }
        else {
            dispatch(login(data));
        }
    }

    return (
        <>
            <Container component="main" sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} maxWidth="xs">

                <Avatar sx={{ backgroundColor: "#ebab34", m: 1 }}>
                    <LockIcon />
                </Avatar>
                <Typography>
                    {isSignUp ? "SignUp" : "Login"}
                </Typography>

                <Box component="form" type noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        {isSignUp && <Grid item xs={12}>
                            <TextField
                                autoFocus
                                required
                                label="Enter your name"
                                type="text"
                                fullWidth
                                onChange={(e) => handleChange(e)}
                                name='name'
                            />
                        </Grid>
                        }
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => handleChange(e)}

                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin='normal'
                                required
                                label="Enter your password"
                                type="password"
                                fullWidth
                                name='password'
                                onChange={(e) => handleChange(e)}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type='submit' fullWidth variant="contained" sx={{ mt: 2, mb: 1, color: "white", backgroundColor: "#ebab34" }}> {isSignUp ? "Signup" : "Login"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ display: "flex" }}>
                    <Avatar sx={{ backgroundColor: "#ebab34", m: 1 }}>
                        <GoogleIcon />
                    </Avatar>
                    <Avatar sx={{ backgroundColor: "#ebab34", m: 1 }}>
                        <FacebookIcon />
                    </Avatar>
                    <Avatar sx={{ backgroundColor: "#ebab34", m: 1 }}>
                        <GitHubIcon />
                    </Avatar>
                </Box>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link style={{ color: "#ebab34", textDecoration: "none" }} href="#" variant="body2" onClick={(e) => {
                            e.preventDefault();
                            setIsSignUp(!isSignUp);
                        }}>
                            {isSignUp ? "Already have an account? Sign in" : "Not a user ,Register Here"}
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Auth;