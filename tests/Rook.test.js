const Rook = require('../src/pieces/Rook');

// 1º Testing class constructor
test('Rook class constructor works properly', () => {
    const TestRook = new Rook('Rook', 'white', 60, false, 'R');
    expect(TestRook.name).toBe('Rook');
    expect(TestRook.color).toBe('white');
    expect(TestRook.value).toBe(60);
    expect(TestRook.canJump).toBe(false);
    expect(TestRook.char).toBe('R');
});

// 2º Testing movement generation
test('Pawn should generate a list of valid moves', () => {
    const TestRook = new Rook('Rook', 'white', 60, false, 'R');
    const fromX = 15;
    const fromY = 7;
    const validMovesList = TestRook.generateListOfMoves(fromX, fromY, TestRook.getColor());
    expect(validMovesList).toEqual(expect.arrayContaining([
        [ 0, 7 ],   [ 1, 7 ],   [ 2, 7 ],
        [ 3, 7 ],   [ 4, 7 ],   [ 5, 7 ],
        [ 6, 7 ],   [ 7, 7 ],   [ 8, 7 ],
        [ 12, 7 ],  [ 13, 7 ],  [ 14, 7 ],
        [ 15, 0 ],  [ 15, 1 ],  [ 15, 2 ],
        [ 15, 3 ],  [ 15, 4 ],  [ 15, 5 ],
        [ 15, 6 ],  [ 15, 7 ],  [ 15, 8 ],
        [ 15, 9 ],  [ 15, 10 ], [ 15, 11 ],
        [ 15, 12 ], [ 15, 13 ], [ 15, 14 ],
        [ 15, 15 ]
      ]));
})

// 3º Testing movement check
test('Rook should validate this move: FROM <15,7> TO <0,7>', () => {
    const TestRook = new Rook('Rook', 'white', 60, false, 'R');
    const fromX = 15;
    const fromY = 7;
    const toX = 0;
    const toY = 7;
    let canMove = TestRook.canMove(fromX, fromY, toX, toY, TestRook.getColor());
    expect(canMove).toBe(true);
});

test('Rook should not validate this move: FROM <15,7> TO <0,8>', () => {
    const TestRook = new Rook('Rook', 'white', 60, false, 'R');
    const fromX = 15;
    const fromY = 7;
    const toX = 0;
    const toY = 8;
    let canMove = TestRook.canMove(fromX, fromY, toX, toY, TestRook.getColor());
    expect(canMove).toBe(false);
});