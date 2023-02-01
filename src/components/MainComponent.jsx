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
    // rotation is done by swapping colors in every second cube
    rotateColors = (rotFace, direction) => {
        console.log(`state before: ${this.state.faceColors}`);
        // determine transition map
        var transMap = TRANSITION[rotFace];
        // reverse map if opposite direction
        if (direction === -1) 
            transMap = reverseMap(transMap)
        // create copy of state for new color assignment
        const newState = this.state.faceColors.slice();
        // create list of cubie names to rotate
        const toRotate = CUBE_SLICE[rotFace].slice();
        // create list of corresponding new cubie names
        const newCubies = toRotate.map((cubieName) =>
            normalizeName((cubieName.split("").map((letter) => transMap[letter])).join("")));
        console.log(toRotate);
        console.log(newCubies);
        // move colors 
        toRotate.forEach((piece, i) => {
            const oldCubieIndex = CUBE.findIndex((cubie) => piece === cubie.name);
            const newCubieIndex = CUBE.findIndex((cubie) => newCubies[i] === cubie.name);
            console.log(`moving index ${oldCubieIndex} to ${newCubieIndex}`);
            // for each (face) letter, assign the old state color to the new face
            piece.split("").forEach((letter) => {
                console.log(`${transMap[letter]} transmap old color  ${this.state.faceColors[CUBE[newCubieIndex][transMap[letter]]]}`);
                console.log(`${letter} new color  ${this.state.faceColors[CUBE[oldCubieIndex][letter]]}`);
                newState[CUBE[newCubieIndex][transMap[letter]]] = 
                    this.state.faceColors[CUBE[oldCubieIndex][letter]];
            });
        });
        console.log(`newstate: ${newState}`);
        this.setState({faceColors: newState});
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