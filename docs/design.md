# Design — gradient-core

sRGB is gamma-compressed, so naive channel averaging darkens midpoints
(`#808080` for black→white). Linearizing first, lerping, then encoding
back yields the perceptually even `#bcbcbc` — pinned by test. Segments
split `n-1` intervals greedily from the front; shared joints emitted
once.

Oracle: black/white endpoints and midpoint, identity ramps, joint
sharing, 5-over-3 distribution. Alpha and wide gamuts out of scope.
