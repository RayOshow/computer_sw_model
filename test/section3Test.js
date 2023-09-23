
/*
import * as mmu from "./mmu.js";

let base = 0x000000f0;
let size = 4;

setRam(base, 0x00000001);
setRam(base + 1, 0x00000002);
setRam(base + 2, 0x00000003);
setRam(base + 3, 0x00000004);

// setting
mmu.setData(IO_CONTROLLER_BASE_ADDR, base);
mmu.setData(IO_CONTROLLER_MEM_SIZE, size);
mmu.setData(IO_CONTROLLER_DATA_SIZE, size);

// run
mmu.setData(IO_CONTROLLER_BIT, 0x00000001);

while (mmu.getData(IO_CONTROLLER_BIT) != 0x00000001) {}

*/
