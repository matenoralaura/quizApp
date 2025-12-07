describe('Backend sanity check', () => {
  test('should calculate basic sum correctly', () => {
    expect(1 + 1).toBe(2);
  });

  test('should have a defined environment', () => {
    expect(process.env).toBeDefined();
  });
});