import React, { Component } from 'react';
import { CUBE, CUBE_SLICE, normalizeName, INITIAL_CUBIE_FACE_COLORS, 
         TRANSITION, reverseMap } from '../shared/constants';
import Cube from './CubeComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        // create a ref to store cube DOM element
        this.cubeRef = React.createRef();
        this.state = {
            // faceColors is an array of current colors of the cube
            // by cabezas face numbers
            faceColors: INITIAL_CUBIE_FACE_COLORS
        };
        this.rotateColors = this.rotateColors.bind(this);
    }  

    // rotate colors of the face by direction, performed after animation 
    // to actually rotate the face (direction 1 normal -1 anti)
    rotateColors = (rotFace, direction) => {
        // determine transition map direction
        var transMap = (direction === 1)? TRANSITION[rotFace] : reverseMap(TRANSITION[rotFace]);            
        this.setState((oldState) => {
            // create list of cubie names to rotate
            const toRotate = CUBE_SLICE[rotFace].slice();
            // create list of corresponding new cubie names
            const newCubies = toRotate.map((cubieName) =>
                normalizeName(([...cubieName].map((letter) => transMap[letter])).join("")));
            // create copy of state for new color assignment
            const newState = oldState.faceColors.slice();
            // move colors 
            toRotate.forEach((piece, i) => {
                const oldCubieIndex = CUBE.findIndex((cubie) => piece === cubie.name);
                const newCubieIndex = CUBE.findIndex((cubie) => newCubies[i] === cubie.name);
                // for each (face) letter, assign the old state color to the new face
                [...piece].forEach((letter) => {
                    newState[CUBE[newCubieIndex][transMap[letter]]] = 
                        oldState.faceColors[CUBE[oldCubieIndex][letter]];    
                });
            });
            // console.log(`new state ${newState}`);
            return {faceColors: newState}
        });
    }

    render() {
        return(
            <div>
                <Cube faceColors={this.state.faceColors} rotateColorFunction={this.rotateColors}/>
                <div className="text-center">
                    <h3>Instructions:</h3>
                    <p>Press one of these keys to move a slice of the cube:
                        l  m  r  u  e  d  f  s  b</p>
                    <p>Press one of these keys to rotate the entire cube:
                        x  y  z</p>
                    <p>hold down SHIFT for reverse movements</p>
                </div>
            </div>          
        );
    }
}

export default Main;