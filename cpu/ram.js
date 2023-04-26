const RAM_MAX_ADDR_SZ = 128;
const RAM_WORD_SZ = 32; // 32bit , 64bit 컴퓨터 구분 

// 16진수 데이터를 문자로 표현합니다.
// 16진수 1개 = 4비트 = 1문자 이기 때문에 32bit의 경우는 8개로 표현됩니다.
const RAM_WORD_DATA_SZ = RAM_WORD_SZ / 4;

let _RAM_INIT_DATA = ''
for (let i = 0 ; i < RAM_WORD_DATA_SZ; i++) {
  _RAM_INIT_DATA += '0'
}

const RAM_INIT_DATA = _RAM_INIT_DATA; // 16진수 형태를 문자형으로 저장.

let data = []

for(let i = 0; i < RAM_MAX_ADDR_SZ ; i++) {
  data [i] = RAM_INIT_DATA
}

export function printRam() {
  for(let i = 0; i < RAM_MAX_ADDR_SZ ; i++) {
   console.log('['+i+'] '+ data[i])
  }
}

export function getRam(addr) {
  return parseInt(data [addr], 16); 
}

export function setRamByStr(addr, value) {

  if( value.length > RAM_WORD_DATA_SZ) {
    value = value.slice(0, RAM_WORD_DATA_SZ);
  }
  
  data [addr] = value
}

export function setRam(addr, value) {
  data [addr] = value.toString(16)
}