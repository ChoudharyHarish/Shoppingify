import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import History from '../pages/History';
import Stats from '../pages/Stats';


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/history" element={<History />} />
                <Route exact path="/stats" element={<Stats />} />
            </Routes>
        </BrowserRouter>
    )
}
