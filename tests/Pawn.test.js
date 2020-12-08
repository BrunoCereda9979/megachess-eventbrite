const Pawn = require('../src/pieces/Pawn');

// 1º Testing class constructor
test('Pawn class constructor works properly', () => {
    const TestPawn = new Pawn('Pawn', 'white', 10, false, 'P');
    expect(TestPawn.name).toBe('Pawn');
    expect(TestPawn.color).toBe('white');
    expect(TestPawn.value).toBe(10);
    expect(TestPawn.canJump).toBe(false);
    expect(TestPawn.char).toBe('P');
});

// 2º Testing movement generation
test('Pawn should generate a list of valid moves', () => {
    const TestPawn = new Pawn('Pawn', 'white', 10, false, 'P');
    const fromX = 12;
    const fromY = 7;
    const validMovesList = TestPawn.generateListOfMoves(fromX, fromY, TestPawn.getColor());
    expect(validMovesList).toEqual(expect.arrayContaining([[11, 7], [10, 7]]));
})

// 3º Testing movement check
test('White Pawn should validate this move: FROM <12,7> TO <11,7>', () => {
    const TestPawn = new Pawn('Pawn', 'white', 10, false, 'P');
    const fromX = 12;
    const fromY = 7;
    const toX = 11;
    const toY = 7;
    let canMove = TestPawn.canMove(fromX, fromY, toX, toY, TestPawn.getColor());
    expect(canMove).toBe(true);
});

test('White Pawn should not validate this move: FROM <12,7> TO <13,7>', () => {
    const TestPawn = new Pawn('Pawn', 'white', 10, false, 'P');
    const fromX = 12;
    const fromY = 7;
    const toX = 13;
    const toY = 7;
    let canMove = TestPawn.canMove(fromX, fromY, toX, toY, TestPawn.getColor());
    expect(canMove).toBe(false);
});

test('Black Pawn should validate this move: FROM <3,7> TO <4,7>', () => {
    const TestPawn = new Pawn('Pawn', 'black', 10, false, 'P');
    const fromX = 3;
    const fromY = 7;
    const toX = 4;
    const toY = 7;
    let canMove = TestPawn.canMove(fromX, fromY, toX, toY, TestPawn.getColor());
    expect(canMove).toBe(true);
});

test('Black Pawn should not validate this move: FROM <3,7> TO <2,7>', () => {
    const TestPawn = new Pawn('Pawn', 'black', 10, false, 'P');
    const fromX = 3;
    const fromY = 7;
    const toX = 2;
    const toY = 7;
    let canMove = TestPawn.canMove(fromX, fromY, toX, toY, TestPawn.getColor());
    expect(canMove).toBe(false);
});