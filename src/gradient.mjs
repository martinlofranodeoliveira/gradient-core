// SPDX-License-Identifier: MIT
// sRGB gradient interpolation in linear light: even steps between hex
// stops, endpoints included. No network, no I/O.

export const MAX_STOPS = 16;
export const MAX_STEPS = 1001;

export class GradientError extends Error {
  constructor(code, detail = '') {
    super(detail ? `${code}: ${detail}` : code);
    this.name = 'GradientError';
    this.code = code;
  }
}

function parseHex(input) {
  if (typeof input !== 'string') throw new GradientError('NOT_STRING');
  const t = input.trim().replace(/^#/, '');
  const full = /^[0-9a-fA-F]{3}$/.test(t) ? t.split('').map((c) => c + c).join('') : t;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) throw new GradientError('BAD_HEX');
  return [0, 2, 4].map((i) => Number.parseInt(full.slice(i, i + 2), 16));
}

const toLinear = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const toSrgb = (l) => {
  const s = l <= 0.00304 ? l * 12.92 : 1.055 * l ** (1 / 2.4) - 0.055;
  return Math.min(255, Math.max(0, Math.round(s * 255)));
};
const hex = ([r, g, b]) => `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;

/**
 * Even steps from `from` to `to` inclusive (n >= 2), interpolated in
 * linear light for perceptual uniformity.
 */
export function steps(from, to, n) {
  if (!Number.isInteger(n) || n < 2 || n > MAX_STEPS) throw new GradientError('BAD_STEPS');
  const a = parseHex(from).map(toLinear);
  const b = parseHex(to).map(toLinear);
  const out = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    out.push(hex(a.map((v, k) => toSrgb(v + (b[k] - v) * t))));
  }
  return out;
}

/** Spread n total steps across >= 2 stops (first to last inclusive). */
export function gradient(stops, n) {
  if (!Array.isArray(stops) || stops.length < 2) throw new GradientError('BAD_STOPS');
  if (stops.length > MAX_STOPS) throw new GradientError('TOO_MANY_STOPS');
  if (!Number.isInteger(n) || n < stops.length || n > MAX_STEPS) throw new GradientError('BAD_STEPS');
  const segs = stops.length - 1;
  const base = Math.floor((n - 1) / segs);
  let extra = (n - 1) % segs;
  const out = [];
  for (let s = 0; s < segs; s++) {
    const count = base + (extra-- > 0 ? 1 : 0) + 1;
    const part = steps(stops[s], stops[s + 1], count);
    out.push(...(s ? part.slice(1) : part));
  }
  return out;
}
