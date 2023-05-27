import * as ram from "./ram.js";

export const CACHE_WORD_SIZE = 16; // 16 word
export const CACHE_BLOCK_SIZE = 4; // 4 word = 16 bytes
export const CACHE_BLOCK_CNT = CACHE_WORD_SIZE / CACHE_BLOCK_SIZE; // 4개

/*

    캐시 오프셋 = 블록 내 저장되는 word 수 = 4개
    2개 bit로 표현 가능.
    CACHE_OFFSET_BIT = 0x00000003

    캐시 인덱스 = 캐시내 블록 위치를 찾는데 사용
    전체 캐시 블록 수 = CACHE_BLOCK_CNT = 4개
    CACHE_INDEX_BIT = 0x0000000C    

    나머지 정보 CACHE_TAG_BIT = 0xFFFFFFF0

*/
export const CACHE_OFFSET_BIT = 0x00000003;
export const CACHE_INDEX_BIT = 0x0000000c;
export const CACHE_TAG_BIT = 0xfffffff0;

export const CACHE_OFFSET_BIT_CNT = 2;

let _CACHE_INIT_DATA = 0;
let data = [{}];

for (let i = 0; i < CACHE_BLOCK_CNT; i++) {
    data[i] = {
        isInit: true,
        tag: null,
        arr: [],
    };

    for (let j = 0; j < CACHE_BLOCK_SIZE; j++) {
        data[i].arr[j] = _CACHE_INIT_DATA;
    }
}

export function getData(addr) {

    const index = (addr & CACHE_INDEX_BIT) >> CACHE_OFFSET_BIT_CNT;
    const tag = addr & CACHE_TAG_BIT;
    const offset = addr & CACHE_OFFSET_BIT;

    // 캐쉬 hit 확인
    if (data[index].isInit || data[index].tag !== tag) {
        let _addr;

        console.log('index['+ index +']')
        
        // tag 정보가 있다는 것은 write back 해야 한다는 것을 의미
        if (data[index].tag !== null) {
            _addr = data[index].tag | (index << CACHE_OFFSET_BIT_CNT);
            console.log("[Cache][write_back]:: [0x" + _addr.toString(16) + "~+3]");

            for (let i = 0; i < CACHE_BLOCK_SIZE; i++) {
                //console.log("[Cache2][write_back]:: [0x" + (_addr | i).toString(16) + "]" + data[index].arr[i]);
                ram.setRam(_addr | i, data[index].arr[i]);
            }
        }

        console.log("[Cache][getRam]:: [0x" + (tag | index) + "~+3]");

        // Ram -> cache
        _addr = tag | (index << CACHE_OFFSET_BIT_CNT);

        for (let i = 0; i < CACHE_BLOCK_SIZE; i++) {
            data[index].arr[i] = ram.getRam(_addr | i);
        }

        data[index].isInit = false;
        data[index].tag = tag;
    } else {
        console.log("[Cache][hit]");
    }

    return data[index].arr[offset];
}

export function setData(addr, value) {
    const index = (addr & CACHE_INDEX_BIT) >> CACHE_OFFSET_BIT_CNT;
    const tag = addr & CACHE_TAG_BIT;
    const offset = addr & CACHE_OFFSET_BIT;

    // Cache hit 상태인지 확인. 아니라면 Ram 데이터를 Cache로 가져옴.
    getData(addr);

    // 데이터 저장.
    data[index].arr[offset] = value;
}