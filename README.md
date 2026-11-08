# gradient-core

sRGB gradient interpolation in linear light: even steps between hex
stops. Zero runtime dependencies, Node >= 22.

Part of the LOFRANO TECNOLOGIA open-source lab. MIT.

```js
import { steps } from './src/gradient.mjs';
steps('#000000', '#ffffff', 3); // ['#000000', '#bcbcbc', '#ffffff']
```

```sh
npm test          # 4 tests, node:test, no dependencies
npm run demo
```

At most 16 stops, 1001 steps. MIT — see `LICENSE`.
[Versão em português](README.pt-BR.md).
