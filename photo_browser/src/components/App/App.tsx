import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import PhotoUI from '../../routes/Photo/photo';
import Home from '../../routes/Home/home';

const App: React.FC = () => (
    <Router>
        <div className="app">
            <Link to="/" className="linkHeader">
                <h1 className="title">Photo Browser</h1>
            </Link>
        </div>

        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="photos/:photoId" element={<PhotoUI />} />
            <Route
                path="*"
                element={
                    <main style={{ textAlign: 'center' }}>
                        <p>404, Nothing to see here</p>
                    </main>
                }
            />
        </Routes>
    </Router>
);

export default App;
