import * as cache from "../src/cache.js";
import * as ram from "../src/ram.js";

// 캐쉬 hit, write back test

// 램에 직접 값을 넣는다.
ram.setRam(0x1, 0x1) // 캐시 블록 0
ram.setRam(0x11, 0x2)  // 캐시 블록 0

// 캐쉬를 통해 값을 읽어옴
console.log(cache.getData(0x01).toString(16))
console.log('')

cache.setData(0x01, 0xFF)
console.log('')

// block 0 - swap
console.log(cache.getData(0x11).toString(16))
console.log('')

console.log('0x'+cache.getData(0x01).toString(16))
console.log('')
///////////////////////////////////////////////////////

// 블록 1,2,3 테스트
console.log('[BLOCK1]0x'+cache.getData(0x04).toString(16))
console.log('[BLOCK2]0x'+cache.getData(0x08).toString(16))
console.log('[BLOCK3]0x'+cache.getData(0x0c).toString(16))