import React from 'react';

function Piece ({name, cubieColors, rotAxis }) {
    const transphrase = name.split("").map((face) => {
        return "translate" + (rotAxis[face])[0] + "(" + (rotAxis[face])[1] + "2em) ";
    });
    const elems = name.split("").map((face, index) => {
        return(
            <div className={`element ${face}`} key={index}>
                <div className={`sticker ${cubieColors[index]}`}>
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

    
function Cube(props) {

    const pieces = (props.allCubieColors).map((piece) => {
        return(
            <Piece key={piece.id} name={piece.name} cubieColors={piece.colors} 
                   rotAxis={props.rotAxis} />
        );
    });
    
    return(
        <div className="cube" id="cube">
            {pieces}
        </div>
    );
}

export default Cube;