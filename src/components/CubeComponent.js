import React from 'react';

function Piece ({pieceId, name, initialColors, rotAxis }) {
    const transphrase = name.split("").map((face) => {
        return "translate" + (rotAxis[face])[0] + "(" + (rotAxis[face])[1] + "2em) ";
    });
    const elems = name.split("").map((face) => {
        return(
            <div className={`element ${face}`}>
                <div className={`sticker ${initialColors[face]}`}>
                </div>
            </div>
        )
    })
    return(
        <div key={pieceId} className="piece" id={name} style={{transform: `rotateX(0deg) ${transphrase.join(" ")}` }}>
            {elems}
        </div>
    );
}

    
function Cube(props) {
    const pieces = props.allCubies.map((piece, index) => {
        return(
            <Piece pieceId={index} name={piece} initialColors={props.initialColors} 
                   rotAxis={props.rotAxis} />
        );
    });
    
    return(
        <div className="container" id="cubefield">
            <div className="row h-100 justify-content-center">
                <div className="col-12">
                    <div className="scene" id="scene">
                        <div className="pivot centered" id="pivot" style={{transform: "rotateX(-35deg) rotateY(-45deg)"}}>
                            <div className="cube" id="cube">
                                {pieces}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cube;