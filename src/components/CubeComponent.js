import React, { Component } from 'react';

class CubeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wholeCube: null,
            allCubies: null,
            pieces: null,
            scene: null,
            pivot: null
        }
    }

    assembleCube() {
    for (let cubieIndex = 0; cubieIndex < 26; cubieIndex++)
    {
        // set id of piece to be facename (eg 'FRU')
        pieces[cubieIndex].setAttribute('id', allCubies[cubieIndex]);
        // initialize translation phrase to add to cubie style
        let translate = '';
        // cycle through each letter of facename
        for (let face = 0; face < allCubies[cubieIndex].length; face++)
        {
            // set color of face
            pieces[cubieIndex].querySelector('.element.' + allCubies[cubieIndex][face])
                .appendChild(document.createElement('div'))
                .setAttribute('class', 'sticker ' + initialColors[allCubies[cubieIndex][face]]);
            // set proper xyz translation for cubie based on faces
            translate = translate + 'translate' + rotAxis[allCubies[cubieIndex][face]][0] + 
                '(' + rotAxis[allCubies[cubieIndex][face]][1] + '2em) ';
        }
        // form translation move - rotate 0 is in there for
        // replacement in move function
        pieces[cubieIndex].style.transform = 'rotateX(0deg) ' + translate;
    }
    // place logo
    let logoSticker = document.querySelector('#U>.element.U').firstChild;
    logoSticker.className += ' logo';
}
}