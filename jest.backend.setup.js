const { TextEncoder, TextDecoder } = require('util');

// Polyfill para TextEncoder e TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;