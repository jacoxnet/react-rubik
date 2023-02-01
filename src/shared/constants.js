// number of cube and cubie faces
const NUM_CUBIE_FACES = 9;
const TOTAL_CUBIE_FACES = 54;

// map of initial colors by cube face
const INITIAL_COLORS = {
    'F': 'red', 'B': 'orange', 'L': 'blue', 'R': 'green', 
    'U': 'yellow', 'D': 'white'};

// arrays of slices of the cube
// each array needs to be in order of clockwise movement
const CUBE_SLICE = {
    'L': [ "FLU", "FL", "FLD", "LD", "BLD", "BL", "BLU", "LU", "L" ],
    'M': [ "FU", "F", "FD", "D", "BD", "B", "BU", "U" ],
    'R': ["FRD", "FR", "FRU", "RU", "BRU", "BR", "BRD", "RD", "R" ],
    'U': [ "FLU", "LU", "BLU", "BU", "BRU", "RU", "FRU", "FU", "U" ],
    'E': [ "FL", "F", "FR", "R", "BR", "B", "BL", "L" ],
    'D': [ "FLD", "FD", "FRD", "RD", "BRD", "BD", "BLD", "LD", "D" ],
    'F': [ "FLU", "FU", "FRU", "FR", "FRD", "FD", "FLD", "FL", "F" ],
    'S': [ "LU", "U", "RU", "R", "RD", "D", "LD", "L" ],
    'B': [ "BLD", "BD", "BRD", "BR", "BRU", "BU", "BLU", "BL", "B" ]
}

// These three slices are sufficient for whole cube in order
const ALL_CUBIES = [].concat(CUBE_SLICE['F']).concat(CUBE_SLICE['S']).concat(CUBE_SLICE['B']);

// Cabezas numbering order for cube faces
// U is 0-8, L is 9-17, etc.
const CAB_FACES = ["U", "L", "F", "R", "B", "D"];

// function to normalize cubie names
const normalizeName = (inputName) => {
    let returnVal = "";
    if (inputName.includes("F")) returnVal += "F";
    if (inputName.includes("B")) returnVal += "B";
    if (inputName.includes("L")) returnVal += "L";
    if (inputName.includes("R")) returnVal += "R";
    if (inputName.includes("U")) returnVal += "U";
    if (inputName.includes("D")) returnVal += "D";
    return returnVal;
} 

// function to return cube face from cabezas number
const cabezasToFace = (cabezasNum) => 
    CAB_FACES[Math.floor(cabezasNum/(NUM_CUBIE_FACES))];

// array of initial colors using cabezas cubie face numbering
// this is just a normal array where Array[x] is the color for face x
const INITIAL_CUBIE_FACE_COLORS = (Array(TOTAL_CUBIE_FACES).fill(0)).map((_, i) => 
    INITIAL_COLORS[cabezasToFace(i)]);

// Cabezas numbering system
const CAB_LIST = {
    'FLU': [18, 11, 6],
    'FU':  [19, 7],
    'FRU': [20, 27, 8],
    'FL':  [21, 14],
    'F':   [22],
    'FR':  [23, 30],
    'FLD': [24, 17, 45],
    'FD':  [25, 46],
    'FRD': [26, 33, 47],      
    'L':   [13],
    'BL':  [41, 12],
    'BLD': [44, 15, 51],
    'LU': [10, 3],
    'LD': [16, 48],
    'BLU': [38, 9, 0],
    'U':  [4],
    'BU': [37, 1],
    'RU': [28, 5],
    'BRU': [36, 29, 2],
    'B':  [40],
    'BR': [39, 32],
    'BD': [43, 52],
    'BRD': [42, 35, 53],
    'R':  [31],
    'RD': [34, 50],
    'D':  [49]
}

// CUBE is an array of objects like this 
// {id: 1, name: "FRU", "F":20, "R":27, "U":8}
// where the numbers are cabezas cubie face numbers
const CUBE = ALL_CUBIES.map((piece, pindex) => {
    const returnVal = {id: pindex, name:normalizeName(piece)};
    piece.split("").forEach((face, findex) => {
        returnVal[face] = CAB_LIST[piece[findex]]
    });
    return returnVal;
});

// cube movements defined here
const MOVEMENTS = ['L', 'M', 'R', 'U', 'E', 'D', 'F', 'S', 'B'];
const CCMOVEMENTS = ['l', 'm', 'r', 'u', 'e', 'd', 'f', 's', 'b'];
const ROTATIONS = ['X', 'Y', 'Z', 'x', 'y', 'z'];
const ROTATION_EQUIV = {'x': 'rLM', 'X': 'Rlm', 'y': 'uED', 'Y': 'Ued',
                      'z': 'fsB', 'Z':'FSb'}; 


const FACE_TRANSITIONS = {
    'X': {'L': 'L', 'F': 'D', 'D': 'B', 'B': 'U', 'U': 'F', 'R': 'R'},
    'Y': {'D': 'D', 'F': 'R', 'R': 'B', 'B': 'L', 'L': 'F', 'U': 'U'},
    'Z': {'F': 'F', 'L': 'U', 'U': 'R', 'R': 'D', 'D': 'L', 'B': 'B'},
}
    
// reverse the keys and values of a dict
const reverseMap = (dict) => Object.fromEntries(Object.entries(dict).map(([k, v]) => [v, k]));

// dictionary of quarter-turn clockwise transitions
const TRANSITION = {
    'F': FACE_TRANSITIONS['Z'],
    'B': reverseMap(FACE_TRANSITIONS['Z']),
    'S': FACE_TRANSITIONS['Z'],

    'R': FACE_TRANSITIONS['X'],
    'L': reverseMap(FACE_TRANSITIONS['X']),
    'M': reverseMap(FACE_TRANSITIONS['X']),
    
    'D': FACE_TRANSITIONS['Y'],
    'U': reverseMap(FACE_TRANSITIONS['Y']),
    'E': FACE_TRANSITIONS['Y']
}
    
// const COLOR_WHEEL = ['red', 'orange', 'blue', 'green', 'yellow', 'white'];

// rotation axes by face of cube (+ means clockwise, minus countercw)
const ROT_AXIS = {'F': 'Z+', 'B': 'Z-', 'L': 'X-', 'R': 'X+', 'U': 'Y-', 'D': 'Y+',
    'M': 'X-', 'E': 'Y+', 'S': 'Z+'};


export { MOVEMENTS, CCMOVEMENTS, 
         CUBE, INITIAL_CUBIE_FACE_COLORS, TRANSITION, ROTATIONS, ROTATION_EQUIV,
         ROT_AXIS, normalizeName, CUBE_SLICE, reverseMap };
