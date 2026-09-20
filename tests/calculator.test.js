import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateFunnel, campaignSchedule } from '../public/calculator.js';
const defaults = { revenue: 10000, order: 1000, leadRate: 40, prospectRate: 20 };
test('reference example yields 10 customers, 25 leads and 125 prospects', () => {
  assert.deepEqual(calculateFunnel(defaults), { customers: 10, leads: 25, prospects: 125 });
});
test('uses exact formulas without rounding intermediate stages', () => {
  const result = calculateFunnel({ revenue: 100, order: 30, leadRate: 30, prospectRate: 30 });
  assert.ok(Math.abs(result.prospects - 37.037037037) < 1e-8);
});
test('zero revenue and perfect conversion are supported', () => {
  assert.deepEqual(calculateFunnel({ ...defaults, revenue: 0 }), { customers: 0, leads: 0, prospects: 0 });
  assert.deepEqual(calculateFunnel({ ...defaults, leadRate: 100, prospectRate: 100 }), { customers: 10, leads: 10, prospects: 10 });
});
test('rejects nonfinite, negative, zero divisor and invalid rates', () => {
  for (const patch of [{ revenue: NaN }, { revenue: -1 }, { order: 0 }, { order: Infinity }, { leadRate: 0 }, { prospectRate: 101 }]) assert.throws(() => calculateFunnel({ ...defaults, ...patch }), RangeError);
});
test('date schedule includes both endpoints and reaches the complete target', () => {
  const result = campaignSchedule('2026-05-08', '2026-11-04');
  assert.equal(result.days, 181);
  assert.equal(result.points.length, 6);
  assert.equal(result.points.at(-1).fraction, 1);
  assert.equal(result.points.at(-1).date.toISOString().slice(0, 10), '2026-11-04');
});
test('same-day and leap-day campaigns work', () => {
  assert.equal(campaignSchedule('2026-05-08', '2026-05-08').points.length, 1);
  assert.equal(campaignSchedule('2024-02-28', '2024-03-01').days, 3);
});
test('invalid dates and backwards campaigns are rejected', () => {
  for (const [start, end] of [['', '2026-11-04'], ['2026-02-30', '2026-03-01'], ['2026-11-04', '2026-05-08'], ['2026-01-01', '2040-01-01']]) assert.throws(() => campaignSchedule(start, end), RangeError);
});
