import React, { Component } from 'react';
import { ALL_CUBIES, INITIAL_COLORS, ROT_AXIS } from '../shared/constants';
import Cube from './CubeComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCubies: ALL_CUBIES,
            rotAxis: ROT_AXIS,
            initialColors: INITIAL_COLORS,
            allCubieColors: 
                ALL_CUBIES.map((piece) => {
                    const colorList = (piece.name).split("").map((face) => 
                        INITIAL_COLORS[face]);
                    const returnVal = {id: piece.id, name:piece.name, colors: colorList};
                    // console.log(JSON.stringify(returnVal));
                    return returnVal;
                })
            };
            // allCubieColors is an object like this 
            // {id: 1, name: "FRU", colors: ["red, "yellow", "green"], ... }
            // and holds the current state of colors in the cube
    }  

    render() {
        return(
            <div className="container" id="cubefield">
                <div className="row align-items-center h-100">
                    <div className="col-12">
                        <div className="scene" id="scene">
                            <div className="pivot centered" id="pivot" 
                                 style={{transform: "rotateX(-35deg) rotateY(-45deg)"}}>
                                <Cube allCubies={this.state.allCubies} rotAxis={this.state.rotAxis} 
                                      allCubieColors={this.state.allCubieColors} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;