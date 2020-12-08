const Bishop = require('../src/pieces/Bishop');

// 1º Testing class constructor
test('Pawn class constructor works properly', () => {
    const TestBishop = new Bishop('Bishop', 'white', 40, false, 'B');
    expect(TestBishop.name).toBe('Bishop');
    expect(TestBishop.color).toBe('white');
    expect(TestBishop.value).toBe(40);
    expect(TestBishop.canJump).toBe(false);
    expect(TestBishop.char).toBe('B');
});

// 2º Testing movement generation
test('Bishop should generate a list of valid moves', () => {
    const TestBishop = new Bishop('Bishop', 'white', 40, false, 'B');
    const fromX = 14;
    const fromY = 4;
    const validMovesList = TestBishop.generateListOfMoves(fromX, fromY, TestBishop.getColor());
    expect(validMovesList).toEqual(expect.arrayContaining([
        [ 3, 15 ], [ 4, 14 ],
        [ 5, 13 ], [ 6, 12 ],
        [ 7, 11 ], [ 8, 10 ],
        [ 9, 9 ],  [ 10, 0 ],
        [ 10, 8 ], [ 11, 1 ],
        [ 11, 7 ], [ 12, 2 ],
        [ 12, 6 ], [ 13, 3 ],
        [ 13, 5 ], [ 14, 4 ],
        [ 15, 3 ], [ 15, 5 ]
    ]));
});

// 3º Testing movement check
test('Bishop should validate this move: FROM <14,4> TO <3,15>', () => {
    const TestBishop = new Bishop('Bishop', 'white', 40, false, 'B');
    const fromX = 14;
    const fromY = 4;
    const toX = 3;
    const toY = 15;
    let canMove = TestBishop.canMove(fromX, fromY, toX, toY, TestBishop.getColor());
    expect(canMove).toBe(true);
});

test('Bishop should no validate this move: FROM <14,4> TO <13,13>', () => {
    const TestBishop = new Bishop('Bishop', 'white', 40, false, 'B');
    const fromX = 14;
    const fromY = 4;
    const toX = 13;
    const toY = 12;
    let canMove = TestBishop.canMove(fromX, fromY, toX, toY, TestBishop.getColor());
    expect(canMove).toBe(false);
});