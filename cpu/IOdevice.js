import * as constants from "./constansts.js";
import * as ram from "./ram.js";

// export const IO_CONTROLLER_BIT = 0xFF0000000F
// export const IO_CONTROLLER_CNOTROL = 0xFF00000001
// export const IO_CONTROLLER_BASE_ADDR = 0xFF00000002
// export const IO_CONTROLLER_MEM_SIZE = 0xFF00000003
// export const IO_CONTROLLER_DATA_SIZE = 0xFF00000004

/**
 * USB - Register
 */
class Registers {
  constructor() {
    this.control = 0x00000000;
    this.baseAddr = 0x00000000;
    this.memSize = 0x00000000;
    this.sendSize = 0x00000000;
    this.fileSize = 0x00000000;
  }
}

let registers = new Registers();

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function infiniteTimeout() {

  while (true) {
    // 작업 시작
    if (registers.control === 0x01) {      
      console.log("[IO]::: START");

      for (let i = 0; i < this.memSize; i++) {
        // 데이터 전송 대신 로그로 대체
        // cache가 아닌 Ram에서 직접 데이터를 가져 온다.
        console.log(ram.getRam(registers.baseAddr + i).toString(16));
        registers.sendSize++;

        if (registers.sendSize >= registers.fileSize) {
          registers.sendSize = 0;
          registers.control === 0x02;
          console.log("[IO]::: END");
        }
      }
    } else {
      console.log("[IO]::: WAIT");
    }
    await sleep(1000);
  }
}


