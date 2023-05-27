export const RAM_MAX_ADDR_SZ = 256; // 0x00 ~ 0xff 
export const RAM_WORD_SZ = 32; // 32bit , 64bit 컴퓨터 구분

// 16진수 데이터를 문자로 표현합니다.
// 16진수 1개 = 4비트 = 1문자 이기 때문에 32bit의 경우는 8개로 표현됩니다.
export const RAM_WORD_DATA_SZ = RAM_WORD_SZ / 4;
export const RAM_INIT_DATA = 0x00;

let data = [];

// 램데이터 초기화
for (let i = 0; i < RAM_MAX_ADDR_SZ; i++) {
    data[i] = RAM_INIT_DATA;
}

export function printRam() {
    for (let i = 0; i < RAM_MAX_ADDR_SZ; i++) {
        console.log("[0x" + i.toString(16) + "] 0x" + data[i].toString(16));
    }
}

export function getRam(addr) {
    return data[addr];
}

export function setRam(addr, value) {
    data[addr] = value;
}
