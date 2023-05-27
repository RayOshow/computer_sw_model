import * as ram from "../src/ram.js";

// 램 초기값 확인
ram.printRam();

ram.setRam(0x00, 0xffffffff);
console.log('[DATA]0x', ram.getRam(0x00).toString(16));

ram.printRam();
