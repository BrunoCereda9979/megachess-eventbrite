const Spot = require('../src/Spot');
const Pawn = require('../src/pieces/Pawn');

test('Spot should be empty', () => {
    const TestSpot = new Spot(null, 'P');
    let isEmpty = TestSpot.isEmpty();
    expect(isEmpty).toBe(true);
});

test('Spot should not be empty', () => {
    const TestPiece = new Pawn('Pawn', 'white', 10, false, 'P');
    const TestSpot = new Spot(TestPiece, 'P');
    let isEmpty = TestSpot.isEmpty();
    expect(isEmpty).toBe(false);
});

test('Spot coordinates should be setted properly', () => {
    const TestSpot = new Spot(null, 'P');
    TestSpot.setCoordinates(0, 0);
    let testSpotCoodinates = TestSpot.getCoordinates();
    expect(testSpotCoodinates).toEqual(expect.arrayContaining([0, 0]));
});

test('Spot should let me get the piece inside of it', () => {
    const TestPiece = new Pawn('Pawn', 'white', 10, false, 'P');
    const TestSpot = new Spot(TestPiece, 'P');
    const SpotPiece = TestSpot.getPiece();
    expect(SpotPiece).toBe(TestPiece);
});