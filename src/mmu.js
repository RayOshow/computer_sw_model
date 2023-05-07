/*
    memory management unit
*/

import * as constants from "./constansts.js";
import * as cache from "./cache.js";
import * as cache from "./IOdevice.js";

/**
 *
 * CPU는 단일화 된 주소 체계로 외부와의 통신을 하려고 함. (RAM이던 Chip이던 ASIC이던 I/O 장치 이던...)
 * RAM은 0번지 부터 addr가 구성되어 있음.
 *
 * Base Register + Program counter
 *
 * 가상 주소는 프로세스가 메모리를 안전하게 사용할 수 있도록 하는 데 중요한 역할을 합니다.
 * 운영 체제는 가상 주소 공간을 사용하여 각 프로세스가 메모리에 접근할 때 이를 관리하며,
 * 각 프로세스는 자신의 가상 주소 공간 내에서만 메모리에 접근할 수 있습니다.
 *
 * 이를 통해 하나의 프로세스가 다른 프로세스의 메모리를 손상시키는 등의 문제를 방지할 수 있습니다.
 *
 */
export const IO_CONTROLLER_CNOTROL = 0xff00000001;
export const IO_CONTROLLER_BASE_ADDR = 0xff00000002;
export const IO_CONTROLLER_MEM_SIZE = 0xff00000003;
export const IO_CONTROLLER_DATA_SIZE = 0xff00000004;

export function getData(addr) {
    if (addr & constants.MMU_RESERVED_ADDR) {
        //

        switch (addr) {
            case constants.IO_CONTROLLER_CNOTROL:
            case constants.IO_CONTROLLER_BASE_ADDR:
            case constants.IO_CONTROLLER_MEM_SIZE:
            case constants.IO_CONTROLLER_DATA_SIZE:
        }
    } else {
        // 램 접근
        return cache.getData(addr);
    }
}

export function setData(addr, value) {
    if (addr & constants.MMU_RESERVED_ADDR) {
        switch (addr) {
            case constants.IO_CONTROLLER_CNOTROL:
            case constants.IO_CONTROLLER_BASE_ADDR:
            case constants.IO_CONTROLLER_MEM_SIZE:
            case constants.IO_CONTROLLER_DATA_SIZE:
        }
        //
    } else {
        // 램 접근
        return cache.setData(addr, value);
    }
}
