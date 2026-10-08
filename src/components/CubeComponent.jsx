import React, { useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import Piece from './PieceComponent';
import { CUBE, MOVEMENTS, CCMOVEMENTS, CUBE_SLICE,
         ROTATIONS, ROTATION_EQUIV, ROT_AXIS} from '../shared/constants';


function Cube(props) {

    // number of slice animations currently running; new moves are ignored
    // until this drops back to zero (a cube rotation runs three at once)
    const activeAnimations = useRef(0);

    // Animates rotation of the face - clockwise if direction is 1
    // and counterclockwise if direction is -1
    function quarterMove(face, direction) {
        // rotAxis[face][1] is a plus or minus - reverse direction to account for that
        const dir = (ROT_AXIS[face][1] === '-')? -direction : direction;
        // create list of DOM elements in this slice
        var toMoveList = CUBE_SLICE[face].map(cubieName => document.querySelector('#' + cubieName));
        // timing variable
        var timeCalled = Date.now();
        activeAnimations.current++;
        // recursively called function to rotate cubies slowly 
        function rotateCubies() {
            // clamp so the slice never goes past 90 degrees
            var angle = Math.min((Date.now() - timeCalled) / 4, 90);
            if (angle < 90) {
                var newStyle = 'rotate' + ROT_AXIS[face][0] + '(' + dir * angle + 'deg)';
                toMoveList.forEach(cubie => 
                    cubie.style.transform = cubie.style.transform.replace(/rotate.\(\S+\)/, newStyle));
                requestAnimationFrame(rotateCubies);
            } else {
                // a slice at 90 degrees looks the same as the slice at 0 degrees
                // with its colors moved, so swap to that state in this frame.
                // commit the color change synchronously so it is painted in the
                // same frame as the transform reset (otherwise React 18 batches it
                // into a later task and the old colors flash for a frame)
                flushSync(() => props.rotateColorFunction(face, direction));
                toMoveList.forEach(cubie => 
                    cubie.style.transform = cubie.style.transform.replace(/rotate.\(\S+\)/, 'rotateX(0deg)'));
                activeAnimations.current--;
            }
        };
        // initiate animation
        requestAnimationFrame(rotateCubies);
    }

    function singleMove(move) {    
        if (MOVEMENTS.includes(move)) {
            quarterMove(move.toUpperCase(), 1);
        } else if (CCMOVEMENTS.includes(move)) {
            quarterMove(move, -1);
        } else if (ROTATIONS.includes(move)) {
            ([...ROTATION_EQUIV[move]]).forEach((submove) => 
                singleMove(submove));
        }
    }

    function handleKeys(event) {
        console.log(`got key ${event.key}`);
        // ignore keys while a move is still animating
        if (activeAnimations.current === 0) {
            singleMove(event.key);
        }
        event.preventDefault();
    }

    // add event handler for keys
    useEffect(() => {
        window.addEventListener('keydown', handleKeys);
        return () => {
            window.removeEventListener('keydown', handleKeys);
        }
        });

    // pieces collects each piece and places in list
    const pieces = CUBE.map((piece) => {
        let colors = [];
        [...piece.name].forEach((letter) => {
            colors.push(props.faceColors[piece[letter]]);
        });
        return(
            <Piece key={piece.id} name={piece.name} cubieColors={colors} />
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

export default Cube;