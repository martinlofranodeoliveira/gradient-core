# Contract — gradient-core

Pure ESM in `src/gradient.mjs`, zero runtime dependencies, Node >= 22.
Hex `#rgb`/`#rrggbb`; interpolation in linear light; endpoints included.

| Export | Result |
| --- | --- |
| `MAX_STOPS` (16) · `MAX_STEPS` (1001) | Hard bounds. |
| `steps(from, to, n)` | `n` even hexes, `n >= 2`. Midpoint of black/white is `#bcbcbc`, not `#808080`. |
| `gradient(stops, n)` | `n` hexes across `>= 2` stops; extra steps go to leading segments; joints shared, never duplicated. |

Errors: `NOT_STRING` · `BAD_HEX` · `BAD_STEPS` · `BAD_STOPS` · `TOO_MANY_STOPS`.
