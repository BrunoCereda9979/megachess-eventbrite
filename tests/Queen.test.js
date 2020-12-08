const Queen = require('../src/pieces/Queen');

// 1º Testing class constructor
test('Queen class constructor works properly', () => {
    const TestQueen = new Queen('Queen', 'white', 70, false, 'Q');
    expect(TestQueen.name).toBe('Queen');
    expect(TestQueen.color).toBe('white');
    expect(TestQueen.value).toBe(70);
    expect(TestQueen.canJump).toBe(false);
    expect(TestQueen.char).toBe('Q');
});

// 2º Testing movement generation
test('Queen should generate a list of valid moves', () => {
    const TestQueen = new Queen('Queen', 'white', 70, false, 'Q');
    const fromX = 14;
    const fromY = 7;
    const validMovesList = TestQueen.generateListOfMoves(fromX, fromY, TestQueen.getColor());
    expect(validMovesList).toEqual(expect.arrayContaining([
        [ 0, 7 ],   [ 1, 7 ],   [ 2, 7 ],   [ 3, 7 ],
        [ 4, 7 ],   [ 5, 7 ],   [ 6, 7 ],   [ 6, 15 ],
        [ 7, 0 ],   [ 7, 7 ],   [ 7, 14 ],  [ 8, 1 ],
        [ 8, 7 ],   [ 8, 13 ],  [ 9, 2 ],   [ 9, 7 ],
        [ 9, 12 ],  [ 10, 3 ],  [ 10, 7 ],  [ 10, 11 ],
        [ 11, 4 ],  [ 11, 7 ],  [ 11, 10 ], [ 12, 5 ],
        [ 12, 7 ],  [ 12, 9 ],  [ 13, 6 ],  [ 13, 7 ],
        [ 13, 8 ],  [ 14, 0 ],  [ 14, 1 ],  [ 14, 2 ],
        [ 14, 3 ],  [ 14, 4 ],  [ 14, 5 ],  [ 14, 6 ],
        [ 14, 7 ],  [ 14, 8 ],  [ 14, 9 ],  [ 14, 10 ],
        [ 14, 11 ], [ 14, 12 ], [ 14, 13 ], [ 14, 14 ],
        [ 14, 15 ], [ 15, 6 ],  [ 15, 7 ],  [ 15, 8 ]
    ]));
})

// 3º Testing movement check
test('Queen should validate this move: FROM <14,7> TO <0,7>', () => {
    const TestQueen = new Queen('Queen', 'white', 70, false, 'Q');
    const fromX = 14;
    const fromY = 7;
    const toX = 0;
    const toY = 7;
    let canMove = TestQueen.canMove(fromX, fromY, toX, toY, TestQueen.getColor());
    expect(canMove).toBe(true);
});

test('Queen should not validate this move: FROM <14,7> TO <0,8>', () => {
    const TestQueen = new Queen('Queen', 'white', 70, false, 'Q');
    const fromX = 14;
    const fromY = 7;
    const toX = 0;
    const toY = 8;
    let canMove = TestQueen.canMove(fromX, fromY, toX, toY, TestQueen.getColor());
    expect(canMove).toBe(false);
});