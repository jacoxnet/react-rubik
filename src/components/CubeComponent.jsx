import React, { Component } from 'react';
import Piece from './PieceComponent';
import { SLICE, ROT_AXIS, MOVEMENTS, CCMOVEMENTS, 
         ROTATIONS, ROTATION_EQUIV} from '../shared/constants';


class Cube extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleKeys = this.handleKeys.bind(this);
    };

    handleKeys(event) {
        function singleMove(move, q) {    
            if (MOVEMENTS.includes(move)) {
                q(move, -1);
            }
            else if (CCMOVEMENTS.includes(move)) {
                q(move.toUpperCase(), 1);
            }
            else if (ROTATIONS.includes(move)) {
                ROTATION_EQUIV[move].split("").forEach((submove) => 
                    singleMove(submove, q));
            }
        }
        singleMove(event.key, (a, b) => this.quarterMove(a, b));
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeys);
    }

    // Animates rotation of the face - clockwise if direction is 1
    // and counterclockwise if direction is -1
    quarterMove(face, direction) {
        // rotAxis[face][1] is a plus or minus - reverse direction to account for that
        const dir = (ROT_AXIS[face][1] === '-')? -direction : direction;
        // create list of DOM elements in this slice
        var toMoveList = SLICE[face].map(cubieName => document.querySelector('#' + cubieName));
        // timing variable
        var timeCalled = Date.now();
        // recursively called function to rotate cubies slowly 
        function rotateCubies() {
            var elapsedTime = (Date.now() - timeCalled) / 4;
            var newStyle = 'rotate' + ROT_AXIS[face][0] + '(' + dir * elapsedTime + 'deg)';
            toMoveList.forEach(cubie => 
                cubie.style.transform = cubie.style.transform.replace(/rotate.\(\S+\)/, newStyle));
            if (elapsedTime <= 90) {
                requestAnimationFrame(rotateCubies);
            } else {
                toMoveList.forEach(cubie => 
                    cubie.style.transform = cubie.style.transform.replace(/rotate.\(\S+\)/, 'rotateX(0deg)'));   
                return;
            }
        };
        // initiate animation
        requestAnimationFrame(rotateCubies);
    }

    render () {    
        // pieces collects each piece and places in list
        const pieces = (this.props.currentCube).map((piece) => {
            return(
                <Piece key={piece.id} name={piece.name} cubieColors={piece.colors} />
            );
        });
        
        return(
            <div className="container" id="cubefield" >
                <div className="row align-items-center h-100">
                    <div className="col-12">
                        <div className="scene" id="scene">
                            <div className="pivot centered" id="pivot"
                                    style={{transform: "rotateX(-35deg) rotateY(-45deg)"}}>
                                <div className="cube" id="cube">
                                    { pieces }                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
        );
    }
}

export default Cube;