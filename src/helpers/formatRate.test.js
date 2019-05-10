import formatRate from './formatRate.js';

describe('formatRate', () => {
  it('returns "0.000" by default', () => {
    expect(formatRate()).toBe('0.000');
  });

  it('rounds to 3 decimal places', () => {
    expect(formatRate('123.456789')).toBe('123.457');
  });

  it('still works when received rate is a number', () => {
    expect(formatRate(123.456789)).toBe('123.457');
  });
});
