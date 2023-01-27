import React from 'react';
import { ROT_AXIS } from '../shared/constants';

function Piece({name, cubieColors }) {
    const transphrase = name.split("").map((face) => {
        return "translate" + (ROT_AXIS[face])[0] + "(" + (ROT_AXIS[face])[1] + "3em) ";
    });
    const elems = name.split("").map((face, index) => {
        return(
            <div className={`element ${face}`} key={index}>
                <div className={`sticker ${cubieColors[face]}`}>
                </div>
            </div>
        )
    })
    return(
        <div className="piece" id={name} style={{transform: `rotateX(0deg) ${transphrase.join(" ")}` }}>
            {elems}
        </div>
    );
}

export default Piece;