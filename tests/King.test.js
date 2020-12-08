const King = require('../src/pieces/King');

// 1º Testing class constructor
test('King class constructor works properly', () => {
    const TestKing = new King('King', 'white', 100, false, 'K');
    expect(TestKing.name).toBe('King');
    expect(TestKing.color).toBe('white');
    expect(TestKing.value).toBe(100);
    expect(TestKing.canJump).toBe(false);
    expect(TestKing.char).toBe('K');
});

// 2º Testing movement generation
test('King should generate a list of valid moves', () => {
    const TestKing = new King('King', 'white', 100, false, 'K');
    const fromX = 14;
    const fromY = 8;
    const validMovesList = TestKing.generateListOfMoves(fromX, fromY, TestKing.getColor());
    expect(validMovesList).toEqual(expect.arrayContaining([
        [ 13, 7 ], [ 13, 8 ],
        [ 13, 9 ], [ 14, 7 ],
        [ 14, 9 ], [ 15, 7 ],
        [ 15, 8 ], [ 15, 9 ]
    ]));
})

// 3º Testing movement check
test('King should validate this move: FROM <14,8> TO <13,7>', () => {
    const TestKing = new King('King', 'white', 100, false, 'K');
    const fromX = 14;
    const fromY = 8;
    const toX = 13;
    const toY = 7;
    let canMove = TestKing.canMove(fromX, fromY, toX, toY, TestKing.getColor());
    expect(canMove).toBe(true);
});

test('King should not validate this move: FROM <14,8> TO <12,8>', () => {
    const TestKing = new King('King', 'white', 100, false, 'K');
    const fromX = 14;
    const fromY = 7;
    const toX = 12;
    const toY = 8;
    let canMove = TestKing.canMove(fromX, fromY, toX, toY, TestKing.getColor());
    expect(canMove).toBe(false);
});