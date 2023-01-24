import React, { Component } from 'react';
import { ALL_CUBIES, INITIAL_COLORS } from '../shared/constants';
import Cube from './CubeComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        // create a ref to store cube DOM element
        this.cubeRef = React.createRef();
        this.state = {
            // allCubieColors is an object like this 
            // {id: 1, name: "FRU", colors: ["red, "yellow", "green"], ... }
            // and holds the current state of colors in the cube
            currentCube: 
                ALL_CUBIES.map((piece) => {
                    const colorList = (piece.name).split("").map((face) => 
                        INITIAL_COLORS[face]);
                    const returnVal = {id: piece.id, name:piece.name, colors: colorList};
                    // console.log(JSON.stringify(returnVal));
                    return returnVal;
                })
            };

    }  

    render() {
        return(
            <div>
                <Cube currentCube={this.state.currentCube} />
            </div>          
        );
    }
}

export default Main;