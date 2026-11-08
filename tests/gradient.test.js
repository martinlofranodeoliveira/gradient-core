import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { steps, gradient, GradientError } from '../src/gradient.mjs';

describe('steps', () => {
  it('midpoints in linear light', () => {
    assert.deepEqual(steps('#000000', '#ffffff', 2), ['#000000', '#ffffff']);
    assert.deepEqual(steps('#000000', '#ffffff', 3), ['#000000', '#bcbcbc', '#ffffff']);
    assert.equal(steps('#ff0000', '#ff0000', 4).every((c) => c === '#ff0000'), true);
  });
  it('rejects bad input', () => {
    assert.throws(() => steps('#000', '#fff', 1), (e) => e.code === 'BAD_STEPS');
    assert.throws(() => steps('nope', '#fff', 3), (e) => e.code === 'BAD_HEX');
    assert.ok(new GradientError('X') instanceof Error);
  });
});

describe('gradient', () => {
  it('spreads across stops with shared joints', () => {
    const g = gradient(['#000000', '#ff0000', '#ffffff'], 5);
    assert.equal(g.length, 5);
    assert.equal(g[0], '#000000');
    assert.equal(g[4], '#ffffff');
    assert.equal(g[2], '#ff0000');
  });
  it('rejects bad stops and counts', () => {
    assert.throws(() => gradient(['#000000'], 5), (e) => e.code === 'BAD_STOPS');
    assert.throws(() => gradient(['#000000', '#fff'], 1), (e) => e.code === 'BAD_STEPS');
  });
});
