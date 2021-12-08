const schema = require('./schema');

test('not escape "a"', () => {
  expect(escapeCharFactor("a")).toBe("a");
});
