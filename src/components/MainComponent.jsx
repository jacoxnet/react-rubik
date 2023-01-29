import React, { Component } from 'react';
import { ALL_CUBIE_NAMES, NUM_FACES, INITIAL_COLORS } from '../shared/constants';
import Cube from './CubeComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        // create a ref to store cube DOM element
        this.cubeRef = React.createRef();
        this.state = {
            allFaces: NUM_FACES.map((face, )
            // currentCube is an object like this 
            // {id: 1, name: "FRU", colors: ["red, "yellow", "green"], ... }
            // meaning F is currently red, R is yellow, and U is green
            currentCube: ALL_CUBIES.map((piece, index) => {
                const colorDict = {};
                piece.split("").forEach((face) => colorDict[face] = INITIAL_COLORS[face]);
                const returnVal = {id: index, name:piece, colors: colorDict};
                return returnVal;
            })
        };
        this.rotateColors = this.rotateColors.bind(this);
    }  

    // rotate colors of the face by direction, performed after animation 
    // to actually rotate the face (direction 1 cw, -1 ccw)
    rotateColors = (face, direction) => {
        console.log('inside rotatecolors');
        // console.log(`old cube ${JSON.stringify(this.state.currentCube)}`);
        // number of cubies we're shifting 
        // substract one for end cubies where we don't move middle cube
        const numCubies = (face === 'M' || face === 'E' || face === 'S')?
            CUBE_SLICE[face].length : CUBE_SLICE[face].length - 1;
        // if clockwise, perform three times otherwise once
        const count = (direction === -1)? 1 : 3;
        const cubeCopy = this.state.currentCube.slice();
        for (let counter = 0; counter < count; counter++) {
            // by swapping every second color, we rotate face by two cubes
            for (let cubeIndex = 0; cubeIndex < numCubies - 2; cubeIndex++)
            {
                // identify the cubies to swap on this iteration
                // first one is start
                const cubie1Index = cubeCopy.findIndex(cubie => cubie.name === CUBE_SLICE[face][cubeIndex]);
                // second one is two ahead
                const cubie2Index = cubeCopy.findIndex(cubie => cubie.name === CUBE_SLICE[face][cubeIndex + 2]);
                console.log(`swapping colors for faces ${CUBE_SLICE[face][cubeIndex]}, ${CUBE_SLICE[face][cubeIndex+2]}`);
                console.log(`swapping colors for indexes ${cubie1Index}, ${cubie2Index}`);
                // now swap colors using transition guide dict
                for (let faceIndex = 0; faceIndex < cubeCopy[cubie1Index].name.length; faceIndex++) {
                    const cubie1Face = cubeCopy[cubie1Index].name[faceIndex];
                    const cubie2Face = TRANSITION[face][cubie1Face];
                    // swap colors on each face
                    const save1 = cubeCopy[cubie1Index].colors[cubie1Face];
                    const save2 = cubeCopy[cubie2Index].colors[cubie2Face];
                    console.log(`swapping colors: ${cubie1Face}, ${save1} : ${cubie2Face}, ${save2}`);
                    cubeCopy[cubie1Index].colors[cubie1Face] = cubeCopy[cubie2Index].colors[cubie2Face];
                    cubeCopy[cubie2Index].colors[cubie2Face] = save1;
                }
            }
        }
        // console.log(`new cube before ${JSON.stringify(cubeCopy)}`);
        this.setState({
            currentCube: cubeCopy});
        // console.log(`new cube in state ${JSON.stringify(this.state.currentCube)}`);
    }

    render() {
        return(
            <div>
                <Cube currentCube={this.state.currentCube} rotateColorFunction={this.rotateColors}/>
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