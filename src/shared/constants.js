// cube movements defined here
export const MOVEMENTS = ['L', 'M', 'R', 'U', 'E', 'D', 'F', 'S', 'B'];
export const CCMOVEMENTS = ['l', 'm', 'r', 'u', 'e', 'd', 'f', 's', 'b'];
export const ROTATIONS = ['X', 'Y', 'Z', 'x', 'y', 'z'];
export const ROTATION_EQUIV = {'x': 'rLM', 'X': 'Rlm', 'y': 'uED', 'Y': 'Ued',
                      'z': 'fsB', 'Z':'FSb'};

// arrays of slices of the cube
// each array needs to be in order of clockwise movement
export const SLICE = {
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

// Visible faces
export const VISFACES = ['F', 'B', 'L', 'R', 'U', 'D'];

// Cabezas numbering system
export const CABLIST = {
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


// dictionary of quarter-turn clockwise transitions
export const TRANSITION = {
    'L': {'L': 'L', 'F': 'D', 'D': 'B', 'B': 'U', 'U': 'F'},
    'M': {'F': 'D', 'D': 'B', 'B': 'U', 'U': 'F'},
    'R': {'R': 'R', 'F': 'U', 'U': 'B', 'B': 'D', 'D': 'F'},
    'U': {'U': 'U', 'F': 'L', 'L': 'B', 'B': 'R', 'R': 'F'},
    'E': {'F': 'R', 'R': 'B', 'B': 'L', 'L': 'F'},
    'D': {'D': 'D', 'F': 'R', 'R': 'B', 'B': 'L', 'L': 'F'},
    'F': {'F': 'F', 'L': 'U', 'U': 'R', 'R': 'D', 'D': 'L'},
    'S': {'L': 'U', 'U': 'R', 'R': 'D', 'D': 'L'},
    'B': {'B': 'B', 'R': 'U', 'U': 'L', 'L': 'D', 'D': 'R'}
}

// initial colors of cube by face
export const INITIAL_COLORS = {'F': 'red', 'B': 'orange', 'L': 'blue', 'R': 'green', 
    'U': 'yellow', 'D': 'white'};

export const COLOR_WHEEL = ['red', 'orange', 'blue', 'green', 'yellow', 'white'];

// rotation axes by face of cube (+ means clockwise, minus countercw)
export const ROT_AXIS = {'F': 'Z+', 'B': 'Z-', 'L': 'X-', 'R': 'X+', 'U': 'Y-', 'D': 'Y+',
    'M': 'X-', 'E': 'Y+', 'S': 'Z+'};

// allCubies is an array of the names of all 26 cubies
// pieces is an array pointing to DOM objects for each cubie
// scene points to html id scene
// pivot points to html id pivot
export var wholeCube, allCubies, pieces, scene, pivot;
