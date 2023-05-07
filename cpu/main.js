import { printRam, setRam, getRam } from "./ram.js";
import { doCpu } from "./cpu.js";
import { test1_run, file1 } from "./storage.js";

// // 변수 값 저장
// setRam(0x000000F0, 3)
// setRam(0x000000F1, 5)
// setRam(0x000000F2, 12)
// setRam(0x000000F3, 0x000001FF)

// setRam(0, 0x00010000) // LDA
// setRam(1, 0x00000001) // r1 레지스터
// setRam(2, 0x000000F0) // 값이 담겨 있는 메모리 위치

// setRam(3, 0x00010000) // LDA
// setRam(4, 0x00000002) // r2 레지스터
// setRam(5, 0x000000F1) // 값이 담겨 있는 메모리 위치

// setRam(6, 0x00000001) // ADD
// setRam(7, 0x00000001) // r1 레지스터
// setRam(8, 0x00000002) // r2 레지스터

// setRam(9, 0x00010000) // LDA
// setRam(10, 0x00000002) // r2 레지스터
// setRam(11, 0x000000F2) // 값이 담겨 있는 메모리 위치

// setRam(12, 0x00000005) // CMP
// setRam(13, 0x00000001) // r1 레지스터
// setRam(14, 0x00000002) // r2 레지스터

// setRam(15, 0x00000200) // LDA
// setRam(16, 0x000000F3) // r2 레지스터

//foreach(let code of test1.code)

// let i = 0x00000000;
// test1.code.forEach(function (code) {
//   console.log(code.toString(16));
//   setRam(i, code);
//   i++
// });

/*
    전제 조건
        우리 시스템은 한번에 한 개의 프로그램만 실행 가능.
        전체 로드 후 실행
        로드 시작 위치는 항상 0 번지
*/

/*

// Load Code
test1_run.code.forEach((value, index) => {
  setRam(index, value);
});

// Load Variables
test1_run.var.forEach((value, index) => {
  setRam(test1.meta.varOffset + index, value);
});

// 실행
for (let i = 0; i < 6; i++) {
  console.log("Cpu run Index:" + i);
  doCpu();
  console.log("");
}

*/

import * as mmu from "./mmu.js";

let base = 0x000000f0;
let size = 4

setRam(base, 0x00000001)
setRam(base+1, 0x00000002)
setRam(base+2, 0x00000003)
setRam(base+3, 0x00000004) 

// setting
mmu.setData(IO_CONTROLLER_BASE_ADDR, base)
mmu.setData(IO_CONTROLLER_MEM_SIZE, size)
mmu.setData(IO_CONTROLLER_DATA_SIZE, size)

// run 
mmu.setData(IO_CONTROLLER_BIT, 0x00000001)


while(mmu.getData(IO_CONTROLLER_BIT) != 0x00000001) {


}