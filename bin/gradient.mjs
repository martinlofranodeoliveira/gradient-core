#!/usr/bin/env node
// Demo: black->white in 3 steps, asserts exact output. --assert exits non-zero on mismatch.
import { steps } from '../src/gradient.mjs';

const EXPECTED = ['#000000', '#bcbcbc', '#ffffff'];

let failed = 0;
const got = steps('#000000', '#ffffff', 3);
const pass = JSON.stringify(got) === JSON.stringify(EXPECTED);
if (!pass) failed++;
console.log(`${pass ? 'PASS' : 'FAIL'} black->white/3 -> ${got.join(' ')}`);
if (process.argv.includes('--assert') && failed > 0) process.exit(1);
if (failed > 0) process.exitCode = 1;
console.log(failed === 0 ? 'demo: all cases as expected' : `demo: ${failed} mismatch(es)`);
