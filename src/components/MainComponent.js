import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './CubeComponent';

class Main extends Component {
    
    render() {
        const HomePage = () => {
            return(
                <Home />
            );
        }

        return(
            <div>
                <Routes>
                    <Route path="/home" element={ HomePage } />
                    <Route path="*" element={ HomePage } />
                </Routes>
            </div>
        );
    }
}

export default Main;