import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ALL_CUBIES, INITIAL_COLORS, ROT_AXIS } from '../shared/constants';
import Cube from './CubeComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCubies: ALL_CUBIES,
            rotAxis: ROT_AXIS,
            initialColors: INITIAL_COLORS
        }

    }
    
    render() {
        return(
            <Cube allCubies={this.state.allCubies} rotAxis={this.state.rotAxis} initialColors={this.state.initialColors} />
        );
    }
}

export default Main;