const Horse = require('../src/pieces/Horse');

// 1º Testing class constructor
test('Horse class constructor works properly', () => {
    const TestHorse = new Horse('Horse', 'white', 30, true, 'H');
    expect(TestHorse.name).toBe('Horse');
    expect(TestHorse.color).toBe('white');
    expect(TestHorse.value).toBe(30);
    expect(TestHorse.canJump).toBe(true);
    expect(TestHorse.char).toBe('H');
});

// 2º Testing movement generation
test('Horse should generate a list of valid moves', () => {
    const TestHorse = new Horse('Horse', 'white', 30, false, 'H');
    const fromX = 14;
    const fromY = 2;
    const validMovesList = TestHorse.generateListOfMoves(fromX, fromY, TestHorse.getColor());
    expect(validMovesList).toEqual(expect.arrayContaining([[12, 1], [12, 3], [13, 0], [13, 4], [15, 0], [15, 4]]));
})

// 3º Testing movement check
test('Horse should validate this move: FROM <14,2> TO <12,1>', () => {
    const TestHorse = new Horse('Horse', 'white', 30, false, 'H');
    const fromX = 14;
    const fromY = 2;
    const toX = 12;
    const toY = 1;
    let canMove = TestHorse.canMove(fromX, fromY, toX, toY, TestHorse.getColor());
    expect(canMove).toBe(true);
});

test('Horse should not validate this move: FROM <14,2> TO <13,7>', () => {
    const TestHorse = new Horse('Horse', 'white', 30, false, 'H');
    const fromX = 14;
    const fromY = 2;
    const toX = 13;
    const toY = 3;
    let canMove = TestHorse.canMove(fromX, fromY, toX, toY, TestHorse.getColor());
    expect(canMove).toBe(false);
});