import './App.css';
import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Signup from './components/forms/Signup';
import Login from './components/forms/Login';
import Home from './components/home/Home';
import CreatePost from './components/forms/CreatePost';
import UpdatePost from './components/forms/UpdatePost';
import PostDetails from './components/details/PostDetails';


function App() {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Navigate to="/posts" replace />} />
                <Route path='/posts' element={<Home />} />
                <Route path="/posts/search" element={<Home />} />
                <Route path='/user/signup' element={<Signup />} />
                <Route path='/user/login' element={<Login />} />
                <Route path='/posts/:id' element={<PostDetails />} />
                <Route path='/posts/create-post' element={<CreatePost />} />
                <Route path='/posts/update-post/:id' element={<UpdatePost />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
